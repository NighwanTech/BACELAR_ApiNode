/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(6);
const students_module_1 = __webpack_require__(7);
const master_module_1 = __webpack_require__(37);
const website_module_1 = __webpack_require__(79);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            students_module_1.StudentsModule,
            master_module_1.MasterModule,
            website_module_1.WebsiteModule,
        ],
        controllers: [],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentsModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const students_controller_1 = __webpack_require__(9);
const student_profile_controller_1 = __webpack_require__(17);
const student_academic_module_1 = __webpack_require__(21);
const student_academic_subject_module_1 = __webpack_require__(27);
const student_payment_module_1 = __webpack_require__(32);
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
            student_academic_module_1.StudentAcademicModule,
            student_academic_subject_module_1.StudentAcademicSubjectModule,
            student_payment_module_1.StudentPaymentModule,
        ],
        controllers: [students_controller_1.StudentsController, student_profile_controller_1.StudentProfileController],
    })
], StudentsModule);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 9 */
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
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_student_dto_1 = __webpack_require__(11);
const update_student_dto_1 = __webpack_require__(13);
const login_student_dto_1 = __webpack_require__(14);
const bulk_delete_dto_1 = __webpack_require__(15);
const change_password_dto_1 = __webpack_require__(16);
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
/* 10 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 11 */
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
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
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
/* 12 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 13 */
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
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
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
/* 14 */
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
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
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
/* 15 */
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
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
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
/* 16 */
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
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
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
/* 17 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProfileController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_student_profile_dto_1 = __webpack_require__(18);
const update_student_profile_dto_1 = __webpack_require__(19);
const bulk_delete_profiles_dto_1 = __webpack_require__(20);
let StudentProfileController = class StudentProfileController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_student_profile' }, createDto);
    }
    findOne(studentId) {
        return this.studentClient.send({ cmd: 'find_student_profile' }, { studentId });
    }
    update(studentId, updateDto) {
        return this.studentClient.send({ cmd: 'update_student_profile' }, { studentId, ...updateDto });
    }
    remove(studentId, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_student_profile' }, { studentId, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_student_profiles' }, bulkDeleteDto);
    }
};
exports.StudentProfileController = StudentProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new student profile entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Profile created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_student_profile_dto_1.CreateStudentProfileDto !== "undefined" && create_student_profile_dto_1.CreateStudentProfileDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StudentProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student profile details by studentId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return profile details' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StudentProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update student profile details by studentId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof update_student_profile_dto_1.UpdateStudentProfileDto !== "undefined" && update_student_profile_dto_1.UpdateStudentProfileDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], StudentProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete student profile by studentId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Left institute' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile soft deleted successfully' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StudentProfileController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple student profiles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profiles bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof bulk_delete_profiles_dto_1.BulkDeleteProfilesDto !== "undefined" && bulk_delete_profiles_dto_1.BulkDeleteProfilesDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], StudentProfileController.prototype, "bulkRemove", null);
exports.StudentProfileController = StudentProfileController = __decorate([
    (0, swagger_1.ApiTags)('Students - Profiles'),
    (0, common_1.Controller)('students/profiles'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StudentProfileController);


/***/ }),
/* 18 */
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
exports.CreateStudentProfileDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateStudentProfileDto {
}
exports.CreateStudentProfileDto = CreateStudentProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Student Registration ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateStudentProfileDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'राम कुमार सिंह', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "studentNameHindi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'सोहन सिंह', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "fatherNameHindi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MIRA DEVI', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "motherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'मीरा देवी', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "motherNameHindi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543120', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "fatherMobileNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2001-08-15', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SINGLE', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HINDUISM', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "religion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Indian', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GENERAL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NONE', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'No', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "physicalHandicap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CERT-12345', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "certificateNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/cert.pdf', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "certificateAttachment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789012', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "aadharIdNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APAAR-7788', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "apaarIdNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Flat 101, block A', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "CaddressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Green View Apartments', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "CaddressLine2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sector 62', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "CaddressLine3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Uttar Pradesh', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Cstate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Noida', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Ccity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '201301', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Cpincode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Village Rampur', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "PaddressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post Office Rampur', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "PaddressLine2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tehsil Sadar', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "PaddressLine3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Uttar Pradesh', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Pstate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Varanasi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Pcity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '221001', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Ppincode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Initial registration profile details', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentProfileDto.prototype, "Remarks", void 0);


/***/ }),
/* 19 */
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
exports.UpdateStudentProfileDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateStudentProfileDto {
}
exports.UpdateStudentProfileDto = UpdateStudentProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'राम कुमार सिंह', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "studentNameHindi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'सोहन सिंह', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "fatherNameHindi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MIRA DEVI', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "motherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'मीरा देवी', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "motherNameHindi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543120', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "fatherMobileNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2001-08-15', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MALE', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SINGLE', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HINDUISM', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "religion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Indian', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GENERAL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NONE', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'No', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "physicalHandicap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CERT-12345', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "certificateNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/cert.pdf', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "certificateAttachment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789012', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "aadharIdNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APAAR-7788', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "apaarIdNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Flat 101, block A', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "CaddressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Green View Apartments', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "CaddressLine2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sector 62', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "CaddressLine3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Uttar Pradesh', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Cstate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Noida', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Ccity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '201301', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Cpincode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Village Rampur', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "PaddressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Post Office Rampur', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "PaddressLine2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tehsil Sadar', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "PaddressLine3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Uttar Pradesh', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Pstate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Varanasi', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Pcity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '221001', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Ppincode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateStudentProfileDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated profile details', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentProfileDto.prototype, "Remarks", void 0);


/***/ }),
/* 20 */
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
exports.BulkDeleteProfilesDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class BulkDeleteProfilesDto {
}
exports.BulkDeleteProfilesDto = BulkDeleteProfilesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of studentProfileId values to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteProfilesDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteProfilesDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Incorrect entries', description: 'Optional remarks for deletion', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteProfilesDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const student_academic_controller_1 = __webpack_require__(22);
let StudentAcademicModule = class StudentAcademicModule {
};
exports.StudentAcademicModule = StudentAcademicModule;
exports.StudentAcademicModule = StudentAcademicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [student_academic_controller_1.StudentAcademicController],
    })
], StudentAcademicModule);


