import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;

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

  @ApiPropertyOptional({ enum: ['MALE', 'FEMALE', 'OTHER'] })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: ['SUPER_ADMIN', 'ADMIN', 'STAFF', 'FACULTY', 'STUDENT', 'GUARDIAN', 'ALUMNI'] })
  @IsOptional()
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'STAFF', 'FACULTY', 'STUDENT', 'GUARDIAN', 'ALUMNI'])
  type?: string;

  @ApiPropertyOptional({ enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'] })
  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'])
  status?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  roleIds?: string[];
}
