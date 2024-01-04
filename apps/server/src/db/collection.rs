use mongodb;

#[derive(Debug, Clone)]
pub struct Collections {
    db: mongodb::Database,
}

impl Collections {
    pub fn new(db: mongodb::Database) -> Self {
        Self { db }
    }

    pub fn get_user_collection<T>(&self) -> mongodb::Collection<T> {
        self.db.collection("user")
    }
}
