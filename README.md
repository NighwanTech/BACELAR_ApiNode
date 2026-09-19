# Backend

Simple NestJS backend with Prisma, MySQL, JWT authentication, bcrypt, class-validator, and Swagger.

## Folder Structure

```text
backend/
  package.json
  tsconfig.json
  nest-cli.json
  .env.example
  README.md
  prisma/
    schema.prisma
  src/
    main.ts
    app.module.ts
    common/
      response.ts
    prisma/
      prisma.module.ts
      prisma.service.ts
    auth/
      auth.module.ts
      auth.controller.ts
      auth.model.ts
      auth.strategy.ts
      dto/
        login.dto.ts
        register.dto.ts
```

## Install

```bash
npm install
```

## Prisma

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

## Run

```bash
npm run start:dev
```

## Swagger

Open:

```text
/api-docs
```

## Environment Variables

- `PORT`: App port
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRES_IN`: JWT expiration time

## API Examples

### Register

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

### Login

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```
