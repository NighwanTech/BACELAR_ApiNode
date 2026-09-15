import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePramanSubParameterDto {
  @ApiProperty({ example: 1, description: 'ID of the associated Praman', required: false })
  @IsInt()
  @IsOptional()
  pramanId?: number;

  @ApiProperty({ example: 'INCOME CERTIFICATE', description: 'Name of the praman', required: false })
  @IsString()
  @IsOptional()
  pramanName?: string;

  @ApiProperty({ example: 'ANNUAL INCOME BELOW 2 LAKH', description: 'Name of the sub praman parameter', required: false })
  @IsString()
  @IsOptional()
  subPramanParameterName?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is sub praman parameter active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated sub praman parameter details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
