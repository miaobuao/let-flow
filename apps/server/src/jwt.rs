use axum::{body::Body, extract::Request, response::Response};
use axum_extra::extract::cookie::Cookie;
use chrono::{DateTime, Utc};
use futures::future::BoxFuture;
use hyper::{header, StatusCode};
use jsonwebtoken as jwt;
use jwt::{DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use tower_http::auth::AsyncAuthorizeRequest;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct JwtToken {
    pub id: String,
    pub exp: DateTime<Utc>,
}

#[derive(Clone)]
pub struct JwtAuthentication {
    encrypt_key: EncodingKey,
    decrypt_key: DecodingKey,
}

impl JwtAuthentication {
    pub fn new(secret: String) -> Self {
        Self {
            encrypt_key: EncodingKey::from_secret(secret.as_bytes()),
            decrypt_key: DecodingKey::from_secret(secret.as_bytes()),
        }
    }

    pub fn decode(&self, token: &str) -> Option<JwtToken> {
        if let Ok(token) = jwt::decode::<JwtToken>(token, &self.decrypt_key, &Validation::default())
        {
            Some(token.claims)
        } else {
            None
        }
    }

    pub fn generate(&self, token: &JwtToken) -> String {
        jwt::encode(&Header::default(), token, &self.encrypt_key).unwrap()
    }

    pub fn check(&self, token: &str) -> bool {
        self.decode(token).is_some()
    }
}

impl<B> AsyncAuthorizeRequest<B> for JwtAuthentication
where
    B: Send + 'static,
{
    type RequestBody = B;
    type ResponseBody = Body;
    type Future = BoxFuture<'static, Result<Request<B>, Response<Self::ResponseBody>>>;

    fn authorize(&mut self, request: Request<B>) -> Self::Future {
        let decrypt_key = self.decrypt_key.clone();
        Box::pin(async move {
            if let Some(Ok(token)) = request.headers().get(header::COOKIE).and_then(|it| {
                Cookie::split_parse(it.to_str().unwrap())
                    .find(|it| it.as_ref().unwrap().name() == "token")
            }) {
                if let Ok(_) =
                    jwt::decode::<JwtToken>(token.value(), &decrypt_key, &Validation::default())
                {
                    return Ok(request);
                }
            }
            return Err(Response::builder()
                .status(StatusCode::UNAUTHORIZED)
                .body(Body::empty())
                .unwrap());
        })
    }
}
