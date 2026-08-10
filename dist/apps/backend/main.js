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
const master_module_1 = __webpack_require__(/*! ./master/master.module */ "./apps/backend/src/master/master.module.ts");
const website_module_1 = __webpack_require__(/*! ./website/website.module */ "./apps/backend/src/website/website.module.ts");
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

/***/ "./apps/backend/src/main.ts":
/*!**********************************!*\
  !*** ./apps/backend/src/main.ts ***!
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const path = __importStar(__webpack_require__(/*! path */ "path"));
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/backend/src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(path.join(__dirname, '..', '..', '..', 'public'));
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


/***/ }),

/***/ "./apps/backend/src/master/academic-session/academic-session.controller.ts":
/*!*********************************************************************************!*\
  !*** ./apps/backend/src/master/academic-session/academic-session.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AcademicSessionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_academic_session_dto_1 = __webpack_require__(/*! ./dto/create-academic-session.dto */ "./apps/backend/src/master/academic-session/dto/create-academic-session.dto.ts");
const update_academic_session_dto_1 = __webpack_require__(/*! ./dto/update-academic-session.dto */ "./apps/backend/src/master/academic-session/dto/update-academic-session.dto.ts");
const bulk_delete_academic_sessions_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-academic-sessions.dto */ "./apps/backend/src/master/academic-session/dto/bulk-delete-academic-sessions.dto.ts");
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

/***/ "./apps/backend/src/master/academic-session/academic-session.module.ts":
/*!*****************************************************************************!*\
  !*** ./apps/backend/src/master/academic-session/academic-session.module.ts ***!
  \*****************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const academic_session_controller_1 = __webpack_require__(/*! ./academic-session.controller */ "./apps/backend/src/master/academic-session/academic-session.controller.ts");
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

/***/ "./apps/backend/src/master/academic-session/dto/bulk-delete-academic-sessions.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/backend/src/master/academic-session/dto/bulk-delete-academic-sessions.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteAcademicSessionsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/master/academic-session/dto/create-academic-session.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/master/academic-session/dto/create-academic-session.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAcademicSessionDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/master/academic-session/dto/update-academic-session.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/master/academic-session/dto/update-academic-session.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAcademicSessionDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/master/board/board.controller.ts":
/*!***********************************************************!*\
  !*** ./apps/backend/src/master/board/board.controller.ts ***!
  \***********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_board_dto_1 = __webpack_require__(/*! ./dto/create-board.dto */ "./apps/backend/src/master/board/dto/create-board.dto.ts");
const update_board_dto_1 = __webpack_require__(/*! ./dto/update-board.dto */ "./apps/backend/src/master/board/dto/update-board.dto.ts");
const bulk_delete_boards_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-boards.dto */ "./apps/backend/src/master/board/dto/bulk-delete-boards.dto.ts");
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

/***/ "./apps/backend/src/master/board/board.module.ts":
/*!*******************************************************!*\
  !*** ./apps/backend/src/master/board/board.module.ts ***!
  \*******************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const board_controller_1 = __webpack_require__(/*! ./board.controller */ "./apps/backend/src/master/board/board.controller.ts");
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

/***/ "./apps/backend/src/master/board/dto/bulk-delete-boards.dto.ts":
/*!*********************************************************************!*\
  !*** ./apps/backend/src/master/board/dto/bulk-delete-boards.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteBoardsDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/board/dto/create-board.dto.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/board/dto/create-board.dto.ts ***!
  \***************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/board/dto/update-board.dto.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/board/dto/update-board.dto.ts ***!
  \***************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/city/city.controller.ts":
/*!*********************************************************!*\
  !*** ./apps/backend/src/master/city/city.controller.ts ***!
  \*********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_city_dto_1 = __webpack_require__(/*! ./dto/create-city.dto */ "./apps/backend/src/master/city/dto/create-city.dto.ts");
const update_city_dto_1 = __webpack_require__(/*! ./dto/update-city.dto */ "./apps/backend/src/master/city/dto/update-city.dto.ts");
let CityController = class CityController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createCityDto) {
        return this.studentClient.send({ cmd: 'create_city' }, createCityDto);
    }
    findAll(stateId) {
        const payload = stateId !== undefined && stateId !== null && String(stateId).trim() !== ''
            ? { stateId: Number(stateId) }
            : {};
        return this.studentClient.send({ cmd: 'find_all_cities' }, payload);
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all active cities (optional filter by stateId)' }),
    (0, swagger_1.ApiQuery)({ name: 'stateId', required: false, example: 1, description: 'Filter cities by stateId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all cities' }),
    __param(0, (0, common_1.Query)('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
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

/***/ "./apps/backend/src/master/city/city.module.ts":
/*!*****************************************************!*\
  !*** ./apps/backend/src/master/city/city.module.ts ***!
  \*****************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const city_controller_1 = __webpack_require__(/*! ./city.controller */ "./apps/backend/src/master/city/city.controller.ts");
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

/***/ "./apps/backend/src/master/city/dto/create-city.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/backend/src/master/city/dto/create-city.dto.ts ***!
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
exports.CreateCityDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/city/dto/update-city.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/backend/src/master/city/dto/update-city.dto.ts ***!
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
exports.UpdateCityDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/college/college.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/college/college.controller.ts ***!
  \***************************************************************/
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
exports.CollegeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_college_dto_1 = __webpack_require__(/*! ./dto/create-college.dto */ "./apps/backend/src/master/college/dto/create-college.dto.ts");
const update_college_dto_1 = __webpack_require__(/*! ./dto/update-college.dto */ "./apps/backend/src/master/college/dto/update-college.dto.ts");
let CollegeController = class CollegeController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createCollegeDto) {
        return this.studentClient.send({ cmd: 'create_college' }, createCollegeDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_colleges' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_college' }, { collegeId: id });
    }
    update(id, updateCollegeDto) {
        return this.studentClient.send({ cmd: 'update_college' }, { collegeId: id, ...updateCollegeDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_college' }, { collegeId: id, DeletedBy, DeletedRemarks });
    }
};
exports.CollegeController = CollegeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new college master entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'College created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_college_dto_1.CreateCollegeDto !== "undefined" && create_college_dto_1.CreateCollegeDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], CollegeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active colleges (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all colleges' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], CollegeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get college details by collegeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return college details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], CollegeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update college details by collegeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'College updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_college_dto_1.UpdateCollegeDto !== "undefined" && update_college_dto_1.UpdateCollegeDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], CollegeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a college by collegeId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'College soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], CollegeController.prototype, "remove", null);
exports.CollegeController = CollegeController = __decorate([
    (0, swagger_1.ApiTags)('Master - Colleges'),
    (0, common_1.Controller)('master/colleges'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], CollegeController);


/***/ }),

/***/ "./apps/backend/src/master/college/college.module.ts":
/*!***********************************************************!*\
  !*** ./apps/backend/src/master/college/college.module.ts ***!
  \***********************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const college_controller_1 = __webpack_require__(/*! ./college.controller */ "./apps/backend/src/master/college/college.controller.ts");
let CollegeModule = class CollegeModule {
};
exports.CollegeModule = CollegeModule;
exports.CollegeModule = CollegeModule = __decorate([
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
        controllers: [college_controller_1.CollegeController],
    })
], CollegeModule);


/***/ }),

/***/ "./apps/backend/src/master/college/dto/create-college.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/master/college/dto/create-college.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCollegeDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateCollegeDto {
}
exports.CreateCollegeDto = CreateCollegeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG12345', description: 'Registration Number of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CLG001', description: 'College Code', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "collegeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bacelar Institute of Technology', description: 'Name of the College' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "collegeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BIT', description: 'Short Name of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Tech Park, Knowledge Park III, Greater Noida', description: 'Address of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "collegeAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+919876543210', description: 'Primary Contact Number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "primaryContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+919876543211', description: 'Alternate Contact Number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "alternateContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'info@bacelarinstitute.edu.in', description: 'Email ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://bacelarinstitute.edu.in', description: 'College Website URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "collegeWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is college active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCollegeDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'College master entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCollegeDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/master/college/dto/update-college.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/master/college/dto/update-college.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCollegeDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateCollegeDto {
}
exports.UpdateCollegeDto = UpdateCollegeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG12345', description: 'Registration Number of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CLG001', description: 'College Code', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "collegeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bacelar Institute of Technology', description: 'Name of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "collegeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BIT', description: 'Short Name of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "shortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Tech Park, Knowledge Park III, Greater Noida', description: 'Address of the College', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "collegeAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+919876543210', description: 'Primary Contact Number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "primaryContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+919876543211', description: 'Alternate Contact Number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "alternateContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'info@bacelarinstitute.edu.in', description: 'Email ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://bacelarinstitute.edu.in', description: 'College Website URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "collegeWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is college active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCollegeDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated college details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCollegeDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/master/master.module.ts":
/*!**************************************************!*\
  !*** ./apps/backend/src/master/master.module.ts ***!
  \**************************************************/
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
const state_module_1 = __webpack_require__(/*! ./state/state.module */ "./apps/backend/src/master/state/state.module.ts");
const city_module_1 = __webpack_require__(/*! ./city/city.module */ "./apps/backend/src/master/city/city.module.ts");
const program_category_module_1 = __webpack_require__(/*! ./program-category/program-category.module */ "./apps/backend/src/master/program-category/program-category.module.ts");
const subject_module_1 = __webpack_require__(/*! ./subject/subject.module */ "./apps/backend/src/master/subject/subject.module.ts");
const program_module_1 = __webpack_require__(/*! ./program/program.module */ "./apps/backend/src/master/program/program.module.ts");
const board_module_1 = __webpack_require__(/*! ./board/board.module */ "./apps/backend/src/master/board/board.module.ts");
const qualification_module_1 = __webpack_require__(/*! ./qualification/qualification.module */ "./apps/backend/src/master/qualification/qualification.module.ts");
const academic_session_module_1 = __webpack_require__(/*! ./academic-session/academic-session.module */ "./apps/backend/src/master/academic-session/academic-session.module.ts");
const program_fee_config_module_1 = __webpack_require__(/*! ./program-fee-config/program-fee-config.module */ "./apps/backend/src/master/program-fee-config/program-fee-config.module.ts");
const college_module_1 = __webpack_require__(/*! ./college/college.module */ "./apps/backend/src/master/college/college.module.ts");
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

