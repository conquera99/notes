# Notes App

A Next.js notes app with:

- Local notes storage (Dexie)
- Email/password authentication (NextAuth)
- Prisma ORM with MySQL/MariaDB for user accounts

## 1. Environment Setup

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL` - MySQL/MariaDB connection string
- `NEXTAUTH_SECRET` - random secret used to sign auth tokens
- `NEXTAUTH_URL` - app URL, e.g. `http://localhost:3000`
- `CKEDITOR_LICENSE_KEY` - existing editor key for CKEditor

Example `DATABASE_URL`:

```text
mysql://root:password@localhost:3306/notes_auth
```

## 2. Prisma Setup

Generate Prisma client and create tables:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init_auth
```

Optional DB browser:

```bash
npm run prisma:studio
```

## 3. Run App

```bash
npm run dev
```

Open `http://localhost:3000`.

- Unauthenticated users are redirected to `/auth/sign-in`
- New users can register at `/auth/sign-up`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:studio`
