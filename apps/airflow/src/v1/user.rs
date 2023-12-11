use axum::Json;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, ToSchema, Clone)]
pub struct Msg {
    pub message: String,
}

#[utoipa::path(
  get,
  path = "/v1/user",
  responses(
      (status = 200, description = "List all todos successfully", body = [Msg])
  )
)]
pub(super) async fn get() -> Json<Msg> {
    Json(Msg {
        message: "Hello World!".to_string(),
    })
}
