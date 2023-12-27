use axum::{routing, Router};
use server::{JwtAuthentication, SharedState};
use tower_http::auth::AsyncRequireAuthorizationLayer;

pub mod session;
pub mod user;

use session::session as Session;
use user::user as User;

pub fn v1() -> Router<SharedState> {
    let jwt_layer = AsyncRequireAuthorizationLayer::new(JwtAuthentication::new(
        dotenv::var("JWT_SECRET").expect("need env: `JWT_SECRET`"),
    ));
    Router::new().nest(
        "/v1",
        Router::new()
            .route(
                "/session",
                routing::post(Session::login).delete(Session::logout),
            )
            .route(
                "/user",
                routing::post(User::create), // .layer(jwt_layer.to_owned()),
            ),
    )
}
