const SignUpValidationSchema = require('./users.validation');

const SignUpValidation = async (req, res, next) => {
	const payload = {
		email: req.body.email,
		role: req.body.role,
		password: req.body.password,
	};

	const { error } = SignUpValidationSchema.validate(payload);
	if (error) {
		return res.status(400).json({ error: true, message: `Error In Input Data: ${error.message}` });
	} else {
		next();
	}
};

module.exports = SignUpValidation;
