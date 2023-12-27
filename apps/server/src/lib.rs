use axum::{body::Body, extract::Request, response::Response};
use futures::future::BoxFuture;
use hyper::{header, StatusCode};
use mongodb;
use tower_http::auth::AsyncAuthorizeRequest;

pub mod db;

#[derive(Debug, Clone)]
pub struct SharedState {
    pub collection: db::collection::Collections,
}

impl SharedState {
    pub fn new(db: mongodb::Database) -> Self {
        Self {
            collection: db::collection::Collections::new(db),
        }
    }
    // pub fn get_user
}

#[derive(Clone, Debug)]
pub struct JwtAuthentication {
    secret: String,
}

impl JwtAuthentication {
    pub fn new(secret: String) -> Self {
        Self { secret }
    }
}

impl<B> AsyncAuthorizeRequest<B> for JwtAuthentication
where
    B: Send + 'static,
{
    type RequestBody = B;
    type ResponseBody = Body;
    type Future = BoxFuture<'static, Result<Request<B>, Response<Self::ResponseBody>>>;

    fn authorize(&mut self, mut request: Request<B>) -> Self::Future {
        Box::pin(async move {
            let authorized = request
                .headers()
                .get(header::AUTHORIZATION)
                .and_then(|it| it.to_str().ok())
                .and_then(|it| it.strip_prefix("Bearer "))
                .map(|it| it == "69420")
                .unwrap_or(false);

            if authorized {
                // let user_id = UserId("6969".to_owned());
                // request.extensions_mut().insert(user_id);
                Ok(request)
            } else {
                Err(Response::builder()
                    .status(StatusCode::UNAUTHORIZED)
                    .body(Body::empty())
                    .unwrap())
            }
        })
    }
}
