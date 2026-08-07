import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'BAC/2026/83942', description: 'Registration number' })
  @IsString()
  @IsNotEmpty()
  registrationNo: string;

  @ApiProperty({ example: 'OLD1234', description: 'Current password' })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: 'NEW1234', description: 'New password' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
