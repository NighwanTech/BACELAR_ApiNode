# Guide: How to Apply Schema Changes to the Live Database

This document explains step-by-step how to safely update the database tables on your Hostinger Live Database (`u963801592_bacelar_Dev`) using Prisma without losing any data.

---

## 🛑 Important Difference: Development vs. Production (Live)
* **Local Development:** We use `npx prisma db push`. This is fast but can easily drop tables or reset data.
* **Live Server:** We **never** run `--force-reset` on live servers. Instead, we use Prisma Migrations to safely apply schema changes without touching existing user data.

---

## Step 1: Switch to the Live Database in `.env`
Open your [.env](file:///Users/rishichandra/Desktop/nighwan/bacelar/BACELAR_ApiNode/.env) file. 

Comment out the Local Database URL and uncomment the Live Database URL:

```env
# --- Database (MySQL) ---
# LIVE DATABASE (Uncomment this to target the live server):
DATABASE_URL="mysql://u963801592_bacelar_User:Bacelar%40123@srv1100.hstgr.io:3306/u963801592_bacelar_Dev"

# LOCAL DATABASE (Comment this out):
# DATABASE_URL="mysql://root:@localhost:3306/bacelar"
```

---

## Step 2: Push the new tables to the Live Server

### Option A: If the Live Database is still in Testing (No real students registered yet)
If the database on Hostinger is a clean dev database and you do not care about existing test data, you can simply push the schema directly:

```bash
npx prisma db push --config prisma.config.ts
```
*This will directly create the new tables (`studentAttachments`, `studentPayments`, etc.) in Hostinger MySQL.*

---

### Option B: If the Live Database has REAL Student Data (The Safe Production Way)
If real students have already registered and you want to add these new tables without deleting any existing students, follow these commands:

1. **Create a migration file (on your local machine):**
   ```bash
   npx prisma migrate dev --name add_payments_and_attachments --config prisma.config.ts
   ```
   *This command compares your `schema.prisma` with the database and creates a SQL migration file inside the `prisma/migrations/` folder.*

2. **Apply the migration to the Live Database:**
   ```bash
   npx prisma migrate deploy --config prisma.config.ts
   ```
   *This safely runs only the SQL commands needed to add the new tables, without affecting your existing student rows.*

---

## Step 3: Seed Masters to the Live Database (Program, Fees, Sessions)
Once the tables are created on the live server, you need to populate the master data (like BCA, MCA fees, academic sessions, boards) so the frontend can retrieve them.

Run the seed script while the Live DB URL is active in `.env`:

```bash
npx ts-node prisma/seed.ts
```

---

## Step 4: Switch back to Local Database
Once you are done updating the live database, edit your `.env` file again to point back to `localhost` so you can continue local coding safely:

```env
# LIVE DATABASE (Comment out):
# DATABASE_URL="mysql://u963801592_bacelar_User:Bacelar%40123@srv1100.hstgr.io:3306/u963801592_bacelar_Dev"

# LOCAL DATABASE (Uncomment):
DATABASE_URL="mysql://root:@localhost:3306/bacelar"
```
