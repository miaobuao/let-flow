use std::net::{Ipv4Addr, SocketAddr};

use axum::Router;
use dotenv;
use std::io::Error;
use tokio::net::TcpListener;
use utoipa::{
    openapi::security::{ApiKey, ApiKeyValue, SecurityScheme},
    Modify, OpenApi,
};
use utoipa_rapidoc::RapiDoc;
use utoipa_redoc::{Redoc, Servable};
use utoipa_swagger_ui::SwaggerUi;

mod v1;

#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv::dotenv().ok();
    #[derive(OpenApi)]
    #[openapi(
        paths(
            v1::user::get,
        ),
        components(
            schemas(v1::user::Msg),
        ),
        modifiers(&SecurityAddon),
        tags(
        )
    )]
    struct ApiDoc;
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

    let app = Router::new()
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .merge(Redoc::with_url("/redoc", ApiDoc::openapi()))
        .merge(RapiDoc::new("/api-docs/openapi.json").path("/rapidoc"))
        .nest("/api", v1::v1());

    let address = SocketAddr::from((
        Ipv4Addr::UNSPECIFIED,
        dotenv::var("API_PORT").unwrap().parse::<u16>().unwrap(),
    ));
    let listener = TcpListener::bind(&address).await?;
    axum::serve(listener, app.into_make_service()).await
}
