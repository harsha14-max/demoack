const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3000;

console.log(`Starting customer portal on port ${port}`);

const child = spawn('npx', ['next', 'start', '-p', port], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('error', (err) => {
  console.error('Failed to start customer portal:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Customer portal exited with code ${code}`);
  process.exit(code);
});
