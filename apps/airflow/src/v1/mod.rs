use axum::{routing, Router};

pub mod user;

pub fn v1() -> Router {
    Router::new().route("/user", routing::get(user::get))
}