/***/ }),
/* 22 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const save_academic_details_dto_1 = __webpack_require__(23);
const update_academic_detail_dto_1 = __webpack_require__(25);
const bulk_delete_academic_details_dto_1 = __webpack_require__(26);
let StudentAcademicController = class StudentAcademicController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    save(saveDto) {
        return this.studentClient.send({ cmd: 'save_student_academic_details' }, saveDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_academic_details' }, {});
    }
    findByStudent(studentId) {
        return this.studentClient.send({ cmd: 'find_academic_details_by_student' }, { studentId });
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_academic_detail' }, { academicDetailId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_academic_detail' }, { academicDetailId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_academic_detail' }, { academicDetailId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_academic_details' }, bulkDeleteDto);
    }
};
exports.StudentAcademicController = StudentAcademicController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Save or update student academic details and subjects (Wizard Step 2)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic qualifications and subjects saved successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof save_academic_details_dto_1.SaveAcademicDetailsDto !== "undefined" && save_academic_details_dto_1.SaveAcademicDetailsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StudentAcademicController.prototype, "save", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all qualification detail entries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all academic details' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StudentAcademicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all qualification detail entries for a specific student' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return student qualification list' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StudentAcademicController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific qualification detail by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return qualification details and its subjects' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], StudentAcademicController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific qualification detail by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Qualification detail updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof update_academic_detail_dto_1.UpdateAcademicDetailDto !== "undefined" && update_academic_detail_dto_1.UpdateAcademicDetailDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StudentAcademicController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete qualification detail by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Qualification detail soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], StudentAcademicController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple qualification details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Qualifications bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof bulk_delete_academic_details_dto_1.BulkDeleteAcademicDetailsDto !== "undefined" && bulk_delete_academic_details_dto_1.BulkDeleteAcademicDetailsDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _l : Object)
], StudentAcademicController.prototype, "bulkRemove", null);
exports.StudentAcademicController = StudentAcademicController = __decorate([
    (0, swagger_1.ApiTags)('Students - Academic Details'),
    (0, common_1.Controller)('students-academic'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StudentAcademicController);


/***/ }),
/* 23 */
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
exports.SaveAcademicDetailsDto = exports.SaveQualificationDto = exports.SaveSubjectDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(12);
class SaveSubjectDto {
}
exports.SaveSubjectDto = SaveSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 501, description: 'Subject Master ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveSubjectDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Max Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveSubjectDto.prototype, "maxMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 33, description: 'Min Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveSubjectDto.prototype, "minMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Obtained Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveSubjectDto.prototype, "obtainedMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'Grade', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveSubjectDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Practical Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SaveSubjectDto.prototype, "practicalMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Theory Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SaveSubjectDto.prototype, "theoryMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is Optional', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SaveSubjectDto.prototype, "isOptional", void 0);
class SaveQualificationDto {
}
exports.SaveQualificationDto = SaveQualificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Qualification Master ID (e.g. 10th)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveQualificationDto.prototype, "qualificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Board Master ID (e.g. CBSE)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveQualificationDto.prototype, "boardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bhagwan Aadinate College', description: 'School/College Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "schoolName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2022, description: 'Passing Year' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveQualificationDto.prototype, "passingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Roll Number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "rollNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pass', description: 'Result Status (Pass/Fail/Appearing)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "resultStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Percentage', description: 'Marks Type (Percentage/CGPA)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "marksType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 600, description: 'Max Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveQualificationDto.prototype, "maxMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, description: 'Obtained Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveQualificationDto.prototype, "obtainedMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 83.33, description: 'Percentage' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveQualificationDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'First', description: 'Division', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'Grade', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SaveSubjectDto], description: 'Subjects list' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SaveSubjectDto),
    __metadata("design:type", Array)
], SaveQualificationDto.prototype, "subjects", void 0);
class SaveAcademicDetailsDto {
}
exports.SaveAcademicDetailsDto = SaveAcademicDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'Student ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SaveAcademicDetailsDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rishi', description: 'Created By' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveAcademicDetailsDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SaveQualificationDto], description: 'List of qualifications' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SaveQualificationDto),
    __metadata("design:type", Array)
], SaveAcademicDetailsDto.prototype, "qualifications", void 0);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 25 */
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
exports.UpdateAcademicDetailDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class UpdateAcademicDetailDto {
}
exports.UpdateAcademicDetailDto = UpdateAcademicDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Qualification Master ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicDetailDto.prototype, "qualificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Board Master ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicDetailDto.prototype, "boardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bhagwan Aadinate College', description: 'School/College Name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "schoolName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2022, description: 'Passing Year', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicDetailDto.prototype, "passingYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'Roll Number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "rollNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pass', description: 'Result Status', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "resultStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Percentage', description: 'Marks Type', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "marksType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 600, description: 'Max Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicDetailDto.prototype, "maxMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, description: 'Obtained Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicDetailDto.prototype, "obtainedMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 83.33, description: 'Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicDetailDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'First', description: 'Division', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'Grade', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAcademicDetailDto.prototype, "IsActive", void 0);


/***/ }),
/* 26 */
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
exports.BulkDeleteAcademicDetailsDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class BulkDeleteAcademicDetailsDto {
}
exports.BulkDeleteAcademicDetailsDto = BulkDeleteAcademicDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of academic detail IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteAcademicDetailsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteAcademicDetailsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete qualifications', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteAcademicDetailsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicSubjectModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const student_academic_subject_controller_1 = __webpack_require__(28);
let StudentAcademicSubjectModule = class StudentAcademicSubjectModule {
};
exports.StudentAcademicSubjectModule = StudentAcademicSubjectModule;
exports.StudentAcademicSubjectModule = StudentAcademicSubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [student_academic_subject_controller_1.StudentAcademicSubjectController],
    })
], StudentAcademicSubjectModule);


/***/ }),
/* 28 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicSubjectController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_academic_subject_dto_1 = __webpack_require__(29);
const update_academic_subject_dto_1 = __webpack_require__(30);
const bulk_delete_academic_subjects_dto_1 = __webpack_require__(31);
let StudentAcademicSubjectController = class StudentAcademicSubjectController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_academic_subject' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_academic_subjects' }, {});
    }
    findByAcademicDetail(academicDetailId) {
        return this.studentClient.send({ cmd: 'find_academic_subjects_by_detail' }, { academicDetailId });
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_academic_subject' }, { studentAcademicSubjectId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_academic_subject' }, { studentAcademicSubjectId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_academic_subject' }, { studentAcademicSubjectId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_academic_subjects' }, bulkDeleteDto);
    }
};
exports.StudentAcademicSubjectController = StudentAcademicSubjectController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new subject mark entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Subject mark entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_academic_subject_dto_1.CreateAcademicSubjectDto !== "undefined" && create_academic_subject_dto_1.CreateAcademicSubjectDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StudentAcademicSubjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all subject mark entries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all subject marks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StudentAcademicSubjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('detail/:academicDetailId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all subject mark entries for a specific qualification detail ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return subject marks list' }),
    __param(0, (0, common_1.Param)('academicDetailId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StudentAcademicSubjectController.prototype, "findByAcademicDetail", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific subject mark details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return subject mark details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], StudentAcademicSubjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific subject mark entry by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject mark entry updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof update_academic_subject_dto_1.UpdateAcademicSubjectDto !== "undefined" && update_academic_subject_dto_1.UpdateAcademicSubjectDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StudentAcademicSubjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete subject mark entry by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Correction entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject mark soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], StudentAcademicSubjectController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple subject mark entries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject marks bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof bulk_delete_academic_subjects_dto_1.BulkDeleteAcademicSubjectsDto !== "undefined" && bulk_delete_academic_subjects_dto_1.BulkDeleteAcademicSubjectsDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _l : Object)
], StudentAcademicSubjectController.prototype, "bulkRemove", null);
exports.StudentAcademicSubjectController = StudentAcademicSubjectController = __decorate([
    (0, swagger_1.ApiTags)('Students - Academic Subject Marks'),
    (0, common_1.Controller)('students-academic-subjects'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StudentAcademicSubjectController);


/***/ }),
/* 29 */
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
exports.CreateAcademicSubjectDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class CreateAcademicSubjectDto {
}
exports.CreateAcademicSubjectDto = CreateAcademicSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the parent StudentAcademicDetail entry' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "academicDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 501, description: 'Subject Master ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Max Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "maxMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 33, description: 'Min Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "minMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Obtained Marks' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "obtainedMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'Grade', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAcademicSubjectDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Practical Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "practicalMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Theory Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAcademicSubjectDto.prototype, "theoryMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is Optional Subject', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAcademicSubjectDto.prototype, "isOptional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademicSubjectDto.prototype, "CreatedBy", void 0);


/***/ }),
/* 30 */
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
exports.UpdateAcademicSubjectDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class UpdateAcademicSubjectDto {
}
exports.UpdateAcademicSubjectDto = UpdateAcademicSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the parent StudentAcademicDetail entry', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "academicDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 501, description: 'Subject Master ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "subjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Max Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "maxMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 33, description: 'Min Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "minMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Obtained Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "obtainedMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', description: 'Grade', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicSubjectDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Practical Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "practicalMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Theory Marks', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAcademicSubjectDto.prototype, "theoryMarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is Optional Subject', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAcademicSubjectDto.prototype, "isOptional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAcademicSubjectDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAcademicSubjectDto.prototype, "IsActive", void 0);


