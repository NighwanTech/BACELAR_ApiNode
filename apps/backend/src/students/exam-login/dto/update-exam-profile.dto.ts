import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateExamProfileDto {
  @ApiProperty({ example: 'student@example.com', description: 'Updated Email Address', required: false })
  @IsOptional()
  @IsEmail()
  emailId?: string;

  @ApiProperty({ example: '9876543210', description: 'Updated Mobile Number', required: false })
  @IsOptional()
  @IsString()
  mobileNo?: string;

  @ApiProperty({ example: 'House 123, Lalitpur, UP', description: 'Updated Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
