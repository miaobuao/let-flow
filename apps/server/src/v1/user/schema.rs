use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator;
use validator::Validate;

#[derive(Serialize, Deserialize, ToSchema, Validate, Clone)]
pub struct UserCreateRequest {
    pub name: String,
    #[validate(email)]
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, ToSchema, Validate, Clone)]
pub struct UserCreateResponse {
    pub id: String,
    pub name: String,
    pub email: String,
}