/***/ }),
/* 31 */
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
exports.BulkDeleteAcademicSubjectsDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class BulkDeleteAcademicSubjectsDto {
}
exports.BulkDeleteAcademicSubjectsDto = BulkDeleteAcademicSubjectsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of subject mark IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteAcademicSubjectsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteAcademicSubjectsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete subject marks', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteAcademicSubjectsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const student_payment_controller_1 = __webpack_require__(33);
let StudentPaymentModule = class StudentPaymentModule {
};
exports.StudentPaymentModule = StudentPaymentModule;
exports.StudentPaymentModule = StudentPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [student_payment_controller_1.StudentPaymentController],
    })
], StudentPaymentModule);


/***/ }),
/* 33 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_student_payment_dto_1 = __webpack_require__(34);
const update_student_payment_dto_1 = __webpack_require__(35);
const bulk_delete_student_payments_dto_1 = __webpack_require__(36);
let StudentPaymentController = class StudentPaymentController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_student_payment' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_student_payments' }, {});
    }
    findByStudent(studentId) {
        return this.studentClient.send({ cmd: 'find_student_payments_by_student' }, { studentId });
    }
    findByOrderId(orderId) {
        return this.studentClient.send({ cmd: 'find_student_payment_by_order_id' }, { razorpayOrderId: orderId });
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_student_payment' }, { paymentId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_student_payment' }, { paymentId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_student_payment' }, { paymentId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_student_payments' }, bulkDeleteDto);
    }
};
exports.StudentPaymentController = StudentPaymentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new student payment record (Razorpay order details, etc.)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payment record created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_student_payment_dto_1.CreateStudentPaymentDto !== "undefined" && create_student_payment_dto_1.CreateStudentPaymentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StudentPaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all student payment records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all payments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StudentPaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payment records for a specific Student Registration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return student payments' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StudentPaymentController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Get)('order/:orderId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment record by Razorpay Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return payment details' }),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], StudentPaymentController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return payment details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StudentPaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update payment record (Update status, Razorpay Transaction ID, signature)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment record updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_h = typeof update_student_payment_dto_1.UpdateStudentPaymentDto !== "undefined" && update_student_payment_dto_1.UpdateStudentPaymentDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], StudentPaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete payment record by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Correction entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment record soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_k = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _k : Object)
], StudentPaymentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple payment records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment records bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof bulk_delete_student_payments_dto_1.BulkDeleteStudentPaymentsDto !== "undefined" && bulk_delete_student_payments_dto_1.BulkDeleteStudentPaymentsDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _m : Object)
], StudentPaymentController.prototype, "bulkRemove", null);
exports.StudentPaymentController = StudentPaymentController = __decorate([
    (0, swagger_1.ApiTags)('Student - Payments'),
    (0, common_1.Controller)('students-payments'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StudentPaymentController);


/***/ }),
/* 34 */
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
exports.CreateStudentPaymentDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class CreateStudentPaymentDto {
}
exports.CreateStudentPaymentDto = CreateStudentPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the Student registration' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateStudentPaymentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REGISTRATION', description: 'Fee Type (REGISTRATION or EXAMINATION)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "feeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1023.60, description: 'Amount paid' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateStudentPaymentDto.prototype, "amountPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PENDING', description: 'Payment status (PENDING, SUCCESS, FAILED)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'order_M51j29hJ12', description: 'Razorpay Order ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "razorpayOrderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pay_M51jL91n18', description: 'Razorpay Payment ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "razorpayPaymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'abcde12345signature', description: 'Razorpay Signature Hash', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "razorpaySignature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '{}', description: 'Raw Gateway response payload', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "gatewayResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment initiated via UPI', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentPaymentDto.prototype, "Remarks", void 0);


/***/ }),
/* 35 */
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
exports.UpdateStudentPaymentDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class UpdateStudentPaymentDto {
}
exports.UpdateStudentPaymentDto = UpdateStudentPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUCCESS', description: 'Payment status (PENDING, SUCCESS, FAILED)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentPaymentDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pay_M51jL91n18', description: 'Razorpay Payment ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentPaymentDto.prototype, "razorpayPaymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'abcde12345signature', description: 'Razorpay Signature Hash', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentPaymentDto.prototype, "razorpaySignature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '{}', description: 'Raw Gateway response payload', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentPaymentDto.prototype, "gatewayResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateStudentPaymentDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateStudentPaymentDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment status updated to success', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentPaymentDto.prototype, "Remarks", void 0);


/***/ }),
/* 36 */
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
exports.BulkDeleteStudentPaymentsDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class BulkDeleteStudentPaymentsDto {
}
exports.BulkDeleteStudentPaymentsDto = BulkDeleteStudentPaymentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of payment IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteStudentPaymentsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteStudentPaymentsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete payments', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteStudentPaymentsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterModule = void 0;
const common_1 = __webpack_require__(2);
const state_module_1 = __webpack_require__(38);
const city_module_1 = __webpack_require__(42);
const program_category_module_1 = __webpack_require__(46);
const subject_module_1 = __webpack_require__(50);
const program_module_1 = __webpack_require__(54);
const board_module_1 = __webpack_require__(59);
const qualification_module_1 = __webpack_require__(64);
const academic_session_module_1 = __webpack_require__(69);
const program_fee_config_module_1 = __webpack_require__(74);
let MasterModule = class MasterModule {
};
exports.MasterModule = MasterModule;
exports.MasterModule = MasterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            state_module_1.StateModule,
            city_module_1.CityModule,
            program_category_module_1.ProgramCategoryModule,
            subject_module_1.SubjectModule,
            program_module_1.ProgramModule,
            board_module_1.BoardModule,
            qualification_module_1.QualificationModule,
            academic_session_module_1.AcademicSessionModule,
            program_fee_config_module_1.ProgramFeeConfigModule,
        ],
        exports: [
            state_module_1.StateModule,
            city_module_1.CityModule,
            program_category_module_1.ProgramCategoryModule,
            subject_module_1.SubjectModule,
            program_module_1.ProgramModule,
            board_module_1.BoardModule,
            qualification_module_1.QualificationModule,
            academic_session_module_1.AcademicSessionModule,
            program_fee_config_module_1.ProgramFeeConfigModule,
        ],
    })
], MasterModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const state_controller_1 = __webpack_require__(39);
let StateModule = class StateModule {
};
exports.StateModule = StateModule;
exports.StateModule = StateModule = __decorate([
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
        controllers: [state_controller_1.StateController],
    })
], StateModule);


/***/ }),
/* 39 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_state_dto_1 = __webpack_require__(40);
const update_state_dto_1 = __webpack_require__(41);
let StateController = class StateController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createStateDto) {
        return this.studentClient.send({ cmd: 'create_state' }, createStateDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_states' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_state' }, { stateId: id });
    }
    update(id, updateStateDto) {
        return this.studentClient.send({ cmd: 'update_state' }, { stateId: id, ...updateStateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_state' }, { stateId: id, DeletedBy, DeletedRemarks });
    }
};
exports.StateController = StateController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new state master entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'State created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_state_dto_1.CreateStateDto !== "undefined" && create_state_dto_1.CreateStateDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active states (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all states' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get state details by stateId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return state details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update state details by stateId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'State updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_state_dto_1.UpdateStateDto !== "undefined" && update_state_dto_1.UpdateStateDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StateController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a state by stateId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'State soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StateController.prototype, "remove", null);
exports.StateController = StateController = __decorate([
    (0, swagger_1.ApiTags)('Master - States'),
    (0, common_1.Controller)('master/states'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StateController);


/***/ }),
/* 40 */
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
exports.CreateStateDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateStateDto {
}
exports.CreateStateDto = CreateStateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UTTAR PRADESH', description: 'Name of the state' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStateDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UP', description: 'Short code of the state' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStateDto.prototype, "stateShortCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStateDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'State master entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStateDto.prototype, "Remarks", void 0);


