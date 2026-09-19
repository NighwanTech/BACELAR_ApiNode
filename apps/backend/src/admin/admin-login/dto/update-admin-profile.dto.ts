import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminProfileDto {
  @ApiProperty({ example: 'Super Admin', required: false })
  @IsString()
  @IsOptional()
  LoginName?: string;

  @ApiProperty({ example: '/uploads/admin-profiles/photo.jpg', required: false })
  @IsString()
  @IsOptional()
  ProfilePhoto?: string;

  @ApiProperty({ example: 'superadmin' })
  @IsString()
  @IsNotEmpty()
  ModifyBy: string;
}
