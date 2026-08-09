import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStudentAttachmentDto {
  @ApiProperty({ example: 'PHOTO', description: 'Document Type (e.g. PHOTO, SIGNATURE)', required: false })
  @IsString()
  @IsOptional()
  documentType?: string;

  @ApiProperty({ example: '/uploads/photos/my-photo.jpg', description: 'URL or storage path of the file', required: false })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated photo path', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
