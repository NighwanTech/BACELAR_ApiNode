import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCampusQuickLinkDto {
  @ApiProperty({ example: 'Library Portal', description: 'Name of the quick link', required: false })
  @IsString()
  @IsOptional()
  quickLinkName?: string;

  @ApiProperty({ example: 'fa-book', description: 'Icon class or URL', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'https://library.bacelar.edu', description: 'Page URL for quick link', required: false })
  @IsString()
  @IsOptional()
  pageUrl?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is quick link active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated library link details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
