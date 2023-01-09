const express = require('express');
const app = express();

const { objectId } = require('../../common/utils');
const { getJobById, getAllJobs, createJOb, deleteJob } = require('./jobs.service');
const jobValidation = require('../../common/middlewares/jobs.middleware');
const verifyToken = require('../../common/middlewares/auth.middleware');

app.use(express.json());

app.use(async (req, res, next) => {
	req.context = await verifyToken(req.headers);
	next();
});

app.get('/:jobId', async (req, res) => {
	if (!req.params.jobId || !objectId.isValid(req.params.jobId)) {
		return res.status(400).json({ error: true, message: `Please Provide A Valid Id` });
	}

	const job = await getJobById(req.params.jobId);
	if (!job || job.error) return res.status(500).json({ error: true, message: `Couldn't Fetch Job: ${job.message ? job.message : null}` });

	return res.status(200).json(job);
});

app.get('/', async (req, res) => {
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 10;
	const skillsFilter = req.query.skills || '';
	const experienceLevelFilter = req.query.experience ? req.query.experience.toUpperCase() : null;
	const search = req.query.search ? req.query.search : '';

	const activeJobs = await getAllJobs(page, limit, skillsFilter, experienceLevelFilter, search);
	return res.status(200).json(activeJobs);
});

app.post('/createJob', jobValidation, async (req, res) => {
	if (!req.context || !req.context.user) return res.status(400).json({ error: true, message: `Unauthorized` });

	req.body.postedBy = req.context.user.userId;
	const createdJob = await createJOb(req.body);

	if (!createdJob || createdJob.error)
		return res.status(500).json({ error: true, message: `Couldn't Create Job: ${createdJob.message ? createdJob.message : null}` });

	return res.status(200).json(createdJob);
});

app.delete('/deleteJob/:jobId', async (req, res) => {
	if (!req.context || !req.context.user) return res.status(400).json({ error: true, message: `Unauthorized` });
	if (!req.params.jobId) return res.status(400).json({ error: true, message: `Please Provide A Valid Job Id` });

	const response = await deleteJob(req.context.user.userId, req.params.jobId);

	if (!response || response.error)
		return res.status(500).json({ error: true, message: `Couldn't Delete Job: ${response.message ? response.message : null}` });

	return res.status(200).json({ message: `Job Deleted` });
});

module.exports = app;
