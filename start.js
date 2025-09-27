const { spawn } = require('child_process');
const path = require('path');

// Determine which service to start based on environment variable or default to main-app
const service = process.env.SERVICE || 'main-app';
const port = process.env.PORT || (service === 'admin-dashboard' ? 3001 : service === 'customer-portal' ? 3000 : 3002);

console.log(`Starting ${service} on port ${port}`);

const servicePath = path.join(__dirname, 'apps', service);
const startScript = path.join(servicePath, 'start.js');

const child = spawn('node', [startScript], {
  stdio: 'inherit',
  cwd: servicePath,
  env: {
    ...process.env,
    PORT: port
  }
});

child.on('error', (err) => {
  console.error(`Failed to start ${service}:`, err);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`${service} exited with code ${code}`);
  process.exit(code);
});