/***/ }),
/* 41 */
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
exports.UpdateStateDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateStateDto {
}
exports.UpdateStateDto = UpdateStateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UTTAR PRADESH', description: 'Name of the state', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStateDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UP', description: 'Short code of the state', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStateDto.prototype, "stateShortCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateStateDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is state active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateStateDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated state details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStateDto.prototype, "Remarks", void 0);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const city_controller_1 = __webpack_require__(43);
let CityModule = class CityModule {
};
exports.CityModule = CityModule;
exports.CityModule = CityModule = __decorate([
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
        controllers: [city_controller_1.CityController],
    })
], CityModule);


/***/ }),
/* 43 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_city_dto_1 = __webpack_require__(44);
const update_city_dto_1 = __webpack_require__(45);
let CityController = class CityController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createCityDto) {
        return this.studentClient.send({ cmd: 'create_city' }, createCityDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_cities' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_city' }, { cityId: id });
    }
    update(id, updateCityDto) {
        return this.studentClient.send({ cmd: 'update_city' }, { cityId: id, ...updateCityDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_city' }, { cityId: id, DeletedBy, DeletedRemarks });
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new city master entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'City created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_city_dto_1.CreateCityDto !== "undefined" && create_city_dto_1.CreateCityDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], CityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active cities (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all cities' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], CityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get city details by cityId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return city details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], CityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update city details by cityId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'City updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_city_dto_1.UpdateCityDto !== "undefined" && update_city_dto_1.UpdateCityDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], CityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a city by cityId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'City soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], CityController.prototype, "remove", null);
exports.CityController = CityController = __decorate([
    (0, swagger_1.ApiTags)('Master - Cities'),
    (0, common_1.Controller)('master/cities'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], CityController);


/***/ }),
/* 44 */
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
exports.CreateCityDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateCityDto {
}
exports.CreateCityDto = CreateCityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'State ID this city belongs to' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCityDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LUCKNOW', description: 'Name of the city' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCityDto.prototype, "cityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LKO', description: 'Short code of the city' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCityDto.prototype, "cityShortCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCityDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'City master entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCityDto.prototype, "Remarks", void 0);


/***/ }),
/* 45 */
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
exports.UpdateCityDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateCityDto {
}
exports.UpdateCityDto = UpdateCityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'State ID this city belongs to', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCityDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LUCKNOW', description: 'Name of the city', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCityDto.prototype, "cityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'LKO', description: 'Short code of the city', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCityDto.prototype, "cityShortCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCityDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is city active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCityDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated city details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCityDto.prototype, "Remarks", void 0);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const program_category_controller_1 = __webpack_require__(47);
let ProgramCategoryModule = class ProgramCategoryModule {
};
exports.ProgramCategoryModule = ProgramCategoryModule;
exports.ProgramCategoryModule = ProgramCategoryModule = __decorate([
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
        controllers: [program_category_controller_1.ProgramCategoryController],
    })
], ProgramCategoryModule);


/***/ }),
/* 47 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_program_category_dto_1 = __webpack_require__(48);
const update_program_category_dto_1 = __webpack_require__(49);
let ProgramCategoryController = class ProgramCategoryController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_program_category' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_program_categories' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_program_category' }, { programCategoryId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_program_category' }, { programCategoryId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_program_category' }, { programCategoryId: id, DeletedBy, DeletedRemarks });
    }
};
exports.ProgramCategoryController = ProgramCategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new program category entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Program category created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_program_category_dto_1.CreateProgramCategoryDto !== "undefined" && create_program_category_dto_1.CreateProgramCategoryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], ProgramCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active program categories (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all program categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], ProgramCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get program category details by programCategoryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return program category details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], ProgramCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update program category details by programCategoryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Program category updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_program_category_dto_1.UpdateProgramCategoryDto !== "undefined" && update_program_category_dto_1.UpdateProgramCategoryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], ProgramCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a program category by programCategoryId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Program category soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], ProgramCategoryController.prototype, "remove", null);
exports.ProgramCategoryController = ProgramCategoryController = __decorate([
    (0, swagger_1.ApiTags)('Master - Program Categories'),
    (0, common_1.Controller)('master/program-categories'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ProgramCategoryController);


/***/ }),
/* 48 */
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
exports.CreateProgramCategoryDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateProgramCategoryDto {
}
exports.CreateProgramCategoryDto = CreateProgramCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UNDER GRADUATE', description: 'Name of the program category' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramCategoryDto.prototype, "programCategoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UG', description: 'Short name of the program category' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramCategoryDto.prototype, "pcShortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display sequence order number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramCategoryDto.prototype, "sequenceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramCategoryDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UG category entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProgramCategoryDto.prototype, "Remarks", void 0);


/***/ }),
/* 49 */
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
exports.UpdateProgramCategoryDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateProgramCategoryDto {
}
exports.UpdateProgramCategoryDto = UpdateProgramCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UNDER GRADUATE', description: 'Name of the program category', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramCategoryDto.prototype, "programCategoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UG', description: 'Short name of the program category', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramCategoryDto.prototype, "pcShortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display sequence order number', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramCategoryDto.prototype, "sequenceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProgramCategoryDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is program category active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProgramCategoryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated remarks', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramCategoryDto.prototype, "Remarks", void 0);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const subject_controller_1 = __webpack_require__(51);
let SubjectModule = class SubjectModule {
};
exports.SubjectModule = SubjectModule;
exports.SubjectModule = SubjectModule = __decorate([
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
        controllers: [subject_controller_1.SubjectController],
    })
], SubjectModule);


/***/ }),
/* 51 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_subject_dto_1 = __webpack_require__(52);
const update_subject_dto_1 = __webpack_require__(53);
let SubjectController = class SubjectController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createSubjectDto) {
        return this.studentClient.send({ cmd: 'create_subject' }, createSubjectDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_subjects' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_subject' }, { subjectId: id });
    }
    update(id, updateSubjectDto) {
        return this.studentClient.send({ cmd: 'update_subject' }, { subjectId: id, ...updateSubjectDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_subject' }, { subjectId: id, DeletedBy, DeletedRemarks });
    }
};
exports.SubjectController = SubjectController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subject master entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Subject created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_subject_dto_1.CreateSubjectDto !== "undefined" && create_subject_dto_1.CreateSubjectDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], SubjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active subjects (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], SubjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subject details by subjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return subject details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], SubjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update subject details by subjectId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_subject_dto_1.UpdateSubjectDto !== "undefined" && update_subject_dto_1.UpdateSubjectDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], SubjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a subject by subjectId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subject soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], SubjectController.prototype, "remove", null);
exports.SubjectController = SubjectController = __decorate([
    (0, swagger_1.ApiTags)('Master - Subjects'),
    (0, common_1.Controller)('master/subjects'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], SubjectController);


/***/ }),
/* 52 */
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
exports.CreateSubjectDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateSubjectDto {
}
exports.CreateSubjectDto = CreateSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MATHEMATICS', description: 'Name of the subject' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "subjectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MATH', description: 'Short code of the subject' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "subjectCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12TH', description: 'Class type standard: 10TH, 12TH or BOTH' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['10TH', '12TH', 'BOTH']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Core subject entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "Remarks", void 0);


/***/ }),
/* 53 */
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
exports.UpdateSubjectDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateSubjectDto {
}
exports.UpdateSubjectDto = UpdateSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MATHEMATICS', description: 'Name of the subject', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "subjectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MATH', description: 'Short code of the subject', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "subjectCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12TH', description: 'Class type standard: 10TH, 12TH or BOTH', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['10TH', '12TH', 'BOTH']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is subject active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateSubjectDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated subject remarks', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "Remarks", void 0);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const program_controller_1 = __webpack_require__(55);
let ProgramModule = class ProgramModule {
};
exports.ProgramModule = ProgramModule;
exports.ProgramModule = ProgramModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [program_controller_1.ProgramController],
    })
], ProgramModule);


