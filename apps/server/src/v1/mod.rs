use axum::{routing, Router};
use server::{JwtAuthentication, SharedState};
use tower_http::auth::AsyncRequireAuthorizationLayer;

pub mod session;
pub mod user;

pub fn v1() -> Router<SharedState> {
    let jwt_layer = AsyncRequireAuthorizationLayer::new(JwtAuthentication::new(
        dotenv::var("JWT_SECRET").expect("need env: `JWT_SECRET`"),
    ));
    Router::new().nest(
        "/v1",
        Router::new()
            .route(
                "/session",
                routing::post(session::login).delete(session::logout),
            )
            .route(
                "/user",
                routing::post(user::create), // .layer(jwt_layer.to_owned()),
            ),
    )
}