/***/ "./apps/backend/src/master/program-category/dto/create-program-category.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/master/program-category/dto/create-program-category.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProgramCategoryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/program-category/dto/update-program-category.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/master/program-category/dto/update-program-category.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProgramCategoryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/program-category/program-category.controller.ts":
/*!*********************************************************************************!*\
  !*** ./apps/backend/src/master/program-category/program-category.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramCategoryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_program_category_dto_1 = __webpack_require__(/*! ./dto/create-program-category.dto */ "./apps/backend/src/master/program-category/dto/create-program-category.dto.ts");
const update_program_category_dto_1 = __webpack_require__(/*! ./dto/update-program-category.dto */ "./apps/backend/src/master/program-category/dto/update-program-category.dto.ts");
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

/***/ "./apps/backend/src/master/program-category/program-category.module.ts":
/*!*****************************************************************************!*\
  !*** ./apps/backend/src/master/program-category/program-category.module.ts ***!
  \*****************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_category_controller_1 = __webpack_require__(/*! ./program-category.controller */ "./apps/backend/src/master/program-category/program-category.controller.ts");
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

/***/ "./apps/backend/src/master/program-fee-config/dto/bulk-delete-program-fee-configs.dto.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/backend/src/master/program-fee-config/dto/bulk-delete-program-fee-configs.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteProgramFeeConfigsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/master/program-fee-config/dto/create-program-fee-config.dto.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/backend/src/master/program-fee-config/dto/create-program-fee-config.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProgramFeeConfigDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/master/program-fee-config/dto/update-program-fee-config.dto.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/backend/src/master/program-fee-config/dto/update-program-fee-config.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProgramFeeConfigDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/master/program-fee-config/program-fee-config.controller.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/master/program-fee-config/program-fee-config.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramFeeConfigController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_program_fee_config_dto_1 = __webpack_require__(/*! ./dto/create-program-fee-config.dto */ "./apps/backend/src/master/program-fee-config/dto/create-program-fee-config.dto.ts");
const update_program_fee_config_dto_1 = __webpack_require__(/*! ./dto/update-program-fee-config.dto */ "./apps/backend/src/master/program-fee-config/dto/update-program-fee-config.dto.ts");
const bulk_delete_program_fee_configs_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-program-fee-configs.dto */ "./apps/backend/src/master/program-fee-config/dto/bulk-delete-program-fee-configs.dto.ts");
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

/***/ "./apps/backend/src/master/program-fee-config/program-fee-config.module.ts":
/*!*********************************************************************************!*\
  !*** ./apps/backend/src/master/program-fee-config/program-fee-config.module.ts ***!
  \*********************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_fee_config_controller_1 = __webpack_require__(/*! ./program-fee-config.controller */ "./apps/backend/src/master/program-fee-config/program-fee-config.controller.ts");
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

/***/ "./apps/backend/src/master/program/dto/bulk-delete-programs.dto.ts":
/*!*************************************************************************!*\
  !*** ./apps/backend/src/master/program/dto/bulk-delete-programs.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteProgramsDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/program/dto/create-program.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/master/program/dto/create-program.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProgramDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/program/dto/update-program.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/master/program/dto/update-program.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProgramDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/program/program.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/program/program.controller.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_program_dto_1 = __webpack_require__(/*! ./dto/create-program.dto */ "./apps/backend/src/master/program/dto/create-program.dto.ts");
const update_program_dto_1 = __webpack_require__(/*! ./dto/update-program.dto */ "./apps/backend/src/master/program/dto/update-program.dto.ts");
const bulk_delete_programs_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-programs.dto */ "./apps/backend/src/master/program/dto/bulk-delete-programs.dto.ts");
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

/***/ "./apps/backend/src/master/program/program.module.ts":
/*!***********************************************************!*\
  !*** ./apps/backend/src/master/program/program.module.ts ***!
  \***********************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const program_controller_1 = __webpack_require__(/*! ./program.controller */ "./apps/backend/src/master/program/program.controller.ts");
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

/***/ "./apps/backend/src/master/qualification/dto/bulk-delete-qualifications.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/master/qualification/dto/bulk-delete-qualifications.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteQualificationsDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/qualification/dto/create-qualification.dto.ts":
/*!*******************************************************************************!*\
  !*** ./apps/backend/src/master/qualification/dto/create-qualification.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateQualificationDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/qualification/dto/update-qualification.dto.ts":
/*!*******************************************************************************!*\
  !*** ./apps/backend/src/master/qualification/dto/update-qualification.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateQualificationDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/qualification/qualification.controller.ts":
/*!***************************************************************************!*\
  !*** ./apps/backend/src/master/qualification/qualification.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QualificationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_qualification_dto_1 = __webpack_require__(/*! ./dto/create-qualification.dto */ "./apps/backend/src/master/qualification/dto/create-qualification.dto.ts");
const update_qualification_dto_1 = __webpack_require__(/*! ./dto/update-qualification.dto */ "./apps/backend/src/master/qualification/dto/update-qualification.dto.ts");
const bulk_delete_qualifications_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-qualifications.dto */ "./apps/backend/src/master/qualification/dto/bulk-delete-qualifications.dto.ts");
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

/***/ "./apps/backend/src/master/qualification/qualification.module.ts":
/*!***********************************************************************!*\
  !*** ./apps/backend/src/master/qualification/qualification.module.ts ***!
  \***********************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const qualification_controller_1 = __webpack_require__(/*! ./qualification.controller */ "./apps/backend/src/master/qualification/qualification.controller.ts");
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

/***/ "./apps/backend/src/master/state/dto/create-state.dto.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/state/dto/create-state.dto.ts ***!
  \***************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/state/dto/update-state.dto.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/state/dto/update-state.dto.ts ***!
  \***************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/master/state/state.controller.ts":
/*!***********************************************************!*\
  !*** ./apps/backend/src/master/state/state.controller.ts ***!
  \***********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_state_dto_1 = __webpack_require__(/*! ./dto/create-state.dto */ "./apps/backend/src/master/state/dto/create-state.dto.ts");
const update_state_dto_1 = __webpack_require__(/*! ./dto/update-state.dto */ "./apps/backend/src/master/state/dto/update-state.dto.ts");
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

/***/ "./apps/backend/src/master/state/state.module.ts":
/*!*******************************************************!*\
  !*** ./apps/backend/src/master/state/state.module.ts ***!
  \*******************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const state_controller_1 = __webpack_require__(/*! ./state.controller */ "./apps/backend/src/master/state/state.controller.ts");
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

/***/ "./apps/backend/src/master/subject/dto/create-subject.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/master/subject/dto/create-subject.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSubjectDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: '12th', description: 'Class type standard: 10th, 12th or BOTH' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['10th', '12th', '10TH', '12TH', 'BOTH']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SCIENCE', description: 'Optional stream: SCIENCE, COMMERCE, ARTS', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "stream", void 0);
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

/***/ "./apps/backend/src/master/subject/dto/update-subject.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/master/subject/dto/update-subject.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSubjectDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: '12th', description: 'Class type standard: 10th, 12th or BOTH', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['10th', '12th', '10TH', '12TH', 'BOTH']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SCIENCE', description: 'Optional stream: SCIENCE, COMMERCE, ARTS', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubjectDto.prototype, "stream", void 0);
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

/***/ "./apps/backend/src/master/subject/subject.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/master/subject/subject.controller.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_subject_dto_1 = __webpack_require__(/*! ./dto/create-subject.dto */ "./apps/backend/src/master/subject/dto/create-subject.dto.ts");
const update_subject_dto_1 = __webpack_require__(/*! ./dto/update-subject.dto */ "./apps/backend/src/master/subject/dto/update-subject.dto.ts");
let SubjectController = class SubjectController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createSubjectDto) {
        return this.studentClient.send({ cmd: 'create_subject' }, createSubjectDto);
    }
    findAll(classType, stream) {
        return this.studentClient.send({ cmd: 'find_all_subjects' }, { classType, stream });
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all active subjects with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'classType', required: false, example: '12th' }),
    (0, swagger_1.ApiQuery)({ name: 'stream', required: false, example: 'COMMERCE' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all subjects' }),
    __param(0, (0, common_1.Query)('classType')),
    __param(1, (0, common_1.Query)('stream')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
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

/***/ "./apps/backend/src/master/subject/subject.module.ts":
/*!***********************************************************!*\
  !*** ./apps/backend/src/master/subject/subject.module.ts ***!
  \***********************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const subject_controller_1 = __webpack_require__(/*! ./subject.controller */ "./apps/backend/src/master/subject/subject.controller.ts");
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

/***/ "./apps/backend/src/shared/storage/storage.module.ts":
/*!***********************************************************!*\
  !*** ./apps/backend/src/shared/storage/storage.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const storage_service_1 = __webpack_require__(/*! ./storage.service */ "./apps/backend/src/shared/storage/storage.service.ts");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Module)({
        providers: [storage_service_1.StorageService],
        exports: [storage_service_1.StorageService],
    })
], StorageModule);


/***/ }),

