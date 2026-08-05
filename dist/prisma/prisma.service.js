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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const client_1 = require("@prisma/client");
function createAdapterConfig() {
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl) {
        const parsedUrl = new URL(databaseUrl);
        return {
            host: parsedUrl.hostname,
            port: parsedUrl.port ? Number(parsedUrl.port) : 3306,
            user: decodeURIComponent(parsedUrl.username),
            password: decodeURIComponent(parsedUrl.password),
            database: parsedUrl.pathname.replace(/^\//, ''),
        };
    }
    return {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'backend_db',
    };
}
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({ adapter: new adapter_mariadb_1.PrismaMariaDb(createAdapterConfig()) });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map