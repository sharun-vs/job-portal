const { joi } = require('../../common/utils');

const { JobExperienceLevelEnum } = require('../../common/enums/job.experienceLevel.enum');

const jobValidationSchema = joi.object({
	title: joi.string().trim(true).required(),
	description: joi.string().trim(true).required(),
	email: joi.string().email().trim(true).required(),
	experienceLevel: joi
		.string()
		.required()
		.valid(...Object.values(JobExperienceLevelEnum)),
	skills: joi.string().required(),
});

module.exports = jobValidationSchema;