/***/ "./apps/backend/src/shared/storage/storage.service.ts":
/*!************************************************************!*\
  !*** ./apps/backend/src/shared/storage/storage.service.ts ***!
  \************************************************************/
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
let StorageService = class StorageService {
    constructor() {
        this.uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
        this.storageProvider = process.env.STORAGE_PROVIDER || 'local';
        if (this.storageProvider === 'local') {
            const fullPath = path.resolve(this.uploadDir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }
        }
    }
    async uploadFile(file, folder = '') {
        if (this.storageProvider === 's3') {
            return this.uploadToS3(file, folder);
        }
        return this.uploadToLocal(file, folder);
    }
    async uploadToLocal(file, folder) {
        try {
            const targetFolder = folder ? path.join(this.uploadDir, folder) : this.uploadDir;
            const targetFolderPath = path.resolve(targetFolder);
            if (!fs.existsSync(targetFolderPath)) {
                fs.mkdirSync(targetFolderPath, { recursive: true });
            }
            const ext = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const uniqueFilename = `${uniqueSuffix}${ext}`;
            const destinationPath = path.join(targetFolderPath, uniqueFilename);
            await fs.promises.writeFile(destinationPath, file.buffer);
            const relativePath = folder ? `/uploads/${folder}/${uniqueFilename}` : `/uploads/${uniqueFilename}`;
            return relativePath;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Local upload failed: ${error.message}`);
        }
    }
    async uploadToS3(file, folder) {
        const bucketName = process.env.AWS_BUCKET_NAME;
        const region = process.env.AWS_REGION;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const s3Endpoint = process.env.AWS_ENDPOINT;
        if (!bucketName) {
            throw new common_1.InternalServerErrorException('AWS S3 bucket name is not configured in .env');
        }
        try {
            console.log(`[S3 Storage] Simulating file upload to bucket "${bucketName}"...`);
            const host = s3Endpoint || `https://${bucketName}.s3.${region}.amazonaws.com`;
            const cleanHost = host.replace(/\/$/, '');
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            return folder
                ? `${cleanHost}/${folder}/${uniqueSuffix}${ext}`
                : `${cleanHost}/${uniqueSuffix}${ext}`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`S3 upload failed: ${error.message}`);
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);


/***/ }),

/***/ "./apps/backend/src/students/dto/bulk-delete-profiles.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/students/dto/bulk-delete-profiles.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteProfilesDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/students/dto/create-student-profile.dto.ts":
/*!*********************************************************************!*\
  !*** ./apps/backend/src/students/dto/create-student-profile.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStudentProfileDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/students/dto/update-student-profile.dto.ts":
/*!*********************************************************************!*\
  !*** ./apps/backend/src/students/dto/update-student-profile.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStudentProfileDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/students/student-academic-subject/dto/bulk-delete-academic-subjects.dto.ts":
/*!*****************************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic-subject/dto/bulk-delete-academic-subjects.dto.ts ***!
  \*****************************************************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-academic-subject/dto/create-academic-subject.dto.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic-subject/dto/create-academic-subject.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAcademicSubjectDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-academic-subject/dto/update-academic-subject.dto.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic-subject/dto/update-academic-subject.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAcademicSubjectDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-academic-subject/student-academic-subject.controller.ts":
/*!***************************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic-subject/student-academic-subject.controller.ts ***!
  \***************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_academic_subject_dto_1 = __webpack_require__(/*! ./dto/create-academic-subject.dto */ "./apps/backend/src/students/student-academic-subject/dto/create-academic-subject.dto.ts");
const update_academic_subject_dto_1 = __webpack_require__(/*! ./dto/update-academic-subject.dto */ "./apps/backend/src/students/student-academic-subject/dto/update-academic-subject.dto.ts");
const bulk_delete_academic_subjects_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-academic-subjects.dto */ "./apps/backend/src/students/student-academic-subject/dto/bulk-delete-academic-subjects.dto.ts");
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

/***/ "./apps/backend/src/students/student-academic-subject/student-academic-subject.module.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic-subject/student-academic-subject.module.ts ***!
  \***********************************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_academic_subject_controller_1 = __webpack_require__(/*! ./student-academic-subject.controller */ "./apps/backend/src/students/student-academic-subject/student-academic-subject.controller.ts");
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

/***/ "./apps/backend/src/students/student-academic/dto/bulk-delete-academic-details.dto.ts":
/*!********************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic/dto/bulk-delete-academic-details.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteAcademicDetailsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-academic/dto/save-academic-details.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic/dto/save-academic-details.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaveAcademicDetailsDto = exports.SaveQualificationDto = exports.SaveSubjectDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
    (0, swagger_1.ApiProperty)({ example: 'COMMERCE', description: 'Stream (SCIENCE, COMMERCE, ARTS)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveQualificationDto.prototype, "stream", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SaveSubjectDto], description: 'Subjects list', required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
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

/***/ "./apps/backend/src/students/student-academic/dto/update-academic-detail.dto.ts":
/*!**************************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic/dto/update-academic-detail.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAcademicDetailDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
    (0, swagger_1.ApiProperty)({ example: 'COMMERCE', description: 'Stream (SCIENCE, COMMERCE, ARTS)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAcademicDetailDto.prototype, "stream", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAcademicDetailDto.prototype, "IsActive", void 0);


/***/ }),

/***/ "./apps/backend/src/students/student-academic/student-academic.controller.ts":
/*!***********************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic/student-academic.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAcademicController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const save_academic_details_dto_1 = __webpack_require__(/*! ./dto/save-academic-details.dto */ "./apps/backend/src/students/student-academic/dto/save-academic-details.dto.ts");
const update_academic_detail_dto_1 = __webpack_require__(/*! ./dto/update-academic-detail.dto */ "./apps/backend/src/students/student-academic/dto/update-academic-detail.dto.ts");
const bulk_delete_academic_details_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-academic-details.dto */ "./apps/backend/src/students/student-academic/dto/bulk-delete-academic-details.dto.ts");
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

/***/ "./apps/backend/src/students/student-academic/student-academic.module.ts":
/*!*******************************************************************************!*\
  !*** ./apps/backend/src/students/student-academic/student-academic.module.ts ***!
  \*******************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_academic_controller_1 = __webpack_require__(/*! ./student-academic.controller */ "./apps/backend/src/students/student-academic/student-academic.controller.ts");
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

/***/ "./apps/backend/src/students/student-attachment/dto/bulk-delete-student-attachments.dto.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/backend/src/students/student-attachment/dto/bulk-delete-student-attachments.dto.ts ***!
  \*************************************************************************************************/
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
exports.BulkDeleteStudentAttachmentsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class BulkDeleteStudentAttachmentsDto {
}
exports.BulkDeleteStudentAttachmentsDto = BulkDeleteStudentAttachmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3], description: 'List of attachment IDs to delete' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkDeleteStudentAttachmentsDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of deleter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkDeleteStudentAttachmentsDto.prototype, "DeletedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bulk delete attachments', description: 'Optional delete remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkDeleteStudentAttachmentsDto.prototype, "DeletedRemarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/student-attachment/dto/create-student-attachment.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/backend/src/students/student-attachment/dto/create-student-attachment.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStudentAttachmentDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateStudentAttachmentDto {
}
exports.CreateStudentAttachmentDto = CreateStudentAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the Student registration' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateStudentAttachmentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PHOTO', description: 'Document Type (e.g. PHOTO, SIGNATURE)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentAttachmentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/photos/my-photo.jpg', description: 'URL or storage path of the file' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentAttachmentDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStudentAttachmentDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Profile photo uploaded during signup', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStudentAttachmentDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/student-attachment/dto/update-student-attachment.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/backend/src/students/student-attachment/dto/update-student-attachment.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStudentAttachmentDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateStudentAttachmentDto {
}
exports.UpdateStudentAttachmentDto = UpdateStudentAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PHOTO', description: 'Document Type (e.g. PHOTO, SIGNATURE)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentAttachmentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/uploads/photos/my-photo.jpg', description: 'URL or storage path of the file', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentAttachmentDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of updater' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateStudentAttachmentDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Active status', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateStudentAttachmentDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated photo path', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStudentAttachmentDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/student-attachment/dto/upload-student-attachment.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/backend/src/students/student-attachment/dto/upload-student-attachment.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadStudentAttachmentDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UploadStudentAttachmentDto {
}
exports.UploadStudentAttachmentDto = UploadStudentAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'ID of the Student registration (passed as string in form-data)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadStudentAttachmentDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PHOTO', description: 'Document Type (e.g. PHOTO, SIGNATURE)' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadStudentAttachmentDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'The file to upload' }),
    __metadata("design:type", Object)
], UploadStudentAttachmentDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadStudentAttachmentDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Profile photo upload', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadStudentAttachmentDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/students/student-attachment/student-attachment.controller.ts":
/*!***************************************************************************************!*\
  !*** ./apps/backend/src/students/student-attachment/student-attachment.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentAttachmentController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const create_student_attachment_dto_1 = __webpack_require__(/*! ./dto/create-student-attachment.dto */ "./apps/backend/src/students/student-attachment/dto/create-student-attachment.dto.ts");
const update_student_attachment_dto_1 = __webpack_require__(/*! ./dto/update-student-attachment.dto */ "./apps/backend/src/students/student-attachment/dto/update-student-attachment.dto.ts");
const bulk_delete_student_attachments_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-student-attachments.dto */ "./apps/backend/src/students/student-attachment/dto/bulk-delete-student-attachments.dto.ts");
const upload_student_attachment_dto_1 = __webpack_require__(/*! ./dto/upload-student-attachment.dto */ "./apps/backend/src/students/student-attachment/dto/upload-student-attachment.dto.ts");
const storage_service_1 = __webpack_require__(/*! ../../shared/storage/storage.service */ "./apps/backend/src/shared/storage/storage.service.ts");
let StudentAttachmentController = class StudentAttachmentController {
    constructor(studentClient, storageService) {
        this.studentClient = studentClient;
        this.storageService = storageService;
    }
    upload(body, file) {
        const folder = body.documentType.toLowerCase();
        return (0, rxjs_1.from)(this.storageService.uploadFile(file, folder)).pipe((0, operators_1.switchMap)((fileUrl) => {
            const createDto = {
                studentId: Number(body.studentId),
                documentType: body.documentType,
                fileUrl: fileUrl,
                CreatedBy: body.CreatedBy,
                Remarks: body.Remarks,
            };
            return this.studentClient.send({ cmd: 'create_student_attachment' }, createDto);
        }));
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_student_attachment' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_student_attachments' }, {});
    }
    findByStudent(studentId) {
        return this.studentClient.send({ cmd: 'find_student_attachments_by_student' }, { studentId });
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_student_attachment' }, { attachmentId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_student_attachment' }, { attachmentId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_student_attachment' }, { attachmentId: id, DeletedBy, DeletedRemarks });
    }
    bulkRemove(bulkDeleteDto) {
        return this.studentClient.send({ cmd: 'bulk_delete_student_attachments' }, bulkDeleteDto);
    }
};
exports.StudentAttachmentController = StudentAttachmentController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file (Photo/Signature) and save attachment record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'File uploaded and registered successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof upload_student_attachment_dto_1.UploadStudentAttachmentDto !== "undefined" && upload_student_attachment_dto_1.UploadStudentAttachmentDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StudentAttachmentController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register an already uploaded attachment file record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Attachment record registered successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_student_attachment_dto_1.CreateStudentAttachmentDto !== "undefined" && create_student_attachment_dto_1.CreateStudentAttachmentDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], StudentAttachmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all student attachment records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all attachments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StudentAttachmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all attachment records for a specific Student Registration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return student attachments' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StudentAttachmentController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attachment details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return attachment details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _j : Object)
], StudentAttachmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update attachment record path or type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attachment record updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_k = typeof update_student_attachment_dto_1.UpdateStudentAttachmentDto !== "undefined" && update_student_attachment_dto_1.UpdateStudentAttachmentDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _l : Object)
], StudentAttachmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete attachment record by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete document' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attachment record soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_m = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _m : Object)
], StudentAttachmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk soft delete multiple attachment records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attachment records bulk soft deleted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof bulk_delete_student_attachments_dto_1.BulkDeleteStudentAttachmentsDto !== "undefined" && bulk_delete_student_attachments_dto_1.BulkDeleteStudentAttachmentsDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _p : Object)
], StudentAttachmentController.prototype, "bulkRemove", null);
exports.StudentAttachmentController = StudentAttachmentController = __decorate([
    (0, swagger_1.ApiTags)('Student - Attachments'),
    (0, common_1.Controller)('students-attachments'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _b : Object])
], StudentAttachmentController);


