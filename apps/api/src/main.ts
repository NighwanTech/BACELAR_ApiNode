import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { TenantInterceptor } from './common/interceptors/tenant.interceptor';
import { DeveloperService } from './platform/developer/developer.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const config = app.get(ConfigService);

  // Security
  await app.register(helmet as any, {
    contentSecurityPolicy: false,
  });
  await app.register(compression as any);

  // CORS
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', '*')?.split(','),
    credentials: true,
  });

  // Global prefix
  const apiPrefix = config.get<string>('API_PREFIX', '/api/v1');
  app.setGlobalPrefix(apiPrefix);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global filters and interceptors
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TenantInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('UniversityOS API')
    .setDescription('Enterprise ERP + LMS platform for Indian Higher Education Institutions')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .addApiKey({ type: 'apiKey', name: 'x-tenant-id', in: 'header' }, 'x-tenant-id')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  SwaggerModule.setup('developer/api-docs', app, document);

  // Wire DeveloperService OpenAPI doc
  try {
    const developerService = app.get(DeveloperService);
    if (developerService) {
      developerService.setOpenApiDocument(document);
    }
  } catch (err) {
    // Ignore if not present
  }

  // Shutdown hooks
  app.enableShutdownHooks();

  const port = config.get<number>('PORT', 3000);
  const host = config.get<string>('HOST', '0.0.0.0');

  await app.listen(port, host);
  // eslint-disable-next-line no-console
  console.log(`UniversityOS API running on http://${host}:${port}${apiPrefix}`);
}

bootstrap();
