# 👑 Royal Palace Marriage Hall & Garden
### Production-Ready Wedding Venue Booking Website

Built with **Next.js 15**, **PostgreSQL**, **Prisma ORM**, **NextAuth**, **Razorpay** & **Tailwind CSS**.

---

## ✅ What's Included

| Feature | Details |
|---|---|
| 11 Public Pages | Home, About, Gallery, Venue, Services, Packages, Availability, Booking, Reviews, FAQ, Contact |
| Authentication | Login, Register, Session management (NextAuth) |
| Customer Dashboard | View bookings, profile management |
| Admin Panel | Full CRUD for bookings, packages, gallery, reviews, inquiries, calendar |
| Booking System | Full form with validation, confirmation email, booking number |
| Payment Gateway | Razorpay advance & full payment integration |
| Availability Calendar | Real-time date blocking and status display |
| SEO | Sitemap, robots.txt, Open Graph metadata |
| Mobile Responsive | Works on all screen sizes |
| WhatsApp & Call Buttons | Floating action buttons |

---

## 🚀 How to Run in VS Code — Step by Step

### Step 1 — Install Required Software

Install these before starting (if not already installed):

1. **Node.js 18+** → https://nodejs.org *(choose the LTS version)*
2. **PostgreSQL** → https://www.postgresql.org/download/
3. **VS Code** → https://code.visualstudio.com

To verify installations, open a terminal and run:
```
node --version     (should show v18.x or higher)
npm --version      (should show 9.x or higher)
psql --version     (should show PostgreSQL version)
```

---

### Step 2 — Open the Project in VS Code

1. Open **VS Code**
2. Click **File → Open Folder**
3. Navigate to and select the `wedding-venue` folder
4. Press `Ctrl + `` ` ` (backtick) to open the **integrated terminal**

---

### Step 3 — Create a PostgreSQL Database

**Windows (using pgAdmin):**
1. Open pgAdmin (installed with PostgreSQL)
2. In the left panel, right-click **Databases → Create → Database**
3. Name it: `wedding_venue` → Click **Save**

**Mac / Linux (terminal):**
```bash
psql -U postgres
CREATE DATABASE wedding_venue;
\q
```

---

### Step 4 — Create Your `.env` File

In VS Code, create a new file in the **root of the project** called `.env`

Paste this content and replace the values:

```env
# ─── DATABASE ───────────────────────────────────────────────
# Replace YOUR_PASSWORD with your PostgreSQL password
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/wedding_venue"

# ─── NEXTAUTH ────────────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
# Generate a secret: open terminal and run:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET="paste-your-generated-secret-here"

# ─── RAZORPAY (get free test keys from dashboard.razorpay.com) ─
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"

# ─── CLOUDINARY (free account at cloudinary.com) ─────────────
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"

# ─── EMAIL (Gmail SMTP) ───────────────────────────────────────
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-16-char-app-password"
SMTP_FROM="your-gmail@gmail.com"
```

**To generate NEXTAUTH_SECRET**, run this in the VS Code terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**To get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** first
3. Then go to **App passwords** → Select "Mail" → Generate
4. Use the 16-character password as `SMTP_PASS`

*(Email is optional — the site works without it, emails just won't send)*

---

### Step 5 — Install Dependencies

In the VS Code terminal, run:

```bash
npm install
```

Wait for it to finish (2–3 minutes). You'll see some audit warnings — these are safe to ignore.

---

### Step 6 — Set Up the Database

Run these commands **one at a time** in the terminal:

```bash
# Step 6a — Generate Prisma client
npx prisma generate

# Step 6b — Create all database tables
npx prisma db push

# Step 6c — Fill database with sample data
node prisma/seed.js
```

Expected output from seed:
```
Admin created: royalplace831@gmail.com
Packages seeded
Reviews seeded
FAQs seeded
Gallery images seeded
Database seeded successfully!
```

---

### Step 7 — Start the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.x.x
- Local:  http://localhost:3000
✓ Ready in 3s
```

---

### Step 8 — Open in Browser

Go to **http://localhost:3000** 🎉

---