/***/ }),

/***/ "./apps/backend/src/students/student-attachment/student-attachment.module.ts":
/*!***********************************************************************************!*\
  !*** ./apps/backend/src/students/student-attachment/student-attachment.module.ts ***!
  \***********************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_attachment_controller_1 = __webpack_require__(/*! ./student-attachment.controller */ "./apps/backend/src/students/student-attachment/student-attachment.controller.ts");
const storage_module_1 = __webpack_require__(/*! ../../shared/storage/storage.module */ "./apps/backend/src/shared/storage/storage.module.ts");
let StudentAttachmentModule = class StudentAttachmentModule {
};
exports.StudentAttachmentModule = StudentAttachmentModule;
exports.StudentAttachmentModule = StudentAttachmentModule = __decorate([
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
            storage_module_1.StorageModule,
        ],
        controllers: [student_attachment_controller_1.StudentAttachmentController],
    })
], StudentAttachmentModule);


/***/ }),

/***/ "./apps/backend/src/students/student-payment/dto/bulk-delete-student-payments.dto.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/backend/src/students/student-payment/dto/bulk-delete-student-payments.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulkDeleteStudentPaymentsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-payment/dto/create-student-payment.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/students/student-payment/dto/create-student-payment.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStudentPaymentDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-payment/dto/update-student-payment.dto.ts":
/*!*************************************************************************************!*\
  !*** ./apps/backend/src/students/student-payment/dto/update-student-payment.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStudentPaymentDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./apps/backend/src/students/student-payment/student-payment.controller.ts":
/*!*********************************************************************************!*\
  !*** ./apps/backend/src/students/student-payment/student-payment.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPaymentController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_student_payment_dto_1 = __webpack_require__(/*! ./dto/create-student-payment.dto */ "./apps/backend/src/students/student-payment/dto/create-student-payment.dto.ts");
const update_student_payment_dto_1 = __webpack_require__(/*! ./dto/update-student-payment.dto */ "./apps/backend/src/students/student-payment/dto/update-student-payment.dto.ts");
const bulk_delete_student_payments_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-student-payments.dto */ "./apps/backend/src/students/student-payment/dto/bulk-delete-student-payments.dto.ts");
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

/***/ "./apps/backend/src/students/student-payment/student-payment.module.ts":
/*!*****************************************************************************!*\
  !*** ./apps/backend/src/students/student-payment/student-payment.module.ts ***!
  \*****************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const student_payment_controller_1 = __webpack_require__(/*! ./student-payment.controller */ "./apps/backend/src/students/student-payment/student-payment.controller.ts");
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

/***/ "./apps/backend/src/students/student-profile.controller.ts":
/*!*****************************************************************!*\
  !*** ./apps/backend/src/students/student-profile.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentProfileController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_student_profile_dto_1 = __webpack_require__(/*! ./dto/create-student-profile.dto */ "./apps/backend/src/students/dto/create-student-profile.dto.ts");
const update_student_profile_dto_1 = __webpack_require__(/*! ./dto/update-student-profile.dto */ "./apps/backend/src/students/dto/update-student-profile.dto.ts");
const bulk_delete_profiles_dto_1 = __webpack_require__(/*! ./dto/bulk-delete-profiles.dto */ "./apps/backend/src/students/dto/bulk-delete-profiles.dto.ts");
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
const student_profile_controller_1 = __webpack_require__(/*! ./student-profile.controller */ "./apps/backend/src/students/student-profile.controller.ts");
const student_academic_module_1 = __webpack_require__(/*! ./student-academic/student-academic.module */ "./apps/backend/src/students/student-academic/student-academic.module.ts");
const student_academic_subject_module_1 = __webpack_require__(/*! ./student-academic-subject/student-academic-subject.module */ "./apps/backend/src/students/student-academic-subject/student-academic-subject.module.ts");
const student_payment_module_1 = __webpack_require__(/*! ./student-payment/student-payment.module */ "./apps/backend/src/students/student-payment/student-payment.module.ts");
const student_attachment_module_1 = __webpack_require__(/*! ./student-attachment/student-attachment.module */ "./apps/backend/src/students/student-attachment/student-attachment.module.ts");
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
            student_attachment_module_1.StudentAttachmentModule,
        ],
        controllers: [students_controller_1.StudentsController, student_profile_controller_1.StudentProfileController],
    })
], StudentsModule);


/***/ }),

/***/ "./apps/backend/src/website/accreditation-slider/accreditation-slider.controller.ts":
/*!******************************************************************************************!*\
  !*** ./apps/backend/src/website/accreditation-slider/accreditation-slider.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccreditationSliderController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_accreditation_slider_dto_1 = __webpack_require__(/*! ./dto/create-accreditation-slider.dto */ "./apps/backend/src/website/accreditation-slider/dto/create-accreditation-slider.dto.ts");
const update_accreditation_slider_dto_1 = __webpack_require__(/*! ./dto/update-accreditation-slider.dto */ "./apps/backend/src/website/accreditation-slider/dto/update-accreditation-slider.dto.ts");
let AccreditationSliderController = class AccreditationSliderController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_accreditation_slider' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_accreditation_sliders' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_accreditation_slider' }, { accreditationSliderId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_accreditation_slider' }, { accreditationSliderId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_accreditation_slider' }, { accreditationSliderId: id, DeletedBy, DeletedRemarks });
    }
};
exports.AccreditationSliderController = AccreditationSliderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new accreditation slider entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Accreditation slider entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_accreditation_slider_dto_1.CreateAccreditationSliderDto !== "undefined" && create_accreditation_slider_dto_1.CreateAccreditationSliderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], AccreditationSliderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active accreditation sliders (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all accreditation slider entries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], AccreditationSliderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get accreditation slider details by accreditationSliderId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return accreditation slider details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], AccreditationSliderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update accreditation slider details by accreditationSliderId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Accreditation slider updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_accreditation_slider_dto_1.UpdateAccreditationSliderDto !== "undefined" && update_accreditation_slider_dto_1.UpdateAccreditationSliderDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], AccreditationSliderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete an accreditation slider entry by accreditationSliderId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete partner logo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Accreditation slider soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], AccreditationSliderController.prototype, "remove", null);
exports.AccreditationSliderController = AccreditationSliderController = __decorate([
    (0, swagger_1.ApiTags)('Website - Accreditation Sliders'),
    (0, common_1.Controller)('website/accreditation-sliders'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AccreditationSliderController);


/***/ }),

/***/ "./apps/backend/src/website/accreditation-slider/accreditation-slider.module.ts":
/*!**************************************************************************************!*\
  !*** ./apps/backend/src/website/accreditation-slider/accreditation-slider.module.ts ***!
  \**************************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const accreditation_slider_controller_1 = __webpack_require__(/*! ./accreditation-slider.controller */ "./apps/backend/src/website/accreditation-slider/accreditation-slider.controller.ts");
let AccreditationSliderModule = class AccreditationSliderModule {
};
exports.AccreditationSliderModule = AccreditationSliderModule;
exports.AccreditationSliderModule = AccreditationSliderModule = __decorate([
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
        controllers: [accreditation_slider_controller_1.AccreditationSliderController],
    })
], AccreditationSliderModule);


/***/ }),

/***/ "./apps/backend/src/website/accreditation-slider/dto/create-accreditation-slider.dto.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/backend/src/website/accreditation-slider/dto/create-accreditation-slider.dto.ts ***!
  \**********************************************************************************************/
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
exports.CreateAccreditationSliderDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateAccreditationSliderDto {
}
exports.CreateAccreditationSliderDto = CreateAccreditationSliderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UGC Approved', description: 'Title or name of accreditation / partner logo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAccreditationSliderDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/accreditations/ugc-logo.png', description: 'Image/Logo URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccreditationSliderDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.ugc.gov.in', description: 'External/Internal URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccreditationSliderDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAccreditationSliderDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is accreditation slider active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAccreditationSliderDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccreditationSliderDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'National accreditation partner', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccreditationSliderDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/accreditation-slider/dto/update-accreditation-slider.dto.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/backend/src/website/accreditation-slider/dto/update-accreditation-slider.dto.ts ***!
  \**********************************************************************************************/
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
exports.UpdateAccreditationSliderDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateAccreditationSliderDto {
}
exports.UpdateAccreditationSliderDto = UpdateAccreditationSliderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UGC Approved', description: 'Title or name of accreditation / partner logo', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAccreditationSliderDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/accreditations/ugc-logo.png', description: 'Image/Logo URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAccreditationSliderDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.ugc.gov.in', description: 'External/Internal URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAccreditationSliderDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAccreditationSliderDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAccreditationSliderDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is accreditation slider entry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAccreditationSliderDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated logo link details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAccreditationSliderDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/admission-enquiry/admission-enquiry.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/backend/src/website/admission-enquiry/admission-enquiry.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdmissionEnquiryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_admission_enquiry_dto_1 = __webpack_require__(/*! ./dto/create-admission-enquiry.dto */ "./apps/backend/src/website/admission-enquiry/dto/create-admission-enquiry.dto.ts");
const update_admission_enquiry_dto_1 = __webpack_require__(/*! ./dto/update-admission-enquiry.dto */ "./apps/backend/src/website/admission-enquiry/dto/update-admission-enquiry.dto.ts");
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

