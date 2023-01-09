const { schema, model, objectId } = require('../../common/utils');

const ApplicationSchema = new schema(
	{
		job: { type: objectId, ref: 'Job' },
		name: { type: String, required: true },
		email: { type: String, required: true, lowercase: true, trim: true },
		resume: { type: Buffer },
		coverLetter: { type: Buffer },
	},
	{ timestamps: true }
);

const Application = model('Application', ApplicationSchema);
module.exports = Application;
