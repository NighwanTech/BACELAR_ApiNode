import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStateDto {
  @ApiProperty({ example: 'UTTAR PRADESH', description: 'Name of the state', required: false })
  @IsString()
  @IsOptional()
  stateName?: string;

  @ApiProperty({ example: 'UP', description: 'Short code of the state', required: false })
  @IsString()
  @IsOptional()
  stateShortCode?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is state active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated state details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
