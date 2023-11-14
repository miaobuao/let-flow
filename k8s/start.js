#!/usr/bin/env node
const { join } = require('path');
const execSync = require('child_process').execSync;
const args = require('minimist')(process.argv.slice(2));

['redis', 'mongodb', 'postgresql'].forEach((name) => {
  try {
    if (args['rm']) {
      try {
        execSync(`helm uninstall ${name} -n ${name}`, { stdio: 'inherit' });
      } catch (_) {}
    }
    execSync(
      `helm upgrade --install ${name} ${join(__dirname, name)} \
         --create-namespace --namespace ${name} `,
      { stdio: 'inherit' }
    );
  } catch (error) {
    console.error(error);
  }
});

execSync('minikube tunnel', { stdio: 'inherit' });
