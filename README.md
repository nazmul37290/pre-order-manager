# Pre Order Manager

A modern full-stack application built with  **Next.js 16** ,  **Prisma ORM** ,  **SQLite** , and **React Query** for managing pre-orders efficiently.

---

## 🚀 Tech Stack

* **Frontend:** Next.js 16, React 19, Tailwind CSS, ShadCN UI
* **Backend:** Next.js API routes
* **Database:** SQLite (via Prisma)
* **ORM:** Prisma
* **State Management:**  Tanstack React Query
* **Validation:** Zod
* **Forms:** React Hook Form

---

## 📦 Prerequisites

Make sure you have installed:

* Node.js (>= 18)
* npm
* Git

---

## 📥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nazmul37290/pre-order-manager.git
cd pre-order-manager
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL='http://localhost:3000'
```

---

## ⚙️ Prisma Setup (Important)

### 4. Generate Prisma Client

```bash
npx prisma generate
```

This step:

* Generates Prisma Client based on your schema
* Required after installing dependencies or updating schema

---

### 5. Run Migrations

```bash
npx prisma migrate dev
```

This will:

* Create the SQLite database (`dev.db`)
* Apply schema
* Regenerate Prisma Client

---

### 6. Seed the Database (Optional)

```bash
npx prisma db seed
```

Add dummy pre orders to database

---

### 7. Run the Development Server

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
.
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│
├── app/
├── components/
├── lib/
├── hooks/
├── types/
│
├── public/
├── .env
├── package.json
```

---

## 🧪 Available Scripts

```
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## ⚙️ Database Notes

* SQLite database file: `dev.db`

---

## 📌 Best Practices

* Run `prisma generate` after schema changes
* Never commit `.env` or `dev.db`
* Use migrations instead of manual DB edits
* Validate inputs using Zod

---

## 🚀 Deployment

```bash
npm run build
npm run start
```

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
