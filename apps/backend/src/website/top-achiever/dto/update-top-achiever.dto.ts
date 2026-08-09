import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTopAchieverDto {
  @ApiProperty({ example: 'Ankit Kumar', description: 'Name of the top achiever', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'https://example.com/achievers/ankit.jpg', description: 'Profile photo URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'Software Engineer @ Google', description: 'Designation / current role', required: false })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty({ example: 'Highest Package 45 LPA', description: 'Key achievement or highlight', required: false })
  @IsString()
  @IsOptional()
  achievement?: string;

  @ApiProperty({ example: '2020-2024', description: 'Batch / passing year range', required: false })
  @IsString()
  @IsOptional()
  batch?: string;

  @ApiProperty({ example: 'B.Tech Computer Science', description: 'Course / degree program', required: false })
  @IsString()
  @IsOptional()
  course?: string;

  @ApiProperty({ example: 'Secured top AIR rank and placed at Google Campus placement.', description: 'Detailed description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://linkedin.com/in/ankit', description: 'Profile or news URL link', required: false })
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

  @ApiProperty({ example: true, description: 'Is top achiever entry active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated achievement info', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
