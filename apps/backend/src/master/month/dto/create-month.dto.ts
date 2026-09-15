import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonthDto {
  @ApiProperty({ example: 'JANUARY', description: 'Name of the month' })
  @IsString()
  @IsNotEmpty()
  monthName: string;

  @ApiProperty({ example: 'JAN', description: 'Short code of the month' })
  @IsString()
  @IsNotEmpty()
  monthShortCode: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Month master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;

  @ApiProperty({ example: true, description: 'Is month active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
