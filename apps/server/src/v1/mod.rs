use axum::{routing, Router};

pub mod user;

pub fn v1() -> Router {
    let user = Router::new().route("/user", routing::get(user::get));
    Router::new().nest("/v1", user)
}