/***/ }),
/* 55 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_program_dto_1 = __webpack_require__(56);
const update_program_dto_1 = __webpack_require__(57);
const bulk_delete_programs_dto_1 = __webpack_require__(58);
let ProgramController = class ProgramController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_program' }, createDto);
    }
    findAll(categoryId) {
        const filter = {};
        if (categoryId) {
            filter.categoryId = Number(categoryId);
        }
        return this.studentClient.send({ cmd: 'find_all_programs' }, filter);
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_program' }, { programId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_program' }, { programId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_program' }, { programId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_programs' }, bulkDeleteDto);
    }
};
exports.ProgramController = ProgramController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new program entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Program created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_program_dto_1.CreateProgramDto !== "undefined" && create_program_dto_1.CreateProgramDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], ProgramController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active programs (filterable by categoryId)' }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false, type: Number, description: 'Filter by ProgramCategory ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all programs' }),
    __param(0, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], ProgramController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get program details by programId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return program details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], ProgramController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update program details by programId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Program updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_program_dto_1.UpdateProgramDto !== "undefined" && update_program_dto_1.UpdateProgramDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], ProgramController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a program by programId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Program soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], ProgramController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple programs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Programs bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof bulk_delete_programs_dto_1.BulkDeleteProgramsDto !== "undefined" && bulk_delete_programs_dto_1.BulkDeleteProgramsDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _k : Object)
], ProgramController.prototype, "bulkRemove", null);
exports.ProgramController = ProgramController = __decorate([
    (0, swagger_1.ApiTags)('Master - Programs'),
    (0, common_1.Controller)('master/programs'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ProgramController);


/***/ }),
/* 56 */
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
exports.CreateProgramDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateProgramDto {
}
exports.CreateProgramDto = CreateProgramDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the associated ProgramCategory' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramDto.prototype, "programCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bachelor of Computer Applications', description: 'Name of the program' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "programName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.C.A.', description: 'Short name of the program' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "programShortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5', description: 'Unique code of the program' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "programCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Program duration in years' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramDto.prototype, "durationYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SEMESTER', description: 'Education term pattern (SEMESTER or ANNUAL)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "termType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Total number of terms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramDto.prototype, "totalTerms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display sequence order number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramDto.prototype, "sequenceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BCA Program entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "Remarks", void 0);


/***/ }),
/* 57 */
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
exports.UpdateProgramDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateProgramDto {
}
exports.UpdateProgramDto = UpdateProgramDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the associated ProgramCategory', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramDto.prototype, "programCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bachelor of Computer Applications', description: 'Name of the program', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "programName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.C.A.', description: 'Short name of the program', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "programShortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5', description: 'Unique code of the program', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "programCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Program duration in years', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramDto.prototype, "durationYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SEMESTER', description: 'Education term pattern (SEMESTER or ANNUAL)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "termType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Total number of terms', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramDto.prototype, "totalTerms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display sequence order number', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramDto.prototype, "sequenceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProgramDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BCA Program edit', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "Remarks", void 0);


/***/ }),
/* 58 */
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
exports.BulkDeleteProgramsDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class BulkDeleteProgramsDto {
}
exports.BulkDeleteProgramsDto = BulkDeleteProgramsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of program IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteProgramsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteProgramsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete due to restructuring', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteProgramsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const board_controller_1 = __webpack_require__(60);
let BoardModule = class BoardModule {
};
exports.BoardModule = BoardModule;
exports.BoardModule = BoardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [board_controller_1.BoardController],
    })
], BoardModule);


/***/ }),
/* 60 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_board_dto_1 = __webpack_require__(61);
const update_board_dto_1 = __webpack_require__(62);
const bulk_delete_boards_dto_1 = __webpack_require__(63);
let BoardController = class BoardController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_board' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_boards' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_board' }, { boardId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_board' }, { boardId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_board' }, { boardId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_boards' }, bulkDeleteDto);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new board entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Board created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_board_dto_1.CreateBoardDto !== "undefined" && create_board_dto_1.CreateBoardDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], BoardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active boards (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all boards' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], BoardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get board details by boardId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return board details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], BoardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update board details by boardId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_board_dto_1.UpdateBoardDto !== "undefined" && update_board_dto_1.UpdateBoardDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], BoardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a board by boardId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete board' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], BoardController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple boards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Boards bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof bulk_delete_boards_dto_1.BulkDeleteBoardsDto !== "undefined" && bulk_delete_boards_dto_1.BulkDeleteBoardsDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _k : Object)
], BoardController.prototype, "bulkRemove", null);
exports.BoardController = BoardController = __decorate([
    (0, swagger_1.ApiTags)('Master - Boards'),
    (0, common_1.Controller)('master/boards'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], BoardController);


/***/ }),
/* 61 */
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
exports.CreateBoardDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateBoardDto {
}
exports.CreateBoardDto = CreateBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CBSE', description: 'Name of the education board' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "boardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'National board entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "Remarks", void 0);


/***/ }),
/* 62 */
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
exports.UpdateBoardDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateBoardDto {
}
exports.UpdateBoardDto = UpdateBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CBSE', description: 'Name of the education board', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "boardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateBoardDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Board update', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "Remarks", void 0);


/***/ }),
/* 63 */
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
exports.BulkDeleteBoardsDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class BulkDeleteBoardsDto {
}
exports.BulkDeleteBoardsDto = BulkDeleteBoardsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of board IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteBoardsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteBoardsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete boards', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteBoardsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const qualification_controller_1 = __webpack_require__(65);
let QualificationModule = class QualificationModule {
};
exports.QualificationModule = QualificationModule;
exports.QualificationModule = QualificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [qualification_controller_1.QualificationController],
    })
], QualificationModule);


/***/ }),
/* 65 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_qualification_dto_1 = __webpack_require__(66);
const update_qualification_dto_1 = __webpack_require__(67);
const bulk_delete_qualifications_dto_1 = __webpack_require__(68);
let QualificationController = class QualificationController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_qualification' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_qualifications' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_qualification' }, { qualificationId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_qualification' }, { qualificationId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_qualification' }, { qualificationId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_qualifications' }, bulkDeleteDto);
    }
};
exports.QualificationController = QualificationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new qualification entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Qualification created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_qualification_dto_1.CreateQualificationDto !== "undefined" && create_qualification_dto_1.CreateQualificationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], QualificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active qualifications (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all qualifications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], QualificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get qualification details by qualificationId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return qualification details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], QualificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update qualification details by qualificationId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Qualification updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_qualification_dto_1.UpdateQualificationDto !== "undefined" && update_qualification_dto_1.UpdateQualificationDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], QualificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a qualification by qualificationId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete qualification' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Qualification soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], QualificationController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple qualifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Qualifications bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof bulk_delete_qualifications_dto_1.BulkDeleteQualificationsDto !== "undefined" && bulk_delete_qualifications_dto_1.BulkDeleteQualificationsDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _k : Object)
], QualificationController.prototype, "bulkRemove", null);
exports.QualificationController = QualificationController = __decorate([
    (0, swagger_1.ApiTags)('Master - Qualifications'),
    (0, common_1.Controller)('master/qualifications'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], QualificationController);


/***/ }),
/* 66 */
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
exports.CreateQualificationDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateQualificationDto {
}
exports.CreateQualificationDto = CreateQualificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10th', description: 'Name of the qualification level' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQualificationDto.prototype, "qualificationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQualificationDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Secondary education entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQualificationDto.prototype, "Remarks", void 0);


/***/ }),
/* 67 */
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
exports.UpdateQualificationDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateQualificationDto {
}
exports.UpdateQualificationDto = UpdateQualificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10th', description: 'Name of the qualification level', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQualificationDto.prototype, "qualificationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateQualificationDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateQualificationDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Qualification edit', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQualificationDto.prototype, "Remarks", void 0);


