use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, ToSchema, Clone)]
pub struct LoginResponse {
    #[serde(rename(deserialize = "_id", serialize = "id"))]
    pub id: String,
    pub name: String,
    pub email: String,
    pub token: String,
    pub expires: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, ToSchema, Clone)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}
