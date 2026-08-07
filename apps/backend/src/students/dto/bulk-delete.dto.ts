import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of StudentRegistrationId values to delete' })
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'User performing the delete operation' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Clean up duplicates', description: 'Reason for deletion', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
