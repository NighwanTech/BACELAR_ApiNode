import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTestimonialDto {
  @ApiProperty({ example: 'Rahul Sharma', description: 'Name of the person', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'B.Tech Alumni (Batch 2024)', description: 'Role or designation', required: false })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: 'Bacelar Institute provided me with amazing learning opportunities.', description: 'Testimonial feedback message', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 5.0, description: 'Rating score (1 to 5)', required: false })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 'https://example.com/student.jpg', description: 'Profile picture / image URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 1, description: 'Display order sequence', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: true, description: 'Is active flag', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: 'Updated testimonial entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
