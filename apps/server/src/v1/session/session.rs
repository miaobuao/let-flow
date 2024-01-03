use super::schema::{LoginRequest, LoginResponse};
use axum::{
    extract::{Request, State},
    http::{request, HeaderValue},
    response::IntoResponse,
    Json,
};
use axum_extra::extract::{
    cookie::{self, Cookie, SameSite},
    CookieJar,
};
use hyper::{
    header::{COOKIE, SET_COOKIE},
    HeaderMap, StatusCode,
};
use mongodb::{
    bson::{doc, oid::ObjectId},
    options::FindOneOptions,
};
use serde::{Deserialize, Serialize};
use server::SharedState;

#[derive(Serialize, Deserialize, Clone)]
struct UserPublicInfo {
    #[serde(rename = "_id")]
    id: ObjectId,
    name: String,
    email: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct UserBasicAuthInfo {
    #[serde(rename = "_id")]
    id: ObjectId,
    name: String,
    email: String,
    password: String,
}

#[utoipa::path(
  post,
  path = "/v1/session",
  tag = "Session",
  responses(
      (status = 200, description = "create session", body = LoginResponse),
      (status = 401, description = "invalid email or password"),
  )
)]
pub async fn create(
    State(shared_state): State<SharedState>,
    Json(payload): Json<LoginRequest>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
    let basic_info: Option<UserBasicAuthInfo> = shared_state
        .collection
        .get_user_collection()
        .find_one(
            doc! {
              "email": payload.email,
            },
            FindOneOptions::builder()
                .projection(doc! {"id": 1, "name": 1, "email": 1, "password": 1})
                .build(),
        )
        .await
        .unwrap();
    if let Some(source) = basic_info {
        if let Ok(_) = bcrypt::verify(payload.password, &source.password) {
            let mut header = HeaderMap::new();
            let token = shared_state.jwt.generate(&server::jwt::JwtToken {
                id: String::from(source.id.to_hex()),
                exp: chrono::Utc::now() + chrono::Duration::days(30),
            });
            let cookie = Cookie::build(("token", token))
                .http_only(true)
                .expires(cookie::Expiration::DateTime(
                    time::OffsetDateTime::now_utc() + time::Duration::days(30),
                ))
                .same_site(SameSite::None);
            header.insert(SET_COOKIE, cookie.to_string().parse().unwrap());
            return Ok((
                header,
                Json(LoginResponse {
                    id: source.id.to_hex(),
                    name: source.name,
                    email: source.email,
                }),
            ));
        }
    }
    return Err((
        StatusCode::UNAUTHORIZED,
        "error.invalid_email_or_password".to_owned(),
    ));
}

#[utoipa::path(
  delete,
  path = "/v1/session",
  tag = "Session",
  responses(
      (status = 200)
  )
)]
pub async fn delete(cookies: CookieJar) -> impl IntoResponse {
    let mut result_cookies = CookieJar::new();
    for cookie in cookies.iter() {
        let mut cookie = cookie.clone();
        cookie.set_expires(time::OffsetDateTime::now_utc() - time::Duration::days(1));
        result_cookies = result_cookies.add(cookie.clone().into_owned());
    }
    return (result_cookies, StatusCode::OK);
}
