import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePramanDto {
  @ApiProperty({ example: 'INCOME CERTIFICATE', description: 'Name of the praman' })
  @IsString()
  @IsNotEmpty()
  pramanName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Praman master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;

  @ApiProperty({ example: true, description: 'Is praman active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
