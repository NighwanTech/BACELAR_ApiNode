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

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentServiceModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const students_module_1 = __webpack_require__(11);
const master_module_1 = __webpack_require__(33);
const website_module_1 = __webpack_require__(64);
let StudentServiceModule = class StudentServiceModule {
};
exports.StudentServiceModule = StudentServiceModule;
exports.StudentServiceModule = StudentServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, students_module_1.StudentsModule, master_module_1.MasterModule, website_module_1.WebsiteModule],
        controllers: [],
        providers: [],
    })
], StudentServiceModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);


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
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_service_1 = __webpack_require__(8);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 8 */
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
exports.PrismaService = void 0;
const common_1 = __webpack_require__(5);
const adapter_mariadb_1 = __webpack_require__(9);
const client_1 = __webpack_require__(10);
function getDbConfig() {
    const databaseUrl = process.env.DATABASE_URL || '';
    try {
        const url = new URL(databaseUrl);
        return {
            host: url.hostname,
            port: url.port ? Number(url.port) : 3306,
            user: decodeURIComponent(url.username),
            password: decodeURIComponent(url.password),
            database: decodeURIComponent(url.pathname.split('?')[0].replace(/^\//, '')),
            connectionLimit: 2,
            connectTimeout: 30000,
            acquireTimeout: 30000,
            ssl: false,
            allowPublicKeyRetrieval: true,
        };
    }
    catch {
        return {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'backend_db',
        };
    }
}
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        const adapter = new adapter_mariadb_1.PrismaMariaDb(getDbConfig());
        super({ adapter });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@prisma/adapter-mariadb");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentsModule = void 0;
const common_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(12);
const prisma_1 = __webpack_require__(6);
const students_controller_1 = __webpack_require__(13);
const students_service_1 = __webpack_require__(14);
const student_profile_module_1 = __webpack_require__(16);
const student_academic_module_1 = __webpack_require__(19);
const student_academic_subject_module_1 = __webpack_require__(22);
const student_payment_module_1 = __webpack_require__(25);
const student_attachment_module_1 = __webpack_require__(30);
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_1.PrismaModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
            }),
            student_profile_module_1.StudentProfileModule,
            student_academic_module_1.StudentAcademicModule,
            student_academic_subject_module_1.StudentAcademicSubjectModule,
            student_payment_module_1.StudentPaymentModule,
            student_attachment_module_1.StudentAttachmentModule,
        ],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
    })
], StudentsModule);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentsController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const students_service_1 = __webpack_require__(14);
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async login(data) {
        try {
            return await this.studentsService.login(data.registrationNo, data.password);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async changePassword(data) {
        try {
            return await this.studentsService.changePassword(data.registrationNo, data.currentPassword, data.newPassword);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async create(data) {
        try {
            return await this.studentsService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.studentsService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.studentsService.findOne(data.StudentRegistrationId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { StudentRegistrationId, ...updateData } = data;
            return await this.studentsService.update(StudentRegistrationId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.studentsService.softDelete(data.StudentRegistrationId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.studentsService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'login_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'change_password_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "changePassword", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_students' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'soft_delete_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_soft_delete_students' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "bulkSoftDelete", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof students_service_1.StudentsService !== "undefined" && students_service_1.StudentsService) === "function" ? _a : Object])
], StudentsController);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentsService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(12);
const bcrypt = __importStar(__webpack_require__(15));
let StudentsService = class StudentsService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    generateRandomPassword() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        let pwd = '';
        for (let i = 0; i < 4; i++) {
            pwd += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 4; i++) {
            pwd += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return pwd;
    }
    async generateRegistrationNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const cycleStartYear = month >= 3 ? year : year - 1;
        const cycleStartDate = new Date(cycleStartYear, 3, 1, 0, 0, 0, 0);
        const count = await this.prisma.student.count({
            where: {
                CreatedOn: {
                    gte: cycleStartDate,
                },
            },
        });
        const yyyy = year.toString();
        const mm = (month + 1).toString().padStart(2, '0');
        const dd = now.getDate().toString().padStart(2, '0');
        let serial = count + 1;
        let regNo = `${yyyy}${mm}${dd}${serial.toString().padStart(4, '0')}`;
        let isUnique = false;
        while (!isUnique) {
            const existingRegNo = await this.prisma.student.findUnique({
                where: { registrationNo: regNo },
            });
            if (!existingRegNo) {
                isUnique = true;
            }
            else {
                serial++;
                regNo = `${yyyy}${mm}${dd}${serial.toString().padStart(4, '0')}`;
            }
        }
        return regNo;
    }
    async create(data) {
        const existingEmail = await this.prisma.student.findUnique({
            where: { email: data.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('Email already registered');
        }
        let regNo = data.registrationNo;
        if (!regNo) {
            regNo = await this.generateRegistrationNumber();
        }
        else {
            const existingReg = await this.prisma.student.findUnique({
                where: { registrationNo: regNo },
            });
            if (existingReg) {
                throw new common_1.ConflictException('Registration number already exists');
            }
        }
        const plainTextPassword = this.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        const newStudent = await this.prisma.student.create({
            data: {
                candidateName: data.candidateName,
                fatherName: data.fatherName,
                email: data.email,
                mobileNo: data.mobileNo,
                registrationNo: regNo,
                password: hashedPassword,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks,
                IsActive: true,
                IsDeleted: false,
            },
        });
        return {
            ...newStudent,
            plainTextPassword,
        };
    }
    async login(registrationNo, passwordString) {
        const student = await this.prisma.student.findUnique({
            where: { registrationNo },
        });
        if (!student || student.IsDeleted || !student.IsActive) {
            throw new common_1.UnauthorizedException('Invalid credentials or account is disabled');
        }
        const isPasswordValid = await bcrypt.compare(passwordString, student.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials or account is disabled');
        }
        const payload = { sub: student.StudentRegistrationId, registrationNo: student.registrationNo };
        const token = this.jwtService.sign(payload);
        const { password, ...sanitizedStudent } = student;
        return {
            status: 'success',
            token,
            student: sanitizedStudent,
        };
    }
    async findAll() {
        return this.prisma.student.findMany({
            where: {
                IsDeleted: false,
            },
            orderBy: {
                CreatedOn: 'desc',
            },
        });
    }
    async findOne(StudentRegistrationId) {
        const student = await this.prisma.student.findFirst({
            where: {
                StudentRegistrationId,
                IsDeleted: false,
            },
            include: {
                program: {
                    include: { programCategory: true },
                },
                session: true,
            },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with Registration ID ${StudentRegistrationId} not found`);
        }
        return student;
    }
    async update(StudentRegistrationId, data) {
        await this.findOne(StudentRegistrationId);
        if (data.email) {
            const existingEmail = await this.prisma.student.findFirst({
                where: {
                    email: data.email,
                    NOT: { StudentRegistrationId },
                },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('Email already in use by another student');
            }
        }
        if (data.registrationNo) {
            const existingReg = await this.prisma.student.findFirst({
                where: {
                    registrationNo: data.registrationNo,
                    NOT: { StudentRegistrationId },
                },
            });
            if (existingReg) {
                throw new common_1.ConflictException('Registration number already in use by another student');
            }
        }
        return this.prisma.student.update({
            where: { StudentRegistrationId },
            data: {
                candidateName: data.candidateName,
                fatherName: data.fatherName,
                email: data.email,
                mobileNo: data.mobileNo,
                registrationNo: data.registrationNo,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(StudentRegistrationId, DeletedBy, DeletedRemarks) {
        await this.findOne(StudentRegistrationId);
        return this.prisma.student.update({
            where: { StudentRegistrationId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.student.updateMany({
            where: {
                StudentRegistrationId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} student(s)`,
            count: result.count,
        };
    }
    async changePassword(registrationNo, currentPasswordString, newPasswordString) {
        const student = await this.prisma.student.findUnique({
            where: { registrationNo },
        });
        if (!student || student.IsDeleted) {
            return { status: 'error', message: 'Student account not found' };
        }
        const isPasswordValid = await bcrypt.compare(currentPasswordString, student.password);
        if (!isPasswordValid) {
            return { status: 'error', message: 'Current password is incorrect' };
        }
        const hashedNewPassword = await bcrypt.hash(newPasswordString, 10);
        await this.prisma.student.update({
            where: { StudentRegistrationId: student.StudentRegistrationId },
            data: {
                password: hashedNewPassword,
            },
        });
        return { status: 'success', message: 'Password changed successfully' };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], StudentsService);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProfileModule = void 0;
const common_1 = __webpack_require__(5);
const student_profile_service_1 = __webpack_require__(17);
const student_profile_controller_1 = __webpack_require__(18);
const prisma_1 = __webpack_require__(6);
let StudentProfileModule = class StudentProfileModule {
};
exports.StudentProfileModule = StudentProfileModule;
exports.StudentProfileModule = StudentProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [student_profile_controller_1.StudentProfileController],
        providers: [student_profile_service_1.StudentProfileService],
        exports: [student_profile_service_1.StudentProfileService],
    })
], StudentProfileModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProfileService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let StudentProfileService = class StudentProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existing = await this.prisma.studentProfile.findUnique({
            where: { studentId: data.studentId },
        });
        if (existing) {
            throw new common_1.ConflictException('Profile already exists for this student');
        }
        const student = await this.prisma.student.findUnique({
            where: { StudentRegistrationId: data.studentId },
        });
        if (!student || student.IsDeleted) {
            throw new common_1.NotFoundException('Student account not found');
        }
        return this.prisma.studentProfile.create({
            data: {
                studentId: data.studentId,
                studentNameHindi: data.studentNameHindi || null,
                fatherNameHindi: data.fatherNameHindi || null,
                motherName: data.motherName || null,
                motherNameHindi: data.motherNameHindi || null,
                fatherMobileNumber: data.fatherMobileNumber || null,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                gender: data.gender || null,
                maritalStatus: data.maritalStatus || null,
                religion: data.religion || null,
                nationality: data.nationality || null,
                category: data.category || null,
                subCategory: data.subCategory || null,
                physicalHandicap: data.physicalHandicap || null,
                certificateNo: data.certificateNo || null,
                certificateAttachment: data.certificateAttachment || null,
                aadharIdNo: data.aadharIdNo || null,
                apaarIdNo: data.apaarIdNo || null,
                CaddressLine1: data.CaddressLine1 || null,
                CaddressLine2: data.CaddressLine2 || null,
                CaddressLine3: data.CaddressLine3 || null,
                Cstate: data.Cstate || null,
                Ccity: data.Ccity || null,
                Cpincode: data.Cpincode || null,
                PaddressLine1: data.PaddressLine1 || null,
                PaddressLine2: data.PaddressLine2 || null,
                PaddressLine3: data.PaddressLine3 || null,
                Pstate: data.Pstate || null,
                Pcity: data.Pcity || null,
                Ppincode: data.Ppincode || null,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findOne(studentId) {
        const profile = await this.prisma.studentProfile.findFirst({
            where: { studentId, IsDeleted: false },
            include: {
                student: true,
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Student profile with student ID ${studentId} not found`);
        }
        const { student, ...profileData } = profile;
        return {
            ...profileData,
            studentName: student.candidateName,
            studentPhoneNo: student.mobileNo,
            email: student.email,
            fatherName: student.fatherName,
            registrationNo: student.registrationNo,
        };
    }
    async update(studentId, data) {
        await this.findOne(studentId);
        return this.prisma.studentProfile.update({
            where: { studentId },
            data: {
                studentNameHindi: data.studentNameHindi,
                fatherNameHindi: data.fatherNameHindi,
                motherName: data.motherName,
                motherNameHindi: data.motherNameHindi,
                fatherMobileNumber: data.fatherMobileNumber,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
                gender: data.gender,
                maritalStatus: data.maritalStatus,
                religion: data.religion,
                nationality: data.nationality,
                category: data.category,
                subCategory: data.subCategory,
                physicalHandicap: data.physicalHandicap,
                certificateNo: data.certificateNo,
                certificateAttachment: data.certificateAttachment,
                aadharIdNo: data.aadharIdNo,
                apaarIdNo: data.apaarIdNo,
                CaddressLine1: data.CaddressLine1,
                CaddressLine2: data.CaddressLine2,
                CaddressLine3: data.CaddressLine3,
                Cstate: data.Cstate,
                Ccity: data.Ccity,
                Cpincode: data.Cpincode,
                PaddressLine1: data.PaddressLine1,
                PaddressLine2: data.PaddressLine2,
                PaddressLine3: data.PaddressLine3,
                Pstate: data.Pstate,
                Pcity: data.Pcity,
                Ppincode: data.Ppincode,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(studentId, DeletedBy, DeletedRemarks) {
        await this.findOne(studentId);
        return this.prisma.studentProfile.update({
            where: { studentId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.studentProfile.updateMany({
            where: {
                studentProfileId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} student profile(s)`,
            count: result.count,
        };
    }
};
exports.StudentProfileService = StudentProfileService;
exports.StudentProfileService = StudentProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StudentProfileService);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProfileController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const student_profile_service_1 = __webpack_require__(17);
let StudentProfileController = class StudentProfileController {
    constructor(studentProfileService) {
        this.studentProfileService = studentProfileService;
    }
    async create(data) {
        try {
            return await this.studentProfileService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.studentProfileService.findOne(data.studentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { studentId, ...updateData } = data;
            return await this.studentProfileService.update(studentId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.studentProfileService.softDelete(data.studentId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.studentProfileService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StudentProfileController = StudentProfileController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_student_profile' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_student_profile' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_student_profile' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_student_profile' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_student_profiles' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "bulkSoftDelete", null);
exports.StudentProfileController = StudentProfileController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof student_profile_service_1.StudentProfileService !== "undefined" && student_profile_service_1.StudentProfileService) === "function" ? _a : Object])
], StudentProfileController);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const student_academic_controller_1 = __webpack_require__(20);
const student_academic_service_1 = __webpack_require__(21);
let StudentAcademicModule = class StudentAcademicModule {
};
exports.StudentAcademicModule = StudentAcademicModule;
exports.StudentAcademicModule = StudentAcademicModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [student_academic_controller_1.StudentAcademicController],
        providers: [student_academic_service_1.StudentAcademicService],
        exports: [student_academic_service_1.StudentAcademicService],
    })
], StudentAcademicModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const student_academic_service_1 = __webpack_require__(21);
let StudentAcademicController = class StudentAcademicController {
    constructor(academicService) {
        this.academicService = academicService;
    }
    async save(data) {
        try {
            return await this.academicService.save(data.studentId, data.qualifications, data.CreatedBy, data.programId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.academicService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.academicService.findOne(data.academicDetailId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByStudent(data) {
        try {
            return await this.academicService.findByStudent(data.studentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { academicDetailId, ...updateData } = data;
            return await this.academicService.update(academicDetailId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.academicService.softDelete(data.academicDetailId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.academicService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StudentAcademicController = StudentAcademicController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'save_student_academic_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "save", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_academic_details' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_academic_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_academic_details_by_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "findByStudent", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_academic_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_academic_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_academic_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicController.prototype, "bulkSoftDelete", null);
exports.StudentAcademicController = StudentAcademicController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof student_academic_service_1.StudentAcademicService !== "undefined" && student_academic_service_1.StudentAcademicService) === "function" ? _a : Object])
], StudentAcademicController);


/***/ }),
/* 21 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let StudentAcademicService = class StudentAcademicService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(studentId, qualifications, CreatedBy, programId) {
        return this.prisma.$transaction(async (tx) => {
            const student = await tx.student.findFirst({
                where: { StudentRegistrationId: Number(studentId), IsDeleted: false },
            });
            if (!student) {
                throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
            }
            if (programId === undefined || programId === null) {
                throw new common_1.BadRequestException('programId is required');
            }
            const program = await tx.program.findFirst({
                where: { programId: Number(programId), IsDeleted: false },
            });
            if (!program) {
                throw new common_1.NotFoundException(`Program with ID ${programId} not found`);
            }
            const activeSession = await tx.academicSession.findFirst({
                where: { IsActive: true, IsDeleted: false },
                orderBy: { CreatedOn: 'desc' },
            });
            if (!activeSession) {
                throw new common_1.NotFoundException('No active academic session found. Please activate a session in masters.');
            }
            const assignedProgramId = program.programId;
            const assignedSessionId = activeSession.sessionId;
            const assignedSessionName = activeSession.sessionName;
            await tx.student.update({
                where: { StudentRegistrationId: Number(studentId) },
                data: {
                    programId: assignedProgramId,
                    sessionId: assignedSessionId,
                    UpdatedBy: CreatedBy || 'System',
                },
            });
            await tx.studentAcademicDetail.deleteMany({
                where: { studentId: Number(studentId) },
            });
            const createdDetails = [];
            for (const qual of qualifications) {
                const detail = await tx.studentAcademicDetail.create({
                    data: {
                        studentId: Number(studentId),
                        qualificationId: Number(qual.qualificationId),
                        boardId: Number(qual.boardId),
                        schoolName: qual.schoolName,
                        passingYear: Number(qual.passingYear),
                        rollNo: qual.rollNo,
                        resultStatus: qual.resultStatus,
                        marksType: qual.marksType,
                        maxMarks: Number(qual.maxMarks),
                        obtainedMarks: Number(qual.obtainedMarks),
                        percentage: Number(qual.percentage),
                        division: qual.division || null,
                        grade: qual.grade || null,
                        stream: qual.stream || null,
                        CreatedBy: CreatedBy || 'System',
                        IsActive: true,
                        IsDeleted: false,
                        subjects: {
                            create: (qual.subjects || []).map((sub) => ({
                                subjectId: Number(sub.subjectId),
                                maxMarks: Number(sub.maxMarks),
                                minMarks: Number(sub.minMarks || 33),
                                obtainedMarks: Number(sub.obtainedMarks),
                                grade: sub.grade || null,
                                practicalMarks: sub.practicalMarks ? Number(sub.practicalMarks) : null,
                                theoryMarks: sub.theoryMarks ? Number(sub.theoryMarks) : null,
                                isOptional: !!sub.isOptional,
                                CreatedBy: CreatedBy || 'System',
                                IsActive: true,
                                IsDeleted: false,
                            })),
                        },
                    },
                    include: {
                        subjects: {
                            include: {
                                subject: true,
                            },
                        },
                        qualification: true,
                        board: true,
                    },
                });
                createdDetails.push(detail);
            }
            return {
                status: 'success',
                message: 'Academic qualifications and subjects saved successfully',
                data: createdDetails,
                programId: assignedProgramId,
                sessionId: assignedSessionId,
                sessionName: assignedSessionName,
            };
        });
    }
    async findAll() {
        return this.prisma.studentAcademicDetail.findMany({
            where: { IsDeleted: false },
            include: {
                subjects: {
                    include: {
                        subject: true,
                    },
                },
                qualification: true,
                board: true,
                student: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findOne(academicDetailId) {
        const detail = await this.prisma.studentAcademicDetail.findFirst({
            where: { academicDetailId, IsDeleted: false },
            include: {
                subjects: {
                    include: {
                        subject: true,
                    },
                },
                qualification: true,
                board: true,
                student: true,
            },
        });
        if (!detail) {
            throw new common_1.NotFoundException(`Student Academic Detail with ID ${academicDetailId} not found`);
        }
        return detail;
    }
    async findByStudent(studentId) {
        return this.prisma.studentAcademicDetail.findMany({
            where: { studentId, IsDeleted: false },
            include: {
                subjects: {
                    include: {
                        subject: true,
                    },
                },
                qualification: true,
                board: true,
            },
            orderBy: { qualificationId: 'asc' },
        });
    }
    async update(academicDetailId, data) {
        await this.findOne(academicDetailId);
        return this.prisma.studentAcademicDetail.update({
            where: { academicDetailId },
            data: {
                qualificationId: data.qualificationId !== undefined ? Number(data.qualificationId) : undefined,
                boardId: data.boardId !== undefined ? Number(data.boardId) : undefined,
                schoolName: data.schoolName,
                passingYear: data.passingYear !== undefined ? Number(data.passingYear) : undefined,
                rollNo: data.rollNo,
                resultStatus: data.resultStatus,
                marksType: data.marksType,
                maxMarks: data.maxMarks !== undefined ? Number(data.maxMarks) : undefined,
                obtainedMarks: data.obtainedMarks !== undefined ? Number(data.obtainedMarks) : undefined,
                percentage: data.percentage !== undefined ? Number(data.percentage) : undefined,
                division: data.division,
                grade: data.grade,
                stream: data.stream,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(academicDetailId, DeletedBy, DeletedRemarks) {
        await this.findOne(academicDetailId);
        return this.prisma.studentAcademicDetail.update({
            where: { academicDetailId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.studentAcademicDetail.updateMany({
            where: {
                academicDetailId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} academic detail record(s)`,
            count: result.count,
        };
    }
};
exports.StudentAcademicService = StudentAcademicService;
exports.StudentAcademicService = StudentAcademicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StudentAcademicService);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicSubjectModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const student_academic_subject_controller_1 = __webpack_require__(23);
const student_academic_subject_service_1 = __webpack_require__(24);
let StudentAcademicSubjectModule = class StudentAcademicSubjectModule {
};
exports.StudentAcademicSubjectModule = StudentAcademicSubjectModule;
exports.StudentAcademicSubjectModule = StudentAcademicSubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [student_academic_subject_controller_1.StudentAcademicSubjectController],
        providers: [student_academic_subject_service_1.StudentAcademicSubjectService],
        exports: [student_academic_subject_service_1.StudentAcademicSubjectService],
    })
], StudentAcademicSubjectModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicSubjectController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const student_academic_subject_service_1 = __webpack_require__(24);
let StudentAcademicSubjectController = class StudentAcademicSubjectController {
    constructor(subjectService) {
        this.subjectService = subjectService;
    }
    async create(data) {
        try {
            return await this.subjectService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.subjectService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.subjectService.findOne(data.studentAcademicSubjectId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByAcademicDetail(data) {
        try {
            return await this.subjectService.findByAcademicDetail(data.academicDetailId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { studentAcademicSubjectId, ...updateData } = data;
            return await this.subjectService.update(studentAcademicSubjectId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.subjectService.softDelete(data.studentAcademicSubjectId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.subjectService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StudentAcademicSubjectController = StudentAcademicSubjectController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_academic_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_academic_subjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_academic_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_academic_subjects_by_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "findByAcademicDetail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_academic_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_academic_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_academic_subjects' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAcademicSubjectController.prototype, "bulkSoftDelete", null);
exports.StudentAcademicSubjectController = StudentAcademicSubjectController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof student_academic_subject_service_1.StudentAcademicSubjectService !== "undefined" && student_academic_subject_service_1.StudentAcademicSubjectService) === "function" ? _a : Object])
], StudentAcademicSubjectController);


/***/ }),
/* 24 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicSubjectService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let StudentAcademicSubjectService = class StudentAcademicSubjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.studentAcademicSubject.create({
            data: {
                academicDetailId: Number(data.academicDetailId),
                subjectId: Number(data.subjectId),
                maxMarks: Number(data.maxMarks),
                minMarks: Number(data.minMarks ?? 33),
                obtainedMarks: Number(data.obtainedMarks),
                grade: data.grade || null,
                practicalMarks: data.practicalMarks ? Number(data.practicalMarks) : null,
                theoryMarks: data.theoryMarks ? Number(data.theoryMarks) : null,
                isOptional: !!data.isOptional,
                CreatedBy: data.CreatedBy,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                subject: true,
                academicDetail: true,
            },
        });
    }
    async findAll() {
        return this.prisma.studentAcademicSubject.findMany({
            where: { IsDeleted: false },
            include: {
                subject: true,
                academicDetail: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findOne(studentAcademicSubjectId) {
        const subjectMark = await this.prisma.studentAcademicSubject.findFirst({
            where: { studentAcademicSubjectId, IsDeleted: false },
            include: {
                subject: true,
                academicDetail: true,
            },
        });
        if (!subjectMark) {
            throw new common_1.NotFoundException(`Student Academic Subject Mark with ID ${studentAcademicSubjectId} not found`);
        }
        return subjectMark;
    }
    async findByAcademicDetail(academicDetailId) {
        return this.prisma.studentAcademicSubject.findMany({
            where: { academicDetailId, IsDeleted: false },
            include: {
                subject: true,
            },
            orderBy: { subjectId: 'asc' },
        });
    }
    async update(studentAcademicSubjectId, data) {
        await this.findOne(studentAcademicSubjectId);
        return this.prisma.studentAcademicSubject.update({
            where: { studentAcademicSubjectId },
            data: {
                academicDetailId: data.academicDetailId ? Number(data.academicDetailId) : undefined,
                subjectId: data.subjectId ? Number(data.subjectId) : undefined,
                maxMarks: data.maxMarks ? Number(data.maxMarks) : undefined,
                minMarks: data.minMarks ? Number(data.minMarks) : undefined,
                obtainedMarks: data.obtainedMarks ? Number(data.obtainedMarks) : undefined,
                grade: data.grade,
                practicalMarks: data.practicalMarks ? Number(data.practicalMarks) : null,
                theoryMarks: data.theoryMarks ? Number(data.theoryMarks) : null,
                isOptional: data.isOptional !== undefined ? !!data.isOptional : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
            },
            include: {
                subject: true,
            },
        });
    }
    async softDelete(studentAcademicSubjectId, DeletedBy, DeletedRemarks) {
        await this.findOne(studentAcademicSubjectId);
        return this.prisma.studentAcademicSubject.update({
            where: { studentAcademicSubjectId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.studentAcademicSubject.updateMany({
            where: {
                studentAcademicSubjectId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} subject mark record(s)`,
            count: result.count,
        };
    }
};
exports.StudentAcademicSubjectService = StudentAcademicSubjectService;
exports.StudentAcademicSubjectService = StudentAcademicSubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StudentAcademicSubjectService);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentModule = void 0;
const common_1 = __webpack_require__(5);
const student_payment_controller_1 = __webpack_require__(26);
const student_payment_service_1 = __webpack_require__(27);
let StudentPaymentModule = class StudentPaymentModule {
};
exports.StudentPaymentModule = StudentPaymentModule;
exports.StudentPaymentModule = StudentPaymentModule = __decorate([
    (0, common_1.Module)({
        controllers: [student_payment_controller_1.StudentPaymentController],
        providers: [student_payment_service_1.StudentPaymentService],
    })
], StudentPaymentModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const student_payment_service_1 = __webpack_require__(27);
let StudentPaymentController = class StudentPaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async create(data) {
        try {
            return await this.paymentService.create(data);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async createRazorpayOrder(data) {
        try {
            return await this.paymentService.createRazorpayOrder(data);
        }
        catch (error) {
            console.error('[create_razorpay_order]', error);
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async verifyRazorpayPayment(data) {
        try {
            return await this.paymentService.verifyRazorpayPayment(data);
        }
        catch (error) {
            console.error('[verify_razorpay_payment]', error);
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async findAll() {
        try {
            return await this.paymentService.findAll();
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async findOne(data) {
        try {
            return await this.paymentService.findOne(data.paymentId);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async findByStudent(data) {
        try {
            return await this.paymentService.findByStudent(data.studentId);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async findByOrderId(data) {
        try {
            return await this.paymentService.findByOrderId(data.razorpayOrderId);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async update(data) {
        try {
            const { paymentId, ...updateData } = data;
            return await this.paymentService.update(paymentId, updateData);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async softDelete(data) {
        try {
            return await this.paymentService.softDelete(data.paymentId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.paymentService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: (0, student_payment_service_1.extractErrorMessage)(error) };
        }
    }
};
exports.StudentPaymentController = StudentPaymentController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_student_payment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_razorpay_order' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "createRazorpayOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'verify_razorpay_payment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "verifyRazorpayPayment", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_student_payments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_student_payment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_student_payments_by_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "findByStudent", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_student_payment_by_order_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "findByOrderId", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_student_payment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_student_payment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_student_payments' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentPaymentController.prototype, "bulkSoftDelete", null);
exports.StudentPaymentController = StudentPaymentController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof student_payment_service_1.StudentPaymentService !== "undefined" && student_payment_service_1.StudentPaymentService) === "function" ? _a : Object])
], StudentPaymentController);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentService = void 0;
exports.extractErrorMessage = extractErrorMessage;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const crypto = __importStar(__webpack_require__(28));
const Razorpay = __webpack_require__(29);
function cleanEnv(value) {
    return String(value || '')
        .trim()
        .replace(/^['"]|['"]$/g, '');
}
function extractErrorMessage(error) {
    if (!error)
        return 'Unknown error';
    if (typeof error === 'string')
        return error;
    const err = error;
    if (typeof err.error?.description === 'string' && err.error.description) {
        return err.error.description;
    }
    if (typeof err.message === 'string' && err.message.trim()) {
        return err.message;
    }
    if (typeof err.getResponse === 'function') {
        const response = err.getResponse();
        if (typeof response === 'string' && response.trim())
            return response;
        if (response && typeof response === 'object') {
            const msg = response.message;
            if (typeof msg === 'string' && msg.trim())
                return msg;
            if (Array.isArray(msg))
                return msg.join(', ');
        }
    }
    if (typeof err.response?.message === 'string' && err.response.message.trim()) {
        return err.response.message;
    }
    if (Array.isArray(err.response?.message)) {
        return err.response.message.join(', ');
    }
    try {
        return JSON.stringify(error);
    }
    catch {
        return 'Unknown error';
    }
}
let StudentPaymentService = class StudentPaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getRazorpayClient() {
        const keyId = cleanEnv(process.env.RAZORPAY_KEY_ID);
        const keySecret = cleanEnv(process.env.RAZORPAY_KEY_SECRET);
        if (!keyId || !keySecret) {
            throw new common_1.BadRequestException('Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env and restart the API.');
        }
        if (keyId.includes('replace_me') || keySecret.includes('replace_me')) {
            throw new common_1.BadRequestException('Replace placeholder Razorpay keys in BACELAR_ApiNode/.env with your test keys, then restart npm run start:dev:all');
        }
        return {
            keyId,
            client: new Razorpay({ key_id: keyId, key_secret: keySecret }),
        };
    }
    async create(data) {
        return this.prisma.studentPayment.create({
            data: {
                studentId: Number(data.studentId),
                feeType: data.feeType,
                amountPaid: Number(data.amountPaid),
                paymentStatus: data.paymentStatus || 'PENDING',
                razorpayOrderId: data.razorpayOrderId || null,
                razorpayPaymentId: data.razorpayPaymentId || null,
                razorpaySignature: data.razorpaySignature || null,
                gatewayResponse: data.gatewayResponse || null,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                student: true,
            },
        });
    }
    async createRazorpayOrder(data) {
        const studentId = Number(data.studentId);
        const feeType = (data.feeType || 'REGISTRATION').toUpperCase();
        const student = await this.prisma.student.findFirst({
            where: { StudentRegistrationId: studentId, IsDeleted: false },
            include: { program: true, session: true },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        if (!student.programId || !student.sessionId) {
            throw new common_1.BadRequestException('Student program and academic session must be saved before payment');
        }
        const feeConfig = await this.prisma.programFeeConfig.findFirst({
            where: {
                programId: student.programId,
                sessionId: student.sessionId,
                IsDeleted: false,
                IsActive: true,
            },
        });
        if (!feeConfig) {
            throw new common_1.NotFoundException(`Fee configuration not found for program ${student.programId} and session ${student.sessionId}`);
        }
        const amount = feeType === 'EXAMINATION'
            ? Number(feeConfig.examinationFinal)
            : Number(feeConfig.registrationFinal);
        if (!amount || amount <= 0) {
            throw new common_1.BadRequestException('Payable fee amount is zero. Use exemption flow instead of Razorpay.');
        }
        const existingSuccess = await this.prisma.studentPayment.findFirst({
            where: {
                studentId,
                feeType,
                paymentStatus: 'SUCCESS',
                IsDeleted: false,
            },
        });
        if (existingSuccess) {
            throw new common_1.BadRequestException(`A successful ${feeType} payment already exists for this student`);
        }
        const { keyId, client } = this.getRazorpayClient();
        const amountInPaise = Math.round(amount * 100);
        let order;
        try {
            order = await client.orders.create({
                amount: amountInPaise,
                currency: 'INR',
                receipt: `stu_${studentId}_${Date.now()}`.slice(0, 40),
                notes: {
                    studentId: String(studentId),
                    feeType,
                    registrationNo: student.registrationNo || '',
                },
            });
        }
        catch (err) {
            throw new common_1.BadRequestException(`Razorpay order failed: ${extractErrorMessage(err)}. If you just added keys, restart the API (npm run start:dev:all).`);
        }
        if (!order?.id) {
            throw new common_1.BadRequestException('Razorpay did not return an order id');
        }
        const payment = await this.prisma.studentPayment.create({
            data: {
                studentId,
                feeType,
                amountPaid: amount,
                paymentStatus: 'PENDING',
                razorpayOrderId: order.id,
                CreatedBy: data.CreatedBy,
                Remarks: `${feeType} fee order created`,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                student: {
                    include: {
                        program: { include: { programCategory: true } },
                        session: true,
                    },
                },
            },
        });
        return {
            paymentId: payment.paymentId,
            razorpayOrderId: order.id,
            amount,
            amountInPaise,
            currency: 'INR',
            keyId,
            feeType,
            student: payment.student,
        };
    }
    async verifyRazorpayPayment(data) {
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
            throw new common_1.BadRequestException('Razorpay keys are not configured. Set RAZORPAY_KEY_SECRET in .env');
        }
        const payment = await this.findOne(Number(data.paymentId));
        if (payment.razorpayOrderId !== data.razorpayOrderId) {
            throw new common_1.BadRequestException('Order ID does not match payment record');
        }
        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
            .digest('hex');
        if (expectedSignature !== data.razorpaySignature) {
            await this.prisma.studentPayment.update({
                where: { paymentId: payment.paymentId },
                data: {
                    paymentStatus: 'FAILED',
                    razorpayPaymentId: data.razorpayPaymentId,
                    razorpaySignature: data.razorpaySignature,
                    gatewayResponse: data.gatewayResponse || null,
                    UpdatedBy: data.UpdatedBy,
                    Remarks: 'Razorpay signature verification failed',
                },
            });
            throw new common_1.BadRequestException('Payment signature verification failed');
        }
        return this.prisma.studentPayment.update({
            where: { paymentId: payment.paymentId },
            data: {
                paymentStatus: 'SUCCESS',
                razorpayPaymentId: data.razorpayPaymentId,
                razorpaySignature: data.razorpaySignature,
                gatewayResponse: data.gatewayResponse || null,
                UpdatedBy: data.UpdatedBy,
                Remarks: 'Payment verified successfully via Razorpay',
            },
            include: {
                student: true,
            },
        });
    }
    async findAll() {
        return this.prisma.studentPayment.findMany({
            where: { IsDeleted: false },
            include: {
                student: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findOne(paymentId) {
        const payment = await this.prisma.studentPayment.findFirst({
            where: { paymentId, IsDeleted: false },
            include: {
                student: true,
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment record with ID ${paymentId} not found`);
        }
        return payment;
    }
    async findByStudent(studentId) {
        return this.prisma.studentPayment.findMany({
            where: { studentId, IsDeleted: false },
            include: {
                student: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findByOrderId(razorpayOrderId) {
        const payment = await this.prisma.studentPayment.findFirst({
            where: { razorpayOrderId, IsDeleted: false },
            include: {
                student: true,
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with Razorpay Order ID ${razorpayOrderId} not found`);
        }
        return payment;
    }
    async update(paymentId, data) {
        await this.findOne(paymentId);
        return this.prisma.studentPayment.update({
            where: { paymentId },
            data: {
                paymentStatus: data.paymentStatus,
                razorpayPaymentId: data.razorpayPaymentId,
                razorpaySignature: data.razorpaySignature,
                gatewayResponse: data.gatewayResponse,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
            include: {
                student: true,
            },
        });
    }
    async softDelete(paymentId, DeletedBy, DeletedRemarks) {
        await this.findOne(paymentId);
        return this.prisma.studentPayment.update({
            where: { paymentId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.studentPayment.updateMany({
            where: {
                paymentId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} payment record(s)`,
            count: result.count,
        };
    }
};
exports.StudentPaymentService = StudentPaymentService;
exports.StudentPaymentService = StudentPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StudentPaymentService);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("razorpay");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAttachmentModule = void 0;
const common_1 = __webpack_require__(5);
const student_attachment_controller_1 = __webpack_require__(31);
const student_attachment_service_1 = __webpack_require__(32);
let StudentAttachmentModule = class StudentAttachmentModule {
};
exports.StudentAttachmentModule = StudentAttachmentModule;
exports.StudentAttachmentModule = StudentAttachmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [student_attachment_controller_1.StudentAttachmentController],
        providers: [student_attachment_service_1.StudentAttachmentService],
    })
], StudentAttachmentModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAttachmentController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const student_attachment_service_1 = __webpack_require__(32);
let StudentAttachmentController = class StudentAttachmentController {
    constructor(attachmentService) {
        this.attachmentService = attachmentService;
    }
    async create(data) {
        try {
            return await this.attachmentService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.attachmentService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.attachmentService.findOne(data.attachmentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByStudent(data) {
        try {
            return await this.attachmentService.findByStudent(data.studentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { attachmentId, ...updateData } = data;
            return await this.attachmentService.update(attachmentId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.attachmentService.softDelete(data.attachmentId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.attachmentService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StudentAttachmentController = StudentAttachmentController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_student_attachment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_student_attachments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_student_attachment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_student_attachments_by_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "findByStudent", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_student_attachment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_student_attachment' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_student_attachments' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAttachmentController.prototype, "bulkSoftDelete", null);
exports.StudentAttachmentController = StudentAttachmentController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof student_attachment_service_1.StudentAttachmentService !== "undefined" && student_attachment_service_1.StudentAttachmentService) === "function" ? _a : Object])
], StudentAttachmentController);


/***/ }),
/* 32 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAttachmentService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let StudentAttachmentService = class StudentAttachmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.studentAttachment.create({
            data: {
                studentId: Number(data.studentId),
                documentType: data.documentType,
                fileUrl: data.fileUrl,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                student: true,
            },
        });
    }
    async findAll() {
        return this.prisma.studentAttachment.findMany({
            where: { IsDeleted: false },
            include: {
                student: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findOne(attachmentId) {
        const attachment = await this.prisma.studentAttachment.findFirst({
            where: { attachmentId, IsDeleted: false },
            include: {
                student: true,
            },
        });
        if (!attachment) {
            throw new common_1.NotFoundException(`Attachment record with ID ${attachmentId} not found`);
        }
        return attachment;
    }
    async findByStudent(studentId) {
        return this.prisma.studentAttachment.findMany({
            where: { studentId, IsDeleted: false },
            include: {
                student: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async update(attachmentId, data) {
        await this.findOne(attachmentId);
        return this.prisma.studentAttachment.update({
            where: { attachmentId },
            data: {
                documentType: data.documentType,
                fileUrl: data.fileUrl,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
            include: {
                student: true,
            },
        });
    }
    async softDelete(attachmentId, DeletedBy, DeletedRemarks) {
        await this.findOne(attachmentId);
        return this.prisma.studentAttachment.update({
            where: { attachmentId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.studentAttachment.updateMany({
            where: {
                attachmentId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} attachment record(s)`,
            count: result.count,
        };
    }
};
exports.StudentAttachmentService = StudentAttachmentService;
exports.StudentAttachmentService = StudentAttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StudentAttachmentService);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterModule = void 0;
const common_1 = __webpack_require__(5);
const state_module_1 = __webpack_require__(34);
const city_module_1 = __webpack_require__(37);
const program_category_module_1 = __webpack_require__(40);
const subject_module_1 = __webpack_require__(43);
const program_module_1 = __webpack_require__(46);
const board_module_1 = __webpack_require__(49);
const qualification_module_1 = __webpack_require__(52);
const academic_session_module_1 = __webpack_require__(55);
const program_fee_config_module_1 = __webpack_require__(58);
const college_module_1 = __webpack_require__(61);
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
            college_module_1.CollegeModule,
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
            college_module_1.CollegeModule,
        ],
    })
], MasterModule);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateModule = void 0;
const common_1 = __webpack_require__(5);
const state_service_1 = __webpack_require__(35);
const state_controller_1 = __webpack_require__(36);
const prisma_1 = __webpack_require__(6);
let StateModule = class StateModule {
};
exports.StateModule = StateModule;
exports.StateModule = StateModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [state_controller_1.StateController],
        providers: [state_service_1.StateService],
        exports: [state_service_1.StateService],
    })
], StateModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let StateService = class StateService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingName = await this.prisma.stateMaster.findUnique({
            where: { stateName: data.stateName },
        });
        if (existingName) {
            throw new common_1.ConflictException('State name already exists');
        }
        const existingCode = await this.prisma.stateMaster.findUnique({
            where: { stateShortCode: data.stateShortCode },
        });
        if (existingCode) {
            throw new common_1.ConflictException('State short code already exists');
        }
        return this.prisma.stateMaster.create({
            data: {
                stateName: data.stateName,
                stateShortCode: data.stateShortCode,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.stateMaster.findMany({
            where: { IsDeleted: false },
            orderBy: { stateName: 'asc' },
        });
    }
    async findOne(stateId) {
        const state = await this.prisma.stateMaster.findFirst({
            where: { stateId, IsDeleted: false },
        });
        if (!state) {
            throw new common_1.NotFoundException(`State with ID ${stateId} not found`);
        }
        return state;
    }
    async update(stateId, data) {
        await this.findOne(stateId);
        if (data.stateName) {
            const existingName = await this.prisma.stateMaster.findFirst({
                where: {
                    stateName: data.stateName,
                    NOT: { stateId },
                },
            });
            if (existingName) {
                throw new common_1.ConflictException('State name already exists');
            }
        }
        if (data.stateShortCode) {
            const existingCode = await this.prisma.stateMaster.findFirst({
                where: {
                    stateShortCode: data.stateShortCode,
                    NOT: { stateId },
                },
            });
            if (existingCode) {
                throw new common_1.ConflictException('State short code already exists');
            }
        }
        return this.prisma.stateMaster.update({
            where: { stateId },
            data: {
                stateName: data.stateName,
                stateShortCode: data.stateShortCode,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(stateId, DeletedBy, DeletedRemarks) {
        await this.findOne(stateId);
        return this.prisma.stateMaster.update({
            where: { stateId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.StateService = StateService;
exports.StateService = StateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StateService);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const state_service_1 = __webpack_require__(35);
let StateController = class StateController {
    constructor(stateService) {
        this.stateService = stateService;
    }
    async create(data) {
        try {
            return await this.stateService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.stateService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.stateService.findOne(data.stateId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { stateId, ...updateData } = data;
            return await this.stateService.update(stateId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.stateService.softDelete(data.stateId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StateController = StateController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_state' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_states' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StateController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_state' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_state' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_state' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "softDelete", null);
exports.StateController = StateController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof state_service_1.StateService !== "undefined" && state_service_1.StateService) === "function" ? _a : Object])
], StateController);


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
exports.CityModule = void 0;
const common_1 = __webpack_require__(5);
const city_service_1 = __webpack_require__(38);
const city_controller_1 = __webpack_require__(39);
const prisma_1 = __webpack_require__(6);
let CityModule = class CityModule {
};
exports.CityModule = CityModule;
exports.CityModule = CityModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [city_controller_1.CityController],
        providers: [city_service_1.CityService],
        exports: [city_service_1.CityService],
    })
], CityModule);


/***/ }),
/* 38 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let CityService = class CityService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingName = await this.prisma.cityMaster.findFirst({
            where: { cityName: data.cityName, stateId: data.stateId },
        });
        if (existingName) {
            throw new common_1.ConflictException('City name already exists in this state');
        }
        const existingCode = await this.prisma.cityMaster.findUnique({
            where: { cityShortCode: data.cityShortCode },
        });
        if (existingCode) {
            throw new common_1.ConflictException('City short code already exists');
        }
        return this.prisma.cityMaster.create({
            data: {
                stateId: data.stateId,
                cityName: data.cityName,
                cityShortCode: data.cityShortCode,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(stateId) {
        return this.prisma.cityMaster.findMany({
            where: {
                IsDeleted: false,
                ...(stateId ? { stateId: Number(stateId) } : {}),
            },
            orderBy: { cityName: 'asc' },
        });
    }
    async findOne(cityId) {
        const city = await this.prisma.cityMaster.findFirst({
            where: { cityId, IsDeleted: false },
        });
        if (!city) {
            throw new common_1.NotFoundException(`City with ID ${cityId} not found`);
        }
        return city;
    }
    async update(cityId, data) {
        await this.findOne(cityId);
        if (data.cityName && data.stateId) {
            const existingName = await this.prisma.cityMaster.findFirst({
                where: {
                    cityName: data.cityName,
                    stateId: data.stateId,
                    NOT: { cityId },
                },
            });
            if (existingName) {
                throw new common_1.ConflictException('City name already exists in this state');
            }
        }
        if (data.cityShortCode) {
            const existingCode = await this.prisma.cityMaster.findFirst({
                where: {
                    cityShortCode: data.cityShortCode,
                    NOT: { cityId },
                },
            });
            if (existingCode) {
                throw new common_1.ConflictException('City short code already exists');
            }
        }
        return this.prisma.cityMaster.update({
            where: { cityId },
            data: {
                stateId: data.stateId,
                cityName: data.cityName,
                cityShortCode: data.cityShortCode,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(cityId, DeletedBy, DeletedRemarks) {
        await this.findOne(cityId);
        return this.prisma.cityMaster.update({
            where: { cityId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], CityService);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const city_service_1 = __webpack_require__(38);
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    async create(data) {
        try {
            return await this.cityService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.cityService.findAll(data?.stateId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.cityService.findOne(data.cityId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { cityId, ...updateData } = data;
            return await this.cityService.update(cityId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.cityService.softDelete(data.cityId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.CityController = CityController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_city' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_cities' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_city' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_city' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_city' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "softDelete", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof city_service_1.CityService !== "undefined" && city_service_1.CityService) === "function" ? _a : Object])
], CityController);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryModule = void 0;
const common_1 = __webpack_require__(5);
const program_category_service_1 = __webpack_require__(41);
const program_category_controller_1 = __webpack_require__(42);
const prisma_1 = __webpack_require__(6);
let ProgramCategoryModule = class ProgramCategoryModule {
};
exports.ProgramCategoryModule = ProgramCategoryModule;
exports.ProgramCategoryModule = ProgramCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [program_category_controller_1.ProgramCategoryController],
        providers: [program_category_service_1.ProgramCategoryService],
        exports: [program_category_service_1.ProgramCategoryService],
    })
], ProgramCategoryModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let ProgramCategoryService = class ProgramCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.programCategory.create({
            data: {
                programCategoryName: data.programCategoryName,
                pcShortName: data.pcShortName,
                sequenceNo: data.sequenceNo,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.programCategory.findMany({
            where: { IsDeleted: false },
            orderBy: { sequenceNo: 'asc' },
        });
    }
    async findOne(programCategoryId) {
        const pc = await this.prisma.programCategory.findFirst({
            where: { programCategoryId, IsDeleted: false },
        });
        if (!pc) {
            throw new common_1.NotFoundException(`Program Category with ID ${programCategoryId} not found`);
        }
        return pc;
    }
    async update(programCategoryId, data) {
        await this.findOne(programCategoryId);
        return this.prisma.programCategory.update({
            where: { programCategoryId },
            data: {
                programCategoryName: data.programCategoryName,
                pcShortName: data.pcShortName,
                sequenceNo: data.sequenceNo,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(programCategoryId, DeletedBy, DeletedRemarks) {
        await this.findOne(programCategoryId);
        return this.prisma.programCategory.update({
            where: { programCategoryId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.ProgramCategoryService = ProgramCategoryService;
exports.ProgramCategoryService = ProgramCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ProgramCategoryService);


/***/ }),
/* 42 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const program_category_service_1 = __webpack_require__(41);
let ProgramCategoryController = class ProgramCategoryController {
    constructor(programCategoryService) {
        this.programCategoryService = programCategoryService;
    }
    async create(data) {
        try {
            return await this.programCategoryService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.programCategoryService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.programCategoryService.findOne(data.programCategoryId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { programCategoryId, ...updateData } = data;
            return await this.programCategoryService.update(programCategoryId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.programCategoryService.softDelete(data.programCategoryId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ProgramCategoryController = ProgramCategoryController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_program_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramCategoryController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_program_categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramCategoryController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_program_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramCategoryController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_program_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramCategoryController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_program_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramCategoryController.prototype, "softDelete", null);
exports.ProgramCategoryController = ProgramCategoryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof program_category_service_1.ProgramCategoryService !== "undefined" && program_category_service_1.ProgramCategoryService) === "function" ? _a : Object])
], ProgramCategoryController);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectModule = void 0;
const common_1 = __webpack_require__(5);
const subject_service_1 = __webpack_require__(44);
const subject_controller_1 = __webpack_require__(45);
const prisma_1 = __webpack_require__(6);
let SubjectModule = class SubjectModule {
};
exports.SubjectModule = SubjectModule;
exports.SubjectModule = SubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [subject_controller_1.SubjectController],
        providers: [subject_service_1.SubjectService],
        exports: [subject_service_1.SubjectService],
    })
], SubjectModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let SubjectService = class SubjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.subjectMaster.create({
            data: {
                subjectName: data.subjectName,
                subjectCode: data.subjectCode,
                classType: data.classType,
                stream: data.stream || null,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(filters) {
        const whereClause = { IsDeleted: false };
        if (filters?.classType) {
            whereClause.classType = filters.classType;
        }
        if (filters?.stream) {
            whereClause.OR = [
                { stream: filters.stream },
                { stream: null },
            ];
        }
        return this.prisma.subjectMaster.findMany({
            where: whereClause,
            orderBy: { subjectName: 'asc' },
        });
    }
    async findOne(subjectId) {
        const subject = await this.prisma.subjectMaster.findFirst({
            where: { subjectId, IsDeleted: false },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${subjectId} not found`);
        }
        return subject;
    }
    async update(subjectId, data) {
        await this.findOne(subjectId);
        return this.prisma.subjectMaster.update({
            where: { subjectId },
            data: {
                subjectName: data.subjectName,
                subjectCode: data.subjectCode,
                classType: data.classType,
                stream: data.stream,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(subjectId, DeletedBy, DeletedRemarks) {
        await this.findOne(subjectId);
        return this.prisma.subjectMaster.update({
            where: { subjectId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], SubjectService);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const subject_service_1 = __webpack_require__(44);
let SubjectController = class SubjectController {
    constructor(subjectService) {
        this.subjectService = subjectService;
    }
    async create(data) {
        try {
            return await this.subjectService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.subjectService.findAll(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.subjectService.findOne(data.subjectId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { subjectId, ...updateData } = data;
            return await this.subjectService.update(subjectId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.subjectService.softDelete(data.subjectId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.SubjectController = SubjectController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_subjects' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "softDelete", null);
exports.SubjectController = SubjectController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof subject_service_1.SubjectService !== "undefined" && subject_service_1.SubjectService) === "function" ? _a : Object])
], SubjectController);


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
exports.ProgramModule = void 0;
const common_1 = __webpack_require__(5);
const program_controller_1 = __webpack_require__(47);
const program_service_1 = __webpack_require__(48);
let ProgramModule = class ProgramModule {
};
exports.ProgramModule = ProgramModule;
exports.ProgramModule = ProgramModule = __decorate([
    (0, common_1.Module)({
        controllers: [program_controller_1.ProgramController],
        providers: [program_service_1.ProgramService],
    })
], ProgramModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const program_service_1 = __webpack_require__(48);
let ProgramController = class ProgramController {
    constructor(programService) {
        this.programService = programService;
    }
    async create(data) {
        try {
            return await this.programService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.programService.findAll(data?.categoryId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.programService.findOne(data.programId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { programId, ...updateData } = data;
            return await this.programService.update(programId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.programService.softDelete(data.programId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.programService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ProgramController = ProgramController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_program' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_programs' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_program' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_program' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_program' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_programs' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "bulkSoftDelete", null);
exports.ProgramController = ProgramController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof program_service_1.ProgramService !== "undefined" && program_service_1.ProgramService) === "function" ? _a : Object])
], ProgramController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let ProgramService = class ProgramService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.program.create({
            data: {
                programCategoryId: Number(data.programCategoryId),
                programName: data.programName,
                programShortName: data.programShortName,
                programCode: data.programCode,
                durationYears: Number(data.durationYears),
                termType: data.termType,
                totalTerms: Number(data.totalTerms),
                sequenceNo: Number(data.sequenceNo),
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(categoryId) {
        const whereClause = { IsDeleted: false };
        if (categoryId) {
            whereClause.programCategoryId = categoryId;
        }
        return this.prisma.program.findMany({
            where: whereClause,
            include: {
                programCategory: true,
            },
            orderBy: { sequenceNo: 'asc' },
        });
    }
    async findOne(programId) {
        const program = await this.prisma.program.findFirst({
            where: { programId, IsDeleted: false },
            include: {
                programCategory: true,
            },
        });
        if (!program) {
            throw new common_1.NotFoundException(`Program with ID ${programId} not found`);
        }
        return program;
    }
    async update(programId, data) {
        await this.findOne(programId);
        return this.prisma.program.update({
            where: { programId },
            data: {
                programCategoryId: data.programCategoryId !== undefined ? Number(data.programCategoryId) : undefined,
                programName: data.programName,
                programShortName: data.programShortName,
                programCode: data.programCode,
                durationYears: data.durationYears !== undefined ? Number(data.durationYears) : undefined,
                termType: data.termType,
                totalTerms: data.totalTerms !== undefined ? Number(data.totalTerms) : undefined,
                sequenceNo: data.sequenceNo !== undefined ? Number(data.sequenceNo) : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(programId, DeletedBy, DeletedRemarks) {
        await this.findOne(programId);
        return this.prisma.program.update({
            where: { programId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.program.updateMany({
            where: {
                programId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} program(s)`,
            count: result.count,
        };
    }
};
exports.ProgramService = ProgramService;
exports.ProgramService = ProgramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ProgramService);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardModule = void 0;
const common_1 = __webpack_require__(5);
const board_controller_1 = __webpack_require__(50);
const board_service_1 = __webpack_require__(51);
let BoardModule = class BoardModule {
};
exports.BoardModule = BoardModule;
exports.BoardModule = BoardModule = __decorate([
    (0, common_1.Module)({
        controllers: [board_controller_1.BoardController],
        providers: [board_service_1.BoardService],
    })
], BoardModule);


/***/ }),
/* 50 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const board_service_1 = __webpack_require__(51);
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    async create(data) {
        try {
            return await this.boardService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.boardService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.boardService.findOne(data.boardId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { boardId, ...updateData } = data;
            return await this.boardService.update(boardId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.boardService.softDelete(data.boardId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.boardService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_boards' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_boards' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "bulkSoftDelete", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof board_service_1.BoardService !== "undefined" && board_service_1.BoardService) === "function" ? _a : Object])
], BoardController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let BoardService = class BoardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.boardMaster.create({
            data: {
                boardName: data.boardName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.boardMaster.findMany({
            where: { IsDeleted: false },
            orderBy: { boardName: 'asc' },
        });
    }
    async findOne(boardId) {
        const board = await this.prisma.boardMaster.findFirst({
            where: { boardId, IsDeleted: false },
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${boardId} not found`);
        }
        return board;
    }
    async update(boardId, data) {
        await this.findOne(boardId);
        return this.prisma.boardMaster.update({
            where: { boardId },
            data: {
                boardName: data.boardName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(boardId, DeletedBy, DeletedRemarks) {
        await this.findOne(boardId);
        return this.prisma.boardMaster.update({
            where: { boardId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.boardMaster.updateMany({
            where: {
                boardId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} board(s)`,
            count: result.count,
        };
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], BoardService);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationModule = void 0;
const common_1 = __webpack_require__(5);
const qualification_controller_1 = __webpack_require__(53);
const qualification_service_1 = __webpack_require__(54);
let QualificationModule = class QualificationModule {
};
exports.QualificationModule = QualificationModule;
exports.QualificationModule = QualificationModule = __decorate([
    (0, common_1.Module)({
        controllers: [qualification_controller_1.QualificationController],
        providers: [qualification_service_1.QualificationService],
    })
], QualificationModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const qualification_service_1 = __webpack_require__(54);
let QualificationController = class QualificationController {
    constructor(qualificationService) {
        this.qualificationService = qualificationService;
    }
    async create(data) {
        try {
            return await this.qualificationService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.qualificationService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.qualificationService.findOne(data.qualificationId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { qualificationId, ...updateData } = data;
            return await this.qualificationService.update(qualificationId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.qualificationService.softDelete(data.qualificationId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.qualificationService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.QualificationController = QualificationController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_qualification' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_qualifications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_qualification' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_qualification' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_qualification' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_qualifications' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "bulkSoftDelete", null);
exports.QualificationController = QualificationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof qualification_service_1.QualificationService !== "undefined" && qualification_service_1.QualificationService) === "function" ? _a : Object])
], QualificationController);


/***/ }),
/* 54 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let QualificationService = class QualificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.qualificationMaster.create({
            data: {
                qualificationName: data.qualificationName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.qualificationMaster.findMany({
            where: { IsDeleted: false },
            orderBy: { qualificationName: 'asc' },
        });
    }
    async findOne(qualificationId) {
        const qual = await this.prisma.qualificationMaster.findFirst({
            where: { qualificationId, IsDeleted: false },
        });
        if (!qual) {
            throw new common_1.NotFoundException(`Qualification with ID ${qualificationId} not found`);
        }
        return qual;
    }
    async update(qualificationId, data) {
        await this.findOne(qualificationId);
        return this.prisma.qualificationMaster.update({
            where: { qualificationId },
            data: {
                qualificationName: data.qualificationName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(qualificationId, DeletedBy, DeletedRemarks) {
        await this.findOne(qualificationId);
        return this.prisma.qualificationMaster.update({
            where: { qualificationId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.qualificationMaster.updateMany({
            where: {
                qualificationId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} qualification(s)`,
            count: result.count,
        };
    }
};
exports.QualificationService = QualificationService;
exports.QualificationService = QualificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], QualificationService);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionModule = void 0;
const common_1 = __webpack_require__(5);
const academic_session_controller_1 = __webpack_require__(56);
const academic_session_service_1 = __webpack_require__(57);
let AcademicSessionModule = class AcademicSessionModule {
};
exports.AcademicSessionModule = AcademicSessionModule;
exports.AcademicSessionModule = AcademicSessionModule = __decorate([
    (0, common_1.Module)({
        controllers: [academic_session_controller_1.AcademicSessionController],
        providers: [academic_session_service_1.AcademicSessionService],
    })
], AcademicSessionModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const academic_session_service_1 = __webpack_require__(57);
let AcademicSessionController = class AcademicSessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async create(data) {
        try {
            return await this.sessionService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.sessionService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.sessionService.findOne(data.sessionId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { sessionId, ...updateData } = data;
            return await this.sessionService.update(sessionId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.sessionService.softDelete(data.sessionId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.sessionService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.AcademicSessionController = AcademicSessionController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_academic_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_academic_sessions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_academic_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_academic_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_academic_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_academic_sessions' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "bulkSoftDelete", null);
exports.AcademicSessionController = AcademicSessionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof academic_session_service_1.AcademicSessionService !== "undefined" && academic_session_service_1.AcademicSessionService) === "function" ? _a : Object])
], AcademicSessionController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let AcademicSessionService = class AcademicSessionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.academicSession.create({
            data: {
                sessionName: data.sessionName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.academicSession.findMany({
            where: { IsDeleted: false },
            orderBy: { sessionName: 'asc' },
        });
    }
    async findOne(sessionId) {
        const session = await this.prisma.academicSession.findFirst({
            where: { sessionId, IsDeleted: false },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Academic Session with ID ${sessionId} not found`);
        }
        return session;
    }
    async update(sessionId, data) {
        await this.findOne(sessionId);
        return this.prisma.academicSession.update({
            where: { sessionId },
            data: {
                sessionName: data.sessionName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(sessionId, DeletedBy, DeletedRemarks) {
        await this.findOne(sessionId);
        return this.prisma.academicSession.update({
            where: { sessionId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.academicSession.updateMany({
            where: {
                sessionId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} academic session(s)`,
            count: result.count,
        };
    }
};
exports.AcademicSessionService = AcademicSessionService;
exports.AcademicSessionService = AcademicSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], AcademicSessionService);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigModule = void 0;
const common_1 = __webpack_require__(5);
const program_fee_config_controller_1 = __webpack_require__(59);
const program_fee_config_service_1 = __webpack_require__(60);
let ProgramFeeConfigModule = class ProgramFeeConfigModule {
};
exports.ProgramFeeConfigModule = ProgramFeeConfigModule;
exports.ProgramFeeConfigModule = ProgramFeeConfigModule = __decorate([
    (0, common_1.Module)({
        controllers: [program_fee_config_controller_1.ProgramFeeConfigController],
        providers: [program_fee_config_service_1.ProgramFeeConfigService],
    })
], ProgramFeeConfigModule);


/***/ }),
/* 59 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const program_fee_config_service_1 = __webpack_require__(60);
let ProgramFeeConfigController = class ProgramFeeConfigController {
    constructor(feeConfigService) {
        this.feeConfigService = feeConfigService;
    }
    async create(data) {
        try {
            return await this.feeConfigService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.feeConfigService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.feeConfigService.findOne(data.feeConfigId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByProgramAndSession(data) {
        try {
            return await this.feeConfigService.findByProgramAndSession(data.programId, data.sessionId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { feeConfigId, ...updateData } = data;
            return await this.feeConfigService.update(feeConfigId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.feeConfigService.softDelete(data.feeConfigId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.feeConfigService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ProgramFeeConfigController = ProgramFeeConfigController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_program_fee_config' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_program_fee_configs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_program_fee_config' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_program_fee_config_by_program_and_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "findByProgramAndSession", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_program_fee_config' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_program_fee_config' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_program_fee_configs' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "bulkSoftDelete", null);
exports.ProgramFeeConfigController = ProgramFeeConfigController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof program_fee_config_service_1.ProgramFeeConfigService !== "undefined" && program_fee_config_service_1.ProgramFeeConfigService) === "function" ? _a : Object])
], ProgramFeeConfigController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
function calculateFinalFee(base, pgRate = 2.0, gstRate = 18.0) {
    const baseNum = Number(base);
    if (!baseNum || baseNum <= 0)
        return 0;
    const pgCharge = baseNum * (pgRate / 100);
    const gstOnPg = pgCharge * (gstRate / 100);
    return Number((baseNum + pgCharge + gstOnPg).toFixed(3));
}
let ProgramFeeConfigService = class ProgramFeeConfigService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const regFinal = calculateFinalFee(Number(data.registrationBaseFee ?? 0.0), Number(data.registrationPgRate ?? 2.0), Number(data.registrationGstRate ?? 18.0));
        const examFinal = calculateFinalFee(Number(data.examinationBaseFee ?? 0.0), Number(data.examinationPgRate ?? 2.0), Number(data.examinationGstRate ?? 18.0));
        return this.prisma.programFeeConfig.create({
            data: {
                programId: Number(data.programId),
                sessionId: Number(data.sessionId),
                registrationBaseFee: Number(data.registrationBaseFee ?? 0.0),
                registrationPgRate: Number(data.registrationPgRate ?? 2.0),
                registrationGstRate: Number(data.registrationGstRate ?? 18.0),
                registrationFinal: regFinal,
                examinationBaseFee: Number(data.examinationBaseFee ?? 0.0),
                examinationPgRate: Number(data.examinationPgRate ?? 2.0),
                examinationGstRate: Number(data.examinationGstRate ?? 18.0),
                examinationFinal: examFinal,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                program: true,
                session: true,
            },
        });
    }
    async findAll() {
        return this.prisma.programFeeConfig.findMany({
            where: { IsDeleted: false },
            include: {
                program: true,
                session: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findOne(feeConfigId) {
        const config = await this.prisma.programFeeConfig.findFirst({
            where: { feeConfigId, IsDeleted: false },
            include: {
                program: true,
                session: true,
            },
        });
        if (!config) {
            throw new common_1.NotFoundException(`Program Fee Configuration with ID ${feeConfigId} not found`);
        }
        return config;
    }
    async findByProgramAndSession(programId, sessionId) {
        const config = await this.prisma.programFeeConfig.findFirst({
            where: { programId, sessionId, IsDeleted: false },
            include: {
                program: true,
                session: true,
            },
        });
        if (!config) {
            throw new common_1.NotFoundException(`Fee Configuration for Program ID ${programId} and Session ID ${sessionId} not found`);
        }
        return config;
    }
    async update(feeConfigId, data) {
        const current = await this.findOne(feeConfigId);
        const regBase = data.registrationBaseFee !== undefined ? Number(data.registrationBaseFee) : current.registrationBaseFee;
        const regPg = data.registrationPgRate !== undefined ? Number(data.registrationPgRate) : current.registrationPgRate;
        const regGst = data.registrationGstRate !== undefined ? Number(data.registrationGstRate) : current.registrationGstRate;
        const regFinal = calculateFinalFee(regBase, regPg, regGst);
        const examBase = data.examinationBaseFee !== undefined ? Number(data.examinationBaseFee) : current.examinationBaseFee;
        const examPg = data.examinationPgRate !== undefined ? Number(data.examinationPgRate) : current.examinationPgRate;
        const examGst = data.examinationGstRate !== undefined ? Number(data.examinationGstRate) : current.examinationGstRate;
        const examFinal = calculateFinalFee(examBase, examPg, examGst);
        return this.prisma.programFeeConfig.update({
            where: { feeConfigId },
            data: {
                programId: data.programId !== undefined ? Number(data.programId) : undefined,
                sessionId: data.sessionId !== undefined ? Number(data.sessionId) : undefined,
                registrationBaseFee: regBase,
                registrationPgRate: regPg,
                registrationGstRate: regGst,
                registrationFinal: regFinal,
                examinationBaseFee: examBase,
                examinationPgRate: examPg,
                examinationGstRate: examGst,
                examinationFinal: examFinal,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
            include: {
                program: true,
                session: true,
            },
        });
    }
    async softDelete(feeConfigId, DeletedBy, DeletedRemarks) {
        await this.findOne(feeConfigId);
        return this.prisma.programFeeConfig.update({
            where: { feeConfigId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.programFeeConfig.updateMany({
            where: {
                feeConfigId: { in: ids },
                IsDeleted: false,
            },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
        return {
            message: `Successfully soft-deleted ${result.count} fee configuration(s)`,
            count: result.count,
        };
    }
};
exports.ProgramFeeConfigService = ProgramFeeConfigService;
exports.ProgramFeeConfigService = ProgramFeeConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ProgramFeeConfigService);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollegeModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const college_controller_1 = __webpack_require__(62);
const college_service_1 = __webpack_require__(63);
let CollegeModule = class CollegeModule {
};
exports.CollegeModule = CollegeModule;
exports.CollegeModule = CollegeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [college_controller_1.CollegeController],
        providers: [college_service_1.CollegeService],
        exports: [college_service_1.CollegeService],
    })
], CollegeModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollegeController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const college_service_1 = __webpack_require__(63);
let CollegeController = class CollegeController {
    constructor(collegeService) {
        this.collegeService = collegeService;
    }
    async create(data) {
        try {
            return await this.collegeService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.collegeService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.collegeService.findOne(data.collegeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { collegeId, ...updateData } = data;
            return await this.collegeService.update(collegeId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.collegeService.softDelete(data.collegeId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.CollegeController = CollegeController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_college' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_colleges' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_college' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_college' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_college' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "softDelete", null);
exports.CollegeController = CollegeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof college_service_1.CollegeService !== "undefined" && college_service_1.CollegeService) === "function" ? _a : Object])
], CollegeController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollegeService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let CollegeService = class CollegeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    get collegeMaster() {
        return this.prisma.collegeMaster;
    }
    async create(data) {
        return this.collegeMaster.create({
            data: {
                registrationNumber: data.registrationNumber || null,
                collegeCode: data.collegeCode || null,
                collegeName: data.collegeName,
                shortName: data.shortName || null,
                collegeAddress: data.collegeAddress || null,
                primaryContactNumber: data.primaryContactNumber || null,
                alternateContactNumber: data.alternateContactNumber || null,
                emailId: data.emailId || null,
                collegeWebsite: data.collegeWebsite || null,
                CreatedBy: data.CreatedBy || null,
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.collegeMaster.findMany({
            where: { IsDeleted: false },
            orderBy: { collegeName: 'asc' },
        });
    }
    async findOne(collegeId) {
        const college = await this.collegeMaster.findFirst({
            where: { collegeId, IsDeleted: false },
        });
        if (!college) {
            throw new common_1.NotFoundException(`College with ID ${collegeId} not found`);
        }
        return college;
    }
    async update(collegeId, data) {
        await this.findOne(collegeId);
        return this.collegeMaster.update({
            where: { collegeId },
            data: {
                ...(data.registrationNumber !== undefined && { registrationNumber: data.registrationNumber }),
                ...(data.collegeCode !== undefined && { collegeCode: data.collegeCode }),
                ...(data.collegeName !== undefined && { collegeName: data.collegeName }),
                ...(data.shortName !== undefined && { shortName: data.shortName }),
                ...(data.collegeAddress !== undefined && { collegeAddress: data.collegeAddress }),
                ...(data.primaryContactNumber !== undefined && { primaryContactNumber: data.primaryContactNumber }),
                ...(data.alternateContactNumber !== undefined && { alternateContactNumber: data.alternateContactNumber }),
                ...(data.emailId !== undefined && { emailId: data.emailId }),
                ...(data.collegeWebsite !== undefined && { collegeWebsite: data.collegeWebsite }),
                ...(data.UpdatedBy !== undefined && { UpdatedBy: data.UpdatedBy }),
                ...(data.IsActive !== undefined && { IsActive: data.IsActive }),
                ...(data.Remarks !== undefined && { Remarks: data.Remarks }),
            },
        });
    }
    async softDelete(collegeId, DeletedBy, DeletedRemarks) {
        await this.findOne(collegeId);
        return this.collegeMaster.update({
            where: { collegeId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.CollegeService = CollegeService;
exports.CollegeService = CollegeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], CollegeService);


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
exports.WebsiteModule = void 0;
const common_1 = __webpack_require__(5);
const campus_quick_link_module_1 = __webpack_require__(65);
const latest_update_module_1 = __webpack_require__(68);
const admission_enquiry_module_1 = __webpack_require__(71);
const hero_section_module_1 = __webpack_require__(74);
const notice_board_module_1 = __webpack_require__(77);
const accreditation_slider_module_1 = __webpack_require__(80);
const top_achiever_module_1 = __webpack_require__(83);
const image_gallery_module_1 = __webpack_require__(86);
const video_gallery_module_1 = __webpack_require__(89);
const contact_enquiry_module_1 = __webpack_require__(92);
const stats_counter_module_1 = __webpack_require__(95);
const testimonial_module_1 = __webpack_require__(98);
const header_button_module_1 = __webpack_require__(101);
let WebsiteModule = class WebsiteModule {
};
exports.WebsiteModule = WebsiteModule;
exports.WebsiteModule = WebsiteModule = __decorate([
    (0, common_1.Module)({
        imports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule, notice_board_module_1.NoticeBoardModule, accreditation_slider_module_1.AccreditationSliderModule, top_achiever_module_1.TopAchieverModule, image_gallery_module_1.ImageGalleryModule, video_gallery_module_1.VideoGalleryModule, contact_enquiry_module_1.ContactEnquiryModule, stats_counter_module_1.StatsCounterModule, testimonial_module_1.TestimonialModule, header_button_module_1.HeaderButtonModule],
        exports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule, notice_board_module_1.NoticeBoardModule, accreditation_slider_module_1.AccreditationSliderModule, top_achiever_module_1.TopAchieverModule, image_gallery_module_1.ImageGalleryModule, video_gallery_module_1.VideoGalleryModule, contact_enquiry_module_1.ContactEnquiryModule, stats_counter_module_1.StatsCounterModule, testimonial_module_1.TestimonialModule, header_button_module_1.HeaderButtonModule],
    })
], WebsiteModule);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const campus_quick_link_controller_1 = __webpack_require__(66);
const campus_quick_link_service_1 = __webpack_require__(67);
let CampusQuickLinkModule = class CampusQuickLinkModule {
};
exports.CampusQuickLinkModule = CampusQuickLinkModule;
exports.CampusQuickLinkModule = CampusQuickLinkModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [campus_quick_link_controller_1.CampusQuickLinkController],
        providers: [campus_quick_link_service_1.CampusQuickLinkService],
        exports: [campus_quick_link_service_1.CampusQuickLinkService],
    })
], CampusQuickLinkModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const campus_quick_link_service_1 = __webpack_require__(67);
let CampusQuickLinkController = class CampusQuickLinkController {
    constructor(campusQuickLinkService) {
        this.campusQuickLinkService = campusQuickLinkService;
    }
    async create(data) {
        try {
            return await this.campusQuickLinkService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.campusQuickLinkService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.campusQuickLinkService.findOne(data.quickLinkId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { quickLinkId, ...updateData } = data;
            return await this.campusQuickLinkService.update(quickLinkId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.campusQuickLinkService.softDelete(data.quickLinkId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.CampusQuickLinkController = CampusQuickLinkController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_campus_quick_link' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampusQuickLinkController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_campus_quick_links' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampusQuickLinkController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_campus_quick_link' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampusQuickLinkController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_campus_quick_link' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampusQuickLinkController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_campus_quick_link' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampusQuickLinkController.prototype, "softDelete", null);
exports.CampusQuickLinkController = CampusQuickLinkController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof campus_quick_link_service_1.CampusQuickLinkService !== "undefined" && campus_quick_link_service_1.CampusQuickLinkService) === "function" ? _a : Object])
], CampusQuickLinkController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let CampusQuickLinkService = class CampusQuickLinkService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.campusQuickLink.create({
            data: {
                quickLinkName: data.quickLinkName,
                icon: data.icon || null,
                pageUrl: data.pageUrl,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.campusQuickLink.findMany({
            where: { IsDeleted: false },
            orderBy: { quickLinkId: 'desc' },
        });
    }
    async findOne(quickLinkId) {
        const item = await this.prisma.campusQuickLink.findFirst({
            where: { quickLinkId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Campus quick link with ID ${quickLinkId} not found`);
        }
        return item;
    }
    async update(quickLinkId, data) {
        await this.findOne(quickLinkId);
        return this.prisma.campusQuickLink.update({
            where: { quickLinkId },
            data: {
                quickLinkName: data.quickLinkName,
                icon: data.icon,
                pageUrl: data.pageUrl,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(quickLinkId, DeletedBy, DeletedRemarks) {
        await this.findOne(quickLinkId);
        return this.prisma.campusQuickLink.update({
            where: { quickLinkId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.CampusQuickLinkService = CampusQuickLinkService;
exports.CampusQuickLinkService = CampusQuickLinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], CampusQuickLinkService);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const latest_update_controller_1 = __webpack_require__(69);
const latest_update_service_1 = __webpack_require__(70);
let LatestUpdateModule = class LatestUpdateModule {
};
exports.LatestUpdateModule = LatestUpdateModule;
exports.LatestUpdateModule = LatestUpdateModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [latest_update_controller_1.LatestUpdateController],
        providers: [latest_update_service_1.LatestUpdateService],
        exports: [latest_update_service_1.LatestUpdateService],
    })
], LatestUpdateModule);


/***/ }),
/* 69 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const latest_update_service_1 = __webpack_require__(70);
let LatestUpdateController = class LatestUpdateController {
    constructor(latestUpdateService) {
        this.latestUpdateService = latestUpdateService;
    }
    async create(data) {
        try {
            return await this.latestUpdateService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.latestUpdateService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.latestUpdateService.findOne(data.latestUpdateId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { latestUpdateId, ...updateData } = data;
            return await this.latestUpdateService.update(latestUpdateId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.latestUpdateService.softDelete(data.latestUpdateId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.LatestUpdateController = LatestUpdateController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_latest_update' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LatestUpdateController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_latest_updates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LatestUpdateController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_latest_update' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LatestUpdateController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_latest_update' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LatestUpdateController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_latest_update' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LatestUpdateController.prototype, "softDelete", null);
exports.LatestUpdateController = LatestUpdateController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof latest_update_service_1.LatestUpdateService !== "undefined" && latest_update_service_1.LatestUpdateService) === "function" ? _a : Object])
], LatestUpdateController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let LatestUpdateService = class LatestUpdateService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.latestUpdate.create({
            data: {
                title: data.title,
                shortName: data.shortName || null,
                grade: data.grade || null,
                logo: data.logo || null,
                description: data.description || null,
                validFrom: data.validFrom ? new Date(data.validFrom) : null,
                validUntil: data.validUntil ? new Date(data.validUntil) : null,
                linkUrl: data.linkUrl || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.latestUpdate.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { latestUpdateId: 'desc' }],
        });
    }
    async findOne(latestUpdateId) {
        const item = await this.prisma.latestUpdate.findFirst({
            where: { latestUpdateId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Latest update entry with ID ${latestUpdateId} not found`);
        }
        return item;
    }
    async update(latestUpdateId, data) {
        await this.findOne(latestUpdateId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy,
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.shortName !== undefined)
            updatePayload.shortName = data.shortName;
        if (data.grade !== undefined)
            updatePayload.grade = data.grade;
        if (data.logo !== undefined)
            updatePayload.logo = data.logo;
        if (data.description !== undefined)
            updatePayload.description = data.description;
        if (data.validFrom !== undefined)
            updatePayload.validFrom = data.validFrom ? new Date(data.validFrom) : null;
        if (data.validUntil !== undefined)
            updatePayload.validUntil = data.validUntil ? new Date(data.validUntil) : null;
        if (data.linkUrl !== undefined)
            updatePayload.linkUrl = data.linkUrl;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.latestUpdate.update({
            where: { latestUpdateId },
            data: updatePayload,
        });
    }
    async softDelete(latestUpdateId, DeletedBy, DeletedRemarks) {
        await this.findOne(latestUpdateId);
        return this.prisma.latestUpdate.update({
            where: { latestUpdateId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.LatestUpdateService = LatestUpdateService;
exports.LatestUpdateService = LatestUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], LatestUpdateService);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const admission_enquiry_controller_1 = __webpack_require__(72);
const admission_enquiry_service_1 = __webpack_require__(73);
let AdmissionEnquiryModule = class AdmissionEnquiryModule {
};
exports.AdmissionEnquiryModule = AdmissionEnquiryModule;
exports.AdmissionEnquiryModule = AdmissionEnquiryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [admission_enquiry_controller_1.AdmissionEnquiryController],
        providers: [admission_enquiry_service_1.AdmissionEnquiryService],
        exports: [admission_enquiry_service_1.AdmissionEnquiryService],
    })
], AdmissionEnquiryModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const admission_enquiry_service_1 = __webpack_require__(73);
let AdmissionEnquiryController = class AdmissionEnquiryController {
    constructor(admissionEnquiryService) {
        this.admissionEnquiryService = admissionEnquiryService;
    }
    async create(data) {
        try {
            return await this.admissionEnquiryService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.admissionEnquiryService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.admissionEnquiryService.findOne(data.admissionEnquiryId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { admissionEnquiryId, ...updateData } = data;
            return await this.admissionEnquiryService.update(admissionEnquiryId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.admissionEnquiryService.softDelete(data.admissionEnquiryId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.AdmissionEnquiryController = AdmissionEnquiryController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_admission_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionEnquiryController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_admission_enquiries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdmissionEnquiryController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_admission_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionEnquiryController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_admission_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionEnquiryController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_admission_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionEnquiryController.prototype, "softDelete", null);
exports.AdmissionEnquiryController = AdmissionEnquiryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof admission_enquiry_service_1.AdmissionEnquiryService !== "undefined" && admission_enquiry_service_1.AdmissionEnquiryService) === "function" ? _a : Object])
], AdmissionEnquiryController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let AdmissionEnquiryService = class AdmissionEnquiryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateEnquiryNumber() {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        return `ENQ-${today}-${randomDigits}`;
    }
    async create(data) {
        const enquiryNumber = data.enquiryNumber || this.generateEnquiryNumber();
        return this.prisma.admissionEnquiry.create({
            data: {
                enquiryNumber,
                name: data.name,
                contactNo: data.contactNo,
                whatsappNo: data.whatsappNo || null,
                email: data.email || null,
                address: data.address || null,
                courseId: data.courseId ? Number(data.courseId) : null,
                courseName: data.courseName || null,
                sessionId: data.sessionId ? Number(data.sessionId) : null,
                sessionName: data.sessionName || null,
                message: data.message || null,
                status: data.status || 'PENDING',
                source: data.source || 'WEBSITE',
                adminNotes: data.adminNotes || null,
                followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
                assignedTo: data.assignedTo || null,
                isRead: data.isRead ?? false,
                CreatedBy: data.CreatedBy || 'System',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.admissionEnquiry.findMany({
            where: { IsDeleted: false },
            orderBy: { admissionEnquiryId: 'desc' },
        });
    }
    async findOne(admissionEnquiryId) {
        const item = await this.prisma.admissionEnquiry.findFirst({
            where: { admissionEnquiryId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Admission enquiry entry with ID ${admissionEnquiryId} not found`);
        }
        return item;
    }
    async update(admissionEnquiryId, data) {
        await this.findOne(admissionEnquiryId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.contactNo !== undefined)
            updatePayload.contactNo = data.contactNo;
        if (data.whatsappNo !== undefined)
            updatePayload.whatsappNo = data.whatsappNo;
        if (data.email !== undefined)
            updatePayload.email = data.email;
        if (data.address !== undefined)
            updatePayload.address = data.address;
        if (data.courseId !== undefined)
            updatePayload.courseId = data.courseId ? Number(data.courseId) : null;
        if (data.courseName !== undefined)
            updatePayload.courseName = data.courseName;
        if (data.sessionId !== undefined)
            updatePayload.sessionId = data.sessionId ? Number(data.sessionId) : null;
        if (data.sessionName !== undefined)
            updatePayload.sessionName = data.sessionName;
        if (data.message !== undefined)
            updatePayload.message = data.message;
        if (data.status !== undefined)
            updatePayload.status = data.status;
        if (data.source !== undefined)
            updatePayload.source = data.source;
        if (data.adminNotes !== undefined)
            updatePayload.adminNotes = data.adminNotes;
        if (data.followUpDate !== undefined)
            updatePayload.followUpDate = data.followUpDate ? new Date(data.followUpDate) : null;
        if (data.assignedTo !== undefined)
            updatePayload.assignedTo = data.assignedTo;
        if (data.isRead !== undefined)
            updatePayload.isRead = data.isRead;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.admissionEnquiry.update({
            where: { admissionEnquiryId },
            data: updatePayload,
        });
    }
    async softDelete(admissionEnquiryId, DeletedBy, DeletedRemarks) {
        await this.findOne(admissionEnquiryId);
        return this.prisma.admissionEnquiry.update({
            where: { admissionEnquiryId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.AdmissionEnquiryService = AdmissionEnquiryService;
exports.AdmissionEnquiryService = AdmissionEnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], AdmissionEnquiryService);


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
exports.HeroSectionModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const hero_section_controller_1 = __webpack_require__(75);
const hero_section_service_1 = __webpack_require__(76);
let HeroSectionModule = class HeroSectionModule {
};
exports.HeroSectionModule = HeroSectionModule;
exports.HeroSectionModule = HeroSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [hero_section_controller_1.HeroSectionController],
        providers: [hero_section_service_1.HeroSectionService],
        exports: [hero_section_service_1.HeroSectionService],
    })
], HeroSectionModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeroSectionController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const hero_section_service_1 = __webpack_require__(76);
let HeroSectionController = class HeroSectionController {
    constructor(heroSectionService) {
        this.heroSectionService = heroSectionService;
    }
    async create(data) {
        try {
            return await this.heroSectionService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.heroSectionService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.heroSectionService.findOne(data.heroSectionId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { heroSectionId, ...updateData } = data;
            return await this.heroSectionService.update(heroSectionId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.heroSectionService.softDelete(data.heroSectionId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.HeroSectionController = HeroSectionController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_hero_section' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeroSectionController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_hero_sections' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HeroSectionController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_hero_section' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeroSectionController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_hero_section' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeroSectionController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_hero_section' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeroSectionController.prototype, "softDelete", null);
exports.HeroSectionController = HeroSectionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof hero_section_service_1.HeroSectionService !== "undefined" && hero_section_service_1.HeroSectionService) === "function" ? _a : Object])
], HeroSectionController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeroSectionService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let HeroSectionService = class HeroSectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.heroSection.create({
            data: {
                badgeText: data.badgeText || null,
                title: data.title,
                highlightedTitle: data.highlightedTitle || null,
                description: data.description || null,
                backgroundImage: data.backgroundImage || null,
                primaryButtonText: data.primaryButtonText || null,
                primaryButtonLink: data.primaryButtonLink || null,
                secondaryButtonText: data.secondaryButtonText || null,
                secondaryButtonLink: data.secondaryButtonLink || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.heroSection.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { heroSectionId: 'desc' }],
        });
    }
    async findOne(heroSectionId) {
        const item = await this.prisma.heroSection.findFirst({
            where: { heroSectionId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Hero section entry with ID ${heroSectionId} not found`);
        }
        return item;
    }
    async update(heroSectionId, data) {
        await this.findOne(heroSectionId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.badgeText !== undefined)
            updatePayload.badgeText = data.badgeText;
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.highlightedTitle !== undefined)
            updatePayload.highlightedTitle = data.highlightedTitle;
        if (data.description !== undefined)
            updatePayload.description = data.description;
        if (data.backgroundImage !== undefined)
            updatePayload.backgroundImage = data.backgroundImage;
        if (data.primaryButtonText !== undefined)
            updatePayload.primaryButtonText = data.primaryButtonText;
        if (data.primaryButtonLink !== undefined)
            updatePayload.primaryButtonLink = data.primaryButtonLink;
        if (data.secondaryButtonText !== undefined)
            updatePayload.secondaryButtonText = data.secondaryButtonText;
        if (data.secondaryButtonLink !== undefined)
            updatePayload.secondaryButtonLink = data.secondaryButtonLink;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.heroSection.update({
            where: { heroSectionId },
            data: updatePayload,
        });
    }
    async softDelete(heroSectionId, DeletedBy, DeletedRemarks) {
        await this.findOne(heroSectionId);
        return this.prisma.heroSection.update({
            where: { heroSectionId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.HeroSectionService = HeroSectionService;
exports.HeroSectionService = HeroSectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], HeroSectionService);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoticeBoardModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const notice_board_controller_1 = __webpack_require__(78);
const notice_board_service_1 = __webpack_require__(79);
let NoticeBoardModule = class NoticeBoardModule {
};
exports.NoticeBoardModule = NoticeBoardModule;
exports.NoticeBoardModule = NoticeBoardModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [notice_board_controller_1.NoticeBoardController],
        providers: [notice_board_service_1.NoticeBoardService],
        exports: [notice_board_service_1.NoticeBoardService],
    })
], NoticeBoardModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoticeBoardController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const notice_board_service_1 = __webpack_require__(79);
let NoticeBoardController = class NoticeBoardController {
    constructor(noticeBoardService) {
        this.noticeBoardService = noticeBoardService;
    }
    async create(data) {
        try {
            return await this.noticeBoardService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.noticeBoardService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.noticeBoardService.findOne(data.noticeBoardId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { noticeBoardId, ...updateData } = data;
            return await this.noticeBoardService.update(noticeBoardId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.noticeBoardService.softDelete(data.noticeBoardId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.NoticeBoardController = NoticeBoardController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_notice_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_notice_boards' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_notice_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_notice_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_notice_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "softDelete", null);
exports.NoticeBoardController = NoticeBoardController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notice_board_service_1.NoticeBoardService !== "undefined" && notice_board_service_1.NoticeBoardService) === "function" ? _a : Object])
], NoticeBoardController);


/***/ }),
/* 79 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoticeBoardService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let NoticeBoardService = class NoticeBoardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.noticeBoard.create({
            data: {
                title: data.title,
                category: data.category || null,
                badgeText: data.badgeText || null,
                description: data.description || null,
                publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
                status: data.status || 'ACTIVE',
                pdf: data.pdf || null,
                link: data.link || null,
                isPinned: data.isPinned ?? false,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.noticeBoard.findMany({
            where: { IsDeleted: false },
            orderBy: [{ isPinned: 'desc' }, { displayOrder: 'asc' }, { noticeBoardId: 'desc' }],
        });
    }
    async findOne(noticeBoardId) {
        const item = await this.prisma.noticeBoard.findFirst({
            where: { noticeBoardId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Notice board entry with ID ${noticeBoardId} not found`);
        }
        return item;
    }
    async update(noticeBoardId, data) {
        await this.findOne(noticeBoardId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.category !== undefined)
            updatePayload.category = data.category;
        if (data.badgeText !== undefined)
            updatePayload.badgeText = data.badgeText;
        if (data.description !== undefined)
            updatePayload.description = data.description;
        if (data.publishDate !== undefined)
            updatePayload.publishDate = data.publishDate ? new Date(data.publishDate) : null;
        if (data.status !== undefined)
            updatePayload.status = data.status;
        if (data.pdf !== undefined)
            updatePayload.pdf = data.pdf;
        if (data.link !== undefined)
            updatePayload.link = data.link;
        if (data.isPinned !== undefined)
            updatePayload.isPinned = data.isPinned;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.noticeBoard.update({
            where: { noticeBoardId },
            data: updatePayload,
        });
    }
    async softDelete(noticeBoardId, DeletedBy, DeletedRemarks) {
        await this.findOne(noticeBoardId);
        return this.prisma.noticeBoard.update({
            where: { noticeBoardId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.NoticeBoardService = NoticeBoardService;
exports.NoticeBoardService = NoticeBoardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], NoticeBoardService);


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
exports.AccreditationSliderModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const accreditation_slider_controller_1 = __webpack_require__(81);
const accreditation_slider_service_1 = __webpack_require__(82);
let AccreditationSliderModule = class AccreditationSliderModule {
};
exports.AccreditationSliderModule = AccreditationSliderModule;
exports.AccreditationSliderModule = AccreditationSliderModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [accreditation_slider_controller_1.AccreditationSliderController],
        providers: [accreditation_slider_service_1.AccreditationSliderService],
        exports: [accreditation_slider_service_1.AccreditationSliderService],
    })
], AccreditationSliderModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccreditationSliderController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const accreditation_slider_service_1 = __webpack_require__(82);
let AccreditationSliderController = class AccreditationSliderController {
    constructor(accreditationSliderService) {
        this.accreditationSliderService = accreditationSliderService;
    }
    async create(data) {
        try {
            return await this.accreditationSliderService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.accreditationSliderService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.accreditationSliderService.findOne(data.accreditationSliderId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { accreditationSliderId, ...updateData } = data;
            return await this.accreditationSliderService.update(accreditationSliderId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.accreditationSliderService.softDelete(data.accreditationSliderId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.AccreditationSliderController = AccreditationSliderController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_accreditation_slider' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccreditationSliderController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_accreditation_sliders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccreditationSliderController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_accreditation_slider' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccreditationSliderController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_accreditation_slider' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccreditationSliderController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_accreditation_slider' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccreditationSliderController.prototype, "softDelete", null);
exports.AccreditationSliderController = AccreditationSliderController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof accreditation_slider_service_1.AccreditationSliderService !== "undefined" && accreditation_slider_service_1.AccreditationSliderService) === "function" ? _a : Object])
], AccreditationSliderController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccreditationSliderService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let AccreditationSliderService = class AccreditationSliderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.accreditationSlider.create({
            data: {
                title: data.title,
                image: data.image || null,
                link: data.link || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.accreditationSlider.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { accreditationSliderId: 'desc' }],
        });
    }
    async findOne(accreditationSliderId) {
        const item = await this.prisma.accreditationSlider.findFirst({
            where: { accreditationSliderId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Accreditation slider entry with ID ${accreditationSliderId} not found`);
        }
        return item;
    }
    async update(accreditationSliderId, data) {
        await this.findOne(accreditationSliderId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.image !== undefined)
            updatePayload.image = data.image;
        if (data.link !== undefined)
            updatePayload.link = data.link;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.accreditationSlider.update({
            where: { accreditationSliderId },
            data: updatePayload,
        });
    }
    async softDelete(accreditationSliderId, DeletedBy, DeletedRemarks) {
        await this.findOne(accreditationSliderId);
        return this.prisma.accreditationSlider.update({
            where: { accreditationSliderId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.AccreditationSliderService = AccreditationSliderService;
exports.AccreditationSliderService = AccreditationSliderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], AccreditationSliderService);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopAchieverModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const top_achiever_controller_1 = __webpack_require__(84);
const top_achiever_service_1 = __webpack_require__(85);
let TopAchieverModule = class TopAchieverModule {
};
exports.TopAchieverModule = TopAchieverModule;
exports.TopAchieverModule = TopAchieverModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [top_achiever_controller_1.TopAchieverController],
        providers: [top_achiever_service_1.TopAchieverService],
        exports: [top_achiever_service_1.TopAchieverService],
    })
], TopAchieverModule);


/***/ }),
/* 84 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopAchieverController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const top_achiever_service_1 = __webpack_require__(85);
let TopAchieverController = class TopAchieverController {
    constructor(topAchieverService) {
        this.topAchieverService = topAchieverService;
    }
    async create(data) {
        try {
            return await this.topAchieverService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.topAchieverService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.topAchieverService.findOne(data.topAchieverId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { topAchieverId, ...updateData } = data;
            return await this.topAchieverService.update(topAchieverId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.topAchieverService.softDelete(data.topAchieverId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.TopAchieverController = TopAchieverController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_top_achiever' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopAchieverController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_top_achievers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TopAchieverController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_top_achiever' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopAchieverController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_top_achiever' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopAchieverController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_top_achiever' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopAchieverController.prototype, "softDelete", null);
exports.TopAchieverController = TopAchieverController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof top_achiever_service_1.TopAchieverService !== "undefined" && top_achiever_service_1.TopAchieverService) === "function" ? _a : Object])
], TopAchieverController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopAchieverService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let TopAchieverService = class TopAchieverService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.topAchiever.create({
            data: {
                name: data.name,
                image: data.image || null,
                designation: data.designation || null,
                achievement: data.achievement || null,
                batch: data.batch || null,
                course: data.course || null,
                description: data.description || null,
                link: data.link || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.topAchiever.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { topAchieverId: 'desc' }],
        });
    }
    async findOne(topAchieverId) {
        const item = await this.prisma.topAchiever.findFirst({
            where: { topAchieverId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Top achiever entry with ID ${topAchieverId} not found`);
        }
        return item;
    }
    async update(topAchieverId, data) {
        await this.findOne(topAchieverId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.image !== undefined)
            updatePayload.image = data.image;
        if (data.designation !== undefined)
            updatePayload.designation = data.designation;
        if (data.achievement !== undefined)
            updatePayload.achievement = data.achievement;
        if (data.batch !== undefined)
            updatePayload.batch = data.batch;
        if (data.course !== undefined)
            updatePayload.course = data.course;
        if (data.description !== undefined)
            updatePayload.description = data.description;
        if (data.link !== undefined)
            updatePayload.link = data.link;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.topAchiever.update({
            where: { topAchieverId },
            data: updatePayload,
        });
    }
    async softDelete(topAchieverId, DeletedBy, DeletedRemarks) {
        await this.findOne(topAchieverId);
        return this.prisma.topAchiever.update({
            where: { topAchieverId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.TopAchieverService = TopAchieverService;
exports.TopAchieverService = TopAchieverService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], TopAchieverService);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageGalleryModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const image_gallery_controller_1 = __webpack_require__(87);
const image_gallery_service_1 = __webpack_require__(88);
let ImageGalleryModule = class ImageGalleryModule {
};
exports.ImageGalleryModule = ImageGalleryModule;
exports.ImageGalleryModule = ImageGalleryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [image_gallery_controller_1.ImageGalleryController],
        providers: [image_gallery_service_1.ImageGalleryService],
        exports: [image_gallery_service_1.ImageGalleryService],
    })
], ImageGalleryModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageGalleryController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const image_gallery_service_1 = __webpack_require__(88);
let ImageGalleryController = class ImageGalleryController {
    constructor(imageGalleryService) {
        this.imageGalleryService = imageGalleryService;
    }
    async create(data) {
        try {
            return await this.imageGalleryService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.imageGalleryService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.imageGalleryService.findOne(data.imageGalleryId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { imageGalleryId, ...updateData } = data;
            return await this.imageGalleryService.update(imageGalleryId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.imageGalleryService.softDelete(data.imageGalleryId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ImageGalleryController = ImageGalleryController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_image_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageGalleryController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_image_galleries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageGalleryController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_image_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageGalleryController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_image_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageGalleryController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_image_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageGalleryController.prototype, "softDelete", null);
exports.ImageGalleryController = ImageGalleryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof image_gallery_service_1.ImageGalleryService !== "undefined" && image_gallery_service_1.ImageGalleryService) === "function" ? _a : Object])
], ImageGalleryController);


/***/ }),
/* 88 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageGalleryService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let ImageGalleryService = class ImageGalleryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    formatImages(images) {
        if (!images)
            return null;
        if (Array.isArray(images))
            return JSON.stringify(images);
        return String(images);
    }
    async create(data) {
        return this.prisma.imageGallery.create({
            data: {
                title: data.title,
                category: data.category || null,
                description: data.description || null,
                images: this.formatImages(data.images),
                date: data.date ? new Date(data.date) : new Date(),
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.imageGallery.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { imageGalleryId: 'desc' }],
        });
    }
    async findOne(imageGalleryId) {
        const item = await this.prisma.imageGallery.findFirst({
            where: { imageGalleryId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Image gallery entry with ID ${imageGalleryId} not found`);
        }
        return item;
    }
    async update(imageGalleryId, data) {
        await this.findOne(imageGalleryId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.category !== undefined)
            updatePayload.category = data.category;
        if (data.description !== undefined)
            updatePayload.description = data.description;
        if (data.images !== undefined)
            updatePayload.images = this.formatImages(data.images);
        if (data.date !== undefined)
            updatePayload.date = data.date ? new Date(data.date) : null;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.imageGallery.update({
            where: { imageGalleryId },
            data: updatePayload,
        });
    }
    async softDelete(imageGalleryId, DeletedBy, DeletedRemarks) {
        await this.findOne(imageGalleryId);
        return this.prisma.imageGallery.update({
            where: { imageGalleryId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.ImageGalleryService = ImageGalleryService;
exports.ImageGalleryService = ImageGalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ImageGalleryService);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoGalleryModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const video_gallery_controller_1 = __webpack_require__(90);
const video_gallery_service_1 = __webpack_require__(91);
let VideoGalleryModule = class VideoGalleryModule {
};
exports.VideoGalleryModule = VideoGalleryModule;
exports.VideoGalleryModule = VideoGalleryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [video_gallery_controller_1.VideoGalleryController],
        providers: [video_gallery_service_1.VideoGalleryService],
        exports: [video_gallery_service_1.VideoGalleryService],
    })
], VideoGalleryModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoGalleryController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const video_gallery_service_1 = __webpack_require__(91);
let VideoGalleryController = class VideoGalleryController {
    constructor(videoGalleryService) {
        this.videoGalleryService = videoGalleryService;
    }
    async create(data) {
        try {
            return await this.videoGalleryService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.videoGalleryService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.videoGalleryService.findOne(data.videoGalleryId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { videoGalleryId, ...updateData } = data;
            return await this.videoGalleryService.update(videoGalleryId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.videoGalleryService.softDelete(data.videoGalleryId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.VideoGalleryController = VideoGalleryController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_video_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoGalleryController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_video_galleries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoGalleryController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_video_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoGalleryController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_video_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoGalleryController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_video_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoGalleryController.prototype, "softDelete", null);
exports.VideoGalleryController = VideoGalleryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof video_gallery_service_1.VideoGalleryService !== "undefined" && video_gallery_service_1.VideoGalleryService) === "function" ? _a : Object])
], VideoGalleryController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoGalleryService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let VideoGalleryService = class VideoGalleryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.videoGallery.create({
            data: {
                title: data.title,
                category: data.category || null,
                description: data.description || null,
                thumbnail: data.thumbnail || null,
                video: data.video || null,
                videoUrl: data.videoUrl || null,
                duration: data.duration || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.videoGallery.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { videoGalleryId: 'desc' }],
        });
    }
    async findOne(videoGalleryId) {
        const item = await this.prisma.videoGallery.findFirst({
            where: { videoGalleryId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Video gallery entry with ID ${videoGalleryId} not found`);
        }
        return item;
    }
    async update(videoGalleryId, data) {
        await this.findOne(videoGalleryId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.category !== undefined)
            updatePayload.category = data.category;
        if (data.description !== undefined)
            updatePayload.description = data.description;
        if (data.thumbnail !== undefined)
            updatePayload.thumbnail = data.thumbnail;
        if (data.video !== undefined)
            updatePayload.video = data.video;
        if (data.videoUrl !== undefined)
            updatePayload.videoUrl = data.videoUrl;
        if (data.duration !== undefined)
            updatePayload.duration = data.duration;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.videoGallery.update({
            where: { videoGalleryId },
            data: updatePayload,
        });
    }
    async softDelete(videoGalleryId, DeletedBy, DeletedRemarks) {
        await this.findOne(videoGalleryId);
        return this.prisma.videoGallery.update({
            where: { videoGalleryId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.VideoGalleryService = VideoGalleryService;
exports.VideoGalleryService = VideoGalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], VideoGalleryService);


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
exports.ContactEnquiryModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const contact_enquiry_controller_1 = __webpack_require__(93);
const contact_enquiry_service_1 = __webpack_require__(94);
let ContactEnquiryModule = class ContactEnquiryModule {
};
exports.ContactEnquiryModule = ContactEnquiryModule;
exports.ContactEnquiryModule = ContactEnquiryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [contact_enquiry_controller_1.ContactEnquiryController],
        providers: [contact_enquiry_service_1.ContactEnquiryService],
        exports: [contact_enquiry_service_1.ContactEnquiryService],
    })
], ContactEnquiryModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContactEnquiryController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const contact_enquiry_service_1 = __webpack_require__(94);
let ContactEnquiryController = class ContactEnquiryController {
    constructor(contactEnquiryService) {
        this.contactEnquiryService = contactEnquiryService;
    }
    async create(data) {
        try {
            return await this.contactEnquiryService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.contactEnquiryService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.contactEnquiryService.findOne(data.contactEnquiryId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { contactEnquiryId, ...updateData } = data;
            return await this.contactEnquiryService.update(contactEnquiryId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.contactEnquiryService.softDelete(data.contactEnquiryId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ContactEnquiryController = ContactEnquiryController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_contact_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactEnquiryController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_contact_enquiries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactEnquiryController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_contact_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactEnquiryController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_contact_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactEnquiryController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_contact_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactEnquiryController.prototype, "softDelete", null);
exports.ContactEnquiryController = ContactEnquiryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof contact_enquiry_service_1.ContactEnquiryService !== "undefined" && contact_enquiry_service_1.ContactEnquiryService) === "function" ? _a : Object])
], ContactEnquiryController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContactEnquiryService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let ContactEnquiryService = class ContactEnquiryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.contactEnquiry.create({
            data: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                email: data.email || null,
                course: data.course || null,
                message: data.message || null,
                status: data.status || 'PENDING',
                isRead: data.isRead ?? false,
                CreatedBy: data.CreatedBy || 'System',
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.contactEnquiry.findMany({
            where: { IsDeleted: false },
            orderBy: { contactEnquiryId: 'desc' },
        });
    }
    async findOne(contactEnquiryId) {
        const item = await this.prisma.contactEnquiry.findFirst({
            where: { contactEnquiryId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Contact enquiry entry with ID ${contactEnquiryId} not found`);
        }
        return item;
    }
    async update(contactEnquiryId, data) {
        await this.findOne(contactEnquiryId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.phoneNumber !== undefined)
            updatePayload.phoneNumber = data.phoneNumber;
        if (data.email !== undefined)
            updatePayload.email = data.email;
        if (data.course !== undefined)
            updatePayload.course = data.course;
        if (data.message !== undefined)
            updatePayload.message = data.message;
        if (data.status !== undefined)
            updatePayload.status = data.status;
        if (data.isRead !== undefined)
            updatePayload.isRead = data.isRead;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.contactEnquiry.update({
            where: { contactEnquiryId },
            data: updatePayload,
        });
    }
    async softDelete(contactEnquiryId, DeletedBy, DeletedRemarks) {
        await this.findOne(contactEnquiryId);
        return this.prisma.contactEnquiry.update({
            where: { contactEnquiryId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.ContactEnquiryService = ContactEnquiryService;
exports.ContactEnquiryService = ContactEnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ContactEnquiryService);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsCounterModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const stats_counter_controller_1 = __webpack_require__(96);
const stats_counter_service_1 = __webpack_require__(97);
let StatsCounterModule = class StatsCounterModule {
};
exports.StatsCounterModule = StatsCounterModule;
exports.StatsCounterModule = StatsCounterModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [stats_counter_controller_1.StatsCounterController],
        providers: [stats_counter_service_1.StatsCounterService],
        exports: [stats_counter_service_1.StatsCounterService],
    })
], StatsCounterModule);


/***/ }),
/* 96 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsCounterController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const stats_counter_service_1 = __webpack_require__(97);
let StatsCounterController = class StatsCounterController {
    constructor(statsCounterService) {
        this.statsCounterService = statsCounterService;
    }
    async create(data) {
        try {
            return await this.statsCounterService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.statsCounterService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.statsCounterService.findOne(data.statsCounterId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { statsCounterId, ...updateData } = data;
            return await this.statsCounterService.update(statsCounterId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.statsCounterService.softDelete(data.statsCounterId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StatsCounterController = StatsCounterController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_stats_counter' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsCounterController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_stats_counters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsCounterController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_stats_counter' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsCounterController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_stats_counter' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsCounterController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_stats_counter' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsCounterController.prototype, "softDelete", null);
exports.StatsCounterController = StatsCounterController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof stats_counter_service_1.StatsCounterService !== "undefined" && stats_counter_service_1.StatsCounterService) === "function" ? _a : Object])
], StatsCounterController);


/***/ }),
/* 97 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsCounterService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let StatsCounterService = class StatsCounterService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    get statsCounter() {
        return this.prisma.statsCounter;
    }
    async create(data) {
        return this.statsCounter.create({
            data: {
                title: data.title,
                value: data.value,
                suffix: data.suffix || null,
                icon: data.icon || null,
                backgroundImage: data.backgroundImage || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.statsCounter.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { statsCounterId: 'desc' }],
        });
    }
    async findOne(statsCounterId) {
        const item = await this.statsCounter.findFirst({
            where: { statsCounterId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Stats counter entry with ID ${statsCounterId} not found`);
        }
        return item;
    }
    async update(statsCounterId, data) {
        await this.findOne(statsCounterId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.value !== undefined)
            updatePayload.value = data.value;
        if (data.suffix !== undefined)
            updatePayload.suffix = data.suffix;
        if (data.icon !== undefined)
            updatePayload.icon = data.icon;
        if (data.backgroundImage !== undefined)
            updatePayload.backgroundImage = data.backgroundImage;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.statsCounter.update({
            where: { statsCounterId },
            data: updatePayload,
        });
    }
    async softDelete(statsCounterId, DeletedBy, DeletedRemarks) {
        await this.findOne(statsCounterId);
        return this.statsCounter.update({
            where: { statsCounterId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.StatsCounterService = StatsCounterService;
exports.StatsCounterService = StatsCounterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StatsCounterService);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestimonialModule = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
const testimonial_controller_1 = __webpack_require__(99);
const testimonial_service_1 = __webpack_require__(100);
let TestimonialModule = class TestimonialModule {
};
exports.TestimonialModule = TestimonialModule;
exports.TestimonialModule = TestimonialModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [testimonial_controller_1.TestimonialController],
        providers: [testimonial_service_1.TestimonialService],
        exports: [testimonial_service_1.TestimonialService],
    })
], TestimonialModule);


/***/ }),
/* 99 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestimonialController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const testimonial_service_1 = __webpack_require__(100);
let TestimonialController = class TestimonialController {
    constructor(testimonialService) {
        this.testimonialService = testimonialService;
    }
    async create(data) {
        try {
            return await this.testimonialService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.testimonialService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.testimonialService.findOne(data.testimonialId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { testimonialId, ...updateData } = data;
            return await this.testimonialService.update(testimonialId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.testimonialService.softDelete(data.testimonialId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.TestimonialController = TestimonialController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_testimonial' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_testimonials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_testimonial' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_testimonial' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_testimonial' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "softDelete", null);
exports.TestimonialController = TestimonialController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof testimonial_service_1.TestimonialService !== "undefined" && testimonial_service_1.TestimonialService) === "function" ? _a : Object])
], TestimonialController);


/***/ }),
/* 100 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestimonialService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let TestimonialService = class TestimonialService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    get testimonial() {
        return this.prisma.testimonial;
    }
    async create(data) {
        return this.testimonial.create({
            data: {
                name: data.name,
                role: data.role || null,
                message: data.message || null,
                rating: data.rating !== undefined ? data.rating : 5.0,
                image: data.image || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.testimonial.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { testimonialId: 'desc' }],
        });
    }
    async findOne(testimonialId) {
        const item = await this.testimonial.findFirst({
            where: { testimonialId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Testimonial entry with ID ${testimonialId} not found`);
        }
        return item;
    }
    async update(testimonialId, data) {
        await this.findOne(testimonialId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.role !== undefined)
            updatePayload.role = data.role;
        if (data.message !== undefined)
            updatePayload.message = data.message;
        if (data.rating !== undefined)
            updatePayload.rating = data.rating;
        if (data.image !== undefined)
            updatePayload.image = data.image;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.testimonial.update({
            where: { testimonialId },
            data: updatePayload,
        });
    }
    async softDelete(testimonialId, DeletedBy, DeletedRemarks) {
        await this.findOne(testimonialId);
        return this.testimonial.update({
            where: { testimonialId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.TestimonialService = TestimonialService;
exports.TestimonialService = TestimonialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], TestimonialService);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderButtonModule = void 0;
const common_1 = __webpack_require__(5);
const header_button_controller_1 = __webpack_require__(102);
const header_button_service_1 = __webpack_require__(103);
let HeaderButtonModule = class HeaderButtonModule {
};
exports.HeaderButtonModule = HeaderButtonModule;
exports.HeaderButtonModule = HeaderButtonModule = __decorate([
    (0, common_1.Module)({
        controllers: [header_button_controller_1.HeaderButtonController],
        providers: [header_button_service_1.HeaderButtonService],
        exports: [header_button_service_1.HeaderButtonService],
    })
], HeaderButtonModule);


/***/ }),
/* 102 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderButtonController = void 0;
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(3);
const header_button_service_1 = __webpack_require__(103);
let HeaderButtonController = class HeaderButtonController {
    constructor(headerButtonService) {
        this.headerButtonService = headerButtonService;
    }
    async create(data) {
        try {
            return await this.headerButtonService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.headerButtonService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.headerButtonService.findOne(data.headerButtonId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { headerButtonId, ...updateData } = data;
            return await this.headerButtonService.update(headerButtonId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.headerButtonService.softDelete(data.headerButtonId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.HeaderButtonController = HeaderButtonController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_header_button' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeaderButtonController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_header_buttons' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HeaderButtonController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_header_button' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeaderButtonController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_header_button' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeaderButtonController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_header_button' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeaderButtonController.prototype, "softDelete", null);
exports.HeaderButtonController = HeaderButtonController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof header_button_service_1.HeaderButtonService !== "undefined" && header_button_service_1.HeaderButtonService) === "function" ? _a : Object])
], HeaderButtonController);


/***/ }),
/* 103 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderButtonService = void 0;
const common_1 = __webpack_require__(5);
const prisma_1 = __webpack_require__(6);
let HeaderButtonService = class HeaderButtonService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    get headerButton() {
        return this.prisma.headerButton;
    }
    async create(data) {
        return this.headerButton.create({
            data: {
                title: data.title,
                icon: data.icon || null,
                link: data.link || null,
                linkType: data.linkType || null,
                displayOrder: data.displayOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.headerButton.findMany({
            where: { IsDeleted: false },
            orderBy: [{ displayOrder: 'asc' }, { headerButtonId: 'desc' }],
        });
    }
    async findOne(headerButtonId) {
        const item = await this.headerButton.findFirst({
            where: { headerButtonId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Header button with ID ${headerButtonId} not found`);
        }
        return item;
    }
    async update(headerButtonId, data) {
        await this.findOne(headerButtonId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.title !== undefined)
            updatePayload.title = data.title;
        if (data.icon !== undefined)
            updatePayload.icon = data.icon;
        if (data.link !== undefined)
            updatePayload.link = data.link;
        if (data.linkType !== undefined)
            updatePayload.linkType = data.linkType;
        if (data.displayOrder !== undefined)
            updatePayload.displayOrder = data.displayOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.headerButton.update({
            where: { headerButtonId },
            data: updatePayload,
        });
    }
    async softDelete(headerButtonId, DeletedBy, DeletedRemarks) {
        await this.findOne(headerButtonId);
        return this.headerButton.update({
            where: { headerButtonId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy: DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.HeaderButtonService = HeaderButtonService;
exports.HeaderButtonService = HeaderButtonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], HeaderButtonService);


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
const core_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(3);
const student_service_module_1 = __webpack_require__(4);
async function bootstrap() {
    const port = Number(process.env.TCP_PORT ?? 3001);
    const app = await core_1.NestFactory.createMicroservice(student_service_module_1.StudentServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: port,
        },
    });
    await app.listen();
    console.log(`Student Microservice is listening on port ${port} via TCP`);
}
bootstrap();

})();

/******/ })()
;