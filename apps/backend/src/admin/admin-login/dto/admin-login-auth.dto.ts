import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginAuthDto {
  @ApiProperty({
    example: 'admin@bacelar.edu.in',
    description: 'Login using EmailId or LoginName',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'Admin@1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
