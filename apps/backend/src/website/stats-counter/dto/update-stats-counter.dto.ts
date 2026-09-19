import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatsCounterDto {
  @ApiProperty({ example: 'Students Enrolled', description: 'Title of the stats counter', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: '5000', description: 'Value of the counter', required: false })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiProperty({ example: '+', description: 'Suffix for the counter', required: false })
  @IsString()
  @IsOptional()
  suffix?: string;

  @ApiProperty({ example: 'fa-user-graduate', description: 'Icon class or name', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'https://example.com/bg.jpg', description: 'Background Image URL', required: false })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

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

  @ApiProperty({ example: 'Updated stats entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
