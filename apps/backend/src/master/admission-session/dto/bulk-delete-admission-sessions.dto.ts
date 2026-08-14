import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteAdmissionSessionsDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of admission session IDs to delete' })
  @IsArray()
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of person deleting' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Bulk cleanup', required: false })
  @IsString()
  DeletedRemarks?: string;
}
