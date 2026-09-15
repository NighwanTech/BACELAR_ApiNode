import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const EXAM_GREVIANCE_STATUSES = [
  'SUBMITTED',
  'PROCESSING',
  'MAIL_SENT',
  'NO_CHANGE',
  'MARKS_INCREASED',
  'RESULT_UPGRADED',
] as const;

export class UpdateExamGrevianceApplicationStatusDto {
  @ApiProperty({
    example: 'PROCESSING',
    enum: EXAM_GREVIANCE_STATUSES,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn([...EXAM_GREVIANCE_STATUSES])
  status: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ required: false, example: 'Photocopy mail sent to student' })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
