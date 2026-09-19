import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePramanDetailsDto {
  @ApiProperty({ example: 1, description: 'ID of associated Praman', required: false })
  @IsInt()
  @IsOptional()
  pramanId?: number;

  @ApiProperty({ example: 'INCOME CERTIFICATE', description: 'Name of associated Praman', required: false })
  @IsString()
  @IsOptional()
  pramanName?: string;

  @ApiProperty({ example: 1, description: 'ID of associated Sub Parameter', required: false })
  @IsInt()
  @IsOptional()
  subParameterId?: number;

  @ApiProperty({ example: 'BELOW 2 LAKH', description: 'Name of associated Sub Parameter', required: false })
  @IsString()
  @IsOptional()
  subParameterName?: string;

  @ApiProperty({ example: 4, description: 'Month ID (1-12)', required: false })
  @IsInt()
  @IsOptional()
  monthId?: number;

  @ApiProperty({ example: 'April', description: 'Month Name', required: false })
  @IsString()
  @IsOptional()
  monthName?: string;

  @ApiProperty({ example: 1, description: 'Academic Year ID (from AcademicYearMaster)', required: false })
  @IsInt()
  @IsOptional()
  academicYearId?: number;

  @ApiProperty({ example: '2025-2026', description: 'Academic Year Name (from AcademicYearMaster)', required: false })
  @IsString()
  @IsOptional()
  academicYearName?: string;

  @ApiProperty({ example: 'https://minio.host/bucket/praman-details/171549-doc.pdf', description: 'Attachment File URL (Image, PDF, Excel, Doc)', required: false })
  @IsString()
  @IsOptional()
  attachment?: string;

  @ApiProperty({ example: 1, description: 'Praman Response ID', required: false })
  @IsInt()
  @IsOptional()
  pramanResId?: number;

  @ApiProperty({ example: 'APPROVED', description: 'Response Name', required: false })
  @IsString()
  @IsOptional()
  responseName?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: true, description: 'Is active record?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Verified document entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
