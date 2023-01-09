const { joi } = require('../../common/utils');

const createApplicationValidationSchema = joi.object({
	job: joi.string().required(),
	name: joi.string().trim(true).min(3).required(),
	email: joi.string().email().trim(true).required(),
});

module.exports = createApplicationValidationSchema;
