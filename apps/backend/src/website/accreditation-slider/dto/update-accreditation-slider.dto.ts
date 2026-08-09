import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccreditationSliderDto {
  @ApiProperty({ example: 'UGC Approved', description: 'Title or name of accreditation / partner logo', required: false })
  @IsString()
  @IsOptional()
  title?: string;

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

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is accreditation slider entry active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated logo link details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
