import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePramanSubParameterDto {
  @ApiProperty({ example: 1, description: 'ID of the associated Praman' })
  @IsInt()
  @IsNotEmpty()
  pramanId: number;

  @ApiProperty({ example: 'INCOME CERTIFICATE', description: 'Name of the praman', required: false })
  @IsString()
  @IsOptional()
  pramanName?: string;

  @ApiProperty({ example: 'ANNUAL INCOME BELOW 2 LAKH', description: 'Name of the sub praman parameter' })
  @IsString()
  @IsNotEmpty()
  subPramanParameterName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Praman sub-parameter entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;

  @ApiProperty({ example: true, description: 'Is sub praman parameter active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