## 🔑 Login Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | royalplace831@gmail.com | Royal@8434 |

**Key URLs:**
- Website → http://localhost:3000
- Admin Panel → http://localhost:3000/admin
- Login → http://localhost:3000/login
- Register → http://localhost:3000/register
- Dashboard → http://localhost:3000/dashboard

---

## 📋 All npm Scripts

```bash
npm run dev           # Start development server (with hot reload)
npm run build         # Build for production
npm run start         # Run production build
npx prisma generate   # Generate Prisma client after schema changes
npx prisma db push    # Sync schema changes to database
npx prisma studio     # Open visual database browser at localhost:5555
node prisma/seed.js   # Re-run database seeding
```

---

## 🗂️ Project Structure

```
wedding-venue/
├── prisma/
│   ├── schema.prisma        # All database models
│   └── seed.js              # Sample data script
├── src/
│   ├── app/
│   │   ├── (public)/        # All public pages (with Navbar + Footer)
│   │   │   ├── page.js      # Homepage
│   │   │   ├── about/
│   │   │   ├── gallery/
│   │   │   ├── venue/
│   │   │   ├── services/
│   │   │   ├── packages/
│   │   │   ├── availability/
│   │   │   ├── booking/
│   │   │   ├── reviews/
│   │   │   ├── faq/
│   │   │   └── contact/
│   │   ├── (auth)/          # Login & Register pages
│   │   ├── dashboard/       # Customer dashboard
│   │   ├── admin/           # Full admin panel
│   │   ├── api/             # All backend API routes
│   │   └── layout.js        # Root layout
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, FloatingButtons
│   │   └── SessionProvider.js
│   └── lib/
│       ├── prisma.js        # Database connection
│       ├── auth.js          # NextAuth configuration
│       ├── cloudinary.js    # Image upload helpers
│       ├── email.js         # Email notifications
│       └── utils.js         # Shared utilities
├── .env                     # ← You create this (Step 4)
├── .env.example             # Template for .env
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🔧 Troubleshooting

**"Cannot connect to database"**
- Make sure PostgreSQL is running (check Services on Windows, or `pg_ctl status` on Mac/Linux)
- Double-check `DATABASE_URL` password in `.env`
- Make sure the `wedding_venue` database was created

**"Module not found" / "prisma generate" fails**
```bash
npm install
npx prisma generate
```

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```
Then open http://localhost:3001

**Environment variables not loading**
- File must be named exactly `.env` (not `.env.local` or `.env.example`)
- Restart `npm run dev` after any changes to `.env`

**Admin login not working**
- Make sure you ran `node prisma/seed.js`
- Email: `royalplace831@gmail.com` / Password: `Royal@8434`

**Images not loading**
- The site uses Unsplash images for demo — internet connection required
- To use your own images, set up Cloudinary and upload via Admin → Gallery

---

## 💳 Get Razorpay Test Keys (Free)

1. Sign up at https://dashboard.razorpay.com
2. Go to **Settings → API Keys → Generate Test Key**
3. Copy **Key ID** and **Key Secret** to your `.env`
4. Test payments use card: `4111 1111 1111 1111`, any future expiry, any CVV

---

## ☁️ Deploy to Production (Vercel + Supabase)

**Free hosted database (Supabase):**
1. Create account at https://supabase.com
2. New Project → Settings → Database → Copy **Connection String**
3. Use it as `DATABASE_URL` in your production environment

**Deploy to Vercel:**
1. Push code to GitHub
2. Go to https://vercel.com → New Project → Import from GitHub
3. Add all `.env` variables in the Vercel dashboard
4. Set `NEXTAUTH_URL` to your actual domain (e.g. `https://yoursite.vercel.app`)
5. Click **Deploy**

After deployment run:
```bash
npx prisma db push          # create tables in production DB
node prisma/seed.js         # add initial data
```

---

## 📞 Tech Stack

- **Frontend:** Next.js 15, React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth v4
- **Payments:** Razorpay
- **Images:** Cloudinary
- **Email:** Nodemailer (SMTP)
- **Deployment:** Vercel ready
