import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({ example: 'UTTAR PRADESH', description: 'Name of the state' })
  @IsString()
  @IsNotEmpty()
  stateName: string;

  @ApiProperty({ example: 'UP', description: 'Short code of the state' })
  @IsString()
  @IsNotEmpty()
  stateShortCode: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'State master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
