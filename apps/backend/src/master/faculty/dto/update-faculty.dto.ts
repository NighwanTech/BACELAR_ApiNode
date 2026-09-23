import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FacultyEducationInputDto, FacultyExperienceInputDto, FacultyResearchInputDto } from './create-faculty.dto';

export class UpdateFacultyDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  employeTypeId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  employeeCategoryId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  employeeDesignationId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  employeeDepartmentId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  employeeName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fatherOrHusbandName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  aadharNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  panNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiProperty({ description: 'Caste / reservation category', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mobileNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  alternateMobileNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  personalEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  officialEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  stateId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  cityId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  zipcodeId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  pincode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dateOfJoining?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dateOfConfirmation?: string;

  @ApiProperty({ type: [FacultyEducationInputDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FacultyEducationInputDto)
  @IsOptional()
  educations?: FacultyEducationInputDto[];

  @ApiProperty({ type: [FacultyExperienceInputDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FacultyExperienceInputDto)
  @IsOptional()
  experiences?: FacultyExperienceInputDto[];

  @ApiProperty({ type: FacultyResearchInputDto, required: false })
  @ValidateNested()
  @Type(() => FacultyResearchInputDto)
  @IsOptional()
  research?: FacultyResearchInputDto;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ifscCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  accountNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  branch?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  payScale?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  basicSalary?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  pfApplicable?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