/***/ "./apps/backend/src/website/admission-enquiry/admission-enquiry.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/admission-enquiry/admission-enquiry.module.ts ***!
  \********************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const admission_enquiry_controller_1 = __webpack_require__(/*! ./admission-enquiry.controller */ "./apps/backend/src/website/admission-enquiry/admission-enquiry.controller.ts");
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

/***/ "./apps/backend/src/website/admission-enquiry/dto/create-admission-enquiry.dto.ts":
/*!****************************************************************************************!*\
  !*** ./apps/backend/src/website/admission-enquiry/dto/create-admission-enquiry.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAdmissionEnquiryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is enquiry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAdmissionEnquiryDto.prototype, "IsActive", void 0);
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

/***/ "./apps/backend/src/website/admission-enquiry/dto/update-admission-enquiry.dto.ts":
/*!****************************************************************************************!*\
  !*** ./apps/backend/src/website/admission-enquiry/dto/update-admission-enquiry.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAdmissionEnquiryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/website/campus-quick-link/campus-quick-link.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/backend/src/website/campus-quick-link/campus-quick-link.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampusQuickLinkController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_campus_quick_link_dto_1 = __webpack_require__(/*! ./dto/create-campus-quick-link.dto */ "./apps/backend/src/website/campus-quick-link/dto/create-campus-quick-link.dto.ts");
const update_campus_quick_link_dto_1 = __webpack_require__(/*! ./dto/update-campus-quick-link.dto */ "./apps/backend/src/website/campus-quick-link/dto/update-campus-quick-link.dto.ts");
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

/***/ "./apps/backend/src/website/campus-quick-link/campus-quick-link.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/campus-quick-link/campus-quick-link.module.ts ***!
  \********************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const campus_quick_link_controller_1 = __webpack_require__(/*! ./campus-quick-link.controller */ "./apps/backend/src/website/campus-quick-link/campus-quick-link.controller.ts");
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

/***/ "./apps/backend/src/website/campus-quick-link/dto/create-campus-quick-link.dto.ts":
/*!****************************************************************************************!*\
  !*** ./apps/backend/src/website/campus-quick-link/dto/create-campus-quick-link.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCampusQuickLinkDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is quick link active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCampusQuickLinkDto.prototype, "IsActive", void 0);
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

/***/ "./apps/backend/src/website/campus-quick-link/dto/update-campus-quick-link.dto.ts":
/*!****************************************************************************************!*\
  !*** ./apps/backend/src/website/campus-quick-link/dto/update-campus-quick-link.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCampusQuickLinkDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/website/contact-enquiry/contact-enquiry.controller.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/contact-enquiry/contact-enquiry.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContactEnquiryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_contact_enquiry_dto_1 = __webpack_require__(/*! ./dto/create-contact-enquiry.dto */ "./apps/backend/src/website/contact-enquiry/dto/create-contact-enquiry.dto.ts");
const update_contact_enquiry_dto_1 = __webpack_require__(/*! ./dto/update-contact-enquiry.dto */ "./apps/backend/src/website/contact-enquiry/dto/update-contact-enquiry.dto.ts");
let ContactEnquiryController = class ContactEnquiryController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_contact_enquiry' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_contact_enquiries' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_contact_enquiry' }, { contactEnquiryId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_contact_enquiry' }, { contactEnquiryId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_contact_enquiry' }, { contactEnquiryId: id, DeletedBy, DeletedRemarks });
    }
};
exports.ContactEnquiryController = ContactEnquiryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit / Create a new contact enquiry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Contact enquiry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_contact_enquiry_dto_1.CreateContactEnquiryDto !== "undefined" && create_contact_enquiry_dto_1.CreateContactEnquiryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], ContactEnquiryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active contact enquiries (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all contact enquiries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], ContactEnquiryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contact enquiry details by contactEnquiryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return contact enquiry details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], ContactEnquiryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update contact enquiry details by contactEnquiryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contact enquiry updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_contact_enquiry_dto_1.UpdateContactEnquiryDto !== "undefined" && update_contact_enquiry_dto_1.UpdateContactEnquiryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], ContactEnquiryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a contact enquiry entry by contactEnquiryId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Spam entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contact enquiry soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], ContactEnquiryController.prototype, "remove", null);
exports.ContactEnquiryController = ContactEnquiryController = __decorate([
    (0, swagger_1.ApiTags)('Website - Contact Enquiries'),
    (0, common_1.Controller)('website/contact-enquiries'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ContactEnquiryController);


/***/ }),

/***/ "./apps/backend/src/website/contact-enquiry/contact-enquiry.module.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/contact-enquiry/contact-enquiry.module.ts ***!
  \****************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const contact_enquiry_controller_1 = __webpack_require__(/*! ./contact-enquiry.controller */ "./apps/backend/src/website/contact-enquiry/contact-enquiry.controller.ts");
let ContactEnquiryModule = class ContactEnquiryModule {
};
exports.ContactEnquiryModule = ContactEnquiryModule;
exports.ContactEnquiryModule = ContactEnquiryModule = __decorate([
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
        controllers: [contact_enquiry_controller_1.ContactEnquiryController],
    })
], ContactEnquiryModule);


/***/ }),

/***/ "./apps/backend/src/website/contact-enquiry/dto/create-contact-enquiry.dto.ts":
/*!************************************************************************************!*\
  !*** ./apps/backend/src/website/contact-enquiry/dto/create-contact-enquiry.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContactEnquiryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateContactEnquiryDto {
}
exports.CreateContactEnquiryDto = CreateContactEnquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Suresh Kumar', description: 'Name of the contact inquirer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: 'Phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'suresh@example.com', description: 'Email address', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BBA', description: 'Course of interest', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Please provide hostel details and fee structure.', description: 'Message / inquiry text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PENDING', description: 'Status of inquiry (e.g. PENDING, CONTACTED, RESOLVED)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Has admin read the inquiry?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateContactEnquiryDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is enquiry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateContactEnquiryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'System / Website', description: 'Creator identifier', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Contact form inquiry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactEnquiryDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/contact-enquiry/dto/update-contact-enquiry.dto.ts":
/*!************************************************************************************!*\
  !*** ./apps/backend/src/website/contact-enquiry/dto/update-contact-enquiry.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContactEnquiryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateContactEnquiryDto {
}
exports.UpdateContactEnquiryDto = UpdateContactEnquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Suresh Kumar', description: 'Name of the contact inquirer', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9876543210', description: 'Phone number', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'suresh@example.com', description: 'Email address', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BBA', description: 'Course of interest', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Please provide hostel details and fee structure.', description: 'Message / inquiry text', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'RESOLVED', description: 'Status of inquiry', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Has admin read the inquiry?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateContactEnquiryDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is contact inquiry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateContactEnquiryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Resolved over phone call', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactEnquiryDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/hero-section/dto/create-hero-section.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/backend/src/website/hero-section/dto/create-hero-section.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateHeroSectionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is hero slide active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateHeroSectionDto.prototype, "IsActive", void 0);
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

/***/ "./apps/backend/src/website/hero-section/dto/update-hero-section.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/backend/src/website/hero-section/dto/update-hero-section.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateHeroSectionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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


/***/ }),

/***/ "./apps/backend/src/website/hero-section/hero-section.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/backend/src/website/hero-section/hero-section.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeroSectionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_hero_section_dto_1 = __webpack_require__(/*! ./dto/create-hero-section.dto */ "./apps/backend/src/website/hero-section/dto/create-hero-section.dto.ts");
const update_hero_section_dto_1 = __webpack_require__(/*! ./dto/update-hero-section.dto */ "./apps/backend/src/website/hero-section/dto/update-hero-section.dto.ts");
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

/***/ "./apps/backend/src/website/hero-section/hero-section.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/backend/src/website/hero-section/hero-section.module.ts ***!
  \**********************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const hero_section_controller_1 = __webpack_require__(/*! ./hero-section.controller */ "./apps/backend/src/website/hero-section/hero-section.controller.ts");
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

/***/ "./apps/backend/src/website/image-gallery/dto/create-image-gallery.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/image-gallery/dto/create-image-gallery.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateImageGalleryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateImageGalleryDto {
}
exports.CreateImageGalleryDto = CreateImageGalleryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual Sports Day 2026', description: 'Title of the image gallery album' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageGalleryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sports', description: 'Category (e.g. Events, Campus, Sports, Convocation)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImageGalleryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Highlights from Annual Sports Fest held at university main ground.', description: 'Album description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImageGalleryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['https://example.com/gallery/img1.jpg', 'https://example.com/gallery/img2.jpg'],
        description: 'Array of image URLs or JSON string',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateImageGalleryDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-05T00:00:00.000Z', description: 'Event or album date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImageGalleryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateImageGalleryDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is album active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateImageGalleryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImageGalleryDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sports album', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImageGalleryDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/image-gallery/dto/update-image-gallery.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/image-gallery/dto/update-image-gallery.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateImageGalleryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateImageGalleryDto {
}
exports.UpdateImageGalleryDto = UpdateImageGalleryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual Sports Day 2026', description: 'Title of the image gallery album', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateImageGalleryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sports', description: 'Category (e.g. Events, Campus, Sports, Convocation)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateImageGalleryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Highlights from Annual Sports Fest held at university main ground.', description: 'Album description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateImageGalleryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['https://example.com/gallery/img1.jpg', 'https://example.com/gallery/img2.jpg'],
        description: 'Array of image URLs or JSON string',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateImageGalleryDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-05T00:00:00.000Z', description: 'Event or album date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateImageGalleryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateImageGalleryDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateImageGalleryDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is gallery entry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateImageGalleryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated album info', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateImageGalleryDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/image-gallery/image-gallery.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/image-gallery/image-gallery.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageGalleryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_image_gallery_dto_1 = __webpack_require__(/*! ./dto/create-image-gallery.dto */ "./apps/backend/src/website/image-gallery/dto/create-image-gallery.dto.ts");
