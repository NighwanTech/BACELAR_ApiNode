# Step-by-Step Guide: Migrating File Uploads to AWS S3 / Cloud Storage

This document provides a simple, step-by-step guide to switch your file upload destination from **Local Server Disk** to **AWS S3** (or Hostinger Object Storage/DigitalOcean Spaces) without breaking any controller or database logic.

---

## 🛠️ Step 1: Install the S3 SDK Package
Open your terminal in the root of the project (`BACELAR_ApiNode`) and run the following command to install the AWS S3 client library:

```bash
npm install @aws-sdk/client-s3
```

---

## 📝 Step 2: Update Your `.env` Configuration
Open your `.env` file and configure S3 by changing `STORAGE_PROVIDER` and adding your credentials:

```env
# 1. Change provider from 'local' to 's3'
STORAGE_PROVIDER="s3"

# 2. Add S3 Cloud Details
AWS_BUCKET_NAME="your-bucket-name"
AWS_REGION="ap-south-1"  # Or your specific region (e.g. us-east-1)
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"

# 3. Optional: Add Endpoint URL (Only required for Hostinger/DigitalOcean custom clouds)
# AWS_ENDPOINT="https://srv123.hstgr.io"
```

---

## 💻 Step 3: Update code in `storage.service.ts`
Open [storage.service.ts](file:///Users/rishichandra/Desktop/nighwan/bacelar/BACELAR_ApiNode/apps/backend/src/shared/storage/storage.service.ts) and modify `uploadToS3` method to initialize S3 and upload files.

Replace the `uploadToS3` method with the following code:

```typescript
// 1. Import these S3 dependencies at the top of apps/backend/src/shared/storage/storage.service.ts:
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

private async uploadToS3(file: any, folder: string): Promise<string> {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const s3Endpoint = process.env.AWS_ENDPOINT; // Optional

  if (!bucketName) {
    throw new InternalServerErrorException('AWS S3 bucket name is not configured in .env');
  }

  try {
    // 2. Initialize S3 client using credentials from .env
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint: s3Endpoint || undefined, // Used for Hostinger or custom S3 backends
    });

    // 3. Generate a unique name for S3 Key (path)
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const uniqueFilename = `${uniqueSuffix}${ext}`;
    const s3Key = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;

    // 4. Upload file buffer to S3 Bucket
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype, // Preserves image type in browser
      }),
    );

    // 5. Generate and return S3 public URL
    const host = s3Endpoint || `https://${bucketName}.s3.${region}.amazonaws.com`;
    const cleanHost = host.replace(/\/$/, '');
    return `${cleanHost}/${s3Key}`;
  } catch (error: any) {
    throw new InternalServerErrorException(`S3 upload failed: ${error.message}`);
  }
}
```

---

## 🔍 How it Works (Why this design is clean)
When the student uploads a photo, the controller calls:
```typescript
const fileUrl = await this.storageService.uploadFile(file, 'photo');
```
* **In Local Mode:** It returns `/uploads/photo/12345.jpg`.
* **In S3 Mode:** It returns `https://my-bucket.s3.ap-south-1.amazonaws.com/photo/12345.jpg`.

The database automatically saves this string, and the frontend loads it directly from the URL. **You do not need to change a single database table or controller route!**
