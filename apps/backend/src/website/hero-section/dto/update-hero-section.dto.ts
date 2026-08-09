import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeroSectionDto {
  @ApiProperty({ example: 'Admissions Open 2026-27', description: 'Badge text shown above main title', required: false })
  @IsString()
  @IsOptional()
  badgeText?: string;

  @ApiProperty({ example: 'Empowering Minds, Shaping Futures at', description: 'Main hero title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Bacelar University', description: 'Highlighted portion of main title', required: false })
  @IsString()
  @IsOptional()
  highlightedTitle?: string;

  @ApiProperty({ example: 'Join Bihar’s premier educational institution offering world-class infrastructure and high-placement academic programs.', description: 'Subheading / description text', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/hero-bg.jpg', description: 'Background image URL', required: false })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @ApiProperty({ example: 'Apply Now', description: 'Primary action button text', required: false })
  @IsString()
  @IsOptional()
  primaryButtonText?: string;

  @ApiProperty({ example: '/admissions', description: 'Primary button URL link', required: false })
  @IsString()
  @IsOptional()
  primaryButtonLink?: string;

  @ApiProperty({ example: 'Explore Courses', description: 'Secondary action button text', required: false })
  @IsString()
  @IsOptional()
  secondaryButtonText?: string;

  @ApiProperty({ example: '/courses', description: 'Secondary button URL link', required: false })
  @IsString()
  @IsOptional()
  secondaryButtonLink?: string;

  @ApiProperty({ example: 1, description: 'Display order priority', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is hero section active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated hero banner text', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
