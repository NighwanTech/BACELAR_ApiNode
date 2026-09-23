import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFacultyProofDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ example: 'certificate.pdf', required: false })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;
}
