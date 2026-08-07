import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginStudentDto {
  @ApiProperty({
    example: '202610230001',
    description: 'The 12-digit student registration number used as the Login ID',
  })
  @IsString()
  @IsNotEmpty()
  registrationNo: string;

  @ApiProperty({
    example: 'ABCD1234',
    description: 'The auto-generated 8-character password containing 4 digits and 4 uppercase letters',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