/***/ }),
/* 68 */
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
exports.BulkDeleteQualificationsDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class BulkDeleteQualificationsDto {
}
exports.BulkDeleteQualificationsDto = BulkDeleteQualificationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of qualification IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteQualificationsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteQualificationsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete qualifications', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteQualificationsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const academic_session_controller_1 = __webpack_require__(70);
let AcademicSessionModule = class AcademicSessionModule {
};
exports.AcademicSessionModule = AcademicSessionModule;
exports.AcademicSessionModule = AcademicSessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [academic_session_controller_1.AcademicSessionController],
    })
], AcademicSessionModule);


/***/ }),
/* 70 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_academic_session_dto_1 = __webpack_require__(71);
const update_academic_session_dto_1 = __webpack_require__(72);
const bulk_delete_academic_sessions_dto_1 = __webpack_require__(73);
let AcademicSessionController = class AcademicSessionController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_academic_session' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_academic_sessions' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_academic_session' }, { sessionId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_academic_session' }, { sessionId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_academic_session' }, { sessionId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_academic_sessions' }, bulkDeleteDto);
    }
};
exports.AcademicSessionController = AcademicSessionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new academic session' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Academic session created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_academic_session_dto_1.CreateAcademicSessionDto !== "undefined" && create_academic_session_dto_1.CreateAcademicSessionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], AcademicSessionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active academic sessions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all sessions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], AcademicSessionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get academic session details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return academic session details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], AcademicSessionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update academic session details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic session updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_academic_session_dto_1.UpdateAcademicSessionDto !== "undefined" && update_academic_session_dto_1.UpdateAcademicSessionDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], AcademicSessionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete academic session by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic session soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], AcademicSessionController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple academic sessions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Academic sessions bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof bulk_delete_academic_sessions_dto_1.BulkDeleteAcademicSessionsDto !== "undefined" && bulk_delete_academic_sessions_dto_1.BulkDeleteAcademicSessionsDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _k : Object)
], AcademicSessionController.prototype, "bulkRemove", null);
exports.AcademicSessionController = AcademicSessionController = __decorate([
    (0, swagger_1.ApiTags)('Master - Academic Sessions'),
    (0, common_1.Controller)('master/academic-sessions'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AcademicSessionController);


/***/ }),
/* 71 */
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
exports.CreateAcademicSessionDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class CreateAcademicSessionDto {
}
exports.CreateAcademicSessionDto = CreateAcademicSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-2027', description: 'Name of the academic session' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademicSessionDto.prototype, "sessionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademicSessionDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Session remarks', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAcademicSessionDto.prototype, "Remarks", void 0);


/***/ }),
/* 72 */
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
exports.UpdateAcademicSessionDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class UpdateAcademicSessionDto {
}
exports.UpdateAcademicSessionDto = UpdateAcademicSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-2027', description: 'Name of the academic session', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicSessionDto.prototype, "sessionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAcademicSessionDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAcademicSessionDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Session update', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicSessionDto.prototype, "Remarks", void 0);


/***/ }),
/* 73 */
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
exports.BulkDeleteAcademicSessionsDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class BulkDeleteAcademicSessionsDto {
}
exports.BulkDeleteAcademicSessionsDto = BulkDeleteAcademicSessionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of academic session IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteAcademicSessionsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteAcademicSessionsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete sessions', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteAcademicSessionsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const program_fee_config_controller_1 = __webpack_require__(75);
let ProgramFeeConfigModule = class ProgramFeeConfigModule {
};
exports.ProgramFeeConfigModule = ProgramFeeConfigModule;
exports.ProgramFeeConfigModule = ProgramFeeConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STUDENT_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: Number(process.env.TCP_PORT) || 4001,
                    },
                },
            ]),
        ],
        controllers: [program_fee_config_controller_1.ProgramFeeConfigController],
    })
], ProgramFeeConfigModule);


/***/ }),
/* 75 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_program_fee_config_dto_1 = __webpack_require__(76);
const update_program_fee_config_dto_1 = __webpack_require__(77);
const bulk_delete_program_fee_configs_dto_1 = __webpack_require__(78);
let ProgramFeeConfigController = class ProgramFeeConfigController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_program_fee_config' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_program_fee_configs' }, {});
    }
    findByProgramAndSession(programId, sessionId) {
        return this.studentClient.send({ cmd: 'find_program_fee_config_by_program_and_session' }, { programId, sessionId });
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_program_fee_config' }, { feeConfigId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_program_fee_config' }, { feeConfigId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_program_fee_config' }, { feeConfigId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_program_fee_configs' }, bulkDeleteDto);
    }
};
exports.ProgramFeeConfigController = ProgramFeeConfigController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new program fee configuration (PG + GST calculations done automatically)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Fee configuration created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_program_fee_config_dto_1.CreateProgramFeeConfigDto !== "undefined" && create_program_fee_config_dto_1.CreateProgramFeeConfigDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], ProgramFeeConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active program fee configurations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all fee configs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], ProgramFeeConfigController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('program/:programId/session/:sessionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Find fee configuration for a specific Program ID and Session ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return active fee configuration' }),
    __param(0, (0, common_1.Param)('programId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('sessionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], ProgramFeeConfigController.prototype, "findByProgramAndSession", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get program fee configuration details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return fee config details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], ProgramFeeConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update program fee configuration by ID (automatically recalculates final amounts)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fee configuration updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof update_program_fee_config_dto_1.UpdateProgramFeeConfigDto !== "undefined" && update_program_fee_config_dto_1.UpdateProgramFeeConfigDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], ProgramFeeConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete program fee configuration by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Correction entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fee configuration soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], ProgramFeeConfigController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple program fee configurations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Configurations bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof bulk_delete_program_fee_configs_dto_1.BulkDeleteProgramFeeConfigsDto !== "undefined" && bulk_delete_program_fee_configs_dto_1.BulkDeleteProgramFeeConfigsDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _l : Object)
], ProgramFeeConfigController.prototype, "bulkRemove", null);
exports.ProgramFeeConfigController = ProgramFeeConfigController = __decorate([
    (0, swagger_1.ApiTags)('Master - Program Fee Configurations'),
    (0, common_1.Controller)('master/program-fee-configs'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ProgramFeeConfigController);


/***/ }),
/* 76 */
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
exports.CreateProgramFeeConfigDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class CreateProgramFeeConfigDto {
}
exports.CreateProgramFeeConfigDto = CreateProgramFeeConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Program ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "programId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Academic Session ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000.00, description: 'Registration Base Fee', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "registrationBaseFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.00, description: 'Registration Payment Gateway Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "registrationPgRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18.00, description: 'Registration GST Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "registrationGstRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1375.00, description: 'Examination Base Fee', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "examinationBaseFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.00, description: 'Examination Payment Gateway Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "examinationPgRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18.00, description: 'Examination GST Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProgramFeeConfigDto.prototype, "examinationGstRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProgramFeeConfigDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BCA Fee 2026-27 config', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProgramFeeConfigDto.prototype, "Remarks", void 0);


/***/ }),
/* 77 */
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
exports.UpdateProgramFeeConfigDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class UpdateProgramFeeConfigDto {
}
exports.UpdateProgramFeeConfigDto = UpdateProgramFeeConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Program ID', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "programId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Academic Session ID', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000.00, description: 'Registration Base Fee', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "registrationBaseFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.00, description: 'Registration Payment Gateway Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "registrationPgRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18.00, description: 'Registration GST Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "registrationGstRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1375.00, description: 'Examination Base Fee', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "examinationBaseFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.00, description: 'Examination Payment Gateway Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "examinationPgRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18.00, description: 'Examination GST Rate Percentage', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProgramFeeConfigDto.prototype, "examinationGstRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProgramFeeConfigDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProgramFeeConfigDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BCA Fee 2026-27 update', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProgramFeeConfigDto.prototype, "Remarks", void 0);


