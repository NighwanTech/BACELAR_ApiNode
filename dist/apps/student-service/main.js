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
const academic_session_controller_1 = __webpack_require__(/*! ./academic-session.controller */ "./apps/student-service/src/master/academic-session/academic-session.controller.ts");
const academic_session_service_1 = __webpack_require__(/*! ./academic-session.service */ "./apps/student-service/src/master/academic-session/academic-session.service.ts");
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
const academic_session_module_1 = __webpack_require__(/*! ./academic-session/academic-session.module */ "./apps/student-service/src/master/academic-session/academic-session.module.ts");
const program_fee_config_module_1 = __webpack_require__(/*! ./program-fee-config/program-fee-config.module */ "./apps/student-service/src/master/program-fee-config/program-fee-config.module.ts");
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
            return await this.academicService.save(data.studentId, data.qualifications, data.CreatedBy);
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let StudentAcademicService = class StudentAcademicService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(studentId, qualifications, CreatedBy) {
        return this.prisma.$transaction(async (tx) => {
            await tx.studentAcademicDetail.deleteMany({
                where: { studentId },
            });
            const createdDetails = [];
            for (const qual of qualifications) {
                const detail = await tx.studentAcademicDetail.create({
                    data: {
                        studentId,
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
                qualificationId: data.qualificationId ? Number(data.qualificationId) : undefined,
                boardId: data.boardId ? Number(data.boardId) : undefined,
                schoolName: data.schoolName,
                passingYear: data.passingYear ? Number(data.passingYear) : undefined,
                rollNo: data.rollNo,
                resultStatus: data.resultStatus,
                marksType: data.marksType,
                maxMarks: data.maxMarks ? Number(data.maxMarks) : undefined,
                obtainedMarks: data.obtainedMarks ? Number(data.obtainedMarks) : undefined,
                percentage: data.percentage ? Number(data.percentage) : undefined,
                division: data.division,
                grade: data.grade,
                stream: data.stream,
                UpdatedBy: data.UpdatedBy,
                IsActive: data.IsActive,
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
    }
    async softDelete(academicDetailId, DeletedBy, DeletedRemarks) {
        await this.findOne(academicDetailId);
        return this.prisma.studentAcademicDetail.update({
            where: { academicDetailId },
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
        const result = await this.prisma.studentAcademicDetail.updateMany({
            where: {
                academicDetailId: { in: ids },
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
            message: `Successfully soft-deleted ${result.count} academic qualification(s)`,
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
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findAll() {
        try {
            return await this.paymentService.findAll();
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findOne(data) {
        try {
            return await this.paymentService.findOne(data.paymentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByStudent(data) {
        try {
            return await this.paymentService.findByStudent(data.studentId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async findByOrderId(data) {
        try {
            return await this.paymentService.findByOrderId(data.razorpayOrderId);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async update(data) {
        try {
            const { paymentId, ...updateData } = data;
            return await this.paymentService.update(paymentId, updateData);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async softDelete(data) {
        try {
            return await this.paymentService.softDelete(data.paymentId, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
        }
    }
    async bulkSoftDelete(data) {
        try {
            return await this.paymentService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
        }
        catch (error) {
            return { status: 'error', message: error.message || 'Unknown error' };
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
exports.StudentPaymentService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! @app/prisma */ "./libs/prisma/src/index.ts");
let StudentPaymentService = class StudentPaymentService {
    constructor(prisma) {
        this.prisma = prisma;
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
const student_profile_module_1 = __webpack_require__(/*! ./student-profile/student-profile.module */ "./apps/student-service/src/students/student-profile/student-profile.module.ts");
const student_academic_module_1 = __webpack_require__(/*! ./student-academic/student-academic.module */ "./apps/student-service/src/students/student-academic/student-academic.module.ts");
const student_academic_subject_module_1 = __webpack_require__(/*! ./student-academic-subject/student-academic-subject.module */ "./apps/student-service/src/students/student-academic-subject/student-academic-subject.module.ts");
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
                IsActive: true,
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