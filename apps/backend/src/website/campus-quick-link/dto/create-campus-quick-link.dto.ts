import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampusQuickLinkDto {
  @ApiProperty({ example: 'Library Portal', description: 'Name of the quick link' })
  @IsString()
  @IsNotEmpty()
  quickLinkName: string;

  @ApiProperty({ example: 'fa-book', description: 'Icon class or URL', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'https://library.bacelar.edu', description: 'Page URL for quick link' })
  @IsString()
  @IsNotEmpty()
  pageUrl: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Main campus library link', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
