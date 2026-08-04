import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  NODE_ENV!: string;

  @IsNumber()
  PORT!: number;

  @IsString()
  @IsOptional()
  API_PREFIX!: string;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  @IsOptional()
  REDIS_HOST!: string;

  @IsNumber()
  @IsOptional()
  REDIS_PORT!: number;

  @IsString()
  @IsOptional()
  RABBITMQ_URL!: string;

  @IsString()
  JWT_ACCESS_SECRET!: string;

  @IsString()
  JWT_REFRESH_SECRET!: string;

  @IsString()
  @IsOptional()
  JWT_ACCESS_EXPIRES_IN!: string;

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRES_IN!: string;

  @IsString()
  @IsOptional()
  MINIO_ENDPOINT!: string;

  @IsNumber()
  @IsOptional()
  MINIO_PORT!: number;

  @IsString()
  @IsOptional()
  MINIO_ACCESS_KEY!: string;

  @IsString()
  @IsOptional()
  MINIO_SECRET_KEY!: string;

  @IsString()
  @IsOptional()
  MINIO_BUCKET!: string;

  @IsNumber()
  @IsOptional()
  BCRYPT_SALT_ROUNDS!: number;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
