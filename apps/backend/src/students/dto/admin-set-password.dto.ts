import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminSetPasswordDto {
  @ApiProperty({ example: '202608190023' })
  @IsString()
  @IsNotEmpty()
  registrationNo: string;

  @ApiProperty({ example: 'NewPass@123' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'Admin User', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;
}
