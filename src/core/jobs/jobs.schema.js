const { schema, model, objectId } = require('../../common/utils');
const { JobExperienceLevelEnum } = require('./../../common/enums/job.experienceLevel.enum');

const JobSchema = new schema(
	{
		postedBy: { type: objectId, ref: 'User', required: true },
		title: { type: String, requied: true },
		description: { type: String, requied: true },
		email: { type: String, requied: true, trim: true, lowercase: true },
		experienceLevel: { type: String, required: true, enum: JobExperienceLevelEnum },
		skills: { type: String, required: true },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const Job = model('Job', JobSchema);
module.exports = Job;
