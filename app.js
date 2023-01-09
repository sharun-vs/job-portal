const { expressApp, dbConnect, dbConnection } = require('./src/common/utils');
const { port, mongoUri, mongoDbName } = require('./src/common/configs');

const jobsRoutes = require('./src/core/jobs/jobs.router');
const applicationsRoutes = require('./src/core/applications/applications.router');
const userRoutes = require('./src/core/users/users.router');

const connectDb = () => {
	dbConnect(`${mongoUri}/${mongoDbName}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).catch((err) => {
		console.log(`MongoInitialError:${err}`);
	});
};
connectDb();

dbConnection
	.once('open', () => {
		if (process.env.NODE_ENV === 'development') {
			expressApp.listen(port, () => console.info(`Server Listening On: http://localhost:${port}`));
		}
	})
	.on('disconnected', (err) => {
		console.warn(`MongoDisconnected:${err}`);
		connectDb();
	})
	.on('error', (err) => {
		console.log(`MongoError:${err}`);
	});

expressApp.get('/', (req, res) => res.send('Welcome To Job Portal Backend Service!'));
expressApp.use('/jobs', jobsRoutes);
expressApp.use('/applications', applicationsRoutes);
expressApp.use('/users', userRoutes);
