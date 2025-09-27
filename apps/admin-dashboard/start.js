const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3001;

console.log(`Starting admin dashboard on port ${port}`);

const child = spawn('npx', ['next', 'start', '-p', port], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('error', (err) => {
  console.error('Failed to start admin dashboard:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Admin dashboard exited with code ${code}`);
  process.exit(code);
});