const update_image_gallery_dto_1 = __webpack_require__(/*! ./dto/update-image-gallery.dto */ "./apps/backend/src/website/image-gallery/dto/update-image-gallery.dto.ts");
let ImageGalleryController = class ImageGalleryController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_image_gallery' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_image_galleries' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_image_gallery' }, { imageGalleryId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_image_gallery' }, { imageGalleryId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_image_gallery' }, { imageGalleryId: id, DeletedBy, DeletedRemarks });
    }
};
exports.ImageGalleryController = ImageGalleryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new image gallery entry / album' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image gallery created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_image_gallery_dto_1.CreateImageGalleryDto !== "undefined" && create_image_gallery_dto_1.CreateImageGalleryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], ImageGalleryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active image galleries (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all image galleries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], ImageGalleryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get image gallery details by imageGalleryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return image gallery details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], ImageGalleryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update image gallery details by imageGalleryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image gallery updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_image_gallery_dto_1.UpdateImageGalleryDto !== "undefined" && update_image_gallery_dto_1.UpdateImageGalleryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], ImageGalleryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete an image gallery entry by imageGalleryId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete album' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image gallery soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], ImageGalleryController.prototype, "remove", null);
exports.ImageGalleryController = ImageGalleryController = __decorate([
    (0, swagger_1.ApiTags)('Website - Image Galleries'),
    (0, common_1.Controller)('website/image-galleries'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ImageGalleryController);


/***/ }),

/***/ "./apps/backend/src/website/image-gallery/image-gallery.module.ts":
/*!************************************************************************!*\
  !*** ./apps/backend/src/website/image-gallery/image-gallery.module.ts ***!
  \************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const image_gallery_controller_1 = __webpack_require__(/*! ./image-gallery.controller */ "./apps/backend/src/website/image-gallery/image-gallery.controller.ts");
let ImageGalleryModule = class ImageGalleryModule {
};
exports.ImageGalleryModule = ImageGalleryModule;
exports.ImageGalleryModule = ImageGalleryModule = __decorate([
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
        controllers: [image_gallery_controller_1.ImageGalleryController],
    })
], ImageGalleryModule);


/***/ }),

/***/ "./apps/backend/src/website/latest-update/dto/create-latest-update.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/latest-update/dto/create-latest-update.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLatestUpdateDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is update active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLatestUpdateDto.prototype, "IsActive", void 0);
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

/***/ "./apps/backend/src/website/latest-update/dto/update-latest-update.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/latest-update/dto/update-latest-update.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLatestUpdateDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./apps/backend/src/website/latest-update/latest-update.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/latest-update/latest-update.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LatestUpdateController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_latest_update_dto_1 = __webpack_require__(/*! ./dto/create-latest-update.dto */ "./apps/backend/src/website/latest-update/dto/create-latest-update.dto.ts");
const update_latest_update_dto_1 = __webpack_require__(/*! ./dto/update-latest-update.dto */ "./apps/backend/src/website/latest-update/dto/update-latest-update.dto.ts");
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

/***/ "./apps/backend/src/website/latest-update/latest-update.module.ts":
/*!************************************************************************!*\
  !*** ./apps/backend/src/website/latest-update/latest-update.module.ts ***!
  \************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const latest_update_controller_1 = __webpack_require__(/*! ./latest-update.controller */ "./apps/backend/src/website/latest-update/latest-update.controller.ts");
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

/***/ "./apps/backend/src/website/notice-board/dto/create-notice-board.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/backend/src/website/notice-board/dto/create-notice-board.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNoticeBoardDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateNoticeBoardDto {
}
exports.CreateNoticeBoardDto = CreateNoticeBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'End Semester Examination Schedule 2026', description: 'Title of the notice' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Academic', description: 'Category (e.g. Academic, Exam, Admission, General)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'URGENT', description: 'Badge text / tag', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Detailed examination timetable for all UG and PG programs.', description: 'Notice description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-10T00:00:00.000Z', description: 'Publish Date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "publishDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE', description: 'Status of notice (e.g., ACTIVE, EXPIRED, DRAFT)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/notices/exam-schedule.pdf', description: 'PDF Attachment URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "pdf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/notices/exam-details', description: 'External/Internal URL Link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is notice pinned to top?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateNoticeBoardDto.prototype, "isPinned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateNoticeBoardDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is notice active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateNoticeBoardDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Exam cell announcement', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoticeBoardDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/notice-board/dto/update-notice-board.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/backend/src/website/notice-board/dto/update-notice-board.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateNoticeBoardDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateNoticeBoardDto {
}
exports.UpdateNoticeBoardDto = UpdateNoticeBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'End Semester Examination Schedule 2026', description: 'Title of the notice', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Academic', description: 'Category (e.g. Academic, Exam, Admission, General)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'URGENT', description: 'Badge text / tag', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Detailed examination timetable for all UG and PG programs.', description: 'Notice description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-10T00:00:00.000Z', description: 'Publish Date (ISO string)', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "publishDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE', description: 'Status of notice', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/notices/exam-schedule.pdf', description: 'PDF Attachment URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "pdf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/notices/exam-details', description: 'External/Internal URL Link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is notice pinned to top?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateNoticeBoardDto.prototype, "isPinned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateNoticeBoardDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is notice active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateNoticeBoardDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated notice details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoticeBoardDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/notice-board/notice-board.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/backend/src/website/notice-board/notice-board.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoticeBoardController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_notice_board_dto_1 = __webpack_require__(/*! ./dto/create-notice-board.dto */ "./apps/backend/src/website/notice-board/dto/create-notice-board.dto.ts");
const update_notice_board_dto_1 = __webpack_require__(/*! ./dto/update-notice-board.dto */ "./apps/backend/src/website/notice-board/dto/update-notice-board.dto.ts");
let NoticeBoardController = class NoticeBoardController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_notice_board' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_notice_boards' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_notice_board' }, { noticeBoardId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_notice_board' }, { noticeBoardId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_notice_board' }, { noticeBoardId: id, DeletedBy, DeletedRemarks });
    }
};
exports.NoticeBoardController = NoticeBoardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new notice board entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Notice board entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_notice_board_dto_1.CreateNoticeBoardDto !== "undefined" && create_notice_board_dto_1.CreateNoticeBoardDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], NoticeBoardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active notice boards (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all notice board entries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], NoticeBoardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notice board details by noticeBoardId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return notice board details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], NoticeBoardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update notice board details by noticeBoardId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notice board updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_notice_board_dto_1.UpdateNoticeBoardDto !== "undefined" && update_notice_board_dto_1.UpdateNoticeBoardDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], NoticeBoardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a notice board entry by noticeBoardId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete notice' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notice board soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], NoticeBoardController.prototype, "remove", null);
exports.NoticeBoardController = NoticeBoardController = __decorate([
    (0, swagger_1.ApiTags)('Website - Notice Boards'),
    (0, common_1.Controller)('website/notice-boards'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], NoticeBoardController);


/***/ }),

/***/ "./apps/backend/src/website/notice-board/notice-board.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/backend/src/website/notice-board/notice-board.module.ts ***!
  \**********************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const notice_board_controller_1 = __webpack_require__(/*! ./notice-board.controller */ "./apps/backend/src/website/notice-board/notice-board.controller.ts");
let NoticeBoardModule = class NoticeBoardModule {
};
exports.NoticeBoardModule = NoticeBoardModule;
exports.NoticeBoardModule = NoticeBoardModule = __decorate([
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
        controllers: [notice_board_controller_1.NoticeBoardController],
    })
], NoticeBoardModule);


/***/ }),

/***/ "./apps/backend/src/website/stats-counter/dto/create-stats-counter.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/stats-counter/dto/create-stats-counter.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStatsCounterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateStatsCounterDto {
}
exports.CreateStatsCounterDto = CreateStatsCounterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Students Enrolled', description: 'Title of the stats counter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000', description: 'Value of the counter' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+', description: 'Suffix for the counter (e.g. +, %, k+)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "suffix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fa-user-graduate', description: 'Icon class or name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/bg.jpg', description: 'Background Image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "backgroundImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order sequence', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateStatsCounterDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is active flag', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateStatsCounterDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Stats counter entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStatsCounterDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/stats-counter/dto/update-stats-counter.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/stats-counter/dto/update-stats-counter.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatsCounterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateStatsCounterDto {
}
exports.UpdateStatsCounterDto = UpdateStatsCounterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Students Enrolled', description: 'Title of the stats counter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000', description: 'Value of the counter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+', description: 'Suffix for the counter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "suffix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fa-user-graduate', description: 'Icon class or name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/bg.jpg', description: 'Background Image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "backgroundImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order sequence', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStatsCounterDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is active flag', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateStatsCounterDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated stats entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStatsCounterDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/stats-counter/stats-counter.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/stats-counter/stats-counter.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsCounterController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_stats_counter_dto_1 = __webpack_require__(/*! ./dto/create-stats-counter.dto */ "./apps/backend/src/website/stats-counter/dto/create-stats-counter.dto.ts");
const update_stats_counter_dto_1 = __webpack_require__(/*! ./dto/update-stats-counter.dto */ "./apps/backend/src/website/stats-counter/dto/update-stats-counter.dto.ts");
let StatsCounterController = class StatsCounterController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_stats_counter' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_stats_counters' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_stats_counter' }, { statsCounterId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_stats_counter' }, { statsCounterId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_stats_counter' }, { statsCounterId: id, DeletedBy, DeletedRemarks });
    }
};
exports.StatsCounterController = StatsCounterController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new stats counter entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Stats counter created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_stats_counter_dto_1.CreateStatsCounterDto !== "undefined" && create_stats_counter_dto_1.CreateStatsCounterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StatsCounterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active stats counters (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all stats counters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StatsCounterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get stats counter details by statsCounterId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return stats counter details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StatsCounterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update stats counter details by statsCounterId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stats counter updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_stats_counter_dto_1.UpdateStatsCounterDto !== "undefined" && update_stats_counter_dto_1.UpdateStatsCounterDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StatsCounterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a stats counter entry by statsCounterId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete stats entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stats counter soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StatsCounterController.prototype, "remove", null);
exports.StatsCounterController = StatsCounterController = __decorate([
    (0, swagger_1.ApiTags)('Website - Stats Counters'),
    (0, common_1.Controller)('website/stats-counters'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], StatsCounterController);


/***/ }),

