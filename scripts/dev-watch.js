const { execSync } = require('child_process');
const path = require('path');

console.log('🔨 Building shared package...');
try {
  execSync('pnpm run build:shared', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  console.log('✅ Shared package built successfully');
} catch (error) {
  console.error('❌ Failed to build shared package');
  process.exit(1);
}

console.log('🔨 Building API...');
try {
  execSync('npx tsc -p tsconfig.json', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..', 'apps', 'api'),
  });
  console.log('✅ API built successfully');
} catch (error) {
  console.error('❌ Failed to build API');
  process.exit(1);
}

console.log('🚀 Starting server...');
try {
  execSync('node dist/main.js', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..', 'apps', 'api'),
  });
} catch (error) {
  console.error('❌ Server crashed');
  process.exit(1);
}
