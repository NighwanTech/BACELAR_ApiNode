import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FacultyResearchInputDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  scholarId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  vidwanId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  orcid?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  scopusId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  researcherId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  researchArea?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  researchGateId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  researchAcademicProfile?: string;
}

export class FacultyEducationInputDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  facultyEducationId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  facultyQualificationId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  qualification?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  facultySpecializationId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  specializationSubject?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  university?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  collegeInstitute?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  passingYear?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  certificateUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  certificateName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

export class FacultyExperienceInputDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  facultyExperienceId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  schoolName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ctc?: number;

  @ApiProperty({ example: '2020-07-01', required: false })
  @IsString()
  @IsOptional()
  startYear?: string;

  @ApiProperty({ example: '2024-06-30', required: false })
  @IsString()
  @IsOptional()
  endYear?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  experienceLetterUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  experienceLetterName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

export class CreateFacultyDto {
  @ApiProperty({ example: 1, description: 'Employee type master ID' })
  @Type(() => Number)
  @IsInt()
  employeTypeId: number;

  @ApiProperty({ example: 1, description: 'Employee category master ID' })
  @Type(() => Number)
  @IsInt()
  employeeCategoryId: number;

  @ApiProperty({ example: 1, description: 'Employee designation master ID' })
  @Type(() => Number)
  @IsInt()
  employeeDesignationId: number;

  @ApiProperty({ example: 1, description: 'Employee department master ID' })
  @Type(() => Number)
  @IsInt()
  employeeDepartmentId: number;

  @ApiProperty({ example: 'Rahul Sharma', description: 'Faculty full name' })
  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @ApiProperty({ example: 'Suresh Sharma', required: false })
  @IsString()
  @IsOptional()
  fatherOrHusbandName?: string;

  @ApiProperty({ example: 'Male', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '1990-05-12', required: false })
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: '123412341234', required: false })
  @IsString()
  @IsOptional()
  aadharNo?: string;

  @ApiProperty({ example: 'ABCDE1234F', required: false })
  @IsString()
  @IsOptional()
  panNo?: string;

  @ApiProperty({ example: 'Married', required: false })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @ApiProperty({ example: 'Hindu', required: false })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiProperty({ example: 'OBC', description: 'Caste / reservation category', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'B+', required: false })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsString()
  @IsOptional()
  mobileNo?: string;

  @ApiProperty({ example: '9876543211', required: false })
  @IsString()
  @IsOptional()
  alternateMobileNo?: string;

  @ApiProperty({ example: 'rahul@gmail.com', required: false })
  @IsString()
  @IsOptional()
  personalEmail?: string;

  @ApiProperty({ example: 'rahul@college.edu', required: false })
  @IsString()
  @IsOptional()
  officialEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Lalitpur', required: false })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({ required: false, description: 'stateMaster id when chosen from the list' })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  stateId?: number;

  @ApiProperty({ example: 'Uttar Pradesh', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false, description: 'cityMaster id when chosen from the list' })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  cityId?: number;

  @ApiProperty({ example: 'Lalitpur', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false, description: 'zipcodeMaster id when chosen from the list' })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  zipcodeId?: number;

  @ApiProperty({ example: '284403', required: false })
  @IsString()
  @IsOptional()
  pincode?: string;

  @ApiProperty({ example: '2020-07-01', required: false })
  @IsOptional()
  dateOfJoining?: string;

  @ApiProperty({ example: '2022-07-01', required: false })
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

  @ApiProperty({ example: 'SBI', required: false })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({ example: 'SBIN0001234', required: false })
  @IsString()
  @IsOptional()
  ifscCode?: string;

  @ApiProperty({ example: '123456789012', required: false })
  @IsString()
  @IsOptional()
  accountNumber?: string;

  @ApiProperty({ example: 'Lalitpur', required: false })
  @IsString()
  @IsOptional()
  branch?: string;

  @ApiProperty({ example: 'Level-10', required: false })
  @IsString()
  @IsOptional()
  payScale?: string;

  @ApiProperty({ example: 56100, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  basicSalary?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  pfApplicable?: boolean;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
