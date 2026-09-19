# Project Folder & File Structure Guide

This document explains the architecture of the `BACELAR_ApiNode` NestJS monorepo, showing how the API Gateway and Microservices interact.

---

## 📂 Complete Project Directory Structure

```text
BACELAR_ApiNode/
├── apps/
│   ├── backend/                    # 🌐 API Gateway (Exposed to Frontend)
│   │   └── src/
│   │       ├── master/             # Gateway Masters controllers/DTOs
│   │       ├── students/           # Gateway Student controllers/DTOs
│   │       │   ├── student-academic
│   │       │   ├── student-payment
│   │       │   └── student-attachment
│   │       ├── shared/
│   │       │   └── storage/        # Storage abstraction module (Local / S3)
│   │       ├── app.module.ts
│   │       └── main.ts             # Gateway entry point (Port 5001)
│   │
│   └── student-service/            # ⚙️ Student Microservice (Database Handler)
│       └── src/
│           ├── master/             # Microservice Masters logic
│           ├── students/           # Microservice Students business logic
│           │   ├── student-profile
│           │   ├── student-academic
│           │   ├── student-payment
│           │   └── student-attachment
│           ├── student-service.module.ts
│           └── main.ts             # Microservice entry point (TCP Port 4001)
│
├── libs/
│   └── prisma/                     # 🔌 Shared Database Library
│       └── src/
│           ├── prisma.module.ts
│           └── prisma.service.ts   # Prisma client wrapper extending PrismaClient
│
├── prisma/
│   ├── schema.prisma               # 📊 Prisma database schema file
│   └── seed.ts                     # 🌱 Database seeding script (populated Excel data)
│
├── public/
│   └── uploads/                    # 📁 File Upload Storage directory (Local Mode)
│       ├── photo/                  # Photo uploads subfolder
│       └── signature/              # Signature uploads subfolder
│
├── documents/                      # 📖 Project Documentation
│   ├── project_structure.md        # This file
│   └── aws_s3_migration_guide.md   # Cloud storage migration guide
│
├── package.json                    # Project scripts & dependencies
└── tsconfig.json                   # TypeScript configuration
```

---

## 🔄 Interaction Design: How Uploads & Payments Flow

Since NestJS microservices communicate via TCP (port 4001) which is designed for sending lightweight text messages, **binary file uploads cannot be directly passed to the microservice.**

### File Upload Flow:
1. **Frontend** submits the image file via `multipart/form-data` to API Gateway: `POST /api/v1/students-attachments/upload`.
2. **API Gateway (`backend`)** intercepts the file using `FileInterceptor` and uploads it to the physical storage (Local Disk or Cloud S3) using `StorageService`.
3. **StorageService** saves the file and returns the file URL (e.g. `/uploads/photo/avatar.jpg`).
4. **API Gateway** sends a TCP message command (`create_student_attachment`) to **Student Microservice** passing only the file path/URL and student metadata.
5. **Student Microservice** connects to MySQL via Prisma and creates the entry in the `studentAttachments` table.
6. **Student Microservice** returns the created record to **API Gateway**, which responds back to the **Frontend**.
