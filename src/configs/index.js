export const config = {
	port: 3000,
	db: {
		type: process.env.DB_TYPE.toString,
		host: process.env.DB_HOST.toString,
		port: process.env.DB_PORT.toString,
		user: process.env.DB_USER.toString,
		name: process.env.DB_NAME.toString,
		password: process.env.DB_PASSWORD.toString,
		ssl: process.env.DB_SSL.toString
	}
};
