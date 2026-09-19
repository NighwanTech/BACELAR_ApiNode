import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Rahul Sharma', description: 'Name of the person giving testimonial' })
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Testimonial entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
