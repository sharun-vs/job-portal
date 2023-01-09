const { jwt } = require('../utils');
const { jwtSecret } = require('../configs');

const verifyToken = async (context) => {
	try {
		let token = context.Authorization || context.authorization;
		context = {};
		token = token ? token.split(' ')[1] : [];

		if (token.length > 0) {
			const user = await jwt.verify(token, jwtSecret);
			context.user = user;
		}
	} catch (e) {
		console.log('Invalid Access Token');
	}

	return context || {};
};

module.exports = verifyToken;