/***/ }),
/* 78 */
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
exports.BulkDeleteProgramFeeConfigsDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(12);
class BulkDeleteProgramFeeConfigsDto {
}
exports.BulkDeleteProgramFeeConfigsDto = BulkDeleteProgramFeeConfigsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of program fee config IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteProgramFeeConfigsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteProgramFeeConfigsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete configurations', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteProgramFeeConfigsDto.prototype, "DeletedRemarks", void 0);


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsiteModule = void 0;
const common_1 = __webpack_require__(2);
const campus_quick_link_module_1 = __webpack_require__(80);
const latest_update_module_1 = __webpack_require__(84);
const admission_enquiry_module_1 = __webpack_require__(88);
const hero_section_module_1 = __webpack_require__(92);
let WebsiteModule = class WebsiteModule {
};
exports.WebsiteModule = WebsiteModule;
exports.WebsiteModule = WebsiteModule = __decorate([
    (0, common_1.Module)({
        imports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule],
        exports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule],
    })
], WebsiteModule);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const campus_quick_link_controller_1 = __webpack_require__(81);
let CampusQuickLinkModule = class CampusQuickLinkModule {
};
exports.CampusQuickLinkModule = CampusQuickLinkModule;
exports.CampusQuickLinkModule = CampusQuickLinkModule = __decorate([
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
        controllers: [campus_quick_link_controller_1.CampusQuickLinkController],
    })
], CampusQuickLinkModule);


/***/ }),
/* 81 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_campus_quick_link_dto_1 = __webpack_require__(82);
const update_campus_quick_link_dto_1 = __webpack_require__(83);
let CampusQuickLinkController = class CampusQuickLinkController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_campus_quick_link' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_campus_quick_links' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_campus_quick_link' }, { quickLinkId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_campus_quick_link' }, { quickLinkId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_campus_quick_link' }, { quickLinkId: id, DeletedBy, DeletedRemarks });
    }
};
exports.CampusQuickLinkController = CampusQuickLinkController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new campus quick link entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Campus quick link created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_campus_quick_link_dto_1.CreateCampusQuickLinkDto !== "undefined" && create_campus_quick_link_dto_1.CreateCampusQuickLinkDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], CampusQuickLinkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active campus quick links (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all campus quick links' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], CampusQuickLinkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campus quick link details by quickLinkId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return campus quick link details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], CampusQuickLinkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update campus quick link details by quickLinkId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campus quick link updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_campus_quick_link_dto_1.UpdateCampusQuickLinkDto !== "undefined" && update_campus_quick_link_dto_1.UpdateCampusQuickLinkDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], CampusQuickLinkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a campus quick link by quickLinkId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete link' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campus quick link soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], CampusQuickLinkController.prototype, "remove", null);
exports.CampusQuickLinkController = CampusQuickLinkController = __decorate([
    (0, swagger_1.ApiTags)('Website - Campus Quick Links'),
    (0, common_1.Controller)('website/campus-quick-links'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], CampusQuickLinkController);


/***/ }),
/* 82 */
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
exports.CreateCampusQuickLinkDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateCampusQuickLinkDto {
}
exports.CreateCampusQuickLinkDto = CreateCampusQuickLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Library Portal', description: 'Name of the quick link' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCampusQuickLinkDto.prototype, "quickLinkName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fa-book', description: 'Icon class or URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCampusQuickLinkDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://library.bacelar.edu', description: 'Page URL for quick link' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCampusQuickLinkDto.prototype, "pageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCampusQuickLinkDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Main campus library link', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCampusQuickLinkDto.prototype, "Remarks", void 0);


/***/ }),
/* 83 */
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
exports.UpdateCampusQuickLinkDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateCampusQuickLinkDto {
}
exports.UpdateCampusQuickLinkDto = UpdateCampusQuickLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Library Portal', description: 'Name of the quick link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampusQuickLinkDto.prototype, "quickLinkName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fa-book', description: 'Icon class or URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampusQuickLinkDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://library.bacelar.edu', description: 'Page URL for quick link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampusQuickLinkDto.prototype, "pageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCampusQuickLinkDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is quick link active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCampusQuickLinkDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated library link details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampusQuickLinkDto.prototype, "Remarks", void 0);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const latest_update_controller_1 = __webpack_require__(85);
let LatestUpdateModule = class LatestUpdateModule {
};
exports.LatestUpdateModule = LatestUpdateModule;
exports.LatestUpdateModule = LatestUpdateModule = __decorate([
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
        controllers: [latest_update_controller_1.LatestUpdateController],
    })
], LatestUpdateModule);


/***/ }),
/* 85 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_latest_update_dto_1 = __webpack_require__(86);
const update_latest_update_dto_1 = __webpack_require__(87);
let LatestUpdateController = class LatestUpdateController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_latest_update' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_latest_updates' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_latest_update' }, { latestUpdateId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_latest_update' }, { latestUpdateId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_latest_update' }, { latestUpdateId: id, DeletedBy, DeletedRemarks });
    }
};
exports.LatestUpdateController = LatestUpdateController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new latest update entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Latest update created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_latest_update_dto_1.CreateLatestUpdateDto !== "undefined" && create_latest_update_dto_1.CreateLatestUpdateDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], LatestUpdateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active latest updates (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all latest updates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], LatestUpdateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get latest update details by latestUpdateId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return latest update details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], LatestUpdateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update latest update details by latestUpdateId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Latest update updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_latest_update_dto_1.UpdateLatestUpdateDto !== "undefined" && update_latest_update_dto_1.UpdateLatestUpdateDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], LatestUpdateController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a latest update entry by latestUpdateId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Latest update soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], LatestUpdateController.prototype, "remove", null);
exports.LatestUpdateController = LatestUpdateController = __decorate([
    (0, swagger_1.ApiTags)('Website - Latest Updates'),
    (0, common_1.Controller)('website/latest-updates'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], LatestUpdateController);


/***/ }),
/* 86 */
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
exports.CreateLatestUpdateDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateLatestUpdateDto {
}
exports.CreateLatestUpdateDto = CreateLatestUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions Open 2026-27', description: 'Title of the update' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions2026', description: 'Short name/identifier for update', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UG/PG', description: 'Grade or Category tag', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png', description: 'Logo or Image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Applications are invited for UG & PG courses for academic year 2026-27.', description: 'Detailed description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-01T00:00:00.000Z', description: 'Validity start date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-30T23:59:59.000Z', description: 'Validity end date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "validUntil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://bacelar.edu/admissions', description: 'Target URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "linkUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLatestUpdateDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions announcement', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLatestUpdateDto.prototype, "Remarks", void 0);


/***/ }),
/* 87 */
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
exports.UpdateLatestUpdateDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateLatestUpdateDto {
}
exports.UpdateLatestUpdateDto = UpdateLatestUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions Open 2026-27', description: 'Title of the update', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions2026', description: 'Short name/identifier for update', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UG/PG', description: 'Grade or Category tag', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png', description: 'Logo or Image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Applications are invited for UG & PG courses for academic year 2026-27.', description: 'Detailed description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-01T00:00:00.000Z', description: 'Validity start date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-09-30T23:59:59.000Z', description: 'Validity end date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "validUntil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://bacelar.edu/admissions', description: 'Target URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "linkUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLatestUpdateDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is update entry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateLatestUpdateDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated announcement details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLatestUpdateDto.prototype, "Remarks", void 0);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const admission_enquiry_controller_1 = __webpack_require__(89);
let AdmissionEnquiryModule = class AdmissionEnquiryModule {
};
exports.AdmissionEnquiryModule = AdmissionEnquiryModule;
exports.AdmissionEnquiryModule = AdmissionEnquiryModule = __decorate([
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
        controllers: [admission_enquiry_controller_1.AdmissionEnquiryController],
    })
], AdmissionEnquiryModule);


