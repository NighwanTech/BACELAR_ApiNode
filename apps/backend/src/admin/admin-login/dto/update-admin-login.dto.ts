import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdminLoginDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  LoginName?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  EmailId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Mobile?: string;

  @ApiProperty({ required: false, description: 'Set new plain password (will be hashed)' })
  @IsString()
  @IsOptional()
  Password?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  RoleId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ClientId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ProfilePhoto?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  ModifyBy: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
