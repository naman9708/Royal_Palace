# Supabase + Vercel deployment guide

## 1) Create the Supabase project
1. Open Supabase and create a new project.
2. In Project Settings -> Database, copy the connection strings for:
   - Transaction pooler (used for DATABASE_URL)
   - Session pooler or direct connection (used for DIRECT_URL)
3. In the SQL editor, run the Prisma schema by applying migrations with:
   - `npx prisma db push`
   - `node prisma/seed.js`

## 2) Configure environment variables in Vercel
Add these in Vercel Project Settings -> Environment Variables:
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_URL=https://your-app.vercel.app`
- `NEXTAUTH_SECRET=<random-secret>`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_PHONE_NUMBER`
- `NEXT_PUBLIC_VENUE_NAME`

## 3) Deploy
1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Set the root directory to the app folder if needed.
4. Deploy.

## 4) Post-deploy database setup
If the database is empty, run the seed script once from the production environment or locally with the new Supabase values:
- `npx prisma db push`
- `node prisma/seed.js`
