import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Stable role code used in application logic' })
  @IsString()
  @IsNotEmpty()
  roleCode: string;

  @ApiProperty({ example: 'Admin', description: 'Display name for UI' })
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
