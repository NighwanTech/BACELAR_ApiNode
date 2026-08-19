/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/student-service/src/master/academic-session/academic-session.controller.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/master/academic-session/academic-session.controller.ts ***!
  \*****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const academic_session_service_1 = __webpack_require__(/*! ./academic-session.service */ "./apps/student-service/src/master/academic-session/academic-session.service.ts");
let AcademicSessionController = class AcademicSessionController {
    constructor(academicSessionService) {
        this.academicSessionService = academicSessionService;
    }
    async create(data) {
        try {
            return await this.academicSessionService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.academicSessionService.findAll(data?.collegeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.academicSessionService.findOne(data.academicSessionId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { academicSessionId, ...updateData } = data;
            return await this.academicSessionService.update(academicSessionId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.academicSessionService.updateStatus(data.academicSessionId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.academicSessionService.softDelete(data.academicSessionId, data.DeletedBy, data.DeletedRemarks);
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
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_academic_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_academic_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicSessionController.prototype, "softDelete", null);
exports.AcademicSessionController = AcademicSessionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof academic_session_service_1.AcademicSessionService !== "undefined" && academic_session_service_1.AcademicSessionService) === "function" ? _a : Object])
], AcademicSessionController);


/***/ }),

/***/ "./apps/student-service/src/master/academic-session/academic-session.module.ts":
/*!*************************************************************************************!*\
  !*** ./apps/student-service/src/master/academic-session/academic-session.module.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const academic_session_service_1 = __webpack_require__(/*! ./academic-session.service */ "./apps/student-service/src/master/academic-session/academic-session.service.ts");
const academic_session_controller_1 = __webpack_require__(/*! ./academic-session.controller */ "./apps/student-service/src/master/academic-session/academic-session.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let AcademicSessionModule = class AcademicSessionModule {
};
exports.AcademicSessionModule = AcademicSessionModule;
exports.AcademicSessionModule = AcademicSessionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [academic_session_controller_1.AcademicSessionController],
        providers: [academic_session_service_1.AcademicSessionService],
        exports: [academic_session_service_1.AcademicSessionService],
    })
], AcademicSessionModule);


/***/ }),

/***/ "./apps/student-service/src/master/academic-session/academic-session.service.ts":
/*!**************************************************************************************!*\
  !*** ./apps/student-service/src/master/academic-session/academic-session.service.ts ***!
  \**************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let AcademicSessionService = class AcademicSessionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertCollege(collegeId) {
        const college = await this.prisma.collegeMaster.findFirst({
            where: { collegeId, IsDeleted: false },
        });
        if (!college) {
            throw new common_1.NotFoundException(`College with ID ${collegeId} not found`);
        }
        return college;
    }
    async create(data) {
        await this.assertCollege(Number(data.collegeId));
        const academicSessionName = String(data.academicSessionName || '').trim();
        const existing = await this.prisma.academicSession.findFirst({
            where: {
                collegeId: Number(data.collegeId),
                academicSessionName,
                IsDeleted: false,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Academic session name already exists for this college');
        }
        return this.prisma.academicSession.create({
            data: {
                collegeId: Number(data.collegeId),
                academicSessionName,
                startMonth: Number(data.startMonth),
                startYear: Number(data.startYear),
                endMonth: Number(data.endMonth),
                endYear: Number(data.endYear),
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(collegeId) {
        return this.prisma.academicSession.findMany({
            where: {
                IsDeleted: false,
                ...(collegeId ? { collegeId: Number(collegeId) } : {}),
            },
            include: {
                college: {
                    select: {
                        collegeId: true,
                        collegeName: true,
                        shortName: true,
                        collegeCode: true,
                    },
                },
            },
            orderBy: [{ collegeId: 'asc' }, { startYear: 'desc' }, { academicSessionName: 'asc' }],
        });
    }
    async findOne(academicSessionId) {
        const session = await this.prisma.academicSession.findFirst({
            where: { academicSessionId, IsDeleted: false },
            include: {
                college: {
                    select: {
                        collegeId: true,
                        collegeName: true,
                        shortName: true,
                        collegeCode: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Academic session with ID ${academicSessionId} not found`);
        }
        return session;
    }
    async update(academicSessionId, data) {
        const current = await this.findOne(academicSessionId);
        const collegeId = data.collegeId !== undefined ? Number(data.collegeId) : current.collegeId;
        const academicSessionName = data.academicSessionName !== undefined
            ? String(data.academicSessionName).trim()
            : current.academicSessionName;
        if (data.collegeId !== undefined) {
            await this.assertCollege(collegeId);
        }
        const existing = await this.prisma.academicSession.findFirst({
            where: {
                collegeId,
                academicSessionName,
                IsDeleted: false,
                NOT: { academicSessionId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Academic session name already exists for this college');
        }
        return this.prisma.academicSession.update({
            where: { academicSessionId },
            data: {
                collegeId: data.collegeId !== undefined ? collegeId : undefined,
                academicSessionName: data.academicSessionName !== undefined ? academicSessionName : undefined,
                startMonth: data.startMonth !== undefined ? Number(data.startMonth) : undefined,
                startYear: data.startYear !== undefined ? Number(data.startYear) : undefined,
                endMonth: data.endMonth !== undefined ? Number(data.endMonth) : undefined,
                endYear: data.endYear !== undefined ? Number(data.endYear) : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(academicSessionId, IsActive, UpdatedBy) {
        await this.findOne(academicSessionId);
        return this.prisma.academicSession.update({
            where: { academicSessionId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(academicSessionId, DeletedBy, DeletedRemarks) {
        await this.findOne(academicSessionId);
        return this.prisma.academicSession.update({
            where: { academicSessionId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.AcademicSessionService = AcademicSessionService;
exports.AcademicSessionService = AcademicSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], AcademicSessionService);


/***/ }),

/***/ "./apps/student-service/src/master/admission-session/admission-session.controller.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/student-service/src/master/admission-session/admission-session.controller.ts ***!
  \*******************************************************************************************/
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
exports.AdmissionSessionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const admission_session_service_1 = __webpack_require__(/*! ./admission-session.service */ "./apps/student-service/src/master/admission-session/admission-session.service.ts");
let AdmissionSessionController = class AdmissionSessionController {
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
            return await this.sessionService.findOne(data.admissionSessionId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { admissionSessionId, ...updateData } = data;
            return await this.sessionService.update(admissionSessionId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.sessionService.updateStatus(data.admissionSessionId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.sessionService.softDelete(data.admissionSessionId, data.DeletedBy, data.DeletedRemarks);
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
exports.AdmissionSessionController = AdmissionSessionController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_admission_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_admission_sessions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_admission_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_admission_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_admission_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_admission_session' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'bulk_delete_admission_sessions' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionSessionController.prototype, "bulkSoftDelete", null);
exports.AdmissionSessionController = AdmissionSessionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof admission_session_service_1.AdmissionSessionService !== "undefined" && admission_session_service_1.AdmissionSessionService) === "function" ? _a : Object])
], AdmissionSessionController);


/***/ }),

/***/ "./apps/student-service/src/master/admission-session/admission-session.module.ts":
/*!***************************************************************************************!*\
  !*** ./apps/student-service/src/master/admission-session/admission-session.module.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionSessionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admission_session_controller_1 = __webpack_require__(/*! ./admission-session.controller */ "./apps/student-service/src/master/admission-session/admission-session.controller.ts");
const admission_session_service_1 = __webpack_require__(/*! ./admission-session.service */ "./apps/student-service/src/master/admission-session/admission-session.service.ts");
let AdmissionSessionModule = class AdmissionSessionModule {
};
exports.AdmissionSessionModule = AdmissionSessionModule;
exports.AdmissionSessionModule = AdmissionSessionModule = __decorate([
    (0, common_1.Module)({
        controllers: [admission_session_controller_1.AdmissionSessionController],
        providers: [admission_session_service_1.AdmissionSessionService],
    })
], AdmissionSessionModule);


/***/ }),

