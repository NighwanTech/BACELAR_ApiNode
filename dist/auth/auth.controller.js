"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const bcrypt_1 = require("bcrypt");
const response_1 = require("../common/response");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const auth_model_1 = require("./auth.model");
let AuthController = class AuthController {
    constructor(authModel, jwtService) {
        this.authModel = authModel;
        this.jwtService = jwtService;
    }
    async register(body) {
        const existingUser = await this.authModel.findUserByEmail(body.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const passwordHash = await (0, bcrypt_1.hash)(body.password, 10);
        const user = await this.authModel.createUser({
            fullName: body.fullName,
            email: body.email,
            password: passwordHash,
        });
        return (0, response_1.createResponse)('Registration successful', user);
    }
    async login(body) {
        const user = await this.authModel.findUserByEmail(body.email);
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(body.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            fullName: user.fullName,
        });
        return (0, response_1.createResponse)('Login successful', {
            accessToken,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    }
    async profile(request) {
        return (0, response_1.createResponse)('Profile fetched successfully', {
            user: request.user,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new user',
        description: 'Creates a user with a hashed password and returns the public user data.',
    }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Registration successful',
        schema: {
            example: {
                success: true,
                message: 'Registration successful',
                data: {
                    id: 'b3e2c6f5-7f2a-4b4d-8f61-0e0a8f9d4f33',
                    fullName: 'John Doe',
                    email: 'john@example.com',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login with email and password',
        description: 'Validates the user credentials and returns a JWT access token.',
    }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Login successful',
        schema: {
            example: {
                success: true,
                message: 'Login successful',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        id: 'b3e2c6f5-7f2a-4b4d-8f61-0e0a8f9d4f33',
                        fullName: 'John Doe',
                        email: 'john@example.com',
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the logged-in user profile',
        description: 'Protected endpoint used to verify JWT authentication in Swagger.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Profile fetched successfully',
        schema: {
            example: {
                success: true,
                message: 'Profile fetched successfully',
                data: {
                    user: {
                        id: 'b3e2c6f5-7f2a-4b4d-8f61-0e0a8f9d4f33',
                        fullName: 'John Doe',
                        email: 'john@example.com',
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_model_1.AuthModel,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map