use std::str::FromStr;

use axum::{extract::State, Json};
use serde::{Deserialize, Serialize};
use server::SharedState;
use utoipa::ToSchema;
#[derive(Deserialize, ToSchema, Serialize, Clone)]
pub struct UserCreateRequest {
    pub email: String,
    pub password: String,
}
#[derive(Deserialize, ToSchema, Serialize, Clone)]
pub struct UserCreateResponse {
    pub id: String,
}

#[utoipa::path(
  post,
  path = "/v1/user",
  responses(
      (status = 200, description = "create user", body = UserCreateRequest)
  ),
)]
pub(super) async fn create(
    State(shared_state): State<SharedState>,
    Json(payload): Json<UserCreateRequest>,
) -> Json<UserCreateResponse> {
    let inserted = shared_state
        .db
        .collection("users")
        .insert_one(payload, None)
        .await
        .unwrap();
    let id = inserted.inserted_id.as_object_id().unwrap();
    Json(UserCreateResponse { id: id.to_hex() })
}
