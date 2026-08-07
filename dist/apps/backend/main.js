/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/backend/src/app.module.ts":
/*!****************************************!*\
  !*** ./apps/backend/src/app.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const students_module_1 = __webpack_require__(/*! ./students/students.module */ "./apps/backend/src/students/students.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            students_module_1.StudentsModule,
        ],
        controllers: [],
    })
], AppModule);


/***/ }),

/***/ "./apps/backend/src/students/dto/bulk-delete.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/backend/src/students/dto/bulk-delete.dto.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class BulkDeleteDto {
}
exports.BulkDeleteDto = BulkDeleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of StudentRegistrationId values to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'User performing the delete operation' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Clean up duplicates', description: 'Reason for deletion', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteDto.prototype, "DeletedRemarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/dto/change-password.dto.ts":
/*!**************************************************************!*\
  !*** ./apps/backend/src/students/dto/change-password.dto.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAC/2026/83942', description: 'Registration number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "registrationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OLD1234', description: 'Current password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NEW1234', description: 'New password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),

/***/ "./apps/backend/src/students/dto/create-student.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/backend/src/students/dto/create-student.dto.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStudentDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateStudentDto {
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AMIT KUMAR', description: 'Name of the candidate' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "candidateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SURESH KUMAR', description: "Father's name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "fatherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'amit.kumar@example.com', description: 'Unique email address' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: '10-digit mobile number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "mobileNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAC/2026/83942', description: 'Registration number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "registrationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin', description: 'User creating this record' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New admission candidate', description: 'Any extra remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/dto/login-student.dto.ts":
/*!************************************************************!*\
  !*** ./apps/backend/src/students/dto/login-student.dto.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginStudentDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginStudentDto {
}
exports.LoginStudentDto = LoginStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '202610230001',
        description: 'The 12-digit student registration number used as the Login ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginStudentDto.prototype, "registrationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ABCD1234',
        description: 'The auto-generated 8-character password containing 4 digits and 4 uppercase letters',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginStudentDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/backend/src/students/dto/update-student.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/backend/src/students/dto/update-student.dto.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStudentDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateStudentDto {
}
exports.UpdateStudentDto = UpdateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AMIT KUMAR', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "candidateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SURESH KUMAR', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "fatherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'amit.kumar@example.com', required: false }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "mobileNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAC/2026/83942', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "registrationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'User updating this record' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateStudentDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated details', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/students.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/backend/src/students/students.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_student_dto_1 = __webpack_require__(/*! ./dto/create-student.dto */ "./apps/backend/src/students/dto/create-student.dto.ts");
const update_student_dto_1 = __webpack_require__(/*! ./dto/update-student.dto */ "./apps/backend/src/students/dto/update-student.dto.ts");
const login_student_dto_1 = __webpack_require__(/*! ./dto/login-student.dto */ "./apps/backend/src/students/dto/login-student.dto.ts");
const bulk_delete_dto_1 = __webpack_require__(/*! ./dto/bulk-delete.dto */ "./apps/backend/src/students/dto/bulk-delete.dto.ts");
const change_password_dto_1 = __webpack_require__(/*! ./dto/change-password.dto */ "./apps/backend/src/students/dto/change-password.dto.ts");
let StudentsController = class StudentsController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    login(loginStudentDto) {
        return this.studentClient.send({ cmd: 'login_student' }, loginStudentDto);
    }
    changePassword(changePasswordDto) {
        return this.studentClient.send({ cmd: 'change_password_student' }, changePasswordDto);
    }
    create(createStudentDto) {
        return this.studentClient.send({ cmd: 'create_student' }, createStudentDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_students' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_student' }, { StudentRegistrationId: id });
    }
    update(id, updateStudentDto) {
        return this.studentClient.send({ cmd: 'update_student' }, { StudentRegistrationId: id, ...updateStudentDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'soft_delete_student' }, { StudentRegistrationId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_soft_delete_students' }, bulkDeleteDto);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login student using registration number and password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student authenticated successfully, returns JWT token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_student_dto_1.LoginStudentDto !== "undefined" && login_student_dto_1.LoginStudentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StudentsController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Change student password using current and new password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password changed successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof change_password_dto_1.ChangePasswordDto !== "undefined" && change_password_dto_1.ChangePasswordDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StudentsController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register/Create a new student' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Student registered successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof create_student_dto_1.CreateStudentDto !== "undefined" && create_student_dto_1.CreateStudentDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active students (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all active students' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single student details by StudentRegistrationId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return student details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update student details by StudentRegistrationId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_k = typeof update_student_dto_1.UpdateStudentDto !== "undefined" && update_student_dto_1.UpdateStudentDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _l : Object)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a student by StudentRegistrationId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Left college' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_m = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _m : Object)
], StudentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple students' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Students bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof bulk_delete_dto_1.BulkDeleteDto !== "undefined" && bulk_delete_dto_1.BulkDeleteDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _p : Object)
], StudentsController.prototype, "bulkRemove", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('Students'),
    (0, common_1.Controller)('students'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StudentsController);


/***/ }),

/***/ "./apps/backend/src/students/students.module.ts":
/*!******************************************************!*\
  !*** ./apps/backend/src/students/students.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const students_controller_1 = __webpack_require__(/*! ./students.controller */ "./apps/backend/src/students/students.controller.ts");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT ?? 4001),
                    },
                },
            ]),
        ],
        controllers: [students_controller_1.StudentsController],
    })
], StudentsModule);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./apps/backend/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/backend/src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Backend API')
        .setDescription('BACELAR Backend API documentation')
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const port = Number(process.env.PORT ?? 3000);
    await app.listen(port);
}
void bootstrap();

})();

/******/ })()
;