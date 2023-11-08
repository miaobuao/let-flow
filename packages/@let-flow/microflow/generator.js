const fs = require('fs');
const chokdir = require('chokidar');
const { join, basename, dirname } = require('path');
const { exec } = require('child_process');

const MODEL_PATH = join(__dirname, 'model');
const PROTO_PATH = join(__dirname, 'proto');

async function main() {
  if (!fs.existsSync(MODEL_PATH)) {
    fs.mkdirSync(MODEL_PATH);
  }
  chokdir.watch(PROTO_PATH).on('add', parse).on('change', parse);
  chokdir.watch(MODEL_PATH).on('add', updateIndex).on('change', updateIndex);
}
main();

function parse(path) {
  if (!path.endsWith('.proto')) return;
  console.log(`Parsing ${path}`);
  exec(
    `
  protoc  \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=${MODEL_PATH}  \
    --ts_proto_opt=nestJs=true \
    --proto_path=${dirname(path)} \
    ${path}
  `,
    (err, stdout, stderr) => {
      if (err === null) {
        console.log(`🌟 Done parsing: ${basename(path)}`);
      } else
        console.log({
          err,
          stderr,
          stdout,
        });
    },
  );
}

const MODEL_INDEX_PATH = join(MODEL_PATH, 'index.ts');

function updateIndex() {
  fs.readdir(MODEL_PATH, (err, files) => {
    if (err) console.warn(err);
    else {
      const index = files
        .filter((file) => file !== 'index.ts')
        .map((file) => file.replace('.ts', ''));
      const exports = index
        .map((name) => `export * from './${name}'`)
        .join('\n');
      const MicroServiceName = `export type MicroServiceName = ${index
        .map((name) => `"${name}"`)
        .join(' | ')}`;
      const content = [exports, MicroServiceName].join('\n');
      if (fs.existsSync(MODEL_INDEX_PATH)) {
        if (fs.readFileSync(MODEL_INDEX_PATH, 'utf8') === content) {
          return;
        }
      }
      fs.writeFileSync(MODEL_INDEX_PATH, content);
    }
  });
}
