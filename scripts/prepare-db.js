const { execSync } = require('child_process')

if (process.env.DIRECT_URL) {
  console.log('DIRECT_URL detected. Running Prisma schema push...')
  execSync('npx prisma db push', { stdio: 'inherit' })
} else {
  console.log('DIRECT_URL not set. Skipping Prisma db push during build.')
}
