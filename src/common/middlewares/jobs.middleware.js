const jobValidationSchema = require('../../core/jobs/jobs.validator');

const jobValidation = async (req, res, next) => {
	const payload = {
		title: req.body.title,
		description: req.body.description,
		email: req.body.email,
		experienceLevel: req.body.experienceLevel,
		skills: req.body.skills,
	};

	const { error } = jobValidationSchema.validate(payload);
	if (error) {
		return res.status(400).json({ error: true, message: `Error In Input Data: ${error.message}` });
	} else {
		next();
	}
};

module.exports = jobValidation;
