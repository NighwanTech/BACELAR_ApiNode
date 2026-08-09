import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

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
	} catch {
		return {
			host: '127.0.0.1',
			port: 3306,
			user: 'root',
			password: '',
			database: 'backend_db',
		};
	}
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
	constructor() {
		const adapter = new PrismaMariaDb(getDbConfig());
		super({ adapter });
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
