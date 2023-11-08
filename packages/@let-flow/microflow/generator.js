const fs = require('fs');
const chokdir = require('chokidar');
const { join, basename } = require('path');
const { exec } = require('child_process');

const MODEL_PATH = join(__dirname, 'model');
const PROTO_PATH = join(__dirname, 'proto');

if (!fs.existsSync(MODEL_PATH)) {
  fs.mkdirSync(MODEL_PATH);
}

chokdir.watch(PROTO_PATH).on('add', parse).on('change', parse);
chokdir.watch(MODEL_PATH).on('add', updateIndex).on('change', updateIndex);

function parse(path) {
  if (!path.endsWith('.proto')) return;
  console.log(`Parsing ${path}`);
  exec(
    `
  protoc  \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=${MODEL_PATH}  \
    --ts_proto_opt=nestJs=true \
    --proto_path=${join(__dirname, 'proto')} \
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
    }
  );
}

function updateIndex() {
  fs.readdir(MODEL_PATH, (err, files) => {
    if (err) console.warn(err);
    else {
      const index = files
        .map((file) => `export * from './model/${file.replace('.ts', '')}'`)
        .join('\n');
      fs.writeFileSync(join(__dirname, 'index.ts'), index);
    }
  });
}
