#!/usr/bin/env node
const { exec } = require('child_process');
const { join } = require('path');
const { watch } = require('fs');

const SOURCE = join(__dirname, './openapi.json');
const TARGET = join(__dirname, 'dist');

watch(SOURCE, run);
run();

function run() {
  exec(
    `npx openapi-generator-cli generate \
      -i ${SOURCE} \
      -o ${TARGET} \
      -g typescript-axios \
      --additional-properties=supportsES6=true,npmVersion=9.8.1,typescriptThreePlus=true \
      --skip-validate-spec
  `,
    (err) => {
      if (err) {
        console.log(`❌ Error generating API: ${err.message}`);
      } else console.log(`⭐ API generated`);
    }
  );
}
