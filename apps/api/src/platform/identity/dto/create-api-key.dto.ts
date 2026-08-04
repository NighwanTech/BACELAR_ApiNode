import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  scopes?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
