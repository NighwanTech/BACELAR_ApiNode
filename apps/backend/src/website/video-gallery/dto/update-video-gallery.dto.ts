import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVideoGalleryDto {
  @ApiProperty({ example: 'Annual Convocation Ceremony 2026', description: 'Title of the video gallery item', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Events', description: 'Category (e.g. Events, Campus Tour, Seminars)', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'Highlights from 15th Annual Convocation Ceremony of Bacelar University.', description: 'Video description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/thumbnails/convocation.jpg', description: 'Thumbnail image URL', required: false })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ example: 'https://example.com/videos/convocation.mp4', description: 'Direct video file URL', required: false })
  @IsString()
  @IsOptional()
  video?: string;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'YouTube/Vimeo embed or link URL', required: false })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({ example: '05:30', description: 'Video duration (MM:SS or HH:MM:SS)', required: false })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({ example: 1, description: 'Display order priority', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is video entry active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated video details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
