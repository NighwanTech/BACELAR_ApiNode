import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeaderButtonDto {
  @ApiProperty({ example: 'Apply Now', description: 'Title of the header button', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'fa-paper-plane', description: 'Icon class or URL', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: '/admission/apply', description: 'URL or path link', required: false })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ example: 'INTERNAL', description: 'Type of link (INTERNAL / EXTERNAL / MODAL)', required: false })
  @IsString()
  @IsOptional()
  linkType?: string;

  @ApiProperty({ example: 1, description: 'Display order sequence', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: true, description: 'Is header button active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: 'Updated button link', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
