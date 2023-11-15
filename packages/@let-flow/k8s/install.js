#!/usr/bin/env node
// const { spawn } = require('child_process');
// const once = require('lodash/once');
const { join } = require('path');
const execSync = require('child_process').execSync;
const args = require('minimist')(process.argv.slice(2));
const rm = args['rm'];

const config = require('./config.json').service;

install(
  'traefik',
  './traefik',
  config.traefik.ns,
  `
    --set ports.redis.port=6379
    --set ports.redis.exposedPort=6379
    --set ports.redis.expose=true
    --set ports.redis.protocol=TCP
`
);
let waiting = true;
const traefikTimer = setInterval(() => {
  const data = JSON.parse(
    execSync(`
    kubectl get pods \
    --selector "app.kubernetes.io/name=traefik" \
    --output=json -n ${config.traefik.ns}
  `).toString('utf8')
  );
  const status = data.items[0].status.containerStatuses[0];
  if (status.ready) {
    clearInterval(traefikTimer);
    waiting = false;
    console.log('✅ Traefik is ready');
    startService();
  } else {
    console.log("⏰ Traefik isn't ready yet");
  }
}, 1000);

function startService() {
  /**
   # start traefik web ui
    POD_NAME=$(kubectl get pods --selector "app.kubernetes.io/name=traefik" --output=name -n traefik-v2) \
    kubectl port-forward \
      $POD_NAME\
      9000:9000 -n traefik-v2
  */
  const traefikPod = execSync(
    `kubectl get pods \
    --selector "app.kubernetes.io/name=traefik" \
    --output=name -n ${config.traefik.ns}`
  )
    .toString('utf-8')
    .trim();
  const traefik = spawn('kubectl', [
    'port-forward',
    traefikPod,
    '9000:9000',
    '-n',
    config.traefik.ns,
  ]);
  const traefikDashboardTips = once(() =>
    console.log('⭐ Visit http://localhost:9000/dashboard/ to use Traefik')
  );
  traefik.stdout.pipe(process.stdout);
  traefik.stdout.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
    traefikDashboardTips();
  });
  traefik.stderr.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
  });

  install(
    'redis',
    './redis',
    config.redis.ns,
    `
      --set auth.enabled=false
    `
  );
  install(
    'mongodb',
    './mongodb',
    config.mongodb.ns,
    `
      --set auth.enabled=false
    `
  );
  install(
    'postgresql',
    './postgresql',
    config.postgresql.ns,
    `
      --set global.postgresql.auth.postgresPassword=postgres
      --set global.postgresql.auth.username=postgres
      --set global.postgresql.auth.password=postgres
      --set global.postgresql.auth.database=postgres
    `
  );
}

function install(name, path, ns, flags) {
  if (rm) {
    remove(name, ns);
  }
  flags = (flags ?? '')
    .trim()
    .split('\n')
    .map((str) => str.trim())
    .join(' ');
  return execSync(
    `helm upgrade --install ${name} ${join(__dirname, path)} \
        --create-namespace --namespace ${ns ?? name} ${flags ?? ''}`,
    { stdio: 'inherit' }
  );
}

function remove(name, ns) {
  try {
    return execSync(`helm uninstall ${name} --namespace ${ns ?? name}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(error);
  }
}
