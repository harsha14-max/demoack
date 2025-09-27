const { spawn } = require('child_process');
const path = require('path');

// Determine which service to start based on environment variable or default to customer-portal
const service = process.env.SERVICE || 'customer-portal';
const port = process.env.PORT || (service === 'admin-dashboard' ? 3001 : 3000);

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
