const express = require('express');
const app = express();

const { upload, objectId } = require('../../common/utils');

const { getApplicationsByJob, createApplication, updateApplication } = require('./applications.service');
const createApplicationValidation = require('../../common/middlewares/application.middlewares');

app.use(express.json());

app.get('/:jobId', async (req, res) => {
	if (!req.params.jobId || !objectId.isValid(req.params.jobId)) {
		return res.status(400).json({ error: true, message: `Please Provide A Valid Job Id` });
	}
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 10;

	const applications = await getApplicationsByJob(page, limit, req.params.jobId);
	return res.status(200).json(applications);
});

app.post('/apply', createApplicationValidation, async (req, res) => {
	const application = await createApplication(req.body);
	if (!application || application.error)
		return res
			.status(500)
			.json({ error: true, message: `Couldn't Complete The Application: ${application.message ? application.message : null}` });

	return res.status(200).json({ message: 'Applied Successfully' });
});

const cpUpload = upload.fields([
	{ name: 'resume', maxCount: 1 },
	{ name: 'coverLetter', maxCount: 1 },
]);

app.post('/uploadFiles/:applicationId', cpUpload, async (req, res) => {
	if (!req.params.applicationId || !objectId.isValid(req.params.applicationId))
		return res.status(400).json({ error: true, message: `Please Provide A Valid Application Id` });

	if (!req.files || !req.files.resume || !req.files.coverLetter)
		return res.status(400).json({ error: true, message: `Please Upload Valid Documents` });

	const updatedApplication = await updateApplication(req.params.applicationId, req.files);
	if (!updatedApplication || updatedApplication.error)
		return res
			.status(500)
			.json({ error: true, message: `Couldn't Upload Documents: ${updatedApplication.message ? updatedApplication.message : null}` });

	return res.status(200).json({ message: 'Files Uploaded Successfully' });
});

module.exports = app;
