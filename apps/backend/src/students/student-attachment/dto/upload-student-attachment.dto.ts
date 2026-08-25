import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadStudentAttachmentDto {
  @ApiProperty({ example: '1', description: 'ID of the Student registration (passed as string in form-data)' })
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @ApiProperty({ example: 'PHOTO', description: 'Document Type (e.g. PHOTO, SIGNATURE, SPORT_CERTIFICATE)' })
  @IsNotEmpty()
  @IsString()
  documentType: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'The file to upload' })
  file: any;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsNotEmpty()
  @IsString()
  CreatedBy: string;

  @ApiProperty({ example: 'Profile photo upload', description: 'Optional remarks', required: false })
  @IsOptional()
  @IsString()
  Remarks?: string;
}
