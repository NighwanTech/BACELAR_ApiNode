import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteAttendanceDaysDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Array of attendanceDays IDs to soft delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of user deleting records' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Obsolete attendance record', description: 'Optional deletion remarks', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
