use axum::{extract::State, Json};
use mongodb::{
    bson::{doc, oid::ObjectId, Bson},
    options::FindOneOptions,
};
use serde::{Deserialize, Serialize};

use super::schema::{LoginRequest, LoginResponse};
use server::SharedState;

#[derive(Serialize, Deserialize, Clone)]
struct UserPublicInfo {
    #[serde(rename = "_id")]
    id: ObjectId,
    name: String,
    email: String,
}

#[utoipa::path(
  post,
  path = "/v1/session",
  tag = "Session",
  responses(
      (status = 200, description = "create session", body = LoginResponse)
  )
)]
pub async fn login(
    State(shared_state): State<SharedState>,
    Json(payload): Json<LoginRequest>,
) -> Json<LoginResponse> {
    let source: UserPublicInfo = shared_state
        .collection
        .get_user_collection()
        .find_one(
            doc! {
                "email": payload.email,
                "password": payload.password,
            },
            FindOneOptions::builder()
                .projection(doc! {"id": 1, "name": 1, "email": 1})
                .build(),
        )
        .await
        .unwrap()
        .unwrap();
    Json(LoginResponse {
        id: source.id.to_hex(),
        name: source.name,
        email: source.email,
    })
}

#[utoipa::path(
  delete,
  path = "/v1/session",
  tag = "Session",
  responses(
      (status = 200)
  )
)]
pub async fn logout() {}
