use axum::Json;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, ToSchema, Clone)]
pub struct LoginResponse {
    pub id: String,
    pub name: String,
}

#[utoipa::path(
  post,
  path = "/v1/session",
  responses(
      (status = 200, description = "create session", body = [Msg])
  )
)]
pub(super) async fn login() -> Json<LoginResponse> {
    Json(LoginResponse {
        id: "6969".to_owned(),
        name: "test".to_owned(),
    })
}

#[utoipa::path(
  delete,
  path = "/v1/session",
  responses(
      (status = 200)
  )
)]
pub(super) async fn logout() {}
