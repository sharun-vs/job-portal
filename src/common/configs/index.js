require('dotenv').config();

module.exports = {
	port: parseInt(process.env.SERVER_PORT) || 4000,
	mongoUri: process.env.MONGO_URI,
	mongoDbName: process.env.MONGO_DB_NAME,
	jwtSecret: process.env.JWT_SECRET,
};