/***/ "./apps/student-service/src/master/admission-session/admission-session.service.ts":
/*!****************************************************************************************!*\
  !*** ./apps/student-service/src/master/admission-session/admission-session.service.ts ***!
  \****************************************************************************************/
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
exports.AdmissionSessionService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let AdmissionSessionService = class AdmissionSessionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.admissionSession.create({
            data: {
                admissionSessionName: data.admissionSessionName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.admissionSession.findMany({
            where: { IsDeleted: false },
            orderBy: { admissionSessionName: 'asc' },
        });
    }
    async findOne(admissionSessionId) {
        const session = await this.prisma.admissionSession.findFirst({
            where: { admissionSessionId, IsDeleted: false },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Admission Session with ID ${admissionSessionId} not found`);
        }
        return session;
    }
    async update(admissionSessionId, data) {
        await this.findOne(admissionSessionId);
        return this.prisma.admissionSession.update({
            where: { admissionSessionId },
            data: {
                admissionSessionName: data.admissionSessionName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(admissionSessionId, IsActive, UpdatedBy) {
        await this.findOne(admissionSessionId);
        return this.prisma.admissionSession.update({
            where: { admissionSessionId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(admissionSessionId, DeletedBy, DeletedRemarks) {
        await this.findOne(admissionSessionId);
        return this.prisma.admissionSession.update({
            where: { admissionSessionId },
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
        const result = await this.prisma.admissionSession.updateMany({
            where: {
                admissionSessionId: { in: ids },
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
            message: `Successfully soft-deleted ${result.count} admission session(s)`,
            count: result.count,
        };
    }
};
exports.AdmissionSessionService = AdmissionSessionService;
exports.AdmissionSessionService = AdmissionSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], AdmissionSessionService);


/***/ }),

/***/ "./apps/student-service/src/master/board/board.controller.ts":
/*!*******************************************************************!*\
  !*** ./apps/student-service/src/master/board/board.controller.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const board_service_1 = __webpack_require__(/*! ./board.service */ "./apps/student-service/src/master/board/board.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.boardService.updateStatus(data.boardId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/board/board.module.ts":
/*!***************************************************************!*\
  !*** ./apps/student-service/src/master/board/board.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const board_controller_1 = __webpack_require__(/*! ./board.controller */ "./apps/student-service/src/master/board/board.controller.ts");
const board_service_1 = __webpack_require__(/*! ./board.service */ "./apps/student-service/src/master/board/board.service.ts");
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

/***/ "./apps/student-service/src/master/board/board.service.ts":
/*!****************************************************************!*\
  !*** ./apps/student-service/src/master/board/board.service.ts ***!
  \****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(boardId, IsActive, UpdatedBy) {
        await this.findOne(boardId);
        return this.prisma.boardMaster.update({
            where: { boardId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/city/city.controller.ts":
/*!*****************************************************************!*\
  !*** ./apps/student-service/src/master/city/city.controller.ts ***!
  \*****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const city_service_1 = __webpack_require__(/*! ./city.service */ "./apps/student-service/src/master/city/city.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.cityService.updateStatus(data.cityId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_city' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/city/city.module.ts":
/*!*************************************************************!*\
  !*** ./apps/student-service/src/master/city/city.module.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const city_service_1 = __webpack_require__(/*! ./city.service */ "./apps/student-service/src/master/city/city.service.ts");
const city_controller_1 = __webpack_require__(/*! ./city.controller */ "./apps/student-service/src/master/city/city.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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

/***/ "./apps/student-service/src/master/city/city.service.ts":
/*!**************************************************************!*\
  !*** ./apps/student-service/src/master/city/city.service.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(cityId, IsActive, UpdatedBy) {
        await this.findOne(cityId);
        return this.prisma.cityMaster.update({
            where: { cityId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/college/college.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/student-service/src/master/college/college.controller.ts ***!
  \***********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const college_service_1 = __webpack_require__(/*! ./college.service */ "./apps/student-service/src/master/college/college.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.collegeService.updateStatus(data.collegeId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_college' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollegeController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/college/college.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/student-service/src/master/college/college.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollegeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const college_controller_1 = __webpack_require__(/*! ./college.controller */ "./apps/student-service/src/master/college/college.controller.ts");
const college_service_1 = __webpack_require__(/*! ./college.service */ "./apps/student-service/src/master/college/college.service.ts");
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

/***/ "./apps/student-service/src/master/college/college.service.ts":
/*!********************************************************************!*\
  !*** ./apps/student-service/src/master/college/college.service.ts ***!
  \********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(collegeId, IsActive, UpdatedBy) {
        await this.findOne(collegeId);
        return this.collegeMaster.update({
            where: { collegeId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/exam-type/exam-type.controller.ts":
/*!***************************************************************************!*\
  !*** ./apps/student-service/src/master/exam-type/exam-type.controller.ts ***!
  \***************************************************************************/
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
exports.ExamTypeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const exam_type_service_1 = __webpack_require__(/*! ./exam-type.service */ "./apps/student-service/src/master/exam-type/exam-type.service.ts");
let ExamTypeController = class ExamTypeController {
    constructor(examTypeService) {
        this.examTypeService = examTypeService;
    }
    async create(data) {
        try {
            return await this.examTypeService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.examTypeService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.examTypeService.findOne(data.examTypeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { examTypeId, ...updateData } = data;
            return await this.examTypeService.update(examTypeId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.examTypeService.softDelete(data.examTypeId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ExamTypeController = ExamTypeController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_exam_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamTypeController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_exam_types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExamTypeController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_exam_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamTypeController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_exam_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamTypeController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_exam_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamTypeController.prototype, "softDelete", null);
exports.ExamTypeController = ExamTypeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof exam_type_service_1.ExamTypeService !== "undefined" && exam_type_service_1.ExamTypeService) === "function" ? _a : Object])
], ExamTypeController);


/***/ }),

/***/ "./apps/student-service/src/master/exam-type/exam-type.module.ts":
/*!***********************************************************************!*\
  !*** ./apps/student-service/src/master/exam-type/exam-type.module.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExamTypeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const exam_type_controller_1 = __webpack_require__(/*! ./exam-type.controller */ "./apps/student-service/src/master/exam-type/exam-type.controller.ts");
const exam_type_service_1 = __webpack_require__(/*! ./exam-type.service */ "./apps/student-service/src/master/exam-type/exam-type.service.ts");
let ExamTypeModule = class ExamTypeModule {
};
exports.ExamTypeModule = ExamTypeModule;
exports.ExamTypeModule = ExamTypeModule = __decorate([
    (0, common_1.Module)({
        controllers: [exam_type_controller_1.ExamTypeController],
        providers: [exam_type_service_1.ExamTypeService],
        exports: [exam_type_service_1.ExamTypeService],
    })
], ExamTypeModule);


/***/ }),

/***/ "./apps/student-service/src/master/exam-type/exam-type.service.ts":
/*!************************************************************************!*\
  !*** ./apps/student-service/src/master/exam-type/exam-type.service.ts ***!
  \************************************************************************/
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
exports.ExamTypeService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ExamTypeService = class ExamTypeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingName = await this.prisma.examTypeMaster.findFirst({
            where: { examTypeName: data.examTypeName, IsDeleted: false },
        });
        if (existingName) {
            throw new common_1.ConflictException('Exam type name already exists');
        }
        return this.prisma.examTypeMaster.create({
            data: {
                examTypeName: data.examTypeName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.examTypeMaster.findMany({
            where: { IsDeleted: false },
            orderBy: { examTypeName: 'asc' },
        });
    }
    async findOne(examTypeId) {
        const examType = await this.prisma.examTypeMaster.findFirst({
            where: { examTypeId, IsDeleted: false },
        });
        if (!examType) {
            throw new common_1.NotFoundException(`Exam type with ID ${examTypeId} not found`);
        }
        return examType;
    }
    async update(examTypeId, data) {
        await this.findOne(examTypeId);
        if (data.examTypeName) {
            const existingName = await this.prisma.examTypeMaster.findFirst({
                where: {
                    examTypeName: data.examTypeName,
                    IsDeleted: false,
                    NOT: { examTypeId },
                },
            });
            if (existingName) {
                throw new common_1.ConflictException('Exam type name already exists');
            }
        }
        return this.prisma.examTypeMaster.update({
            where: { examTypeId },
            data: {
                examTypeName: data.examTypeName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(examTypeId, DeletedBy, DeletedRemarks) {
        await this.findOne(examTypeId);
        return this.prisma.examTypeMaster.update({
            where: { examTypeId },
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
exports.ExamTypeService = ExamTypeService;
exports.ExamTypeService = ExamTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ExamTypeService);


/***/ }),

/***/ "./apps/student-service/src/master/examination-details/examination-details.controller.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/student-service/src/master/examination-details/examination-details.controller.ts ***!
  \***********************************************************************************************/
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
exports.ExaminationDetailsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const examination_details_service_1 = __webpack_require__(/*! ./examination-details.service */ "./apps/student-service/src/master/examination-details/examination-details.service.ts");
let ExaminationDetailsController = class ExaminationDetailsController {
    constructor(examinationDetailsService) {
        this.examinationDetailsService = examinationDetailsService;
    }
    async create(data) {
        try {
            return await this.examinationDetailsService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.examinationDetailsService.findAll(data?.academicId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.examinationDetailsService.findOne(data.examinationId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { examinationId, ...updateData } = data;
            return await this.examinationDetailsService.update(examinationId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.examinationDetailsService.updateStatus(data.examinationId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.examinationDetailsService.softDelete(data.examinationId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ExaminationDetailsController = ExaminationDetailsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_examination_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExaminationDetailsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_examination_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExaminationDetailsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_examination_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExaminationDetailsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_examination_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExaminationDetailsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_examination_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExaminationDetailsController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_examination_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExaminationDetailsController.prototype, "softDelete", null);
exports.ExaminationDetailsController = ExaminationDetailsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof examination_details_service_1.ExaminationDetailsService !== "undefined" && examination_details_service_1.ExaminationDetailsService) === "function" ? _a : Object])
], ExaminationDetailsController);


/***/ }),

/***/ "./apps/student-service/src/master/examination-details/examination-details.module.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/student-service/src/master/examination-details/examination-details.module.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExaminationDetailsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const examination_details_service_1 = __webpack_require__(/*! ./examination-details.service */ "./apps/student-service/src/master/examination-details/examination-details.service.ts");
const examination_details_controller_1 = __webpack_require__(/*! ./examination-details.controller */ "./apps/student-service/src/master/examination-details/examination-details.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ExaminationDetailsModule = class ExaminationDetailsModule {
};
exports.ExaminationDetailsModule = ExaminationDetailsModule;
exports.ExaminationDetailsModule = ExaminationDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [examination_details_controller_1.ExaminationDetailsController],
        providers: [examination_details_service_1.ExaminationDetailsService],
        exports: [examination_details_service_1.ExaminationDetailsService],
    })
], ExaminationDetailsModule);


/***/ }),

/***/ "./apps/student-service/src/master/examination-details/examination-details.service.ts":
/*!********************************************************************************************!*\
  !*** ./apps/student-service/src/master/examination-details/examination-details.service.ts ***!
  \********************************************************************************************/
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
exports.ExaminationDetailsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ExaminationDetailsService = class ExaminationDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertAcademicSession(academicId) {
        const academicSession = await this.prisma.academicSession.findFirst({
            where: { academicSessionId: academicId, IsDeleted: false },
        });
        if (!academicSession) {
            throw new common_1.NotFoundException(`Academic session with ID ${academicId} not found`);
        }
        return academicSession;
    }
    async create(data) {
        await this.assertAcademicSession(Number(data.academicId));
        const examinationName = String(data.examinationName || '').trim();
        const existing = await this.prisma.examinationDetails.findFirst({
            where: {
                academicId: Number(data.academicId),
                examinationName,
                IsDeleted: false,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Examination name already exists for this academic session');
        }
        return this.prisma.examinationDetails.create({
            data: {
                academicId: Number(data.academicId),
                examinationName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(academicId) {
        return this.prisma.examinationDetails.findMany({
            where: {
                IsDeleted: false,
                ...(academicId ? { academicId: Number(academicId) } : {}),
            },
            include: {
                academicSession: {
                    select: {
                        academicSessionId: true,
                        academicSessionName: true,
                        collegeId: true,
                    },
                },
            },
            orderBy: [{ academicId: 'asc' }, { examinationName: 'asc' }],
        });
    }
    async findOne(examinationId) {
        const examination = await this.prisma.examinationDetails.findFirst({
            where: { examinationId, IsDeleted: false },
            include: {
                academicSession: {
                    select: {
                        academicSessionId: true,
                        academicSessionName: true,
                        collegeId: true,
                    },
                },
            },
        });
        if (!examination) {
            throw new common_1.NotFoundException(`Examination details with ID ${examinationId} not found`);
        }
        return examination;
    }
    async update(examinationId, data) {
        const current = await this.findOne(examinationId);
        const academicId = data.academicId !== undefined ? Number(data.academicId) : current.academicId;
        const examinationName = data.examinationName !== undefined
            ? String(data.examinationName).trim()
            : current.examinationName;
        if (data.academicId !== undefined) {
            await this.assertAcademicSession(academicId);
        }
        const existing = await this.prisma.examinationDetails.findFirst({
            where: {
                academicId,
                examinationName,
                IsDeleted: false,
                NOT: { examinationId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Examination name already exists for this academic session');
        }
        return this.prisma.examinationDetails.update({
            where: { examinationId },
            data: {
                academicId: data.academicId !== undefined ? academicId : undefined,
                examinationName: data.examinationName !== undefined ? examinationName : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(examinationId, IsActive, UpdatedBy) {
        await this.findOne(examinationId);
        return this.prisma.examinationDetails.update({
            where: { examinationId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(examinationId, DeletedBy, DeletedRemarks) {
        await this.findOne(examinationId);
        return this.prisma.examinationDetails.update({
            where: { examinationId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.ExaminationDetailsService = ExaminationDetailsService;
exports.ExaminationDetailsService = ExaminationDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ExaminationDetailsService);


/***/ }),

/***/ "./apps/student-service/src/master/master.module.ts":
/*!**********************************************************!*\
  !*** ./apps/student-service/src/master/master.module.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MasterModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const state_module_1 = __webpack_require__(/*! ./state/state.module */ "./apps/student-service/src/master/state/state.module.ts");
const city_module_1 = __webpack_require__(/*! ./city/city.module */ "./apps/student-service/src/master/city/city.module.ts");
const program_category_module_1 = __webpack_require__(/*! ./program-category/program-category.module */ "./apps/student-service/src/master/program-category/program-category.module.ts");
const subject_module_1 = __webpack_require__(/*! ./subject/subject.module */ "./apps/student-service/src/master/subject/subject.module.ts");
const program_module_1 = __webpack_require__(/*! ./program/program.module */ "./apps/student-service/src/master/program/program.module.ts");
const board_module_1 = __webpack_require__(/*! ./board/board.module */ "./apps/student-service/src/master/board/board.module.ts");
const qualification_module_1 = __webpack_require__(/*! ./qualification/qualification.module */ "./apps/student-service/src/master/qualification/qualification.module.ts");
const admission_session_module_1 = __webpack_require__(/*! ./admission-session/admission-session.module */ "./apps/student-service/src/master/admission-session/admission-session.module.ts");
const academic_session_module_1 = __webpack_require__(/*! ./academic-session/academic-session.module */ "./apps/student-service/src/master/academic-session/academic-session.module.ts");
const program_fee_config_module_1 = __webpack_require__(/*! ./program-fee-config/program-fee-config.module */ "./apps/student-service/src/master/program-fee-config/program-fee-config.module.ts");
const college_module_1 = __webpack_require__(/*! ./college/college.module */ "./apps/student-service/src/master/college/college.module.ts");
const zipcode_module_1 = __webpack_require__(/*! ./zipcode/zipcode.module */ "./apps/student-service/src/master/zipcode/zipcode.module.ts");
const program_eligibility_module_1 = __webpack_require__(/*! ./program-eligibility/program-eligibility.module */ "./apps/student-service/src/master/program-eligibility/program-eligibility.module.ts");
const stream_module_1 = __webpack_require__(/*! ./stream/stream.module */ "./apps/student-service/src/master/stream/stream.module.ts");
const program_subject_module_1 = __webpack_require__(/*! ./program-subject/program-subject.module */ "./apps/student-service/src/master/program-subject/program-subject.module.ts");
const examination_details_module_1 = __webpack_require__(/*! ./examination-details/examination-details.module */ "./apps/student-service/src/master/examination-details/examination-details.module.ts");
const paper_type_module_1 = __webpack_require__(/*! ./paper-type/paper-type.module */ "./apps/student-service/src/master/paper-type/paper-type.module.ts");
const exam_type_module_1 = __webpack_require__(/*! ./exam-type/exam-type.module */ "./apps/student-service/src/master/exam-type/exam-type.module.ts");
const year_module_1 = __webpack_require__(/*! ./year/year.module */ "./apps/student-service/src/master/year/year.module.ts");
const semester_module_1 = __webpack_require__(/*! ./semester/semester.module */ "./apps/student-service/src/master/semester/semester.module.ts");
const paper_detail_module_1 = __webpack_require__(/*! ./paper-detail/paper-detail.module */ "./apps/student-service/src/master/paper-detail/paper-detail.module.ts");
let MasterModule = class MasterModule {
};
exports.MasterModule = MasterModule;
exports.MasterModule = MasterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            state_module_1.StateModule,
            city_module_1.CityModule,
            zipcode_module_1.ZipcodeModule,
            program_category_module_1.ProgramCategoryModule,
            subject_module_1.SubjectModule,
            program_module_1.ProgramModule,
            stream_module_1.StreamModule,
            program_subject_module_1.ProgramSubjectModule,
            program_eligibility_module_1.ProgramEligibilityModule,
            board_module_1.BoardModule,
            qualification_module_1.QualificationModule,
            admission_session_module_1.AdmissionSessionModule,
            academic_session_module_1.AcademicSessionModule,
            examination_details_module_1.ExaminationDetailsModule,
            program_fee_config_module_1.ProgramFeeConfigModule,
            college_module_1.CollegeModule,
            paper_type_module_1.PaperTypeModule,
            exam_type_module_1.ExamTypeModule,
            year_module_1.YearModule,
            semester_module_1.SemesterModule,
            paper_detail_module_1.PaperDetailModule,
        ],
        exports: [
            state_module_1.StateModule,
            city_module_1.CityModule,
            zipcode_module_1.ZipcodeModule,
            program_category_module_1.ProgramCategoryModule,
            subject_module_1.SubjectModule,
            program_module_1.ProgramModule,
            stream_module_1.StreamModule,
            program_subject_module_1.ProgramSubjectModule,
            program_eligibility_module_1.ProgramEligibilityModule,
            board_module_1.BoardModule,
            qualification_module_1.QualificationModule,
            admission_session_module_1.AdmissionSessionModule,
            academic_session_module_1.AcademicSessionModule,
            examination_details_module_1.ExaminationDetailsModule,
            program_fee_config_module_1.ProgramFeeConfigModule,
            college_module_1.CollegeModule,
            paper_type_module_1.PaperTypeModule,
            exam_type_module_1.ExamTypeModule,
            year_module_1.YearModule,
            semester_module_1.SemesterModule,
            paper_detail_module_1.PaperDetailModule,
        ],
    })
], MasterModule);


/***/ }),

/***/ "./apps/student-service/src/master/paper-detail/paper-detail.controller.ts":
/*!*********************************************************************************!*\
  !*** ./apps/student-service/src/master/paper-detail/paper-detail.controller.ts ***!
  \*********************************************************************************/
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
exports.PaperDetailController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const paper_detail_service_1 = __webpack_require__(/*! ./paper-detail.service */ "./apps/student-service/src/master/paper-detail/paper-detail.service.ts");
let PaperDetailController = class PaperDetailController {
    constructor(paperDetailService) {
        this.paperDetailService = paperDetailService;
    }
    async create(data) {
        try {
            return await this.paperDetailService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.paperDetailService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.paperDetailService.findOne(data.paperId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { paperId, ...updateData } = data;
            return await this.paperDetailService.update(paperId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.paperDetailService.softDelete(data.paperId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.PaperDetailController = PaperDetailController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_paper_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperDetailController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_paper_details' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaperDetailController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_paper_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperDetailController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_paper_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperDetailController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_paper_detail' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperDetailController.prototype, "softDelete", null);
exports.PaperDetailController = PaperDetailController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof paper_detail_service_1.PaperDetailService !== "undefined" && paper_detail_service_1.PaperDetailService) === "function" ? _a : Object])
], PaperDetailController);


/***/ }),

/***/ "./apps/student-service/src/master/paper-detail/paper-detail.module.ts":
/*!*****************************************************************************!*\
  !*** ./apps/student-service/src/master/paper-detail/paper-detail.module.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaperDetailModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const paper_detail_controller_1 = __webpack_require__(/*! ./paper-detail.controller */ "./apps/student-service/src/master/paper-detail/paper-detail.controller.ts");
const paper_detail_service_1 = __webpack_require__(/*! ./paper-detail.service */ "./apps/student-service/src/master/paper-detail/paper-detail.service.ts");
let PaperDetailModule = class PaperDetailModule {
};
exports.PaperDetailModule = PaperDetailModule;
exports.PaperDetailModule = PaperDetailModule = __decorate([
    (0, common_1.Module)({
        controllers: [paper_detail_controller_1.PaperDetailController],
        providers: [paper_detail_service_1.PaperDetailService],
        exports: [paper_detail_service_1.PaperDetailService],
    })
], PaperDetailModule);


/***/ }),

/***/ "./apps/student-service/src/master/paper-detail/paper-detail.service.ts":
/*!******************************************************************************!*\
  !*** ./apps/student-service/src/master/paper-detail/paper-detail.service.ts ***!
  \******************************************************************************/
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
exports.PaperDetailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let PaperDetailService = class PaperDetailService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getIncludeRelations() {
        return {
            paperTypeRelation: true,
            examTypeRelation: true,
            program: {
                include: {
                    programCategory: true,
                },
            },
            year: {
                include: {
                    examType: true,
                },
            },
            semester: {
                include: {
                    year: {
                        include: {
                            examType: true,
                        },
                    },
                },
            },
        };
    }
    async create(data) {
        if (data.paperTypeId) {
            const paperTypeObj = await this.prisma.paperTypeMaster.findFirst({
                where: { paperTypeId: data.paperTypeId, IsDeleted: false },
            });
            if (!paperTypeObj) {
                throw new common_1.NotFoundException(`Paper type with ID ${data.paperTypeId} not found`);
            }
        }
        if (data.examTypeId) {
            const examTypeObj = await this.prisma.examTypeMaster.findFirst({
                where: { examTypeId: data.examTypeId, IsDeleted: false },
            });
            if (!examTypeObj) {
                throw new common_1.NotFoundException(`Exam type with ID ${data.examTypeId} not found`);
            }
        }
        if (data.programId) {
            const programObj = await this.prisma.program.findFirst({
                where: { programId: data.programId, IsDeleted: false },
            });
            if (!programObj) {
                throw new common_1.NotFoundException(`Program with ID ${data.programId} not found`);
            }
        }
        if (data.yearId) {
            const yearObj = await this.prisma.yearMaster.findFirst({
                where: { yearId: data.yearId, IsDeleted: false },
            });
            if (!yearObj) {
                throw new common_1.NotFoundException(`Year with ID ${data.yearId} not found`);
            }
        }
        if (data.semId) {
            const semObj = await this.prisma.semesterMaster.findFirst({
                where: { semId: data.semId, IsDeleted: false },
            });
            if (!semObj) {
                throw new common_1.NotFoundException(`Semester with ID ${data.semId} not found`);
            }
        }
        if (data.paperCode) {
            const existingCode = await this.prisma.paperDetailMaster.findFirst({
                where: { paperCode: data.paperCode, IsDeleted: false },
            });
            if (existingCode) {
                throw new common_1.ConflictException(`Paper code '${data.paperCode}' already exists`);
            }
        }
        return this.prisma.paperDetailMaster.create({
            data: {
                paperTypeId: data.paperTypeId || null,
                examTypeId: data.examTypeId || null,
                programId: data.programId || null,
                yearId: data.yearId || null,
                semId: data.semId || null,
                subjectName: data.subjectName || null,
                paperType: data.paperType || null,
                paperName: data.paperName,
                paperCode: data.paperCode || null,
                totalMarksMax: data.totalMarksMax ?? null,
                totalMarksMin: data.totalMarksMin ?? null,
                theoryMarksMax: data.theoryMarksMax ?? null,
                theoryMarksMin: data.theoryMarksMin ?? null,
                sessionalMarksMax: data.sessionalMarksMax ?? null,
                sessionalMarksMin: data.sessionalMarksMin ?? null,
                externalPracticalMarksMax: data.externalPracticalMarksMax ?? null,
                externalPracticalMarksMin: data.externalPracticalMarksMin ?? null,
                internalPracticalMarksMax: data.internalPracticalMarksMax ?? null,
                internalPracticalMarksMin: data.internalPracticalMarksMin ?? null,
                vivaMarksMax: data.vivaMarksMax ?? null,
                vivaMarksMin: data.vivaMarksMin ?? null,
                projectMax: data.projectMax ?? null,
                projectMin: data.projectMin ?? null,
                creditMax: data.creditMax ?? null,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
            include: this.getIncludeRelations(),
        });
    }
    async findAll() {
        return this.prisma.paperDetailMaster.findMany({
            where: { IsDeleted: false },
            include: this.getIncludeRelations(),
            orderBy: { paperName: 'asc' },
        });
    }
    async findOne(paperId) {
        const paper = await this.prisma.paperDetailMaster.findFirst({
            where: { paperId, IsDeleted: false },
            include: this.getIncludeRelations(),
        });
        if (!paper) {
            throw new common_1.NotFoundException(`Paper detail with ID ${paperId} not found`);
        }
        return paper;
    }
    async update(paperId, data) {
        await this.findOne(paperId);
        if (data.paperTypeId) {
            const paperTypeObj = await this.prisma.paperTypeMaster.findFirst({
                where: { paperTypeId: data.paperTypeId, IsDeleted: false },
            });
            if (!paperTypeObj) {
                throw new common_1.NotFoundException(`Paper type with ID ${data.paperTypeId} not found`);
            }
        }
        if (data.examTypeId) {
            const examTypeObj = await this.prisma.examTypeMaster.findFirst({
                where: { examTypeId: data.examTypeId, IsDeleted: false },
            });
            if (!examTypeObj) {
                throw new common_1.NotFoundException(`Exam type with ID ${data.examTypeId} not found`);
            }
        }
        if (data.programId) {
            const programObj = await this.prisma.program.findFirst({
                where: { programId: data.programId, IsDeleted: false },
            });
            if (!programObj) {
                throw new common_1.NotFoundException(`Program with ID ${data.programId} not found`);
            }
        }
        if (data.yearId) {
            const yearObj = await this.prisma.yearMaster.findFirst({
                where: { yearId: data.yearId, IsDeleted: false },
            });
            if (!yearObj) {
                throw new common_1.NotFoundException(`Year with ID ${data.yearId} not found`);
            }
        }
        if (data.semId) {
            const semObj = await this.prisma.semesterMaster.findFirst({
                where: { semId: data.semId, IsDeleted: false },
            });
            if (!semObj) {
                throw new common_1.NotFoundException(`Semester with ID ${data.semId} not found`);
            }
        }
        if (data.paperCode) {
            const existingCode = await this.prisma.paperDetailMaster.findFirst({
                where: {
                    paperCode: data.paperCode,
                    IsDeleted: false,
                    NOT: { paperId },
                },
            });
            if (existingCode) {
                throw new common_1.ConflictException(`Paper code '${data.paperCode}' already exists`);
            }
        }
        return this.prisma.paperDetailMaster.update({
            where: { paperId },
            data: {
                paperTypeId: data.paperTypeId !== undefined ? (data.paperTypeId || null) : undefined,
                examTypeId: data.examTypeId !== undefined ? (data.examTypeId || null) : undefined,
                programId: data.programId !== undefined ? (data.programId || null) : undefined,
                yearId: data.yearId !== undefined ? (data.yearId || null) : undefined,
                semId: data.semId !== undefined ? (data.semId || null) : undefined,
                subjectName: data.subjectName,
                paperType: data.paperType,
                paperName: data.paperName,
                paperCode: data.paperCode,
                totalMarksMax: data.totalMarksMax,
                totalMarksMin: data.totalMarksMin,
                theoryMarksMax: data.theoryMarksMax,
                theoryMarksMin: data.theoryMarksMin,
                sessionalMarksMax: data.sessionalMarksMax,
                sessionalMarksMin: data.sessionalMarksMin,
                externalPracticalMarksMax: data.externalPracticalMarksMax,
                externalPracticalMarksMin: data.externalPracticalMarksMin,
                internalPracticalMarksMax: data.internalPracticalMarksMax,
                internalPracticalMarksMin: data.internalPracticalMarksMin,
                vivaMarksMax: data.vivaMarksMax,
                vivaMarksMin: data.vivaMarksMin,
                projectMax: data.projectMax,
                projectMin: data.projectMin,
                creditMax: data.creditMax,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
            include: this.getIncludeRelations(),
        });
    }
    async softDelete(paperId, DeletedBy, DeletedRemarks) {
        await this.findOne(paperId);
        return this.prisma.paperDetailMaster.update({
            where: { paperId },
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
exports.PaperDetailService = PaperDetailService;
exports.PaperDetailService = PaperDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], PaperDetailService);


/***/ }),

/***/ "./apps/student-service/src/master/paper-type/paper-type.controller.ts":
/*!*****************************************************************************!*\
  !*** ./apps/student-service/src/master/paper-type/paper-type.controller.ts ***!
  \*****************************************************************************/
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
exports.PaperTypeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const paper_type_service_1 = __webpack_require__(/*! ./paper-type.service */ "./apps/student-service/src/master/paper-type/paper-type.service.ts");
let PaperTypeController = class PaperTypeController {
    constructor(paperTypeService) {
        this.paperTypeService = paperTypeService;
    }
    async create(data) {
        try {
            return await this.paperTypeService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.paperTypeService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.paperTypeService.findOne(data.paperTypeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { paperTypeId, ...updateData } = data;
            return await this.paperTypeService.update(paperTypeId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.paperTypeService.softDelete(data.paperTypeId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.PaperTypeController = PaperTypeController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_paper_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperTypeController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_paper_types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaperTypeController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_paper_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperTypeController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_paper_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperTypeController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_paper_type' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaperTypeController.prototype, "softDelete", null);
exports.PaperTypeController = PaperTypeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof paper_type_service_1.PaperTypeService !== "undefined" && paper_type_service_1.PaperTypeService) === "function" ? _a : Object])
], PaperTypeController);


/***/ }),

/***/ "./apps/student-service/src/master/paper-type/paper-type.module.ts":
/*!*************************************************************************!*\
  !*** ./apps/student-service/src/master/paper-type/paper-type.module.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaperTypeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const paper_type_controller_1 = __webpack_require__(/*! ./paper-type.controller */ "./apps/student-service/src/master/paper-type/paper-type.controller.ts");
const paper_type_service_1 = __webpack_require__(/*! ./paper-type.service */ "./apps/student-service/src/master/paper-type/paper-type.service.ts");
let PaperTypeModule = class PaperTypeModule {
};
exports.PaperTypeModule = PaperTypeModule;
exports.PaperTypeModule = PaperTypeModule = __decorate([
    (0, common_1.Module)({
        controllers: [paper_type_controller_1.PaperTypeController],
        providers: [paper_type_service_1.PaperTypeService],
        exports: [paper_type_service_1.PaperTypeService],
    })
], PaperTypeModule);


/***/ }),

/***/ "./apps/student-service/src/master/paper-type/paper-type.service.ts":
/*!**************************************************************************!*\
  !*** ./apps/student-service/src/master/paper-type/paper-type.service.ts ***!
  \**************************************************************************/
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
exports.PaperTypeService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let PaperTypeService = class PaperTypeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingName = await this.prisma.paperTypeMaster.findFirst({
            where: { name: data.name, IsDeleted: false },
        });
        if (existingName) {
            throw new common_1.ConflictException('Paper type name already exists');
        }
        return this.prisma.paperTypeMaster.create({
            data: {
                name: data.name,
                description: data.description || null,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.paperTypeMaster.findMany({
            where: { IsDeleted: false },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(paperTypeId) {
        const paperType = await this.prisma.paperTypeMaster.findFirst({
            where: { paperTypeId, IsDeleted: false },
        });
        if (!paperType) {
            throw new common_1.NotFoundException(`Paper type with ID ${paperTypeId} not found`);
        }
        return paperType;
    }
    async update(paperTypeId, data) {
        await this.findOne(paperTypeId);
        if (data.name) {
            const existingName = await this.prisma.paperTypeMaster.findFirst({
                where: {
                    name: data.name,
                    IsDeleted: false,
                    NOT: { paperTypeId },
                },
            });
            if (existingName) {
                throw new common_1.ConflictException('Paper type name already exists');
            }
        }
        return this.prisma.paperTypeMaster.update({
            where: { paperTypeId },
            data: {
                name: data.name,
                description: data.description,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async softDelete(paperTypeId, DeletedBy, DeletedRemarks) {
        await this.findOne(paperTypeId);
        return this.prisma.paperTypeMaster.update({
            where: { paperTypeId },
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
exports.PaperTypeService = PaperTypeService;
exports.PaperTypeService = PaperTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], PaperTypeService);


/***/ }),

/***/ "./apps/student-service/src/master/program-category/program-category.controller.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-category/program-category.controller.ts ***!
  \*****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_category_service_1 = __webpack_require__(/*! ./program-category.service */ "./apps/student-service/src/master/program-category/program-category.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.programCategoryService.updateStatus(data.programCategoryId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_program_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramCategoryController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/program-category/program-category.module.ts":
/*!*************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-category/program-category.module.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const program_category_service_1 = __webpack_require__(/*! ./program-category.service */ "./apps/student-service/src/master/program-category/program-category.service.ts");
const program_category_controller_1 = __webpack_require__(/*! ./program-category.controller */ "./apps/student-service/src/master/program-category/program-category.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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

/***/ "./apps/student-service/src/master/program-category/program-category.service.ts":
/*!**************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-category/program-category.service.ts ***!
  \**************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(programCategoryId, IsActive, UpdatedBy) {
        await this.findOne(programCategoryId);
        return this.prisma.programCategory.update({
            where: { programCategoryId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/program-eligibility/program-eligibility.controller.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-eligibility/program-eligibility.controller.ts ***!
  \***********************************************************************************************/
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
exports.ProgramEligibilityController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_eligibility_service_1 = __webpack_require__(/*! ./program-eligibility.service */ "./apps/student-service/src/master/program-eligibility/program-eligibility.service.ts");
let ProgramEligibilityController = class ProgramEligibilityController {
    constructor(eligibilityService) {
        this.eligibilityService = eligibilityService;
    }
    async create(data) {
        try {
            return await this.eligibilityService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.eligibilityService.findAll(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.eligibilityService.findOne(data.eligibilityId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { eligibilityId, ...updateData } = data;
            return await this.eligibilityService.update(eligibilityId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.eligibilityService.updateStatus(data.eligibilityId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.eligibilityService.softDelete(data.eligibilityId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async validate(data) {
        try {
            return await this.eligibilityService.validate(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ProgramEligibilityController = ProgramEligibilityController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_program_eligibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_program_eligibilities' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_program_eligibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_program_eligibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_program_eligibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_program_eligibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "softDelete", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validate_program_eligibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramEligibilityController.prototype, "validate", null);
exports.ProgramEligibilityController = ProgramEligibilityController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof program_eligibility_service_1.ProgramEligibilityService !== "undefined" && program_eligibility_service_1.ProgramEligibilityService) === "function" ? _a : Object])
], ProgramEligibilityController);


/***/ }),

/***/ "./apps/student-service/src/master/program-eligibility/program-eligibility.module.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-eligibility/program-eligibility.module.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramEligibilityModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const program_eligibility_service_1 = __webpack_require__(/*! ./program-eligibility.service */ "./apps/student-service/src/master/program-eligibility/program-eligibility.service.ts");
const program_eligibility_controller_1 = __webpack_require__(/*! ./program-eligibility.controller */ "./apps/student-service/src/master/program-eligibility/program-eligibility.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ProgramEligibilityModule = class ProgramEligibilityModule {
};
exports.ProgramEligibilityModule = ProgramEligibilityModule;
exports.ProgramEligibilityModule = ProgramEligibilityModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [program_eligibility_controller_1.ProgramEligibilityController],
        providers: [program_eligibility_service_1.ProgramEligibilityService],
        exports: [program_eligibility_service_1.ProgramEligibilityService],
    })
], ProgramEligibilityModule);


/***/ }),

/***/ "./apps/student-service/src/master/program-eligibility/program-eligibility.service.ts":
/*!********************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-eligibility/program-eligibility.service.ts ***!
  \********************************************************************************************/
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
exports.ProgramEligibilityService = void 0;
exports.categoryMatches = categoryMatches;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const RULE_TYPES = new Set(['SUBJECT', 'MIN_PERCENT', 'STREAM', 'QUALIFICATION']);
const LEVELS = new Set(['10TH', '12TH', 'GRAD', 'PG', 'ALL']);
const SEVERITIES = new Set(['Compulsory', 'Recommended']);
function normalizeCategory(category) {
    return String(category || 'GEN').trim().toUpperCase() || 'GEN';
}
function categoryMatches(ruleCategory, studentCategory) {
    const rule = normalizeCategory(ruleCategory || 'ALL');
    const student = normalizeCategory(studentCategory);
    if (rule === 'ALL')
        return true;
    if (rule === student)
        return true;
    if (rule === 'GENERAL') {
        return ['GEN', 'OBC', 'MINORITY'].includes(student);
    }
    if (rule === 'RESERVED') {
        return ['SC', 'ST'].includes(student);
    }
    return false;
}
let ProgramEligibilityService = class ProgramEligibilityService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertProgram(programId) {
        const program = await this.prisma.program.findFirst({
            where: { programId, IsDeleted: false },
        });
        if (!program) {
            throw new common_1.NotFoundException(`Program with ID ${programId} not found`);
        }
        return program;
    }
    async assertSubjectRuleKeysFromMaster(ruleKey) {
        const codes = String(ruleKey || '')
            .split('|')
            .map((k) => k.trim())
            .filter(Boolean);
        if (codes.length === 0) {
            throw new common_1.BadRequestException('ruleKey is required for SUBJECT rules');
        }
        const found = await this.prisma.subjectMaster.findMany({
            where: {
                IsDeleted: false,
                OR: codes.map((code) => ({
                    subjectCode: { equals: code },
                })),
            },
            select: { subjectCode: true },
        });
        const foundUpper = new Set(found.map((s) => String(s.subjectCode || '').trim().toUpperCase()));
        const missing = codes.filter((c) => !foundUpper.has(c.trim().toUpperCase()));
        if (missing.length > 0) {
            throw new common_1.BadRequestException(`SUBJECT ruleKey must match SubjectMaster.subjectCode. Missing: ${missing.join(', ')}`);
        }
    }
    validateRulePayload(data, partial = false) {
        if (!partial || data.ruleType !== undefined) {
            if (!RULE_TYPES.has(String(data.ruleType))) {
                throw new common_1.BadRequestException('ruleType must be SUBJECT | MIN_PERCENT | STREAM | QUALIFICATION');
            }
        }
        if (!partial || data.qualificationLevel !== undefined) {
            if (!LEVELS.has(String(data.qualificationLevel))) {
                throw new common_1.BadRequestException('qualificationLevel must be 10TH | 12TH | GRAD | PG | ALL');
            }
        }
        if (!partial || data.severity !== undefined) {
            if (data.severity && !SEVERITIES.has(String(data.severity))) {
                throw new common_1.BadRequestException('severity must be Compulsory | Recommended');
            }
        }
        const ruleType = data.ruleType;
        if (ruleType === 'MIN_PERCENT') {
            const pct = data.minPercent;
            if (pct === undefined || pct === null || Number.isNaN(Number(pct))) {
                if (!partial) {
                    throw new common_1.BadRequestException('minPercent is required for MIN_PERCENT rules');
                }
            }
        }
        if (ruleType === 'SUBJECT' || ruleType === 'STREAM' || ruleType === 'QUALIFICATION') {
            if (!partial && !String(data.ruleKey || '').trim()) {
                throw new common_1.BadRequestException(`ruleKey is required for ${ruleType} rules`);
            }
        }
    }
    async create(data) {
        await this.assertProgram(Number(data.programId));
        this.validateRulePayload(data, false);
        const ruleType = String(data.ruleType).trim().toUpperCase();
        if (ruleType === 'SUBJECT') {
            await this.assertSubjectRuleKeysFromMaster(String(data.ruleKey || ''));
        }
        return this.prisma.programEligibility.create({
            data: {
                programId: Number(data.programId),
                ruleType,
                qualificationLevel: String(data.qualificationLevel).trim().toUpperCase(),
                category: String(data.category || 'ALL').trim().toUpperCase(),
                ruleKey: data.ruleKey ? String(data.ruleKey).trim() : null,
                minPercent: data.minPercent !== undefined && data.minPercent !== null
                    ? new client_1.Prisma.Decimal(data.minPercent)
                    : null,
                severity: data.severity || 'Compulsory',
                displayOrder: data.displayOrder ?? 0,
                message: String(data.message).trim(),
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(filters) {
        const eligibility = this.prisma
            .programEligibility;
        if (!eligibility?.findMany) {
            throw new common_1.BadRequestException('Prisma client is outdated (programEligibility missing). Run: npx prisma generate && restart student-service');
        }
        return this.prisma.programEligibility.findMany({
            where: {
                IsDeleted: false,
                ...(filters?.programId ? { programId: Number(filters.programId) } : {}),
                ...(filters?.ruleType
                    ? { ruleType: String(filters.ruleType).trim().toUpperCase() }
                    : {}),
                ...(filters?.severity ? { severity: filters.severity } : {}),
                ...(filters?.category
                    ? {
                        OR: [
                            { category: 'ALL' },
                            { category: String(filters.category).trim().toUpperCase() },
                            ...(normalizeCategory(filters.category) === 'SC' ||
                                normalizeCategory(filters.category) === 'ST'
                                ? [{ category: 'RESERVED' }]
                                : [{ category: 'GENERAL' }]),
                        ],
                    }
                    : {}),
            },
            include: {
                program: {
                    select: {
                        programId: true,
                        programName: true,
                        programShortName: true,
                        programCode: true,
                    },
                },
            },
            orderBy: [{ programId: 'asc' }, { displayOrder: 'asc' }, { eligibilityId: 'asc' }],
        });
    }
    async findOne(eligibilityId) {
        const row = await this.prisma.programEligibility.findFirst({
            where: { eligibilityId, IsDeleted: false },
            include: {
                program: {
                    select: {
                        programId: true,
                        programName: true,
                        programShortName: true,
                        programCode: true,
                    },
                },
            },
        });
        if (!row) {
            throw new common_1.NotFoundException(`Eligibility rule with ID ${eligibilityId} not found`);
        }
        return row;
    }
    async update(eligibilityId, data) {
        const current = await this.findOne(eligibilityId);
        if (data.programId !== undefined) {
            await this.assertProgram(Number(data.programId));
        }
        this.validateRulePayload({
            ruleType: data.ruleType,
            qualificationLevel: data.qualificationLevel,
            severity: data.severity,
            minPercent: data.minPercent,
            ruleKey: data.ruleKey,
        }, true);
        const nextType = data.ruleType
            ? String(data.ruleType).trim().toUpperCase()
            : String(current.ruleType || '').toUpperCase();
        const nextKey = data.ruleKey !== undefined ? data.ruleKey : current.ruleKey;
        if (nextType === 'SUBJECT' && nextKey != null) {
            await this.assertSubjectRuleKeysFromMaster(String(nextKey));
        }
        return this.prisma.programEligibility.update({
            where: { eligibilityId },
            data: {
                programId: data.programId !== undefined ? Number(data.programId) : undefined,
                ruleType: data.ruleType
                    ? String(data.ruleType).trim().toUpperCase()
                    : undefined,
                qualificationLevel: data.qualificationLevel
                    ? String(data.qualificationLevel).trim().toUpperCase()
                    : undefined,
                category: data.category
                    ? String(data.category).trim().toUpperCase()
                    : undefined,
                ruleKey: data.ruleKey !== undefined
                    ? data.ruleKey
                        ? String(data.ruleKey).trim()
                        : null
                    : undefined,
                minPercent: data.minPercent !== undefined
                    ? data.minPercent === null
                        ? null
                        : new client_1.Prisma.Decimal(data.minPercent)
                    : undefined,
                severity: data.severity,
                displayOrder: data.displayOrder,
                message: data.message !== undefined ? String(data.message).trim() : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(eligibilityId, IsActive, UpdatedBy) {
        await this.findOne(eligibilityId);
        return this.prisma.programEligibility.update({
            where: { eligibilityId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(eligibilityId, DeletedBy, DeletedRemarks) {
        await this.findOne(eligibilityId);
        return this.prisma.programEligibility.update({
            where: { eligibilityId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
    async validate(payload) {
        const programId = Number(payload.programId);
        await this.assertProgram(programId);
        const rules = await this.prisma.programEligibility.findMany({
            where: {
                programId,
                IsDeleted: false,
                IsActive: true,
                severity: 'Compulsory',
            },
            orderBy: [{ displayOrder: 'asc' }, { eligibilityId: 'asc' }],
        });
        const category = payload.category || 'GEN';
        const subjectCodes = (payload.twelfthSubjectCodes || []).map((c) => String(c).trim().toUpperCase());
        const stream = String(payload.twelfthStream || '').trim().toUpperCase();
        const errors = [];
        const percentForLevel = (level) => {
            switch (level) {
                case '10TH':
                    return Number(payload.tenthPercentage) || 0;
                case '12TH':
                    return Number(payload.twelfthPercentage) || 0;
                case 'GRAD':
                    return Number(payload.graduationPercentage) || 0;
                case 'PG':
                    return Number(payload.pgPercentage) || 0;
                default:
                    return Number(payload.twelfthPercentage) || 0;
            }
        };
        for (const rule of rules) {
            if (!categoryMatches(rule.category, category))
                continue;
            if (rule.ruleType === 'SUBJECT') {
                const keys = String(rule.ruleKey || '')
                    .split('|')
                    .map((k) => k.trim().toUpperCase())
                    .filter(Boolean);
                const ok = keys.some((k) => subjectCodes.includes(k));
                if (!ok)
                    errors.push(rule.message);
                continue;
            }
            if (rule.ruleType === 'STREAM') {
                const requiredKeys = String(rule.ruleKey || '')
                    .split('|')
                    .map((k) => k.trim().toUpperCase())
                    .filter(Boolean);
                if (requiredKeys.length === 0)
                    continue;
                if (!stream) {
                    errors.push(rule.message);
                }
                else if (!requiredKeys.includes(stream)) {
                    errors.push(rule.message);
                }
                continue;
            }
            if (rule.ruleType === 'MIN_PERCENT') {
                const min = rule.minPercent != null ? Number(rule.minPercent) : NaN;
                if (Number.isNaN(min))
                    continue;
                const actual = percentForLevel(rule.qualificationLevel);
                if (actual < min)
                    errors.push(rule.message);
                continue;
            }
            if (rule.ruleType === 'QUALIFICATION') {
                const key = String(rule.ruleKey || '').trim().toUpperCase();
                if (key === 'GRADUATION' || key === 'GRAD') {
                    if (!payload.hasGraduation)
                        errors.push(rule.message);
                }
                else if (key === 'PG' || key === 'POST_GRADUATION') {
                    if (!payload.hasPg)
                        errors.push(rule.message);
                }
            }
        }
        return {
            ok: errors.length === 0,
            programId,
            category: normalizeCategory(category),
            errors,
        };
    }
};
exports.ProgramEligibilityService = ProgramEligibilityService;
exports.ProgramEligibilityService = ProgramEligibilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ProgramEligibilityService);


/***/ }),

/***/ "./apps/student-service/src/master/program-fee-config/program-fee-config.controller.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-fee-config/program-fee-config.controller.ts ***!
  \*********************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_fee_config_service_1 = __webpack_require__(/*! ./program-fee-config.service */ "./apps/student-service/src/master/program-fee-config/program-fee-config.service.ts");
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
            return await this.feeConfigService.findByProgramAndSession(data.programId, data.admissionSessionId);
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
    async updateStatus(data) {
        try {
            return await this.feeConfigService.updateStatus(data.feeConfigId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_program_fee_config' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramFeeConfigController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/program-fee-config/program-fee-config.module.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-fee-config/program-fee-config.module.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const program_fee_config_controller_1 = __webpack_require__(/*! ./program-fee-config.controller */ "./apps/student-service/src/master/program-fee-config/program-fee-config.controller.ts");
const program_fee_config_service_1 = __webpack_require__(/*! ./program-fee-config.service */ "./apps/student-service/src/master/program-fee-config/program-fee-config.service.ts");
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

/***/ "./apps/student-service/src/master/program-fee-config/program-fee-config.service.ts":
/*!******************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-fee-config/program-fee-config.service.ts ***!
  \******************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
function calculateFinalFee(base, pgRate = 2.0, gstRate = 18.0) {
    const baseNum = Number(base);
    if (!baseNum || baseNum <= 0)
        return 0;
    const pg = pgRate / 100;
    const gst = gstRate / 100;
    const keepRatio = 1 - pg * (1 + gst);
    if (keepRatio <= 0)
        return 0;
    return Number((baseNum / keepRatio).toFixed(3));
}
let ProgramFeeConfigService = class ProgramFeeConfigService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const programId = Number(data.programId);
        const admissionSessionId = Number(data.admissionSessionId);
        if (!Number.isFinite(programId) || programId <= 0) {
            throw new common_1.BadRequestException('programId is required');
        }
        if (!Number.isFinite(admissionSessionId) || admissionSessionId <= 0) {
            throw new common_1.BadRequestException('admissionSessionId is required');
        }
        const duplicate = await this.prisma.programFeeConfig.findFirst({
            where: { programId, admissionSessionId, IsDeleted: false },
        });
        if (duplicate) {
            throw new common_1.ConflictException('Fee configuration already exists for this program. Please edit the existing entry.');
        }
        const regFinal = calculateFinalFee(Number(data.registrationBaseFee ?? 0.0), Number(data.registrationPgRate ?? 2.0), Number(data.registrationGstRate ?? 18.0));
        const examFinal = calculateFinalFee(Number(data.examinationBaseFee ?? 0.0), Number(data.examinationPgRate ?? 2.0), Number(data.examinationGstRate ?? 18.0));
        return this.prisma.programFeeConfig.create({
            data: {
                programId: Number(data.programId),
                admissionSessionId: Number(data.admissionSessionId),
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
                admissionSession: true,
            },
        });
    }
    async findAll() {
        return this.prisma.programFeeConfig.findMany({
            where: { IsDeleted: false },
            include: {
                program: true,
                admissionSession: true,
            },
            orderBy: { CreatedOn: 'desc' },
        });
    }
    async findOne(feeConfigId) {
        const config = await this.prisma.programFeeConfig.findFirst({
            where: { feeConfigId, IsDeleted: false },
            include: {
                program: true,
                admissionSession: true,
            },
        });
        if (!config) {
            throw new common_1.NotFoundException(`Program Fee Configuration with ID ${feeConfigId} not found`);
        }
        return config;
    }
    async findByProgramAndSession(programId, admissionSessionId) {
        const config = await this.prisma.programFeeConfig.findFirst({
            where: { programId, admissionSessionId, IsDeleted: false },
            include: {
                program: true,
                admissionSession: true,
            },
        });
        if (!config) {
            throw new common_1.NotFoundException(`Fee Configuration for Program ID ${programId} and Session ID ${admissionSessionId} not found`);
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
                admissionSessionId: data.admissionSessionId !== undefined ? Number(data.admissionSessionId) : undefined,
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
                admissionSession: true,
            },
        });
    }
    async updateStatus(feeConfigId, IsActive, UpdatedBy) {
        await this.findOne(feeConfigId);
        return this.prisma.programFeeConfig.update({
            where: { feeConfigId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/program-subject/program-subject.controller.ts":
/*!***************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-subject/program-subject.controller.ts ***!
  \***************************************************************************************/
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
exports.ProgramSubjectController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_subject_service_1 = __webpack_require__(/*! ./program-subject.service */ "./apps/student-service/src/master/program-subject/program-subject.service.ts");
let ProgramSubjectController = class ProgramSubjectController {
    constructor(programSubjectService) {
        this.programSubjectService = programSubjectService;
    }
    async create(data) {
        try {
            return await this.programSubjectService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.programSubjectService.findAll(data?.programId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.programSubjectService.findOne(data.programSubjectId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { programSubjectId, ...updateData } = data;
            return await this.programSubjectService.update(programSubjectId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.programSubjectService.updateStatus(data.programSubjectId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.programSubjectService.softDelete(data.programSubjectId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ProgramSubjectController = ProgramSubjectController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_program_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramSubjectController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_program_subjects' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramSubjectController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_program_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramSubjectController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_program_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramSubjectController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_program_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramSubjectController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_program_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramSubjectController.prototype, "softDelete", null);
exports.ProgramSubjectController = ProgramSubjectController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof program_subject_service_1.ProgramSubjectService !== "undefined" && program_subject_service_1.ProgramSubjectService) === "function" ? _a : Object])
], ProgramSubjectController);


/***/ }),

/***/ "./apps/student-service/src/master/program-subject/program-subject.module.ts":
/*!***********************************************************************************!*\
  !*** ./apps/student-service/src/master/program-subject/program-subject.module.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramSubjectModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const program_subject_service_1 = __webpack_require__(/*! ./program-subject.service */ "./apps/student-service/src/master/program-subject/program-subject.service.ts");
const program_subject_controller_1 = __webpack_require__(/*! ./program-subject.controller */ "./apps/student-service/src/master/program-subject/program-subject.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ProgramSubjectModule = class ProgramSubjectModule {
};
exports.ProgramSubjectModule = ProgramSubjectModule;
exports.ProgramSubjectModule = ProgramSubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [program_subject_controller_1.ProgramSubjectController],
        providers: [program_subject_service_1.ProgramSubjectService],
        exports: [program_subject_service_1.ProgramSubjectService],
    })
], ProgramSubjectModule);


/***/ }),

/***/ "./apps/student-service/src/master/program-subject/program-subject.service.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/master/program-subject/program-subject.service.ts ***!
  \************************************************************************************/
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
exports.ProgramSubjectService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ProgramSubjectService = class ProgramSubjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertProgram(programId) {
        const program = await this.prisma.program.findFirst({
            where: { programId, IsDeleted: false },
        });
        if (!program) {
            throw new common_1.NotFoundException(`Program with ID ${programId} not found`);
        }
        return program;
    }
    async create(data) {
        await this.assertProgram(Number(data.programId));
        const programSubjectName = String(data.programSubjectName || '').trim();
        const existing = await this.prisma.programSubjectMaster.findFirst({
            where: {
                programId: Number(data.programId),
                programSubjectName,
                IsDeleted: false,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Program subject name already exists for this program');
        }
        return this.prisma.programSubjectMaster.create({
            data: {
                programId: Number(data.programId),
                programSubjectName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(programId) {
        return this.prisma.programSubjectMaster.findMany({
            where: {
                IsDeleted: false,
                ...(programId ? { programId: Number(programId) } : {}),
            },
            include: {
                program: {
                    select: {
                        programId: true,
                        programName: true,
                        programShortName: true,
                        programCode: true,
                    },
                },
            },
            orderBy: [{ programId: 'asc' }, { programSubjectName: 'asc' }],
        });
    }
    async findOne(programSubjectId) {
        const programSubject = await this.prisma.programSubjectMaster.findFirst({
            where: { programSubjectId, IsDeleted: false },
            include: {
                program: {
                    select: {
                        programId: true,
                        programName: true,
                        programShortName: true,
                        programCode: true,
                    },
                },
            },
        });
        if (!programSubject) {
            throw new common_1.NotFoundException(`Program subject with ID ${programSubjectId} not found`);
        }
        return programSubject;
    }
    async update(programSubjectId, data) {
        const current = await this.findOne(programSubjectId);
        const programId = data.programId !== undefined ? Number(data.programId) : current.programId;
        const programSubjectName = data.programSubjectName !== undefined
            ? String(data.programSubjectName).trim()
            : current.programSubjectName;
        if (data.programId !== undefined) {
            await this.assertProgram(programId);
        }
        const existing = await this.prisma.programSubjectMaster.findFirst({
            where: {
                programId,
                programSubjectName,
                IsDeleted: false,
                NOT: { programSubjectId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Program subject name already exists for this program');
        }
        return this.prisma.programSubjectMaster.update({
            where: { programSubjectId },
            data: {
                programId: data.programId !== undefined ? programId : undefined,
                programSubjectName: data.programSubjectName !== undefined ? programSubjectName : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(programSubjectId, IsActive, UpdatedBy) {
        await this.findOne(programSubjectId);
        return this.prisma.programSubjectMaster.update({
            where: { programSubjectId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(programSubjectId, DeletedBy, DeletedRemarks) {
        await this.findOne(programSubjectId);
        return this.prisma.programSubjectMaster.update({
            where: { programSubjectId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.ProgramSubjectService = ProgramSubjectService;
exports.ProgramSubjectService = ProgramSubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ProgramSubjectService);


/***/ }),

/***/ "./apps/student-service/src/master/program/program.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/student-service/src/master/program/program.controller.ts ***!
  \***********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_service_1 = __webpack_require__(/*! ./program.service */ "./apps/student-service/src/master/program/program.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.programService.updateStatus(data.programId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_program' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/program/program.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/student-service/src/master/program/program.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const program_controller_1 = __webpack_require__(/*! ./program.controller */ "./apps/student-service/src/master/program/program.controller.ts");
const program_service_1 = __webpack_require__(/*! ./program.service */ "./apps/student-service/src/master/program/program.service.ts");
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

/***/ "./apps/student-service/src/master/program/program.service.ts":
/*!********************************************************************!*\
  !*** ./apps/student-service/src/master/program/program.service.ts ***!
  \********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(programId, IsActive, UpdatedBy) {
        await this.findOne(programId);
        return this.prisma.program.update({
            where: { programId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/qualification/qualification.controller.ts":
/*!***********************************************************************************!*\
  !*** ./apps/student-service/src/master/qualification/qualification.controller.ts ***!
  \***********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const qualification_service_1 = __webpack_require__(/*! ./qualification.service */ "./apps/student-service/src/master/qualification/qualification.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.qualificationService.updateStatus(data.qualificationId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_qualification' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QualificationController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/qualification/qualification.module.ts":
/*!*******************************************************************************!*\
  !*** ./apps/student-service/src/master/qualification/qualification.module.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const qualification_controller_1 = __webpack_require__(/*! ./qualification.controller */ "./apps/student-service/src/master/qualification/qualification.controller.ts");
const qualification_service_1 = __webpack_require__(/*! ./qualification.service */ "./apps/student-service/src/master/qualification/qualification.service.ts");
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

/***/ "./apps/student-service/src/master/qualification/qualification.service.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/master/qualification/qualification.service.ts ***!
  \********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(qualificationId, IsActive, UpdatedBy) {
        await this.findOne(qualificationId);
        return this.prisma.qualificationMaster.update({
            where: { qualificationId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/semester/semester.controller.ts":
/*!*************************************************************************!*\
  !*** ./apps/student-service/src/master/semester/semester.controller.ts ***!
  \*************************************************************************/
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
exports.SemesterController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const semester_service_1 = __webpack_require__(/*! ./semester.service */ "./apps/student-service/src/master/semester/semester.service.ts");
let SemesterController = class SemesterController {
    constructor(semesterService) {
        this.semesterService = semesterService;
    }
    async create(data) {
        try {
            return await this.semesterService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.semesterService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.semesterService.findOne(data.semId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { semId, ...updateData } = data;
            return await this.semesterService.update(semId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.semesterService.softDelete(data.semId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.SemesterController = SemesterController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_semester' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_semesters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_semester' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_semester' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_semester' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SemesterController.prototype, "softDelete", null);
exports.SemesterController = SemesterController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof semester_service_1.SemesterService !== "undefined" && semester_service_1.SemesterService) === "function" ? _a : Object])
], SemesterController);


/***/ }),

/***/ "./apps/student-service/src/master/semester/semester.module.ts":
/*!*********************************************************************!*\
  !*** ./apps/student-service/src/master/semester/semester.module.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemesterModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const semester_controller_1 = __webpack_require__(/*! ./semester.controller */ "./apps/student-service/src/master/semester/semester.controller.ts");
const semester_service_1 = __webpack_require__(/*! ./semester.service */ "./apps/student-service/src/master/semester/semester.service.ts");
let SemesterModule = class SemesterModule {
};
exports.SemesterModule = SemesterModule;
exports.SemesterModule = SemesterModule = __decorate([
    (0, common_1.Module)({
        controllers: [semester_controller_1.SemesterController],
        providers: [semester_service_1.SemesterService],
        exports: [semester_service_1.SemesterService],
    })
], SemesterModule);


/***/ }),

/***/ "./apps/student-service/src/master/semester/semester.service.ts":
/*!**********************************************************************!*\
  !*** ./apps/student-service/src/master/semester/semester.service.ts ***!
  \**********************************************************************/
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
exports.SemesterService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let SemesterService = class SemesterService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (data.yearId) {
            const year = await this.prisma.yearMaster.findFirst({
                where: { yearId: data.yearId, IsDeleted: false },
            });
            if (!year) {
                throw new common_1.NotFoundException(`Year with ID ${data.yearId} not found`);
            }
        }
        const whereCondition = {
            semesterName: data.semesterName,
            IsDeleted: false,
        };
        if (data.yearId) {
            whereCondition.yearId = data.yearId;
        }
        else {
            whereCondition.yearId = null;
        }
        const existingSemester = await this.prisma.semesterMaster.findFirst({
            where: whereCondition,
        });
        if (existingSemester) {
            throw new common_1.ConflictException(`Semester '${data.semesterName}' already exists`);
        }
        return this.prisma.semesterMaster.create({
            data: {
                yearId: data.yearId ? data.yearId : null,
                semesterName: data.semesterName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                year: {
                    include: {
                        examType: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.semesterMaster.findMany({
            where: { IsDeleted: false },
            include: {
                year: {
                    include: {
                        examType: true,
                    },
                },
            },
            orderBy: { semesterName: 'asc' },
        });
    }
    async findOne(semId) {
        const semester = await this.prisma.semesterMaster.findFirst({
            where: { semId, IsDeleted: false },
            include: {
                year: {
                    include: {
                        examType: true,
                    },
                },
            },
        });
        if (!semester) {
            throw new common_1.NotFoundException(`Semester with ID ${semId} not found`);
        }
        return semester;
    }
    async update(semId, data) {
        const currentSemester = await this.findOne(semId);
        const targetYearId = data.yearId !== undefined ? data.yearId : currentSemester.yearId;
        const targetSemesterName = data.semesterName !== undefined ? data.semesterName : currentSemester.semesterName;
        if (data.yearId) {
            const year = await this.prisma.yearMaster.findFirst({
                where: { yearId: data.yearId, IsDeleted: false },
            });
            if (!year) {
                throw new common_1.NotFoundException(`Year with ID ${data.yearId} not found`);
            }
        }
        if (data.semesterName !== undefined || data.yearId !== undefined) {
            const whereCondition = {
                semesterName: targetSemesterName,
                IsDeleted: false,
                NOT: { semId },
            };
            if (targetYearId) {
                whereCondition.yearId = targetYearId;
            }
            else {
                whereCondition.yearId = null;
            }
            const existingSemester = await this.prisma.semesterMaster.findFirst({
                where: whereCondition,
            });
            if (existingSemester) {
                throw new common_1.ConflictException(`Semester '${targetSemesterName}' already exists`);
            }
        }
        return this.prisma.semesterMaster.update({
            where: { semId },
            data: {
                yearId: data.yearId !== undefined ? (data.yearId || null) : undefined,
                semesterName: data.semesterName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
            include: {
                year: {
                    include: {
                        examType: true,
                    },
                },
            },
        });
    }
    async softDelete(semId, DeletedBy, DeletedRemarks) {
        await this.findOne(semId);
        return this.prisma.semesterMaster.update({
            where: { semId },
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
exports.SemesterService = SemesterService;
exports.SemesterService = SemesterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], SemesterService);


/***/ }),

/***/ "./apps/student-service/src/master/state/state.controller.ts":
/*!*******************************************************************!*\
  !*** ./apps/student-service/src/master/state/state.controller.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const state_service_1 = __webpack_require__(/*! ./state.service */ "./apps/student-service/src/master/state/state.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.stateService.updateStatus(data.stateId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_state' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StateController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/state/state.module.ts":
/*!***************************************************************!*\
  !*** ./apps/student-service/src/master/state/state.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const state_service_1 = __webpack_require__(/*! ./state.service */ "./apps/student-service/src/master/state/state.service.ts");
const state_controller_1 = __webpack_require__(/*! ./state.controller */ "./apps/student-service/src/master/state/state.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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

/***/ "./apps/student-service/src/master/state/state.service.ts":
/*!****************************************************************!*\
  !*** ./apps/student-service/src/master/state/state.service.ts ***!
  \****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(stateId, IsActive, UpdatedBy) {
        await this.findOne(stateId);
        return this.prisma.stateMaster.update({
            where: { stateId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/stream/stream.controller.ts":
/*!*********************************************************************!*\
  !*** ./apps/student-service/src/master/stream/stream.controller.ts ***!
  \*********************************************************************/
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
exports.StreamController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const stream_service_1 = __webpack_require__(/*! ./stream.service */ "./apps/student-service/src/master/stream/stream.service.ts");
let StreamController = class StreamController {
    constructor(streamService) {
        this.streamService = streamService;
    }
    async create(data) {
        try {
            return await this.streamService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.streamService.findAll(data?.programId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.streamService.findOne(data.streamId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { streamId, ...updateData } = data;
            return await this.streamService.update(streamId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.streamService.updateStatus(data.streamId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.streamService.softDelete(data.streamId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StreamController = StreamController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_stream' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_streams' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_stream' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_stream' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_stream' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_stream' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "softDelete", null);
exports.StreamController = StreamController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof stream_service_1.StreamService !== "undefined" && stream_service_1.StreamService) === "function" ? _a : Object])
], StreamController);


/***/ }),

/***/ "./apps/student-service/src/master/stream/stream.module.ts":
/*!*****************************************************************!*\
  !*** ./apps/student-service/src/master/stream/stream.module.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const stream_service_1 = __webpack_require__(/*! ./stream.service */ "./apps/student-service/src/master/stream/stream.service.ts");
const stream_controller_1 = __webpack_require__(/*! ./stream.controller */ "./apps/student-service/src/master/stream/stream.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let StreamModule = class StreamModule {
};
exports.StreamModule = StreamModule;
exports.StreamModule = StreamModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [stream_controller_1.StreamController],
        providers: [stream_service_1.StreamService],
        exports: [stream_service_1.StreamService],
    })
], StreamModule);


/***/ }),

/***/ "./apps/student-service/src/master/stream/stream.service.ts":
/*!******************************************************************!*\
  !*** ./apps/student-service/src/master/stream/stream.service.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let StreamService = class StreamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertProgram(programId) {
        const program = await this.prisma.program.findFirst({
            where: { programId, IsDeleted: false },
        });
        if (!program) {
            throw new common_1.NotFoundException(`Program with ID ${programId} not found`);
        }
        return program;
    }
    async create(data) {
        await this.assertProgram(Number(data.programId));
        const streamName = String(data.streamName || '').trim();
        const existing = await this.prisma.streamMaster.findFirst({
            where: {
                programId: Number(data.programId),
                streamName,
                IsDeleted: false,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Stream name already exists for this program');
        }
        return this.prisma.streamMaster.create({
            data: {
                programId: Number(data.programId),
                streamName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(programId) {
        return this.prisma.streamMaster.findMany({
            where: {
                IsDeleted: false,
                ...(programId ? { programId: Number(programId) } : {}),
            },
            include: {
                program: {
                    select: {
                        programId: true,
                        programName: true,
                        programShortName: true,
                        programCode: true,
                    },
                },
            },
            orderBy: [{ programId: 'asc' }, { streamName: 'asc' }],
        });
    }
    async findOne(streamId) {
        const stream = await this.prisma.streamMaster.findFirst({
            where: { streamId, IsDeleted: false },
            include: {
                program: {
                    select: {
                        programId: true,
                        programName: true,
                        programShortName: true,
                        programCode: true,
                    },
                },
            },
        });
        if (!stream) {
            throw new common_1.NotFoundException(`Stream with ID ${streamId} not found`);
        }
        return stream;
    }
    async update(streamId, data) {
        const current = await this.findOne(streamId);
        const programId = data.programId !== undefined ? Number(data.programId) : current.programId;
        const streamName = data.streamName !== undefined
            ? String(data.streamName).trim()
            : current.streamName;
        if (data.programId !== undefined) {
            await this.assertProgram(programId);
        }
        const existing = await this.prisma.streamMaster.findFirst({
            where: {
                programId,
                streamName,
                IsDeleted: false,
                NOT: { streamId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Stream name already exists for this program');
        }
        return this.prisma.streamMaster.update({
            where: { streamId },
            data: {
                programId: data.programId !== undefined ? programId : undefined,
                streamName: data.streamName !== undefined ? streamName : undefined,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(streamId, IsActive, UpdatedBy) {
        await this.findOne(streamId);
        return this.prisma.streamMaster.update({
            where: { streamId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(streamId, DeletedBy, DeletedRemarks) {
        await this.findOne(streamId);
        return this.prisma.streamMaster.update({
            where: { streamId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.StreamService = StreamService;
exports.StreamService = StreamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StreamService);


/***/ }),

/***/ "./apps/student-service/src/master/subject/subject.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/student-service/src/master/subject/subject.controller.ts ***!
  \***********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const subject_service_1 = __webpack_require__(/*! ./subject.service */ "./apps/student-service/src/master/subject/subject.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.subjectService.updateStatus(data.subjectId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_subject' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/master/subject/subject.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/student-service/src/master/subject/subject.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const subject_service_1 = __webpack_require__(/*! ./subject.service */ "./apps/student-service/src/master/subject/subject.service.ts");
const subject_controller_1 = __webpack_require__(/*! ./subject.controller */ "./apps/student-service/src/master/subject/subject.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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

/***/ "./apps/student-service/src/master/subject/subject.service.ts":
/*!********************************************************************!*\
  !*** ./apps/student-service/src/master/subject/subject.service.ts ***!
  \********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(subjectId, IsActive, UpdatedBy) {
        await this.findOne(subjectId);
        return this.prisma.subjectMaster.update({
            where: { subjectId },
            data: {
                IsActive,
                UpdatedBy,
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

/***/ "./apps/student-service/src/master/year/year.controller.ts":
/*!*****************************************************************!*\
  !*** ./apps/student-service/src/master/year/year.controller.ts ***!
  \*****************************************************************/
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
exports.YearController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const year_service_1 = __webpack_require__(/*! ./year.service */ "./apps/student-service/src/master/year/year.service.ts");
let YearController = class YearController {
    constructor(yearService) {
        this.yearService = yearService;
    }
    async create(data) {
        try {
            return await this.yearService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.yearService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.yearService.findOne(data.yearId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { yearId, ...updateData } = data;
            return await this.yearService.update(yearId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.yearService.softDelete(data.yearId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.YearController = YearController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_year' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], YearController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_years' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], YearController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_year' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], YearController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_year' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], YearController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_year' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], YearController.prototype, "softDelete", null);
exports.YearController = YearController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof year_service_1.YearService !== "undefined" && year_service_1.YearService) === "function" ? _a : Object])
], YearController);


/***/ }),

/***/ "./apps/student-service/src/master/year/year.module.ts":
/*!*************************************************************!*\
  !*** ./apps/student-service/src/master/year/year.module.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.YearModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const year_controller_1 = __webpack_require__(/*! ./year.controller */ "./apps/student-service/src/master/year/year.controller.ts");
const year_service_1 = __webpack_require__(/*! ./year.service */ "./apps/student-service/src/master/year/year.service.ts");
let YearModule = class YearModule {
};
exports.YearModule = YearModule;
exports.YearModule = YearModule = __decorate([
    (0, common_1.Module)({
        controllers: [year_controller_1.YearController],
        providers: [year_service_1.YearService],
        exports: [year_service_1.YearService],
    })
], YearModule);


/***/ }),

/***/ "./apps/student-service/src/master/year/year.service.ts":
/*!**************************************************************!*\
  !*** ./apps/student-service/src/master/year/year.service.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.YearService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let YearService = class YearService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        if (data.typeId) {
            const examType = await this.prisma.examTypeMaster.findFirst({
                where: { examTypeId: data.typeId, IsDeleted: false },
            });
            if (!examType) {
                throw new common_1.NotFoundException(`Exam type with ID ${data.typeId} not found`);
            }
        }
        const whereCondition = {
            yearName: data.yearName,
            IsDeleted: false,
        };
        if (data.typeId) {
            whereCondition.typeId = data.typeId;
        }
        else {
            whereCondition.typeId = null;
        }
        const existingYear = await this.prisma.yearMaster.findFirst({
            where: whereCondition,
        });
        if (existingYear) {
            throw new common_1.ConflictException(`Year '${data.yearName}' already exists`);
        }
        return this.prisma.yearMaster.create({
            data: {
                typeId: data.typeId ? data.typeId : null,
                yearName: data.yearName,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
            include: {
                examType: true,
            },
        });
    }
    async findAll() {
        return this.prisma.yearMaster.findMany({
            where: { IsDeleted: false },
            include: {
                examType: true,
            },
            orderBy: { yearName: 'asc' },
        });
    }
    async findOne(yearId) {
        const year = await this.prisma.yearMaster.findFirst({
            where: { yearId, IsDeleted: false },
            include: {
                examType: true,
            },
        });
        if (!year) {
            throw new common_1.NotFoundException(`Year with ID ${yearId} not found`);
        }
        return year;
    }
    async update(yearId, data) {
        const currentYear = await this.findOne(yearId);
        const targetTypeId = data.typeId !== undefined ? data.typeId : currentYear.typeId;
        const targetYearName = data.yearName !== undefined ? data.yearName : currentYear.yearName;
        if (data.typeId) {
            const examType = await this.prisma.examTypeMaster.findFirst({
                where: { examTypeId: data.typeId, IsDeleted: false },
            });
            if (!examType) {
                throw new common_1.NotFoundException(`Exam type with ID ${data.typeId} not found`);
            }
        }
        if (data.yearName !== undefined || data.typeId !== undefined) {
            const whereCondition = {
                yearName: targetYearName,
                IsDeleted: false,
                NOT: { yearId },
            };
            if (targetTypeId) {
                whereCondition.typeId = targetTypeId;
            }
            else {
                whereCondition.typeId = null;
            }
            const existingYear = await this.prisma.yearMaster.findFirst({
                where: whereCondition,
            });
            if (existingYear) {
                throw new common_1.ConflictException(`Year '${targetYearName}' already exists`);
            }
        }
        return this.prisma.yearMaster.update({
            where: { yearId },
            data: {
                typeId: data.typeId !== undefined ? (data.typeId || null) : undefined,
                yearName: data.yearName,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
            include: {
                examType: true,
            },
        });
    }
    async softDelete(yearId, DeletedBy, DeletedRemarks) {
        await this.findOne(yearId);
        return this.prisma.yearMaster.update({
            where: { yearId },
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
exports.YearService = YearService;
exports.YearService = YearService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], YearService);


/***/ }),

/***/ "./apps/student-service/src/master/zipcode/zipcode.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/student-service/src/master/zipcode/zipcode.controller.ts ***!
  \***********************************************************************/
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
exports.ZipcodeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const zipcode_service_1 = __webpack_require__(/*! ./zipcode.service */ "./apps/student-service/src/master/zipcode/zipcode.service.ts");
let ZipcodeController = class ZipcodeController {
    constructor(zipcodeService) {
        this.zipcodeService = zipcodeService;
    }
    async create(data) {
        try {
            return await this.zipcodeService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.zipcodeService.findAll(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.zipcodeService.findOne(data.zipcodeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { zipcodeId, ...updateData } = data;
            return await this.zipcodeService.update(zipcodeId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async updateStatus(data) {
        try {
            return await this.zipcodeService.updateStatus(data.zipcodeId, data.IsActive, data.UpdatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.zipcodeService.softDelete(data.zipcodeId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.ZipcodeController = ZipcodeController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_zipcode' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZipcodeController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_zipcodes' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZipcodeController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_zipcode' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZipcodeController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_zipcode' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZipcodeController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_zipcode' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZipcodeController.prototype, "updateStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_zipcode' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZipcodeController.prototype, "softDelete", null);
exports.ZipcodeController = ZipcodeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof zipcode_service_1.ZipcodeService !== "undefined" && zipcode_service_1.ZipcodeService) === "function" ? _a : Object])
], ZipcodeController);


/***/ }),

/***/ "./apps/student-service/src/master/zipcode/zipcode.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/student-service/src/master/zipcode/zipcode.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZipcodeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const zipcode_service_1 = __webpack_require__(/*! ./zipcode.service */ "./apps/student-service/src/master/zipcode/zipcode.service.ts");
const zipcode_controller_1 = __webpack_require__(/*! ./zipcode.controller */ "./apps/student-service/src/master/zipcode/zipcode.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ZipcodeModule = class ZipcodeModule {
};
exports.ZipcodeModule = ZipcodeModule;
exports.ZipcodeModule = ZipcodeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [zipcode_controller_1.ZipcodeController],
        providers: [zipcode_service_1.ZipcodeService],
        exports: [zipcode_service_1.ZipcodeService],
    })
], ZipcodeModule);


/***/ }),

/***/ "./apps/student-service/src/master/zipcode/zipcode.service.ts":
/*!********************************************************************!*\
  !*** ./apps/student-service/src/master/zipcode/zipcode.service.ts ***!
  \********************************************************************/
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
exports.ZipcodeService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let ZipcodeService = class ZipcodeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingLocality = await this.prisma.zipcodeMaster.findFirst({
            where: {
                cityId: data.cityId,
                locality: data.locality,
                IsDeleted: false,
            },
        });
        if (existingLocality) {
            throw new common_1.ConflictException('This locality already has a zipcode in this city');
        }
        return this.prisma.zipcodeMaster.create({
            data: {
                zipCode: data.zipCode,
                stateId: data.stateId,
                cityId: data.cityId,
                locality: data.locality,
                CreatedBy: data.CreatedBy,
                Remarks: data.Remarks || null,
                IsActive: true,
                IsDeleted: false,
            },
        });
    }
    async findAll(filters) {
        return this.prisma.zipcodeMaster.findMany({
            where: {
                IsDeleted: false,
                ...(filters?.stateId ? { stateId: Number(filters.stateId) } : {}),
                ...(filters?.cityId ? { cityId: Number(filters.cityId) } : {}),
                ...(filters?.zipCode
                    ? { zipCode: String(filters.zipCode).trim() }
                    : {}),
            },
            orderBy: { zipCode: 'asc' },
        });
    }
    async findOne(zipcodeId) {
        const zipcode = await this.prisma.zipcodeMaster.findFirst({
            where: { zipcodeId, IsDeleted: false },
        });
        if (!zipcode) {
            throw new common_1.NotFoundException(`Zipcode with ID ${zipcodeId} not found`);
        }
        return zipcode;
    }
    async update(zipcodeId, data) {
        const current = await this.findOne(zipcodeId);
        const cityId = data.cityId ?? current.cityId;
        const locality = data.locality ?? current.locality;
        if (locality !== undefined && cityId !== undefined) {
            const existingLocality = await this.prisma.zipcodeMaster.findFirst({
                where: {
                    cityId,
                    locality,
                    IsDeleted: false,
                    NOT: { zipcodeId },
                },
            });
            if (existingLocality) {
                throw new common_1.ConflictException('This locality already has a zipcode in this city');
            }
        }
        return this.prisma.zipcodeMaster.update({
            where: { zipcodeId },
            data: {
                zipCode: data.zipCode,
                stateId: data.stateId,
                cityId: data.cityId,
                locality: data.locality,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
                Remarks: data.Remarks,
            },
        });
    }
    async updateStatus(zipcodeId, IsActive, UpdatedBy) {
        await this.findOne(zipcodeId);
        return this.prisma.zipcodeMaster.update({
            where: { zipcodeId },
            data: {
                IsActive,
                UpdatedBy,
            },
        });
    }
    async softDelete(zipcodeId, DeletedBy, DeletedRemarks) {
        await this.findOne(zipcodeId);
        return this.prisma.zipcodeMaster.update({
            where: { zipcodeId },
            data: {
                IsDeleted: true,
                IsActive: false,
                DeletedOn: new Date(),
                DeletedBy,
                DeletedRemarks: DeletedRemarks || null,
            },
        });
    }
};
exports.ZipcodeService = ZipcodeService;
exports.ZipcodeService = ZipcodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ZipcodeService);


/***/ }),

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
const master_module_1 = __webpack_require__(/*! ./master/master.module */ "./apps/student-service/src/master/master.module.ts");
const website_module_1 = __webpack_require__(/*! ./website/website.module */ "./apps/student-service/src/website/website.module.ts");
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

/***/ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.controller.ts":
/*!***********************************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-academic-subject/student-academic-subject.controller.ts ***!
  \***********************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_academic_subject_service_1 = __webpack_require__(/*! ./student-academic-subject.service */ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.service.ts");
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

/***/ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.module.ts":
/*!*******************************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-academic-subject/student-academic-subject.module.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicSubjectModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const student_academic_subject_controller_1 = __webpack_require__(/*! ./student-academic-subject.controller */ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.controller.ts");
const student_academic_subject_service_1 = __webpack_require__(/*! ./student-academic-subject.service */ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.service.ts");
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

/***/ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.service.ts":
/*!********************************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-academic-subject/student-academic-subject.service.ts ***!
  \********************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const student_academic_service_1 = __webpack_require__(/*! ../student-academic/student-academic.service */ "./apps/student-service/src/students/student-academic/student-academic.service.ts");
let StudentAcademicSubjectService = class StudentAcademicSubjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const maxMarks = Number(data.maxMarks);
        const obtainedMarks = Number(data.obtainedMarks);
        const computed = (0, student_academic_service_1.computeAcademicResult)({ maxMarks, obtainedMarks });
        return this.prisma.studentAcademicSubject.create({
            data: {
                academicDetailId: Number(data.academicDetailId),
                subjectId: Number(data.subjectId),
                maxMarks,
                minMarks: Number(data.minMarks ?? 33),
                obtainedMarks,
                grade: data.grade || computed.grade,
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
        const existing = await this.findOne(studentAcademicSubjectId);
        const maxMarks = data.maxMarks !== undefined ? Number(data.maxMarks) : Number(existing.maxMarks);
        const obtainedMarks = data.obtainedMarks !== undefined
            ? Number(data.obtainedMarks)
            : Number(existing.obtainedMarks);
        const computed = (0, student_academic_service_1.computeAcademicResult)({ maxMarks, obtainedMarks });
        return this.prisma.studentAcademicSubject.update({
            where: { studentAcademicSubjectId },
            data: {
                academicDetailId: data.academicDetailId ? Number(data.academicDetailId) : undefined,
                subjectId: data.subjectId ? Number(data.subjectId) : undefined,
                maxMarks: data.maxMarks !== undefined ? maxMarks : undefined,
                minMarks: data.minMarks !== undefined ? Number(data.minMarks) : undefined,
                obtainedMarks: data.obtainedMarks !== undefined ? obtainedMarks : undefined,
                grade: data.grade !== undefined && data.grade !== null && data.grade !== ''
                    ? data.grade
                    : computed.grade,
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

/***/ "./apps/student-service/src/students/student-academic/student-academic.controller.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-academic/student-academic.controller.ts ***!
  \*******************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_academic_service_1 = __webpack_require__(/*! ./student-academic.service */ "./apps/student-service/src/students/student-academic/student-academic.service.ts");
let StudentAcademicController = class StudentAcademicController {
    constructor(academicService) {
        this.academicService = academicService;
    }
    async save(data) {
        try {
            return await this.academicService.save(data.studentId, data.qualifications, data.CreatedBy, data.programId, data.programSubjectIds);
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

/***/ "./apps/student-service/src/students/student-academic/student-academic.module.ts":
/*!***************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-academic/student-academic.module.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const student_academic_controller_1 = __webpack_require__(/*! ./student-academic.controller */ "./apps/student-service/src/students/student-academic/student-academic.controller.ts");
const student_academic_service_1 = __webpack_require__(/*! ./student-academic.service */ "./apps/student-service/src/students/student-academic/student-academic.service.ts");
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

/***/ "./apps/student-service/src/students/student-academic/student-academic.service.ts":
/*!****************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-academic/student-academic.service.ts ***!
  \****************************************************************************************/
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
exports.computeAcademicResult = computeAcademicResult;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
function computeAcademicResult(input) {
    const marksType = String(input.marksType || 'Percentage').toUpperCase();
    const max = Number(input.maxMarks);
    const obtained = Number(input.obtainedMarks);
    let percentage = input.percentage !== undefined && input.percentage !== null
        ? Number(input.percentage)
        : NaN;
    if (!Number.isFinite(percentage)) {
        if (marksType.includes('CGPA')) {
            percentage =
                Number.isFinite(obtained) && Number.isFinite(max) && max > 0
                    ? (obtained / max) * 100
                    : Number.isFinite(obtained)
                        ? obtained * 10
                        : 0;
        }
        else if (Number.isFinite(obtained) && Number.isFinite(max) && max > 0) {
            percentage = (obtained / max) * 100;
        }
        else {
            percentage = 0;
        }
    }
    percentage = Math.round(percentage * 100) / 100;
    let grade = 'F';
    if (percentage >= 90)
        grade = 'A+';
    else if (percentage >= 80)
        grade = 'A';
    else if (percentage >= 70)
        grade = 'B+';
    else if (percentage >= 60)
        grade = 'B';
    else if (percentage >= 50)
        grade = 'C';
    else if (percentage >= 40)
        grade = 'D';
    else if (percentage >= 33)
        grade = 'E';
    let division = 'Fail';
    if (percentage >= 60)
        division = 'First';
    else if (percentage >= 45)
        division = 'Second';
    else if (percentage >= 33)
        division = 'Third';
    return { percentage, grade, division };
}
let StudentAcademicService = class StudentAcademicService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(studentId, qualifications, CreatedBy, programId, programSubjectIds) {
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
            const activeSession = await tx.admissionSession.findFirst({
                where: { IsActive: true, IsDeleted: false },
                orderBy: { CreatedOn: 'desc' },
            });
            if (!activeSession) {
                throw new common_1.NotFoundException('No active admission session found. Please activate a session in masters.');
            }
            const assignedProgramId = program.programId;
            const assignedAdmissionSessionId = activeSession.admissionSessionId;
            const assignedAdmissionSessionName = activeSession.admissionSessionName;
            await tx.student.update({
                where: { StudentRegistrationId: Number(studentId) },
                data: {
                    programId: assignedProgramId,
                    admissionSessionId: assignedAdmissionSessionId,
                    UpdatedBy: CreatedBy || 'System',
                },
            });
            await tx.studentAcademicDetail.deleteMany({
                where: { studentId: Number(studentId) },
            });
            const createdDetails = [];
            for (const qual of qualifications) {
                const computed = computeAcademicResult({
                    marksType: qual.marksType,
                    maxMarks: qual.maxMarks,
                    obtainedMarks: qual.obtainedMarks,
                    percentage: qual.percentage,
                });
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
                        percentage: computed.percentage,
                        division: qual.division || computed.division,
                        grade: qual.grade || computed.grade,
                        stream: qual.stream || null,
                        CreatedBy: CreatedBy || 'System',
                        IsActive: true,
                        IsDeleted: false,
                        subjects: {
                            create: (qual.subjects || []).map((sub) => {
                                const subComputed = computeAcademicResult({
                                    marksType: 'Percentage',
                                    maxMarks: sub.maxMarks,
                                    obtainedMarks: sub.obtainedMarks,
                                });
                                return {
                                    subjectId: Number(sub.subjectId),
                                    maxMarks: Number(sub.maxMarks),
                                    minMarks: Number(sub.minMarks || 33),
                                    obtainedMarks: Number(sub.obtainedMarks),
                                    grade: sub.grade || subComputed.grade,
                                    practicalMarks: sub.practicalMarks ? Number(sub.practicalMarks) : null,
                                    theoryMarks: sub.theoryMarks ? Number(sub.theoryMarks) : null,
                                    isOptional: !!sub.isOptional,
                                    CreatedBy: CreatedBy || 'System',
                                    IsActive: true,
                                    IsDeleted: false,
                                };
                            }),
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
            if (Array.isArray(programSubjectIds)) {
                const ids = [
                    ...new Set(programSubjectIds
                        .map((id) => Number(id))
                        .filter((id) => Number.isFinite(id) && id > 0)),
                ];
                await tx.studentProgramSubject.deleteMany({
                    where: { studentId: Number(studentId) },
                });
                if (ids.length > 0) {
                    const masters = await tx.programSubjectMaster.findMany({
                        where: {
                            programSubjectId: { in: ids },
                            programId: assignedProgramId,
                            IsDeleted: false,
                        },
                    });
                    const allowed = new Set(masters.map((m) => m.programSubjectId));
                    if (ids.some((id) => !allowed.has(id))) {
                        throw new common_1.BadRequestException('One or more program subjects are invalid for this program');
                    }
                    await tx.studentProgramSubject.createMany({
                        data: ids.map((id, idx) => ({
                            studentId: Number(studentId),
                            programSubjectId: id,
                            sequenceNo: idx + 1,
                            CreatedBy: CreatedBy || 'System',
                            IsActive: true,
                            IsDeleted: false,
                        })),
                    });
                }
            }
            return {
                status: 'success',
                message: 'Academic qualifications and subjects saved successfully',
                data: createdDetails,
                programId: assignedProgramId,
                admissionSessionId: assignedAdmissionSessionId,
                admissionSessionName: assignedAdmissionSessionName,
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
        const existing = await this.findOne(academicDetailId);
        const marksType = data.marksType !== undefined ? data.marksType : existing.marksType;
        const maxMarks = data.maxMarks !== undefined ? Number(data.maxMarks) : Number(existing.maxMarks);
        const obtainedMarks = data.obtainedMarks !== undefined
            ? Number(data.obtainedMarks)
            : Number(existing.obtainedMarks);
        const percentageInput = data.percentage !== undefined ? Number(data.percentage) : Number(existing.percentage);
        const computed = computeAcademicResult({
            marksType,
            maxMarks,
            obtainedMarks,
            percentage: percentageInput,
        });
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
                percentage: computed.percentage,
                division: data.division !== undefined && data.division !== null && data.division !== ''
                    ? data.division
                    : computed.division,
                grade: data.grade !== undefined && data.grade !== null && data.grade !== ''
                    ? data.grade
                    : computed.grade,
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

/***/ "./apps/student-service/src/students/student-attachment/student-attachment.controller.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-attachment/student-attachment.controller.ts ***!
  \***********************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_attachment_service_1 = __webpack_require__(/*! ./student-attachment.service */ "./apps/student-service/src/students/student-attachment/student-attachment.service.ts");
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

/***/ "./apps/student-service/src/students/student-attachment/student-attachment.module.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-attachment/student-attachment.module.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAttachmentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const student_attachment_controller_1 = __webpack_require__(/*! ./student-attachment.controller */ "./apps/student-service/src/students/student-attachment/student-attachment.controller.ts");
const student_attachment_service_1 = __webpack_require__(/*! ./student-attachment.service */ "./apps/student-service/src/students/student-attachment/student-attachment.service.ts");
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

/***/ "./apps/student-service/src/students/student-attachment/student-attachment.service.ts":
/*!********************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-attachment/student-attachment.service.ts ***!
  \********************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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

/***/ "./apps/student-service/src/students/student-payment/student-payment.controller.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-payment/student-payment.controller.ts ***!
  \*****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_payment_service_1 = __webpack_require__(/*! ./student-payment.service */ "./apps/student-service/src/students/student-payment/student-payment.service.ts");
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

/***/ "./apps/student-service/src/students/student-payment/student-payment.module.ts":
/*!*************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-payment/student-payment.module.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const student_payment_controller_1 = __webpack_require__(/*! ./student-payment.controller */ "./apps/student-service/src/students/student-payment/student-payment.controller.ts");
const student_payment_service_1 = __webpack_require__(/*! ./student-payment.service */ "./apps/student-service/src/students/student-payment/student-payment.service.ts");
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

/***/ "./apps/student-service/src/students/student-payment/student-payment.service.ts":
/*!**************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-payment/student-payment.service.ts ***!
  \**************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const crypto = __importStar(__webpack_require__(/*! crypto */ "crypto"));
const Razorpay = __webpack_require__(/*! razorpay */ "razorpay");
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
            include: { program: true, admissionSession: true },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        if (!student.programId || !student.admissionSessionId) {
            throw new common_1.BadRequestException('Student program and admission session must be saved before payment');
        }
        const feeConfig = await this.prisma.programFeeConfig.findFirst({
            where: {
                programId: student.programId,
                admissionSessionId: student.admissionSessionId,
                IsDeleted: false,
                IsActive: true,
            },
        });
        if (!feeConfig) {
            throw new common_1.NotFoundException(`Fee configuration not found for program ${student.programId} and session ${student.admissionSessionId}`);
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
                        admissionSession: true,
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

/***/ "./apps/student-service/src/students/student-profile/student-profile.controller.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-profile/student-profile.controller.ts ***!
  \*****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_profile_service_1 = __webpack_require__(/*! ./student-profile.service */ "./apps/student-service/src/students/student-profile/student-profile.service.ts");
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

/***/ "./apps/student-service/src/students/student-profile/student-profile.module.ts":
/*!*************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-profile/student-profile.module.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProfileModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const student_profile_service_1 = __webpack_require__(/*! ./student-profile.service */ "./apps/student-service/src/students/student-profile/student-profile.service.ts");
const student_profile_controller_1 = __webpack_require__(/*! ./student-profile.controller */ "./apps/student-service/src/students/student-profile/student-profile.controller.ts");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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

/***/ "./apps/student-service/src/students/student-profile/student-profile.service.ts":
/*!**************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-profile/student-profile.service.ts ***!
  \**************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
                nameAsPerAdhar: data.nameAsPerAdhar || null,
                dobAsPerAdhar: data.dobAsPerAdhar ? new Date(data.dobAsPerAdhar) : null,
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
                nameAsPerAdhar: data.nameAsPerAdhar,
                dobAsPerAdhar: data.dobAsPerAdhar
                    ? new Date(data.dobAsPerAdhar)
                    : data.dobAsPerAdhar === null
                        ? null
                        : undefined,
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

/***/ "./apps/student-service/src/students/student-program-subject/student-program-subject.controller.ts":
/*!*********************************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-program-subject/student-program-subject.controller.ts ***!
  \*********************************************************************************************************/
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
exports.StudentProgramSubjectController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_program_subject_service_1 = __webpack_require__(/*! ./student-program-subject.service */ "./apps/student-service/src/students/student-program-subject/student-program-subject.service.ts");
let StudentProgramSubjectController = class StudentProgramSubjectController {
    constructor(programSubjectService) {
        this.programSubjectService = programSubjectService;
    }
    async save(data) {
        try {
            return await this.programSubjectService.saveForStudent(data.studentId, data.programSubjectIds, data.CreatedBy);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByStudent(data) {
        try {
            return await this.programSubjectService.findByStudent(data.studentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.StudentProgramSubjectController = StudentProgramSubjectController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'save_student_program_subjects' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProgramSubjectController.prototype, "save", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_student_program_subjects_by_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentProgramSubjectController.prototype, "findByStudent", null);
exports.StudentProgramSubjectController = StudentProgramSubjectController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof student_program_subject_service_1.StudentProgramSubjectService !== "undefined" && student_program_subject_service_1.StudentProgramSubjectService) === "function" ? _a : Object])
], StudentProgramSubjectController);


/***/ }),

/***/ "./apps/student-service/src/students/student-program-subject/student-program-subject.module.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-program-subject/student-program-subject.module.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProgramSubjectModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const student_program_subject_controller_1 = __webpack_require__(/*! ./student-program-subject.controller */ "./apps/student-service/src/students/student-program-subject/student-program-subject.controller.ts");
const student_program_subject_service_1 = __webpack_require__(/*! ./student-program-subject.service */ "./apps/student-service/src/students/student-program-subject/student-program-subject.service.ts");
let StudentProgramSubjectModule = class StudentProgramSubjectModule {
};
exports.StudentProgramSubjectModule = StudentProgramSubjectModule;
exports.StudentProgramSubjectModule = StudentProgramSubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [student_program_subject_controller_1.StudentProgramSubjectController],
        providers: [student_program_subject_service_1.StudentProgramSubjectService],
        exports: [student_program_subject_service_1.StudentProgramSubjectService],
    })
], StudentProgramSubjectModule);


/***/ }),

/***/ "./apps/student-service/src/students/student-program-subject/student-program-subject.service.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/student-service/src/students/student-program-subject/student-program-subject.service.ts ***!
  \******************************************************************************************************/
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
exports.StudentProgramSubjectService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let StudentProgramSubjectService = class StudentProgramSubjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveForStudent(studentId, programSubjectIds, CreatedBy) {
        const student = await this.prisma.student.findFirst({
            where: { StudentRegistrationId: Number(studentId), IsDeleted: false },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        if (!student.programId) {
            throw new common_1.BadRequestException('Student has no program assigned');
        }
        const ids = [
            ...new Set((programSubjectIds || [])
                .map((id) => Number(id))
                .filter((id) => Number.isFinite(id) && id > 0)),
        ];
        if (ids.length > 0) {
            const masters = await this.prisma.programSubjectMaster.findMany({
                where: {
                    programSubjectId: { in: ids },
                    programId: student.programId,
                    IsDeleted: false,
                },
            });
            const allowed = new Set(masters.map((m) => m.programSubjectId));
            if (ids.some((id) => !allowed.has(id))) {
                throw new common_1.BadRequestException('One or more program subjects are invalid for this program');
            }
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.studentProgramSubject.deleteMany({
                where: { studentId: Number(studentId) },
            });
            if (ids.length > 0) {
                await tx.studentProgramSubject.createMany({
                    data: ids.map((id, idx) => ({
                        studentId: Number(studentId),
                        programSubjectId: id,
                        sequenceNo: idx + 1,
                        CreatedBy: CreatedBy || 'System',
                        IsActive: true,
                        IsDeleted: false,
                    })),
                });
            }
        });
        return this.findByStudent(studentId);
    }
    async findByStudent(studentId) {
        return this.prisma.studentProgramSubject.findMany({
            where: { studentId: Number(studentId), IsDeleted: false },
            include: {
                programSubject: {
                    select: {
                        programSubjectId: true,
                        programSubjectName: true,
                        programId: true,
                    },
                },
            },
            orderBy: { sequenceNo: 'asc' },
        });
    }
};
exports.StudentProgramSubjectService = StudentProgramSubjectService;
exports.StudentProgramSubjectService = StudentProgramSubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], StudentProgramSubjectService);


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
    async adminResetPassword(data) {
        try {
            return await this.studentsService.adminResetPassword(data.StudentRegistrationId, data.UpdatedBy || 'Admin User');
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
    async updateStatus(data) {
        try {
            return await this.studentsService.updateStatus(data.StudentRegistrationId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'admin_reset_password_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "adminResetPassword", null);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_student' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateStatus", null);
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
const student_profile_module_1 = __webpack_require__(/*! ./student-profile/student-profile.module */ "./apps/student-service/src/students/student-profile/student-profile.module.ts");
const student_academic_module_1 = __webpack_require__(/*! ./student-academic/student-academic.module */ "./apps/student-service/src/students/student-academic/student-academic.module.ts");
const student_academic_subject_module_1 = __webpack_require__(/*! ./student-academic-subject/student-academic-subject.module */ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.module.ts");
const student_program_subject_module_1 = __webpack_require__(/*! ./student-program-subject/student-program-subject.module */ "./apps/student-service/src/students/student-program-subject/student-program-subject.module.ts");
const student_payment_module_1 = __webpack_require__(/*! ./student-payment/student-payment.module */ "./apps/student-service/src/students/student-payment/student-payment.module.ts");
const student_attachment_module_1 = __webpack_require__(/*! ./student-attachment/student-attachment.module */ "./apps/student-service/src/students/student-attachment/student-attachment.module.ts");
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
            student_program_subject_module_1.StudentProgramSubjectModule,
            student_payment_module_1.StudentPaymentModule,
            student_attachment_module_1.StudentAttachmentModule,
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
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const STUDENT_ROLE_ID = 1;
let StudentsService = class StudentsService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    sanitizeStudent(student) {
        const { loginMaster, ...rest } = student;
        return {
            ...rest,
            loginPasswordPlain: loginMaster?.PlainPassword ?? null,
            IsPasswordUpdated: loginMaster?.IsPasswordUpdated ?? false,
            LastLogin: loginMaster?.LastLogin ?? null,
        };
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
        const createdBy = data.CreatedBy || 'System';
        const newStudent = await this.prisma.$transaction(async (tx) => {
            const student = await tx.student.create({
                data: {
                    candidateName: data.candidateName,
                    fatherName: data.fatherName,
                    email: data.email,
                    mobileNo: data.mobileNo,
                    registrationNo: regNo,
                    CreatedBy: createdBy,
                    Remarks: data.Remarks,
                    IsActive: true,
                    IsDeleted: false,
                },
            });
            await tx.loginMaster.create({
                data: {
                    StudentId: student.StudentRegistrationId,
                    RegistrationNo: regNo,
                    LoginName: data.candidateName || regNo,
                    Mobile: data.mobileNo,
                    EmailId: data.email,
                    Password: hashedPassword,
                    PlainPassword: plainTextPassword,
                    OldPassword: null,
                    IsPasswordUpdated: false,
                    RoleId: STUDENT_ROLE_ID,
                    ClientId: data.ClientId != null ? Number(data.ClientId) : null,
                    IsActive: true,
                    CreatedBy: createdBy,
                    Remarks: data.Remarks || null,
                },
            });
            return tx.student.findUnique({
                where: { StudentRegistrationId: student.StudentRegistrationId },
                include: { loginMaster: true },
            });
        });
        return {
            ...this.sanitizeStudent(newStudent),
            plainTextPassword,
        };
    }
    async login(registrationNo, passwordString, meta) {
        const login = await this.prisma.loginMaster.findUnique({
            where: { RegistrationNo: registrationNo },
            include: {
                student: true,
            },
        });
        if (!login ||
            !login.IsActive ||
            !login.student ||
            login.student.IsDeleted ||
            !login.student.IsActive) {
            throw new common_1.UnauthorizedException('Invalid credentials or account is disabled');
        }
        const isPasswordValid = await bcrypt.compare(passwordString, login.Password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials or account is disabled');
        }
        await this.prisma.loginMaster.update({
            where: { LoginId: login.LoginId },
            data: {
                LastLogin: new Date(),
                IpAddress: meta?.IpAddress || login.IpAddress,
                MACAddress: meta?.MACAddress || login.MACAddress,
                ModifyBy: 'System-Login',
            },
        });
        const payload = {
            sub: login.student.StudentRegistrationId,
            registrationNo: login.student.registrationNo,
            loginId: login.LoginId,
            roleId: login.RoleId,
        };
        const token = this.jwtService.sign(payload);
        const sanitized = this.sanitizeStudent({
            ...login.student,
            loginMaster: login,
        });
        delete sanitized.loginPasswordPlain;
        return {
            status: 'success',
            token,
            student: sanitized,
        };
    }
    async findAll() {
        const rows = await this.prisma.student.findMany({
            where: {
                IsDeleted: false,
            },
            include: {
                loginMaster: true,
            },
            orderBy: {
                CreatedOn: 'desc',
            },
        });
        return rows.map((s) => this.sanitizeStudent(s));
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
                admissionSession: true,
                loginMaster: true,
            },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with Registration ID ${StudentRegistrationId} not found`);
        }
        return this.sanitizeStudent(student);
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
        const updated = await this.prisma.$transaction(async (tx) => {
            const student = await tx.student.update({
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
            const login = await tx.loginMaster.findUnique({
                where: { StudentId: StudentRegistrationId },
            });
            if (login) {
                await tx.loginMaster.update({
                    where: { LoginId: login.LoginId },
                    data: {
                        RegistrationNo: student.registrationNo,
                        LoginName: student.candidateName,
                        Mobile: student.mobileNo,
                        EmailId: student.email,
                        IsActive: student.IsActive,
                        ModifyBy: data.UpdatedBy || null,
                        Remarks: data.Remarks !== undefined ? data.Remarks : undefined,
                    },
                });
            }
            return tx.student.findUnique({
                where: { StudentRegistrationId },
                include: { loginMaster: true },
            });
        });
        return this.sanitizeStudent(updated);
    }
    async updateStatus(StudentRegistrationId, IsActive, UpdatedBy) {
        await this.findOne(StudentRegistrationId);
        const updated = await this.prisma.$transaction(async (tx) => {
            const student = await tx.student.update({
                where: { StudentRegistrationId },
                data: {
                    IsActive,
                    UpdatedBy,
                },
            });
            await tx.loginMaster.updateMany({
                where: { StudentId: StudentRegistrationId },
                data: {
                    IsActive,
                    ModifyBy: UpdatedBy,
                },
            });
            return tx.student.findUnique({
                where: { StudentRegistrationId },
                include: { loginMaster: true },
            });
        });
        return this.sanitizeStudent(updated);
    }
    async softDelete(StudentRegistrationId, DeletedBy, DeletedRemarks) {
        await this.findOne(StudentRegistrationId);
        const deleted = await this.prisma.$transaction(async (tx) => {
            const student = await tx.student.update({
                where: { StudentRegistrationId },
                data: {
                    IsDeleted: true,
                    IsActive: false,
                    DeletedOn: new Date(),
                    DeletedBy: DeletedBy,
                    DeletedRemarks: DeletedRemarks || null,
                },
            });
            await tx.loginMaster.updateMany({
                where: { StudentId: StudentRegistrationId },
                data: {
                    IsActive: false,
                    ModifyBy: DeletedBy,
                },
            });
            return student;
        });
        return this.sanitizeStudent(deleted);
    }
    async bulkSoftDelete(ids, DeletedBy, DeletedRemarks) {
        const result = await this.prisma.$transaction(async (tx) => {
            const studentResult = await tx.student.updateMany({
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
            await tx.loginMaster.updateMany({
                where: { StudentId: { in: ids } },
                data: {
                    IsActive: false,
                    ModifyBy: DeletedBy,
                },
            });
            return studentResult;
        });
        return {
            message: `Successfully soft-deleted ${result.count} student(s)`,
            count: result.count,
        };
    }
    async changePassword(registrationNo, currentPasswordString, newPasswordString) {
        const login = await this.prisma.loginMaster.findUnique({
            where: { RegistrationNo: registrationNo },
            include: { student: true },
        });
        if (!login || !login.student || login.student.IsDeleted) {
            return { status: 'error', message: 'Student account not found' };
        }
        const isPasswordValid = await bcrypt.compare(currentPasswordString, login.Password);
        if (!isPasswordValid) {
            return { status: 'error', message: 'Current password is incorrect' };
        }
        const hashedNewPassword = await bcrypt.hash(newPasswordString, 10);
        await this.prisma.loginMaster.update({
            where: { LoginId: login.LoginId },
            data: {
                OldPassword: login.PlainPassword || login.Password,
                Password: hashedNewPassword,
                PlainPassword: newPasswordString,
                IsPasswordUpdated: true,
                PasswordChangeOn: new Date(),
                ModifyBy: registrationNo,
            },
        });
        return { status: 'success', message: 'Password changed successfully' };
    }
    async adminResetPassword(StudentRegistrationId, UpdatedBy = 'Admin User') {
        const student = await this.prisma.student.findFirst({
            where: { StudentRegistrationId, IsDeleted: false },
            include: { loginMaster: true },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${StudentRegistrationId} not found`);
        }
        const plainTextPassword = this.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        if (student.loginMaster) {
            await this.prisma.loginMaster.update({
                where: { LoginId: student.loginMaster.LoginId },
                data: {
                    OldPassword: student.loginMaster.PlainPassword || student.loginMaster.Password,
                    Password: hashedPassword,
                    PlainPassword: plainTextPassword,
                    IsPasswordUpdated: false,
                    PasswordChangeOn: new Date(),
                    ModifyBy: UpdatedBy,
                },
            });
        }
        else {
            await this.prisma.loginMaster.create({
                data: {
                    StudentId: StudentRegistrationId,
                    RegistrationNo: student.registrationNo,
                    LoginName: student.candidateName,
                    Mobile: student.mobileNo,
                    EmailId: student.email,
                    Password: hashedPassword,
                    PlainPassword: plainTextPassword,
                    IsPasswordUpdated: false,
                    PasswordChangeOn: new Date(),
                    RoleId: STUDENT_ROLE_ID,
                    IsActive: true,
                    CreatedBy: UpdatedBy,
                    ModifyBy: UpdatedBy,
                },
            });
        }
        return {
            status: 'success',
            message: 'Password reset successfully',
            StudentRegistrationId,
            registrationNo: student.registrationNo,
            plainTextPassword,
        };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], StudentsService);


/***/ }),

/***/ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.controller.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/student-service/src/website/accreditation-slider/accreditation-slider.controller.ts ***!
  \**************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const accreditation_slider_service_1 = __webpack_require__(/*! ./accreditation-slider.service */ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.accreditationSliderService.updateStatus(data.accreditationSliderId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_accreditation_slider' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccreditationSliderController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.module.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/student-service/src/website/accreditation-slider/accreditation-slider.module.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccreditationSliderModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const accreditation_slider_controller_1 = __webpack_require__(/*! ./accreditation-slider.controller */ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.controller.ts");
const accreditation_slider_service_1 = __webpack_require__(/*! ./accreditation-slider.service */ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.service.ts");
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

/***/ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.service.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/student-service/src/website/accreditation-slider/accreditation-slider.service.ts ***!
  \***********************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(accreditationSliderId, IsActive, UpdatedBy) {
        return this.update(accreditationSliderId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.controller.ts":
/*!********************************************************************************************!*\
  !*** ./apps/student-service/src/website/admission-enquiry/admission-enquiry.controller.ts ***!
  \********************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const admission_enquiry_service_1 = __webpack_require__(/*! ./admission-enquiry.service */ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.admissionEnquiryService.updateStatus(data.admissionEnquiryId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_admission_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdmissionEnquiryController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.module.ts":
/*!****************************************************************************************!*\
  !*** ./apps/student-service/src/website/admission-enquiry/admission-enquiry.module.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const admission_enquiry_controller_1 = __webpack_require__(/*! ./admission-enquiry.controller */ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.controller.ts");
const admission_enquiry_service_1 = __webpack_require__(/*! ./admission-enquiry.service */ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.service.ts");
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

/***/ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.service.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/website/admission-enquiry/admission-enquiry.service.ts ***!
  \*****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
                admissionSessionId: data.admissionSessionId ? Number(data.admissionSessionId) : null,
                admissionSessionName: data.admissionSessionName || null,
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
        if (data.admissionSessionId !== undefined)
            updatePayload.admissionSessionId = data.admissionSessionId ? Number(data.admissionSessionId) : null;
        if (data.admissionSessionName !== undefined)
            updatePayload.admissionSessionName = data.admissionSessionName;
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
    async updateStatus(admissionEnquiryId, IsActive, UpdatedBy) {
        return this.update(admissionEnquiryId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.controller.ts":
/*!********************************************************************************************!*\
  !*** ./apps/student-service/src/website/campus-quick-link/campus-quick-link.controller.ts ***!
  \********************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const campus_quick_link_service_1 = __webpack_require__(/*! ./campus-quick-link.service */ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.campusQuickLinkService.updateStatus(data.quickLinkId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_campus_quick_link' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampusQuickLinkController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.module.ts":
/*!****************************************************************************************!*\
  !*** ./apps/student-service/src/website/campus-quick-link/campus-quick-link.module.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const campus_quick_link_controller_1 = __webpack_require__(/*! ./campus-quick-link.controller */ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.controller.ts");
const campus_quick_link_service_1 = __webpack_require__(/*! ./campus-quick-link.service */ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.service.ts");
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

/***/ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.service.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/website/campus-quick-link/campus-quick-link.service.ts ***!
  \*****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(quickLinkId, IsActive, UpdatedBy) {
        return this.update(quickLinkId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/committee-submenu/committee-submenu.controller.ts":
/*!********************************************************************************************!*\
  !*** ./apps/student-service/src/website/committee-submenu/committee-submenu.controller.ts ***!
  \********************************************************************************************/
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
exports.CommitteeSubmenuController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const committee_submenu_service_1 = __webpack_require__(/*! ./committee-submenu.service */ "./apps/student-service/src/website/committee-submenu/committee-submenu.service.ts");
let CommitteeSubmenuController = class CommitteeSubmenuController {
    constructor(committeeSubmenuService) {
        this.committeeSubmenuService = committeeSubmenuService;
    }
    async create(data) {
        try {
            return await this.committeeSubmenuService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll(data) {
        try {
            return await this.committeeSubmenuService.findAll(data?.committeeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByCommittee(data) {
        try {
            return await this.committeeSubmenuService.findAll(data.committeeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.committeeSubmenuService.findOne(data.committeeSubmenuId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { committeeSubmenuId, ...updateData } = data;
            return await this.committeeSubmenuService.update(committeeSubmenuId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.committeeSubmenuService.softDelete(data.committeeSubmenuId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.CommitteeSubmenuController = CommitteeSubmenuController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_committee_submenu' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeSubmenuController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_committee_submenus' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeSubmenuController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_committee_submenus_by_committee' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeSubmenuController.prototype, "findByCommittee", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_committee_submenu' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeSubmenuController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_committee_submenu' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeSubmenuController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_committee_submenu' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeSubmenuController.prototype, "softDelete", null);
exports.CommitteeSubmenuController = CommitteeSubmenuController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof committee_submenu_service_1.CommitteeSubmenuService !== "undefined" && committee_submenu_service_1.CommitteeSubmenuService) === "function" ? _a : Object])
], CommitteeSubmenuController);


/***/ }),

/***/ "./apps/student-service/src/website/committee-submenu/committee-submenu.module.ts":
/*!****************************************************************************************!*\
  !*** ./apps/student-service/src/website/committee-submenu/committee-submenu.module.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommitteeSubmenuModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const committee_submenu_controller_1 = __webpack_require__(/*! ./committee-submenu.controller */ "./apps/student-service/src/website/committee-submenu/committee-submenu.controller.ts");
const committee_submenu_service_1 = __webpack_require__(/*! ./committee-submenu.service */ "./apps/student-service/src/website/committee-submenu/committee-submenu.service.ts");
let CommitteeSubmenuModule = class CommitteeSubmenuModule {
};
exports.CommitteeSubmenuModule = CommitteeSubmenuModule;
exports.CommitteeSubmenuModule = CommitteeSubmenuModule = __decorate([
    (0, common_1.Module)({
        controllers: [committee_submenu_controller_1.CommitteeSubmenuController],
        providers: [committee_submenu_service_1.CommitteeSubmenuService],
        exports: [committee_submenu_service_1.CommitteeSubmenuService],
    })
], CommitteeSubmenuModule);


/***/ }),

/***/ "./apps/student-service/src/website/committee-submenu/committee-submenu.service.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/student-service/src/website/committee-submenu/committee-submenu.service.ts ***!
  \*****************************************************************************************/
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
exports.CommitteeSubmenuService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let CommitteeSubmenuService = class CommitteeSubmenuService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.committeeSubmenu.create({
            data: {
                committeeId: data.committeeId,
                name: data.name,
                url: data.url || null,
                priorityOrder: data.priorityOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
            include: {
                committee: true,
            },
        });
    }
    async findAll(committeeId) {
        const where = { IsDeleted: false };
        if (committeeId) {
            where.committeeId = committeeId;
        }
        return this.prisma.committeeSubmenu.findMany({
            where,
            include: {
                committee: true,
            },
            orderBy: [{ priorityOrder: 'asc' }, { committeeSubmenuId: 'desc' }],
        });
    }
    async findOne(committeeSubmenuId) {
        const item = await this.prisma.committeeSubmenu.findFirst({
            where: { committeeSubmenuId, IsDeleted: false },
            include: {
                committee: true,
            },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Committee submenu entry with ID ${committeeSubmenuId} not found`);
        }
        return item;
    }
    async update(committeeSubmenuId, data) {
        await this.findOne(committeeSubmenuId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.committeeId !== undefined)
            updatePayload.committeeId = data.committeeId;
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.url !== undefined)
            updatePayload.url = data.url;
        if (data.priorityOrder !== undefined)
            updatePayload.priorityOrder = data.priorityOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.committeeSubmenu.update({
            where: { committeeSubmenuId },
            data: updatePayload,
            include: {
                committee: true,
            },
        });
    }
    async softDelete(committeeSubmenuId, DeletedBy, DeletedRemarks) {
        await this.findOne(committeeSubmenuId);
        return this.prisma.committeeSubmenu.update({
            where: { committeeSubmenuId },
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
exports.CommitteeSubmenuService = CommitteeSubmenuService;
exports.CommitteeSubmenuService = CommitteeSubmenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], CommitteeSubmenuService);


/***/ }),

/***/ "./apps/student-service/src/website/committee/committee.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/student-service/src/website/committee/committee.controller.ts ***!
  \****************************************************************************/
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
exports.CommitteeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const committee_service_1 = __webpack_require__(/*! ./committee.service */ "./apps/student-service/src/website/committee/committee.service.ts");
let CommitteeController = class CommitteeController {
    constructor(committeeService) {
        this.committeeService = committeeService;
    }
    async create(data) {
        try {
            return await this.committeeService.create(data);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.committeeService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.committeeService.findOne(data.committeeId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { committeeId, ...updateData } = data;
            return await this.committeeService.update(committeeId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.committeeService.softDelete(data.committeeId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
};
exports.CommitteeController = CommitteeController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_committee' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_committees' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommitteeController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_one_committee' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_committee' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_committee' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommitteeController.prototype, "softDelete", null);
exports.CommitteeController = CommitteeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof committee_service_1.CommitteeService !== "undefined" && committee_service_1.CommitteeService) === "function" ? _a : Object])
], CommitteeController);


/***/ }),

/***/ "./apps/student-service/src/website/committee/committee.module.ts":
/*!************************************************************************!*\
  !*** ./apps/student-service/src/website/committee/committee.module.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommitteeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const committee_controller_1 = __webpack_require__(/*! ./committee.controller */ "./apps/student-service/src/website/committee/committee.controller.ts");
const committee_service_1 = __webpack_require__(/*! ./committee.service */ "./apps/student-service/src/website/committee/committee.service.ts");
let CommitteeModule = class CommitteeModule {
};
exports.CommitteeModule = CommitteeModule;
exports.CommitteeModule = CommitteeModule = __decorate([
    (0, common_1.Module)({
        controllers: [committee_controller_1.CommitteeController],
        providers: [committee_service_1.CommitteeService],
        exports: [committee_service_1.CommitteeService],
    })
], CommitteeModule);


/***/ }),

