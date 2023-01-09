const { joi } = require('../../common/utils');

const UserRoles = require('../../common/enums/users.role.enum');

const SignUpValidationSchema = joi.object({
	email: joi.string().email().trim(true).required(),
	password: joi.string().trim(true).required(),
	role: joi
		.string()
		.required()
		.valid(...Object.values(UserRoles)),
});

module.exports = SignUpValidationSchema;
