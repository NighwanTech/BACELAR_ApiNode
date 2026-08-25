import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentAttachmentDto {
  @ApiProperty({ example: 1, description: 'ID of the Student registration' })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 'PHOTO', description: 'Document Type (e.g. PHOTO, SIGNATURE, SPORT_CERTIFICATE)' })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty({ example: '/uploads/photos/my-photo.jpg', description: 'URL or storage path of the file' })
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Profile photo uploaded during signup', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
