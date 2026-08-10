/**
 * Production starter for Render / single-host deploy.
 * Runs student-service (TCP) then backend (HTTP) in one process group.
 */
const { spawn } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const studentEntry = path.join(root, 'dist/apps/student-service/main.js');
const backendEntry = path.join(root, 'dist/apps/backend/main.js');

const children = [];

function start(name, entry) {
  const child = spawn(process.execPath, [entry], {
    cwd: root,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (buf) => {
    process.stdout.write(`[${name}] ${buf}`);
  });
  child.stderr.on('data', (buf) => {
    process.stderr.write(`[${name}] ${buf}`);
  });

  child.on('exit', (code, signal) => {
    console.error(`[${name}] exited code=${code} signal=${signal || ''}`);
    shutdown(code ?? 1);
  });

  children.push(child);
  return child;
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

const student = start('STUDENT', studentEntry);

function startBackend() {
  start('BACKEND', backendEntry);
}

// Wait until student microservice logs that it is listening (max 15s)
let startedBackend = false;
const readyTimer = setTimeout(() => {
  if (!startedBackend) {
    console.warn('[BOOT] Student ready timeout — starting backend anyway');
    startedBackend = true;
    startBackend();
  }
}, 15000);

student.stdout.on('data', (buf) => {
  const text = buf.toString();
  if (!startedBackend && /listening on port/i.test(text)) {
    clearTimeout(readyTimer);
    startedBackend = true;
    startBackend();
  }
});
