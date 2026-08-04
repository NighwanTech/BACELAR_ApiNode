import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ enum: ['email', 'sms', 'push', 'in_app'] })
  @IsEnum(['email', 'sms', 'push', 'in_app'])
  type!: string;

  @ApiProperty({ enum: ['email', 'sms', 'push', 'in_app'] })
  @IsEnum(['email', 'sms', 'push', 'in_app'])
  channel!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  template?: string;

  @ApiPropertyOptional()
  @IsOptional()
  data?: Record<string, unknown>;
}
