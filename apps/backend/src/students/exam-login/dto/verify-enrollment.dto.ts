import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEnrollmentDto {
  @ApiProperty({
    example: 'BACE2024010001',
    description: 'Student BACE Enrollment Number or Serial',
  })
  @IsNotEmpty()
  @IsString()
  enrollmentNo: string;

  @ApiProperty({
    example: '2004-05-15',
    description: 'Student Date of Birth (YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;
}
