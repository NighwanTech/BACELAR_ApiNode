import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFacultyDocumentDto {
  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  facultyId?: number;

  @ApiProperty({ example: 'PROFILE_PHOTO', description: 'PROFILE_PHOTO | AADHAR | PAN | SIGNATURE | BANK_PASSBOOK | OTHER' })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty({ example: '/uploads/faculty/profile_photo/photo.jpg' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiProperty({ example: 'photo.jpg', required: false })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
