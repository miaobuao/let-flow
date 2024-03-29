use std::net::{Ipv4Addr, SocketAddr};

use axum::Router;
use mongodb::{options::ClientOptions, Client};
use server::SharedState;
use std::io::Error;
use tokio::net::TcpListener;
use utoipa::{
    openapi::security::{ApiKey, ApiKeyValue, SecurityScheme},
    Modify, OpenApi,
};
use utoipa_rapidoc::RapiDoc;
use utoipa_swagger_ui::SwaggerUi;
mod v1;

#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv::dotenv().ok();
    logger_init();

    let mut client_options = ClientOptions::parse(
        dotenv::var("DATABASE_URL").unwrap_or("mongodb://localhost:27017".to_string()),
    )
    .await
    .unwrap();
    client_options.app_name =
        Some(dotenv::var("BACKEND_NAME").unwrap_or("let-flow-server".to_owned()));
    let shared_state = SharedState::new(
        Client::with_options(client_options).unwrap().database(
            dotenv::var("DATABASE_NAME")
                .expect("need env: `DATABASE_NAME`")
                .as_str(),
        ),
    );

    struct SecurityAddon;

    impl Modify for SecurityAddon {
        fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
            if let Some(components) = openapi.components.as_mut() {
                components.add_security_scheme(
                    "api_key",
                    SecurityScheme::ApiKey(ApiKey::Header(ApiKeyValue::new(
                        dotenv::var("API_KEY").unwrap(),
                    ))),
                )
            }
        }
    }

    #[derive(OpenApi)]
    #[openapi(
        modifiers(&SecurityAddon),
        paths(
          v1::session::session::create,
          v1::session::session::destroy,
          v1::user::user::create,
        ),
        components(
          schemas(v1::session::schema::LoginRequest),
          schemas(v1::session::schema::LoginResponse),
          schemas(v1::user::schema::UserCreateRequest),
          schemas(v1::user::schema::UserCreateResponse),
        ),
        modifiers(&SecurityAddon),
        tags()
    )]
    struct ApiDoc;

    let app = Router::new()
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .merge(RapiDoc::new("/api-docs/openapi.json").path("/rapidoc"))
        .nest(
            dotenv::var("API_PREFIX").unwrap_or("/".to_owned()).as_str(),
            v1::v1(),
        )
        .with_state(shared_state);

    let address = SocketAddr::from((
        Ipv4Addr::UNSPECIFIED,
        dotenv::var("API_PORT")
            .unwrap_or("8080".to_owned())
            .parse::<u16>()
            .unwrap(),
    ));

    log::info!("⭐ listening on http://{}", address);
    log::info!("⭐ Swagger on http://localhost:8080/swagger-ui");
    log::info!("⭐ OpenApi on http://localhost:8080/api-docs/openapi.json");
    log::info!("⭐ Rapidoc on http://localhost:8080/rapidoc");

    if let Ok(output_path) = dotenv::var("OPENAPI_OUTPUT") {
        let doc = ApiDoc::openapi().to_json().unwrap();
        std::fs::write(output_path, doc).unwrap();
    }

    let listener = TcpListener::bind(&address).await?;
    axum::serve(listener, app.into_make_service()).await
}

#[cfg(debug_assertions)]
fn logger_init() {
    use env_logger::Env;
    env_logger::Builder::from_env(Env::default().filter_or("LOG_LEVEL", "debug")).init();
}

#[cfg(not(debug_assertions))]
fn logger_init() {
    use env_logger::Env;
    env_logger::Builder::from_env(Env::default().filter_or("LOG_LEVEL", "info")).init();
}
