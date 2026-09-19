import { IsArray, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageGalleryDto {
  @ApiProperty({ example: 'Annual Sports Day 2026', description: 'Title of the image gallery album' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Sports', description: 'Category (e.g. Events, Campus, Sports, Convocation)', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'Highlights from Annual Sports Fest held at university main ground.', description: 'Album description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: ['https://example.com/gallery/img1.jpg', 'https://example.com/gallery/img2.jpg'],
    description: 'Array of image URLs or JSON string',
    required: false
  })
  @IsOptional()
  images?: string[] | string;

  @ApiProperty({ example: '2026-08-05T00:00:00.000Z', description: 'Event or album date (ISO string)', required: false })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: 1, description: 'Display order priority', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: true, description: 'Is album active on website?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Sports album', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
