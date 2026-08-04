import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiPropertyOptional({ description: 'Tenant ID (overrides header)' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message: 'Password must contain uppercase, lowercase and number',
  })
  password!: string;

  @ApiProperty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: ['SUPER_ADMIN', 'ADMIN', 'STAFF', 'FACULTY', 'STUDENT'] })
  @IsOptional()
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'STAFF', 'FACULTY', 'STUDENT'])
  type?: string;
}