/***/ }),
/* 89 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_admission_enquiry_dto_1 = __webpack_require__(90);
const update_admission_enquiry_dto_1 = __webpack_require__(91);
let AdmissionEnquiryController = class AdmissionEnquiryController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_admission_enquiry' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_admission_enquiries' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_admission_enquiry' }, { admissionEnquiryId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_admission_enquiry' }, { admissionEnquiryId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_admission_enquiry' }, { admissionEnquiryId: id, DeletedBy, DeletedRemarks });
    }
};
exports.AdmissionEnquiryController = AdmissionEnquiryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit / Create a new admission enquiry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Admission enquiry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_admission_enquiry_dto_1.CreateAdmissionEnquiryDto !== "undefined" && create_admission_enquiry_dto_1.CreateAdmissionEnquiryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], AdmissionEnquiryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active admission enquiries (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all admission enquiries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], AdmissionEnquiryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admission enquiry details by admissionEnquiryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return admission enquiry details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], AdmissionEnquiryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update admission enquiry details by admissionEnquiryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admission enquiry updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_admission_enquiry_dto_1.UpdateAdmissionEnquiryDto !== "undefined" && update_admission_enquiry_dto_1.UpdateAdmissionEnquiryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], AdmissionEnquiryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete an admission enquiry by admissionEnquiryId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Duplicate entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admission enquiry soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], AdmissionEnquiryController.prototype, "remove", null);
exports.AdmissionEnquiryController = AdmissionEnquiryController = __decorate([
    (0, swagger_1.ApiTags)('Website - Admission Enquiries'),
    (0, common_1.Controller)('website/admission-enquiries'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AdmissionEnquiryController);


/***/ }),
/* 90 */
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
exports.CreateAdmissionEnquiryDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateAdmissionEnquiryDto {
}
exports.CreateAdmissionEnquiryDto = CreateAdmissionEnquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ENQ-20260809-0001', description: 'Enquiry Reference Number (Auto-generated if left empty)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "enquiryNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rahul Kumar', description: 'Name of candidate' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: 'Contact phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "contactNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: 'WhatsApp phone number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "whatsappNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rahul@example.com', description: 'Email address', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main Street, Patna, Bihar', description: 'Residential Address', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'Course ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAdmissionEnquiryDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bachelor of Computer Applications (BCA)', description: 'Course Name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "courseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2026, description: 'Academic Session ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAdmissionEnquiryDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-2027', description: 'Academic Session Name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "sessionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Interested in direct admission process and fee structure.', description: 'Enquiry Message', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PENDING', description: 'Status of enquiry (e.g., PENDING, CONTACTED, ADMITTED, REJECTED)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WEBSITE', description: 'Lead source (e.g. WEBSITE, LANDING_PAGE, REFERRAL)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Called on 10th Aug. Student asked to call back.', description: 'Admin Notes', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "adminNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-12T10:00:00.000Z', description: 'Follow-up Date (ISO String)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "followUpDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Counsellor Amit', description: 'Assigned Staff / Counsellor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "assignedTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Has admin read the enquiry?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAdmissionEnquiryDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'System / Website', description: 'Creator identifier', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Submitted via website form', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdmissionEnquiryDto.prototype, "Remarks", void 0);


/***/ }),
/* 91 */
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
exports.UpdateAdmissionEnquiryDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateAdmissionEnquiryDto {
}
exports.UpdateAdmissionEnquiryDto = UpdateAdmissionEnquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rahul Kumar', description: 'Name of candidate', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: 'Contact phone number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "contactNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: 'WhatsApp phone number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "whatsappNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rahul@example.com', description: 'Email address', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main Street, Patna, Bihar', description: 'Residential Address', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'Course ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAdmissionEnquiryDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bachelor of Computer Applications (BCA)', description: 'Course Name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "courseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2026, description: 'Academic Session ID', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAdmissionEnquiryDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-2027', description: 'Academic Session Name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "sessionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Interested in direct admission process and fee structure.', description: 'Enquiry Message', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CONTACTED', description: 'Status of enquiry', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WEBSITE', description: 'Lead source', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Called candidate. Sent prospectus via WhatsApp.', description: 'Admin Notes', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "adminNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-15T10:00:00.000Z', description: 'Follow-up Date (ISO String)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "followUpDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Counsellor Amit', description: 'Assigned Staff / Counsellor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "assignedTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Has admin read the enquiry?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAdmissionEnquiryDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is enquiry record active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAdmissionEnquiryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated enquiry notes', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdmissionEnquiryDto.prototype, "Remarks", void 0);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeroSectionModule = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const hero_section_controller_1 = __webpack_require__(93);
let HeroSectionModule = class HeroSectionModule {
};
exports.HeroSectionModule = HeroSectionModule;
exports.HeroSectionModule = HeroSectionModule = __decorate([
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
        controllers: [hero_section_controller_1.HeroSectionController],
    })
], HeroSectionModule);


/***/ }),
/* 93 */
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeroSectionController = void 0;
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(10);
const create_hero_section_dto_1 = __webpack_require__(94);
const update_hero_section_dto_1 = __webpack_require__(95);
let HeroSectionController = class HeroSectionController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_hero_section' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_hero_sections' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_hero_section' }, { heroSectionId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_hero_section' }, { heroSectionId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_hero_section' }, { heroSectionId: id, DeletedBy, DeletedRemarks });
    }
};
exports.HeroSectionController = HeroSectionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new hero section entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Hero section entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_hero_section_dto_1.CreateHeroSectionDto !== "undefined" && create_hero_section_dto_1.CreateHeroSectionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], HeroSectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active hero sections (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all hero sections' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], HeroSectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hero section details by heroSectionId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return hero section details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], HeroSectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update hero section details by heroSectionId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hero section updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_hero_section_dto_1.UpdateHeroSectionDto !== "undefined" && update_hero_section_dto_1.UpdateHeroSectionDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], HeroSectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a hero section entry by heroSectionId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete hero banner' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hero section soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], HeroSectionController.prototype, "remove", null);
exports.HeroSectionController = HeroSectionController = __decorate([
    (0, swagger_1.ApiTags)('Website - Hero Sections'),
    (0, common_1.Controller)('website/hero-sections'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], HeroSectionController);


/***/ }),
/* 94 */
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
exports.CreateHeroSectionDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class CreateHeroSectionDto {
}
exports.CreateHeroSectionDto = CreateHeroSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions Open 2026-27', description: 'Badge text shown above main title', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Empowering Minds, Shaping Futures at', description: 'Main hero title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bacelar University', description: 'Highlighted portion of main title', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "highlightedTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Join Bihar’s premier educational institution offering world-class infrastructure and high-placement academic programs.', description: 'Subheading / description text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/hero-bg.jpg', description: 'Background image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "backgroundImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apply Now', description: 'Primary action button text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "primaryButtonText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/admissions', description: 'Primary button URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "primaryButtonLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Explore Courses', description: 'Secondary action button text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "secondaryButtonText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/courses', description: 'Secondary button URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "secondaryButtonLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateHeroSectionDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Homepage main banner', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHeroSectionDto.prototype, "Remarks", void 0);


/***/ }),
/* 95 */
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
exports.UpdateHeroSectionDto = void 0;
const class_validator_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(4);
class UpdateHeroSectionDto {
}
exports.UpdateHeroSectionDto = UpdateHeroSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admissions Open 2026-27', description: 'Badge text shown above main title', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Empowering Minds, Shaping Futures at', description: 'Main hero title', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bacelar University', description: 'Highlighted portion of main title', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "highlightedTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Join Bihar’s premier educational institution offering world-class infrastructure and high-placement academic programs.', description: 'Subheading / description text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/hero-bg.jpg', description: 'Background image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "backgroundImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apply Now', description: 'Primary action button text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "primaryButtonText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/admissions', description: 'Primary button URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "primaryButtonLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Explore Courses', description: 'Secondary action button text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "secondaryButtonText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/courses', description: 'Secondary button URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "secondaryButtonLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateHeroSectionDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is hero section active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateHeroSectionDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated hero banner text', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHeroSectionDto.prototype, "Remarks", void 0);


/***/ })
/******/ 	]);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
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
    const port = Number(process.env.PORT ?? 3003);
    await app.listen(port);
}
void bootstrap();

})();

/******/ })()
;