/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/student-service/src/student-service.module.ts":
/*!************************************************************!*\
  !*** ./apps/student-service/src/student-service.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const students_module_1 = __webpack_require__(/*! ./students/students.module */ "./apps/student-service/src/students/students.module.ts");
let StudentServiceModule = class StudentServiceModule {
};
exports.StudentServiceModule = StudentServiceModule;
exports.StudentServiceModule = StudentServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, students_module_1.StudentsModule],
        controllers: [],
        providers: [],
    })
], StudentServiceModule);


/***/ }),

/***/ "./apps/student-service/src/students/students.controller.ts":
/*!******************************************************************!*\
  !*** ./apps/student-service/src/students/students.controller.ts ***!
  \******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const students_service_1 = __webpack_require__(/*! ./students.service */ "./apps/student-service/src/students/students.service.ts");
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

/***/ "./apps/student-service/src/students/students.module.ts":
/*!**************************************************************!*\
  !*** ./apps/student-service/src/students/students.module.ts ***!
  \**************************************************************/
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
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const students_controller_1 = __webpack_require__(/*! ./students.controller */ "./apps/student-service/src/students/students.controller.ts");
const students_service_1 = __webpack_require__(/*! ./students.service */ "./apps/student-service/src/students/students.service.ts");
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
        ],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
    })
], StudentsModule);


/***/ }),

/***/ "./apps/student-service/src/students/students.service.ts":
/*!***************************************************************!*\
  !*** ./apps/student-service/src/students/students.service.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
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

/***/ "./libs/prisma/src/index.ts":
/*!**********************************!*\
  !*** ./libs/prisma/src/index.ts ***!
  \**********************************/
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
__exportStar(__webpack_require__(/*! ./prisma.module */ "./libs/prisma/src/prisma.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./prisma.service */ "./libs/prisma/src/prisma.service.ts"), exports);


/***/ }),

/***/ "./libs/prisma/src/prisma.module.ts":
/*!******************************************!*\
  !*** ./libs/prisma/src/prisma.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./libs/prisma/src/prisma.service.ts");
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

/***/ "./libs/prisma/src/prisma.service.ts":
/*!*******************************************!*\
  !*** ./libs/prisma/src/prisma.service.ts ***!
  \*******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_mariadb_1 = __webpack_require__(/*! @prisma/adapter-mariadb */ "@prisma/adapter-mariadb");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
function getDbConfig() {
    const databaseUrl = process.env.DATABASE_URL || '';
    try {
        const url = new URL(databaseUrl);
        return {
            host: url.hostname,
            port: url.port ? Number(url.port) : 3306,
            user: url.username,
            password: url.password,
            database: url.pathname.split('?')[0].replace(/^\//, ''),
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

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@prisma/adapter-mariadb":
/*!******************************************!*\
  !*** external "@prisma/adapter-mariadb" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@prisma/adapter-mariadb");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

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
/*!******************************************!*\
  !*** ./apps/student-service/src/main.ts ***!
  \******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_service_module_1 = __webpack_require__(/*! ./student-service.module */ "./apps/student-service/src/student-service.module.ts");
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