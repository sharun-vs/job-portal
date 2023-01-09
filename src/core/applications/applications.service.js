const Application = require('./applications.schema');

const getApplicationsByJob = async (page, limit, jobId) => {
	if (!jobId) throw new Error('Please Provide Job Id');
	const applications = await Application.find({ job: jobId })
		.skip(page * limit)
		.limit(limit);

	return { page: page, limit: limit, totalDocs: applications.length, data: applications };
};

const createApplication = async (applicationInput) => {
	try {
		return await new Application(applicationInput).save();
	} catch (err) {
		return { error: true, message: `Couldn't Create New Application` };
	}
};

const updateApplication = async (applicationId, data) => {
	if (!applicationId) return { error: true, message: `Please't Provide Application Id` };
	try {
		const existingApplication = await Application.findById(applicationId);
		if (!existingApplication) return { error: true, message: `Couldn't Find Application` };

		existingApplication.resume = data['resume'][0].buffer;
		existingApplication.coverLetter = data['coverLetter'][0].buffer;
		return await existingApplication.save();
	} catch (err) {
		return { error: true, message: `Couldn't Update Application` };
	}
};

module.exports = { getApplicationsByJob, createApplication, updateApplication };