/***/ "./apps/backend/src/website/stats-counter/stats-counter.module.ts":
/*!************************************************************************!*\
  !*** ./apps/backend/src/website/stats-counter/stats-counter.module.ts ***!
  \************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const stats_counter_controller_1 = __webpack_require__(/*! ./stats-counter.controller */ "./apps/backend/src/website/stats-counter/stats-counter.controller.ts");
let StatsCounterModule = class StatsCounterModule {
};
exports.StatsCounterModule = StatsCounterModule;
exports.StatsCounterModule = StatsCounterModule = __decorate([
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
        controllers: [stats_counter_controller_1.StatsCounterController],
    })
], StatsCounterModule);


/***/ }),

/***/ "./apps/backend/src/website/testimonial/dto/create-testimonial.dto.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/testimonial/dto/create-testimonial.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTestimonialDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateTestimonialDto {
}
exports.CreateTestimonialDto = CreateTestimonialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rahul Sharma', description: 'Name of the person giving testimonial' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.Tech Alumni (Batch 2024)', description: 'Role or designation', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bacelar Institute provided me with amazing learning opportunities.', description: 'Testimonial feedback message', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.0, description: 'Rating score (1 to 5)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTestimonialDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/student.jpg', description: 'Profile picture / image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order sequence', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTestimonialDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is active flag', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTestimonialDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Testimonial entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTestimonialDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/testimonial/dto/update-testimonial.dto.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/testimonial/dto/update-testimonial.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTestimonialDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateTestimonialDto {
}
exports.UpdateTestimonialDto = UpdateTestimonialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rahul Sharma', description: 'Name of the person', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTestimonialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.Tech Alumni (Batch 2024)', description: 'Role or designation', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTestimonialDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bacelar Institute provided me with amazing learning opportunities.', description: 'Testimonial feedback message', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTestimonialDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.0, description: 'Rating score (1 to 5)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTestimonialDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/student.jpg', description: 'Profile picture / image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTestimonialDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order sequence', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTestimonialDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is active flag', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateTestimonialDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTestimonialDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated testimonial entry', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTestimonialDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/testimonial/testimonial.controller.ts":
/*!************************************************************************!*\
  !*** ./apps/backend/src/website/testimonial/testimonial.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestimonialController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_testimonial_dto_1 = __webpack_require__(/*! ./dto/create-testimonial.dto */ "./apps/backend/src/website/testimonial/dto/create-testimonial.dto.ts");
const update_testimonial_dto_1 = __webpack_require__(/*! ./dto/update-testimonial.dto */ "./apps/backend/src/website/testimonial/dto/update-testimonial.dto.ts");
let TestimonialController = class TestimonialController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_testimonial' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_testimonials' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_testimonial' }, { testimonialId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_testimonial' }, { testimonialId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_testimonial' }, { testimonialId: id, DeletedBy, DeletedRemarks });
    }
};
exports.TestimonialController = TestimonialController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new testimonial entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Testimonial created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_testimonial_dto_1.CreateTestimonialDto !== "undefined" && create_testimonial_dto_1.CreateTestimonialDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], TestimonialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active testimonials (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all testimonials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], TestimonialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get testimonial details by testimonialId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return testimonial details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], TestimonialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update testimonial details by testimonialId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Testimonial updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_testimonial_dto_1.UpdateTestimonialDto !== "undefined" && update_testimonial_dto_1.UpdateTestimonialDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], TestimonialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a testimonial entry by testimonialId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete testimonial' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Testimonial soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], TestimonialController.prototype, "remove", null);
exports.TestimonialController = TestimonialController = __decorate([
    (0, swagger_1.ApiTags)('Website - Testimonials'),
    (0, common_1.Controller)('website/testimonials'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], TestimonialController);


/***/ }),

/***/ "./apps/backend/src/website/testimonial/testimonial.module.ts":
/*!********************************************************************!*\
  !*** ./apps/backend/src/website/testimonial/testimonial.module.ts ***!
  \********************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const testimonial_controller_1 = __webpack_require__(/*! ./testimonial.controller */ "./apps/backend/src/website/testimonial/testimonial.controller.ts");
let TestimonialModule = class TestimonialModule {
};
exports.TestimonialModule = TestimonialModule;
exports.TestimonialModule = TestimonialModule = __decorate([
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
        controllers: [testimonial_controller_1.TestimonialController],
    })
], TestimonialModule);


/***/ }),

/***/ "./apps/backend/src/website/top-achiever/dto/create-top-achiever.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/backend/src/website/top-achiever/dto/create-top-achiever.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTopAchieverDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateTopAchieverDto {
}
exports.CreateTopAchieverDto = CreateTopAchieverDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ankit Kumar', description: 'Name of the top achiever' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/achievers/ankit.jpg', description: 'Profile photo URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Software Engineer @ Google', description: 'Designation / current role', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Highest Package 45 LPA', description: 'Key achievement or highlight', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "achievement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-2024', description: 'Batch / passing year range', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "batch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.Tech Computer Science', description: 'Course / degree program', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Secured top AIR rank and placed at Google Campus placement.', description: 'Detailed description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://linkedin.com/in/ankit', description: 'Profile or news URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTopAchieverDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is top achiever active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTopAchieverDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Featured alumnus', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTopAchieverDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/top-achiever/dto/update-top-achiever.dto.ts":
/*!******************************************************************************!*\
  !*** ./apps/backend/src/website/top-achiever/dto/update-top-achiever.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTopAchieverDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateTopAchieverDto {
}
exports.UpdateTopAchieverDto = UpdateTopAchieverDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ankit Kumar', description: 'Name of the top achiever', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/achievers/ankit.jpg', description: 'Profile photo URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Software Engineer @ Google', description: 'Designation / current role', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Highest Package 45 LPA', description: 'Key achievement or highlight', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "achievement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2020-2024', description: 'Batch / passing year range', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "batch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B.Tech Computer Science', description: 'Course / degree program', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Secured top AIR rank and placed at Google Campus placement.', description: 'Detailed description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://linkedin.com/in/ankit', description: 'Profile or news URL link', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTopAchieverDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is top achiever entry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateTopAchieverDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated achievement info', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTopAchieverDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/top-achiever/top-achiever.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/backend/src/website/top-achiever/top-achiever.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopAchieverController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_top_achiever_dto_1 = __webpack_require__(/*! ./dto/create-top-achiever.dto */ "./apps/backend/src/website/top-achiever/dto/create-top-achiever.dto.ts");
const update_top_achiever_dto_1 = __webpack_require__(/*! ./dto/update-top-achiever.dto */ "./apps/backend/src/website/top-achiever/dto/update-top-achiever.dto.ts");
let TopAchieverController = class TopAchieverController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_top_achiever' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_top_achievers' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_top_achiever' }, { topAchieverId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_top_achiever' }, { topAchieverId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_top_achiever' }, { topAchieverId: id, DeletedBy, DeletedRemarks });
    }
};
exports.TopAchieverController = TopAchieverController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new top achiever entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Top achiever entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_top_achiever_dto_1.CreateTopAchieverDto !== "undefined" && create_top_achiever_dto_1.CreateTopAchieverDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], TopAchieverController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active top achievers (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all top achievers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], TopAchieverController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top achiever details by topAchieverId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return top achiever details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], TopAchieverController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update top achiever details by topAchieverId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top achiever updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_top_achiever_dto_1.UpdateTopAchieverDto !== "undefined" && update_top_achiever_dto_1.UpdateTopAchieverDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], TopAchieverController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a top achiever entry by topAchieverId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top achiever soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], TopAchieverController.prototype, "remove", null);
exports.TopAchieverController = TopAchieverController = __decorate([
    (0, swagger_1.ApiTags)('Website - Top Achievers'),
    (0, common_1.Controller)('website/top-achievers'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], TopAchieverController);


/***/ }),

/***/ "./apps/backend/src/website/top-achiever/top-achiever.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/backend/src/website/top-achiever/top-achiever.module.ts ***!
  \**********************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const top_achiever_controller_1 = __webpack_require__(/*! ./top-achiever.controller */ "./apps/backend/src/website/top-achiever/top-achiever.controller.ts");
let TopAchieverModule = class TopAchieverModule {
};
exports.TopAchieverModule = TopAchieverModule;
exports.TopAchieverModule = TopAchieverModule = __decorate([
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
        controllers: [top_achiever_controller_1.TopAchieverController],
    })
], TopAchieverModule);


/***/ }),

