import { DataSource } from 'typeorm';
import { User } from '../db/userEntity';

export const PostgresDataSource: DataSource = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'postgres',
	port: 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: true,
	entities: [User],
	subscribers: [],
	migrations: []
});
