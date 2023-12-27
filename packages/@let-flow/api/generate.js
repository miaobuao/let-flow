#!/usr/bin/env node
const { exec } = require('child_process');
const { join } = require('path');

const OPENAPI_DOC_URL = 'http://localhost:8080/api-docs/openapi.json';

exec(
  `npx openapi-generator-cli generate \
      -i ${OPENAPI_DOC_URL} \
      -o ${join(__dirname, 'src')} \
      -g typescript-axios \
      --additional-properties=supportsES6=true,npmVersion=9.8.1,typescriptThreePlus=true
  `,
  (err) => {
    if (err) {
      console.log(`⭐ Error generating API: ${err.message}`);
    } else console.log(`⭐ API generated`);
    process.exit(0);
  }
);
