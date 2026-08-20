import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAdminLoginDto {
  @ApiProperty({ example: 'admin.user' })
  @IsString()
  @IsNotEmpty()
  LoginName: string;

  @ApiProperty({ example: 'admin@bacelar.edu.in' })
  @IsEmail()
  @IsNotEmpty()
  EmailId: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsString()
  @IsOptional()
  Mobile?: string;

  @ApiProperty({ example: 'Admin@1234' })
  @IsString()
  @IsNotEmpty()
  Password: string;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  RoleId: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ClientId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ProfilePhoto?: string;

  @ApiProperty({ example: 'Super Admin' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
