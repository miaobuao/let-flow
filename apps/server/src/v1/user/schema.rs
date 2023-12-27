use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Deserialize, ToSchema, Serialize, Clone)]
pub struct UserCreateRequest {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Deserialize, ToSchema, Serialize, Clone)]
pub struct UserCreateResponse {
    pub id: String,
    pub name: String,
    pub email: String,
}
