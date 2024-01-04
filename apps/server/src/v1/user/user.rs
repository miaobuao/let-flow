use axum::{extract::State, Json};
use bcrypt;
use hyper::StatusCode;
use mongodb::{
    bson::{doc, oid::ObjectId},
    options::FindOneOptions,
};
use serde::{Deserialize, Serialize};
use std::borrow::Borrow;

use super::schema::{UserCreateRequest, UserCreateResponse};
use server::SharedState;

#[derive(Serialize, Deserialize, Clone)]
pub struct UserId {
    #[serde(rename(deserialize = "_id", serialize = "id"))]
    id: ObjectId,
}

#[utoipa::path(
  post,
  path = "/v1/user",
  responses(
      (status = 200, description = "user register", body = UserCreateResponse),
      (status = 409, description = "Email already exist"),
      (status = 500, description = "Internal server error"),
  ),
  tag = "User",
)]
pub async fn create(
    State(shared_state): State<SharedState>,
    Json(mut payload): Json<UserCreateRequest>,
) -> Result<Json<UserCreateResponse>, (StatusCode, String)> {
    let source: Option<UserId> = shared_state
        .collection
        .get_user_collection()
        .find_one(
            doc! {"email": payload.email.to_owned()},
            FindOneOptions::builder()
                .projection(doc! {"_id": 1})
                .build(),
        )
        .await
        .unwrap();
    if let Some(_) = source {
        return Err((
            StatusCode::CONFLICT,
            "backend.error.email_already_exist".to_owned(),
        ));
    }

    payload.password = bcrypt::hash(payload.password, 12).unwrap();

    let inserted = shared_state
        .collection
        .get_user_collection::<UserCreateRequest>()
        .insert_one(payload.borrow(), None)
        .await
        .unwrap();
    if let Some(id) = inserted.inserted_id.as_object_id() {
        Ok(Json(UserCreateResponse {
            id: id.to_hex(),
            name: payload.name,
            email: payload.email,
        }))
    } else {
        Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "backend.error.internal_server_error".to_owned(),
        ))
    }
}