/***/ "./apps/backend/src/website/upload/upload.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/backend/src/website/upload/upload.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const storage_service_1 = __webpack_require__(/*! ../../shared/storage/storage.service */ "./apps/backend/src/shared/storage/storage.service.ts");
let UploadController = class UploadController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async upload(file, folder = 'hero') {
        if (!file) {
            return { success: false, message: 'No file uploaded' };
        }
        const subfolder = folder || 'hero';
        const relativePath = await this.storageService.uploadFile(file, subfolder);
        const port = process.env.PORT || '5000';
        const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
        const fullUrl = relativePath.startsWith('http')
            ? relativePath
            : `${baseUrl.replace(/\/+$/, '')}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
        return {
            success: true,
            url: fullUrl,
            relativePath,
            filename: file.originalname,
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file to backend public/uploads storage' }),
    (0, swagger_1.ApiQuery)({ name: 'folder', required: false, example: 'hero', description: 'Subfolder inside public/uploads' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'The file to upload',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'File uploaded successfully' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "upload", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('Website - File Upload'),
    (0, common_1.Controller)('website/upload'),
    __metadata("design:paramtypes", [typeof (_a = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _a : Object])
], UploadController);


/***/ }),

/***/ "./apps/backend/src/website/upload/upload.module.ts":
/*!**********************************************************!*\
  !*** ./apps/backend/src/website/upload/upload.module.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const upload_controller_1 = __webpack_require__(/*! ./upload.controller */ "./apps/backend/src/website/upload/upload.controller.ts");
const storage_module_1 = __webpack_require__(/*! ../../shared/storage/storage.module */ "./apps/backend/src/shared/storage/storage.module.ts");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [storage_module_1.StorageModule],
        controllers: [upload_controller_1.UploadController],
    })
], UploadModule);


/***/ }),

/***/ "./apps/backend/src/website/video-gallery/dto/create-video-gallery.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/video-gallery/dto/create-video-gallery.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateVideoGalleryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateVideoGalleryDto {
}
exports.CreateVideoGalleryDto = CreateVideoGalleryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual Convocation Ceremony 2026', description: 'Title of the video gallery item' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Events', description: 'Category (e.g. Events, Campus Tour, Seminars)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Highlights from 15th Annual Convocation Ceremony of Bacelar University.', description: 'Video description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/thumbnails/convocation.jpg', description: 'Thumbnail image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/videos/convocation.mp4', description: 'Direct video file URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "video", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'YouTube/Vimeo embed or link URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '05:30', description: 'Video duration (MM:SS or HH:MM:SS)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVideoGalleryDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is video active on website?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateVideoGalleryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin User', description: 'Username of creator', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Convocation video', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVideoGalleryDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/video-gallery/dto/update-video-gallery.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/backend/src/website/video-gallery/dto/update-video-gallery.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateVideoGalleryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateVideoGalleryDto {
}
exports.UpdateVideoGalleryDto = UpdateVideoGalleryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Annual Convocation Ceremony 2026', description: 'Title of the video gallery item', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Events', description: 'Category (e.g. Events, Campus Tour, Seminars)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Highlights from 15th Annual Convocation Ceremony of Bacelar University.', description: 'Video description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/thumbnails/convocation.jpg', description: 'Thumbnail image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/videos/convocation.mp4', description: 'Direct video file URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "video", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'YouTube/Vimeo embed or link URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '05:30', description: 'Video duration (MM:SS or HH:MM:SS)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Display order priority', required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVideoGalleryDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Editor Admin', description: 'Username of editor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is video entry active?', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateVideoGalleryDto.prototype, "IsActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated video details', description: 'Optional remarks', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVideoGalleryDto.prototype, "Remarks", void 0);


/***/ }),

/***/ "./apps/backend/src/website/video-gallery/video-gallery.controller.ts":
/*!****************************************************************************!*\
  !*** ./apps/backend/src/website/video-gallery/video-gallery.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoGalleryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const create_video_gallery_dto_1 = __webpack_require__(/*! ./dto/create-video-gallery.dto */ "./apps/backend/src/website/video-gallery/dto/create-video-gallery.dto.ts");
const update_video_gallery_dto_1 = __webpack_require__(/*! ./dto/update-video-gallery.dto */ "./apps/backend/src/website/video-gallery/dto/update-video-gallery.dto.ts");
let VideoGalleryController = class VideoGalleryController {
    constructor(studentClient) {
        this.studentClient = studentClient;
    }
    create(createDto) {
        return this.studentClient.send({ cmd: 'create_video_gallery' }, createDto);
    }
    findAll() {
        return this.studentClient.send({ cmd: 'find_all_video_galleries' }, {});
    }
    findOne(id) {
        return this.studentClient.send({ cmd: 'find_one_video_gallery' }, { videoGalleryId: id });
    }
    update(id, updateDto) {
        return this.studentClient.send({ cmd: 'update_video_gallery' }, { videoGalleryId: id, ...updateDto });
    }
    remove(id, DeletedBy, DeletedRemarks) {
        return this.studentClient.send({ cmd: 'delete_video_gallery' }, { videoGalleryId: id, DeletedBy, DeletedRemarks });
    }
};
exports.VideoGalleryController = VideoGalleryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new video gallery entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video gallery entry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_video_gallery_dto_1.CreateVideoGalleryDto !== "undefined" && create_video_gallery_dto_1.CreateVideoGalleryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], VideoGalleryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active video galleries (where IsDeleted is false)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all video galleries' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], VideoGalleryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get video gallery details by videoGalleryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return video gallery details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], VideoGalleryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update video gallery details by videoGalleryId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video gallery updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_f = typeof update_video_gallery_dto_1.UpdateVideoGalleryDto !== "undefined" && update_video_gallery_dto_1.UpdateVideoGalleryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], VideoGalleryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a video gallery entry by videoGalleryId' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedBy', required: true, example: 'Admin User' }),
    (0, swagger_1.ApiQuery)({ name: 'DeletedRemarks', required: false, example: 'Obsolete video' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Video gallery soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('DeletedBy')),
    __param(2, (0, common_1.Query)('DeletedRemarks')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], VideoGalleryController.prototype, "remove", null);
exports.VideoGalleryController = VideoGalleryController = __decorate([
    (0, swagger_1.ApiTags)('Website - Video Galleries'),
    (0, common_1.Controller)('website/video-galleries'),
    __param(0, (0, common_1.Inject)('STUDENT_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], VideoGalleryController);


/***/ }),

/***/ "./apps/backend/src/website/video-gallery/video-gallery.module.ts":
/*!************************************************************************!*\
  !*** ./apps/backend/src/website/video-gallery/video-gallery.module.ts ***!
  \************************************************************************/
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const video_gallery_controller_1 = __webpack_require__(/*! ./video-gallery.controller */ "./apps/backend/src/website/video-gallery/video-gallery.controller.ts");
let VideoGalleryModule = class VideoGalleryModule {
};
exports.VideoGalleryModule = VideoGalleryModule;
exports.VideoGalleryModule = VideoGalleryModule = __decorate([
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
        controllers: [video_gallery_controller_1.VideoGalleryController],
    })
], VideoGalleryModule);


/***/ }),

/***/ "./apps/backend/src/website/website.module.ts":
/*!****************************************************!*\
  !*** ./apps/backend/src/website/website.module.ts ***!
  \****************************************************/
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
const campus_quick_link_module_1 = __webpack_require__(/*! ./campus-quick-link/campus-quick-link.module */ "./apps/backend/src/website/campus-quick-link/campus-quick-link.module.ts");
const latest_update_module_1 = __webpack_require__(/*! ./latest-update/latest-update.module */ "./apps/backend/src/website/latest-update/latest-update.module.ts");
const admission_enquiry_module_1 = __webpack_require__(/*! ./admission-enquiry/admission-enquiry.module */ "./apps/backend/src/website/admission-enquiry/admission-enquiry.module.ts");
const hero_section_module_1 = __webpack_require__(/*! ./hero-section/hero-section.module */ "./apps/backend/src/website/hero-section/hero-section.module.ts");
const upload_module_1 = __webpack_require__(/*! ./upload/upload.module */ "./apps/backend/src/website/upload/upload.module.ts");
const notice_board_module_1 = __webpack_require__(/*! ./notice-board/notice-board.module */ "./apps/backend/src/website/notice-board/notice-board.module.ts");
const accreditation_slider_module_1 = __webpack_require__(/*! ./accreditation-slider/accreditation-slider.module */ "./apps/backend/src/website/accreditation-slider/accreditation-slider.module.ts");
const top_achiever_module_1 = __webpack_require__(/*! ./top-achiever/top-achiever.module */ "./apps/backend/src/website/top-achiever/top-achiever.module.ts");
const image_gallery_module_1 = __webpack_require__(/*! ./image-gallery/image-gallery.module */ "./apps/backend/src/website/image-gallery/image-gallery.module.ts");
const video_gallery_module_1 = __webpack_require__(/*! ./video-gallery/video-gallery.module */ "./apps/backend/src/website/video-gallery/video-gallery.module.ts");
const contact_enquiry_module_1 = __webpack_require__(/*! ./contact-enquiry/contact-enquiry.module */ "./apps/backend/src/website/contact-enquiry/contact-enquiry.module.ts");
const stats_counter_module_1 = __webpack_require__(/*! ./stats-counter/stats-counter.module */ "./apps/backend/src/website/stats-counter/stats-counter.module.ts");
const testimonial_module_1 = __webpack_require__(/*! ./testimonial/testimonial.module */ "./apps/backend/src/website/testimonial/testimonial.module.ts");
let WebsiteModule = class WebsiteModule {
};
exports.WebsiteModule = WebsiteModule;
exports.WebsiteModule = WebsiteModule = __decorate([
    (0, common_1.Module)({
        imports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule, upload_module_1.UploadModule, notice_board_module_1.NoticeBoardModule, accreditation_slider_module_1.AccreditationSliderModule, top_achiever_module_1.TopAchieverModule, image_gallery_module_1.ImageGalleryModule, video_gallery_module_1.VideoGalleryModule, contact_enquiry_module_1.ContactEnquiryModule, stats_counter_module_1.StatsCounterModule, testimonial_module_1.TestimonialModule],
        exports: [campus_quick_link_module_1.CampusQuickLinkModule, latest_update_module_1.LatestUpdateModule, admission_enquiry_module_1.AdmissionEnquiryModule, hero_section_module_1.HeroSectionModule, upload_module_1.UploadModule, notice_board_module_1.NoticeBoardModule, accreditation_slider_module_1.AccreditationSliderModule, top_achiever_module_1.TopAchieverModule, image_gallery_module_1.ImageGalleryModule, video_gallery_module_1.VideoGalleryModule, contact_enquiry_module_1.ContactEnquiryModule, stats_counter_module_1.StatsCounterModule, testimonial_module_1.TestimonialModule],
    })
], WebsiteModule);


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

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

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

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/backend/src/main.ts");
/******/ 	
/******/ })()
;