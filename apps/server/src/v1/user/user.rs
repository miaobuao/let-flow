use axum::{extract::State, Json};
use hyper::StatusCode;
use mongodb::bson::doc;
use std::borrow::Borrow;

use super::schema::{UserCreateRequest, UserCreateResponse};
use server::{db::schema::User, SharedState};

#[utoipa::path(
  post,
  path = "/v1/user",
  responses(
      (status = 200, description = "create user", body = UserCreateRequest)
  ),
  tag = "User",
)]
pub async fn create(
    State(shared_state): State<SharedState>,
    Json(payload): Json<UserCreateRequest>,
) -> Result<Json<UserCreateResponse>, (StatusCode, String)> {
    let source: Option<User> = shared_state
        .collection
        .get_user_collection()
        .find_one(
            doc! {"email": payload.email.to_owned()},
            None, // FindOneOptions::builder().projection(doc! {"id": 1}).build(),
        )
        .await
        .unwrap();
    if let Some(_) = source {
        return Err((StatusCode::CONFLICT, "error.email_already_exist".to_owned()));
    }
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
            "error.internal_server_error".to_owned(),
        ))
    }
}
