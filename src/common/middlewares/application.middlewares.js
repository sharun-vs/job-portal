const createApplicationValidationSchema = require('../../core/applications/application.validator');

const createApplicationValidation = async (req, res, next) => {
	const payload = {
		job: req.body.job,
		name: req.body.name,
		email: req.body.email,
	};

	const { error } = createApplicationValidationSchema.validate(payload);
	if (error) {
		return res.status(400).json({ error: true, message: `Error In Input Data: ${error.message}` });
	} else {
		next();
	}
};

module.exports = createApplicationValidation;
