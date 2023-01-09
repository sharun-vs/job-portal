const Job = require('../jobs/jobs.schema');

const getAllJobs = async (page, limit, skillsFilter, experienceLevelFilter, search) => {
	let query = { isActive: true };

	if (skillsFilter != '') {
		query.skills = { $regex: skillsFilter, $options: 'i' };
	}
	if (experienceLevelFilter) {
		query.experienceLevel = { $in: [experienceLevelFilter] };
	}
	if (search != '') {
		query.$or = [{ title: { $regex: '.*' + search + '.*', $options: 'i' } }, { description: { $regex: '.*' + search + '.*', $options: 'i' } }];
	}

	try {
		const jobs = await Job.find(query)
			.skip(page * limit)
			.limit(limit);

		return { page: page, totalDocs: jobs.length, data: jobs };
	} catch (err) {
		return { error: true, message: `Couldn't Find Jobs` };
	}
};

const getJobById = async (jobId) => {
	try {
		return await Job.findById(jobId);
	} catch (err) {
		return { error: true, message: `Couldn't Find Job` };
	}
};

const createJOb = async (jobInput) => {
	try {
		return await new Job(jobInput).save();
	} catch (err) {
		return { error: true, message: `Couldn't Create Job` };
	}
};

const deleteJob = async (userId, jobId) => {
	try {
		const exisingJob = await Job.findById(jobId);

		if (!exisingJob) return { error: true, message: `Couldn't Find Job` };
		if (!exisingJob.postedBy.equals(userId)) return { error: true, message: `Unauthorized To Delete Job` };

		return await Job.findByIdAndDelete(jobId);
	} catch (err) {
		return { error: true, message: `Failed` };
	}
};

module.exports = { getAllJobs, getJobById, createJOb, deleteJob };
