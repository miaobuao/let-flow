#!/bin/bash

DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres

sea-orm-cli generate entity \
  --output-dir docker/test-rs/src/entities \
  --seaography --database-url $DATABASE_URL \
  --database-schema dev

seaography-cli ./docker/test-rs ./docker/test-rs/src/entities \
  $DATABASE_URL sea-orm-seaography-example
