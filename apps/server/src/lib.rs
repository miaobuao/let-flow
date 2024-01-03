use mongodb;

pub mod db;
pub mod jwt;

#[derive(Clone)]
pub struct SharedState {
    pub collection: db::collection::Collections,
    pub jwt: jwt::JwtAuthentication,
}

impl SharedState {
    pub fn new(db: mongodb::Database) -> Self {
        Self {
            collection: db::collection::Collections::new(db),
            jwt: jwt::JwtAuthentication::new(dotenv::var("JWT_SECRET").unwrap()),
        }
    }
}
