import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccreditationSliderDto {
  @ApiProperty({ example: 'UGC Approved', description: 'Title or name of accreditation / partner logo' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://example.com/accreditations/ugc-logo.png', description: 'Image/Logo URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'https://www.ugc.gov.in', description: 'External/Internal URL link', required: false })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ example: 1, description: 'Display order priority', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: true, description: 'Is accreditation slider active on website?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'National accreditation partner', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
