import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFacultyDocumentDto {
  @ApiProperty({ example: 'PROFILE_PHOTO', description: 'PROFILE_PHOTO | AADHAR | PAN | SIGNATURE | BANK_PASSBOOK | OTHER' })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

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
