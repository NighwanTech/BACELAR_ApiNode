/**
 * Production starter for Render / single-host deploy.
 * Runs student-service (TCP), exam-result-service (TCP), then backend (HTTP).
 */
const { spawn } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const studentEntry = path.join(root, 'dist/apps/student-service/main.js');
const examResultEntry = path.join(root, 'dist/apps/exam-result-service/main.js');
const backendEntry = path.join(root, 'dist/apps/backend/main.js');

const children = [];
const ready = { STUDENT: false, EXAM: false };

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
const examResult = start('EXAM', examResultEntry);

let startedBackend = false;
function startBackend() {
  if (startedBackend) return;
  startedBackend = true;
  start('BACKEND', backendEntry);
}

const readyTimer = setTimeout(() => {
  console.warn('[BOOT] Microservice ready timeout — starting backend anyway');
  startBackend();
}, 15000);

function markReady(name) {
  ready[name] = true;
  if (ready.STUDENT && ready.EXAM) {
    clearTimeout(readyTimer);
    startBackend();
  }
}

student.stdout.on('data', (buf) => {
  if (/listening on port/i.test(buf.toString())) {
    markReady('STUDENT');
  }
});

examResult.stdout.on('data', (buf) => {
  if (/listening on port/i.test(buf.toString())) {
    markReady('EXAM');
  }
});
