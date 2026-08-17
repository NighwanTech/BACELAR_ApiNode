import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SaveStudentProgramSubjectsDto {
  @ApiProperty({ example: 101, description: 'Student Registration ID' })
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: [12, 15, 18], description: 'Chosen program subject IDs in order', type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  programSubjectIds: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;
}
