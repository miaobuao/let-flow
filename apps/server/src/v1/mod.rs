use axum::{routing::post, Router};
use server::{jwt::JwtAuthentication, SharedState};
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
            .route("/session", post(Session::create).delete(Session::delete))
            .route(
                "/user",
                post(User::create), // .layer(jwt_layer.to_owned()),
            ),
    )
}
