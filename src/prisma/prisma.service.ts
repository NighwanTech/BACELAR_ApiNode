import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

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

@Injectable()
export class PrismaService extends PrismaClient {
	constructor() {
		super({ adapter: new PrismaMariaDb(createAdapterConfig()) });
	}
}