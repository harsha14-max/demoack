const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3002;

console.log(`Starting main app on port ${port}`);

const child = spawn('npx', ['next', 'start', '-p', port], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('error', (err) => {
  console.error('Failed to start main app:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Main app exited with code ${code}`);
  process.exit(code);
});
