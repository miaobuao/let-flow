#!/usr/bin/env node
const { spawn } = require('child_process');
const once = require('lodash/once');
const { join } = require('path');
const execSync = require('child_process').execSync;
const args = require('minimist')(process.argv.slice(2));
const rm = args['rm'];

install('redis', './redis', 'redis');
install('mongodb', './mongodb', 'mongodb');
install('postgresql', './postgresql', 'postgresql');
install('traefik', './traefik', 'traefik-v2');

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
    --output=name -n traefik-v2`
)
  .toString('utf-8')
  .trim();
const traefik = spawn('kubectl', [
  'port-forward',
  traefikPod,
  '9000:9000',
  '-n',
  'traefik-v2',
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

function install(name, path, ns, flags) {
  if (rm) {
    remove(name, ns);
  }
  return execSync(
    `helm upgrade --install ${name} ${join(__dirname, path)} \
        --create-namespace --namespace ${'traefik-v2' ?? ns ?? name} ${
      flags ?? ''
    }`,
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