/***/ "./apps/student-service/src/website/committee/committee.service.ts":
/*!*************************************************************************!*\
  !*** ./apps/student-service/src/website/committee/committee.service.ts ***!
  \*************************************************************************/
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
exports.CommitteeService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let CommitteeService = class CommitteeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.committee.create({
            data: {
                name: data.name,
                url: data.url || null,
                priorityOrder: data.priorityOrder ?? 0,
                CreatedBy: data.CreatedBy || 'Admin',
                Remarks: data.Remarks || null,
                IsActive: data.IsActive !== undefined ? data.IsActive : true,
                IsDeleted: false,
            },
        });
    }
    async findAll() {
        return this.prisma.committee.findMany({
            where: { IsDeleted: false },
            orderBy: [{ priorityOrder: 'asc' }, { committeeId: 'desc' }],
        });
    }
    async findOne(committeeId) {
        const item = await this.prisma.committee.findFirst({
            where: { committeeId, IsDeleted: false },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Committee entry with ID ${committeeId} not found`);
        }
        return item;
    }
    async update(committeeId, data) {
        await this.findOne(committeeId);
        const updatePayload = {
            UpdatedBy: data.UpdatedBy || 'Admin',
        };
        if (data.name !== undefined)
            updatePayload.name = data.name;
        if (data.url !== undefined)
            updatePayload.url = data.url;
        if (data.priorityOrder !== undefined)
            updatePayload.priorityOrder = data.priorityOrder;
        if (data.IsActive !== undefined)
            updatePayload.IsActive = data.IsActive;
        if (data.Remarks !== undefined)
            updatePayload.Remarks = data.Remarks;
        return this.prisma.committee.update({
            where: { committeeId },
            data: updatePayload,
        });
    }
    async softDelete(committeeId, DeletedBy, DeletedRemarks) {
        await this.findOne(committeeId);
        return this.prisma.committee.update({
            where: { committeeId },
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
exports.CommitteeService = CommitteeService;
exports.CommitteeService = CommitteeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], CommitteeService);


/***/ }),

/***/ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.controller.ts":
/*!****************************************************************************************!*\
  !*** ./apps/student-service/src/website/contact-enquiry/contact-enquiry.controller.ts ***!
  \****************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const contact_enquiry_service_1 = __webpack_require__(/*! ./contact-enquiry.service */ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.contactEnquiryService.updateStatus(data.contactEnquiryId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_contact_enquiry' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactEnquiryController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.module.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/website/contact-enquiry/contact-enquiry.module.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContactEnquiryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const contact_enquiry_controller_1 = __webpack_require__(/*! ./contact-enquiry.controller */ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.controller.ts");
const contact_enquiry_service_1 = __webpack_require__(/*! ./contact-enquiry.service */ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.service.ts");
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

/***/ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.service.ts":
/*!*************************************************************************************!*\
  !*** ./apps/student-service/src/website/contact-enquiry/contact-enquiry.service.ts ***!
  \*************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(contactEnquiryId, IsActive, UpdatedBy) {
        return this.update(contactEnquiryId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/header-button/header-button.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/website/header-button/header-button.controller.ts ***!
  \************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const header_button_service_1 = __webpack_require__(/*! ./header-button.service */ "./apps/student-service/src/website/header-button/header-button.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.headerButtonService.updateStatus(data.headerButtonId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_header_button' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeaderButtonController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/header-button/header-button.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/website/header-button/header-button.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderButtonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const header_button_controller_1 = __webpack_require__(/*! ./header-button.controller */ "./apps/student-service/src/website/header-button/header-button.controller.ts");
const header_button_service_1 = __webpack_require__(/*! ./header-button.service */ "./apps/student-service/src/website/header-button/header-button.service.ts");
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

/***/ "./apps/student-service/src/website/header-button/header-button.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/student-service/src/website/header-button/header-button.service.ts ***!
  \*********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(headerButtonId, IsActive, UpdatedBy) {
        return this.update(headerButtonId, { IsActive, UpdatedBy });
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


/***/ }),

/***/ "./apps/student-service/src/website/hero-section/hero-section.controller.ts":
/*!**********************************************************************************!*\
  !*** ./apps/student-service/src/website/hero-section/hero-section.controller.ts ***!
  \**********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const hero_section_service_1 = __webpack_require__(/*! ./hero-section.service */ "./apps/student-service/src/website/hero-section/hero-section.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.heroSectionService.updateStatus(data.heroSectionId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_hero_section' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HeroSectionController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/hero-section/hero-section.module.ts":
/*!******************************************************************************!*\
  !*** ./apps/student-service/src/website/hero-section/hero-section.module.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeroSectionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const hero_section_controller_1 = __webpack_require__(/*! ./hero-section.controller */ "./apps/student-service/src/website/hero-section/hero-section.controller.ts");
const hero_section_service_1 = __webpack_require__(/*! ./hero-section.service */ "./apps/student-service/src/website/hero-section/hero-section.service.ts");
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

/***/ "./apps/student-service/src/website/hero-section/hero-section.service.ts":
/*!*******************************************************************************!*\
  !*** ./apps/student-service/src/website/hero-section/hero-section.service.ts ***!
  \*******************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(heroSectionId, IsActive, UpdatedBy) {
        return this.update(heroSectionId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/image-gallery/image-gallery.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/website/image-gallery/image-gallery.controller.ts ***!
  \************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const image_gallery_service_1 = __webpack_require__(/*! ./image-gallery.service */ "./apps/student-service/src/website/image-gallery/image-gallery.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.imageGalleryService.updateStatus(data.imageGalleryId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_image_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageGalleryController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/image-gallery/image-gallery.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/website/image-gallery/image-gallery.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageGalleryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const image_gallery_controller_1 = __webpack_require__(/*! ./image-gallery.controller */ "./apps/student-service/src/website/image-gallery/image-gallery.controller.ts");
const image_gallery_service_1 = __webpack_require__(/*! ./image-gallery.service */ "./apps/student-service/src/website/image-gallery/image-gallery.service.ts");
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

/***/ "./apps/student-service/src/website/image-gallery/image-gallery.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/student-service/src/website/image-gallery/image-gallery.service.ts ***!
  \*********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(imageGalleryId, IsActive, UpdatedBy) {
        return this.update(imageGalleryId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/latest-update/latest-update.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/website/latest-update/latest-update.controller.ts ***!
  \************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const latest_update_service_1 = __webpack_require__(/*! ./latest-update.service */ "./apps/student-service/src/website/latest-update/latest-update.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.latestUpdateService.updateStatus(data.latestUpdateId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_latest_update' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LatestUpdateController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/latest-update/latest-update.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/website/latest-update/latest-update.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const latest_update_controller_1 = __webpack_require__(/*! ./latest-update.controller */ "./apps/student-service/src/website/latest-update/latest-update.controller.ts");
const latest_update_service_1 = __webpack_require__(/*! ./latest-update.service */ "./apps/student-service/src/website/latest-update/latest-update.service.ts");
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

/***/ "./apps/student-service/src/website/latest-update/latest-update.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/student-service/src/website/latest-update/latest-update.service.ts ***!
  \*********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(latestUpdateId, IsActive, UpdatedBy) {
        return this.update(latestUpdateId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/notice-board/notice-board.controller.ts":
/*!**********************************************************************************!*\
  !*** ./apps/student-service/src/website/notice-board/notice-board.controller.ts ***!
  \**********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const notice_board_service_1 = __webpack_require__(/*! ./notice-board.service */ "./apps/student-service/src/website/notice-board/notice-board.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.noticeBoardService.updateStatus(data.noticeBoardId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_notice_board' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeBoardController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/notice-board/notice-board.module.ts":
/*!******************************************************************************!*\
  !*** ./apps/student-service/src/website/notice-board/notice-board.module.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoticeBoardModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const notice_board_controller_1 = __webpack_require__(/*! ./notice-board.controller */ "./apps/student-service/src/website/notice-board/notice-board.controller.ts");
const notice_board_service_1 = __webpack_require__(/*! ./notice-board.service */ "./apps/student-service/src/website/notice-board/notice-board.service.ts");
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

/***/ "./apps/student-service/src/website/notice-board/notice-board.service.ts":
/*!*******************************************************************************!*\
  !*** ./apps/student-service/src/website/notice-board/notice-board.service.ts ***!
  \*******************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(noticeBoardId, IsActive, UpdatedBy) {
        return this.update(noticeBoardId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/stats-counter/stats-counter.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/website/stats-counter/stats-counter.controller.ts ***!
  \************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const stats_counter_service_1 = __webpack_require__(/*! ./stats-counter.service */ "./apps/student-service/src/website/stats-counter/stats-counter.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.statsCounterService.updateStatus(data.statsCounterId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_stats_counter' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsCounterController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/stats-counter/stats-counter.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/website/stats-counter/stats-counter.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsCounterModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const stats_counter_controller_1 = __webpack_require__(/*! ./stats-counter.controller */ "./apps/student-service/src/website/stats-counter/stats-counter.controller.ts");
const stats_counter_service_1 = __webpack_require__(/*! ./stats-counter.service */ "./apps/student-service/src/website/stats-counter/stats-counter.service.ts");
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

/***/ "./apps/student-service/src/website/stats-counter/stats-counter.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/student-service/src/website/stats-counter/stats-counter.service.ts ***!
  \*********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(statsCounterId, IsActive, UpdatedBy) {
        return this.update(statsCounterId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/testimonial/testimonial.controller.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/website/testimonial/testimonial.controller.ts ***!
  \********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const testimonial_service_1 = __webpack_require__(/*! ./testimonial.service */ "./apps/student-service/src/website/testimonial/testimonial.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.testimonialService.updateStatus(data.testimonialId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_testimonial' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestimonialController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/testimonial/testimonial.module.ts":
/*!****************************************************************************!*\
  !*** ./apps/student-service/src/website/testimonial/testimonial.module.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestimonialModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const testimonial_controller_1 = __webpack_require__(/*! ./testimonial.controller */ "./apps/student-service/src/website/testimonial/testimonial.controller.ts");
const testimonial_service_1 = __webpack_require__(/*! ./testimonial.service */ "./apps/student-service/src/website/testimonial/testimonial.service.ts");
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

/***/ "./apps/student-service/src/website/testimonial/testimonial.service.ts":
/*!*****************************************************************************!*\
  !*** ./apps/student-service/src/website/testimonial/testimonial.service.ts ***!
  \*****************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(testimonialId, IsActive, UpdatedBy) {
        return this.update(testimonialId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/top-achiever/top-achiever.controller.ts":
/*!**********************************************************************************!*\
  !*** ./apps/student-service/src/website/top-achiever/top-achiever.controller.ts ***!
  \**********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const top_achiever_service_1 = __webpack_require__(/*! ./top-achiever.service */ "./apps/student-service/src/website/top-achiever/top-achiever.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.topAchieverService.updateStatus(data.topAchieverId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_top_achiever' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopAchieverController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/top-achiever/top-achiever.module.ts":
/*!******************************************************************************!*\
  !*** ./apps/student-service/src/website/top-achiever/top-achiever.module.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopAchieverModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const top_achiever_controller_1 = __webpack_require__(/*! ./top-achiever.controller */ "./apps/student-service/src/website/top-achiever/top-achiever.controller.ts");
const top_achiever_service_1 = __webpack_require__(/*! ./top-achiever.service */ "./apps/student-service/src/website/top-achiever/top-achiever.service.ts");
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

/***/ "./apps/student-service/src/website/top-achiever/top-achiever.service.ts":
/*!*******************************************************************************!*\
  !*** ./apps/student-service/src/website/top-achiever/top-achiever.service.ts ***!
  \*******************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(topAchieverId, IsActive, UpdatedBy) {
        return this.update(topAchieverId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/video-gallery/video-gallery.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/student-service/src/website/video-gallery/video-gallery.controller.ts ***!
  \************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const video_gallery_service_1 = __webpack_require__(/*! ./video-gallery.service */ "./apps/student-service/src/website/video-gallery/video-gallery.service.ts");
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
    async updateStatus(data) {
        try {
            return await this.videoGalleryService.updateStatus(data.videoGalleryId, data.IsActive, data.UpdatedBy);
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
    (0, microservices_1.MessagePattern)({ cmd: 'update_status_video_gallery' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoGalleryController.prototype, "updateStatus", null);
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

/***/ "./apps/student-service/src/website/video-gallery/video-gallery.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/student-service/src/website/video-gallery/video-gallery.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoGalleryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
const video_gallery_controller_1 = __webpack_require__(/*! ./video-gallery.controller */ "./apps/student-service/src/website/video-gallery/video-gallery.controller.ts");
const video_gallery_service_1 = __webpack_require__(/*! ./video-gallery.service */ "./apps/student-service/src/website/video-gallery/video-gallery.service.ts");
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

/***/ "./apps/student-service/src/website/video-gallery/video-gallery.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/student-service/src/website/video-gallery/video-gallery.service.ts ***!
  \*********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
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
    async updateStatus(videoGalleryId, IsActive, UpdatedBy) {
        return this.update(videoGalleryId, { IsActive, UpdatedBy });
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

/***/ "./apps/student-service/src/website/website.module.ts":
/*!************************************************************!*\
  !*** ./apps/student-service/src/website/website.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsiteModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const campus_quick_link_module_1 = __webpack_require__(/*! ./campus-quick-link/campus-quick-link.module */ "./apps/student-service/src/website/campus-quick-link/campus-quick-link.module.ts");
const latest_update_module_1 = __webpack_require__(/*! ./latest-update/latest-update.module */ "./apps/student-service/src/website/latest-update/latest-update.module.ts");
const admission_enquiry_module_1 = __webpack_require__(/*! ./admission-enquiry/admission-enquiry.module */ "./apps/student-service/src/website/admission-enquiry/admission-enquiry.module.ts");
const hero_section_module_1 = __webpack_require__(/*! ./hero-section/hero-section.module */ "./apps/student-service/src/website/hero-section/hero-section.module.ts");
const notice_board_module_1 = __webpack_require__(/*! ./notice-board/notice-board.module */ "./apps/student-service/src/website/notice-board/notice-board.module.ts");
const accreditation_slider_module_1 = __webpack_require__(/*! ./accreditation-slider/accreditation-slider.module */ "./apps/student-service/src/website/accreditation-slider/accreditation-slider.module.ts");
const top_achiever_module_1 = __webpack_require__(/*! ./top-achiever/top-achiever.module */ "./apps/student-service/src/website/top-achiever/top-achiever.module.ts");
const image_gallery_module_1 = __webpack_require__(/*! ./image-gallery/image-gallery.module */ "./apps/student-service/src/website/image-gallery/image-gallery.module.ts");
const video_gallery_module_1 = __webpack_require__(/*! ./video-gallery/video-gallery.module */ "./apps/student-service/src/website/video-gallery/video-gallery.module.ts");
const contact_enquiry_module_1 = __webpack_require__(/*! ./contact-enquiry/contact-enquiry.module */ "./apps/student-service/src/website/contact-enquiry/contact-enquiry.module.ts");
const stats_counter_module_1 = __webpack_require__(/*! ./stats-counter/stats-counter.module */ "./apps/student-service/src/website/stats-counter/stats-counter.module.ts");
const testimonial_module_1 = __webpack_require__(/*! ./testimonial/testimonial.module */ "./apps/student-service/src/website/testimonial/testimonial.module.ts");
const header_button_module_1 = __webpack_require__(/*! ./header-button/header-button.module */ "./apps/student-service/src/website/header-button/header-button.module.ts");
const committee_module_1 = __webpack_require__(/*! ./committee/committee.module */ "./apps/student-service/src/website/committee/committee.module.ts");
const committee_submenu_module_1 = __webpack_require__(/*! ./committee-submenu/committee-submenu.module */ "./apps/student-service/src/website/committee-submenu/committee-submenu.module.ts");
let WebsiteModule = class WebsiteModule {
};
exports.WebsiteModule = WebsiteModule;
exports.WebsiteModule = WebsiteModule = __decorate([
    (0, common_1.Module)({
        imports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule, notice_board_module_1.NoticeBoardModule, accreditation_slider_module_1.AccreditationSliderModule, top_achiever_module_1.TopAchieverModule, image_gallery_module_1.ImageGalleryModule, video_gallery_module_1.VideoGalleryModule, contact_enquiry_module_1.ContactEnquiryModule, stats_counter_module_1.StatsCounterModule, testimonial_module_1.TestimonialModule, header_button_module_1.HeaderButtonModule, committee_module_1.CommitteeModule, committee_submenu_module_1.CommitteeSubmenuModule],
        exports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule, notice_board_module_1.NoticeBoardModule, accreditation_slider_module_1.AccreditationSliderModule, top_achiever_module_1.TopAchieverModule, image_gallery_module_1.ImageGalleryModule, video_gallery_module_1.VideoGalleryModule, contact_enquiry_module_1.ContactEnquiryModule, stats_counter_module_1.StatsCounterModule, testimonial_module_1.TestimonialModule, header_button_module_1.HeaderButtonModule, committee_module_1.CommitteeModule, committee_submenu_module_1.CommitteeSubmenuModule],
    })
], WebsiteModule);


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

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "razorpay":
/*!***************************!*\
  !*** external "razorpay" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("razorpay");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

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