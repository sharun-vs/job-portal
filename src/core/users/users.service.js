const User = require('./users.schema');
const { jwt, bCrypt } = require('../../common/utils');
const { jwtSecret } = require('../../common/configs');

const makeAuthUser = async (user) => {
	const payload = { userId: user._id, email: user.email, role: user.role };

	return {
		user: user,
		token: jwt.sign(payload, jwtSecret, { expiresIn: '12h' }),
	};
};

const signUp = async (userData) => {
	userData.password = await bCrypt.hash(userData.password, 10);
	return await new User(userData).save();
};

const signIn = async (email, password) => {
	if (!email || !password) return { error: true, message: `Please Provide Email And Password` };

	const existingUser = await User.findOne({ email: email }).lean();
	if (!existingUser) return { error: true, message: `User Not Found` };

	const valid = await bCrypt.compare(password, existingUser.password);
	if (valid == false) return { error: true, message: `Passwords Doesn't Match` };
	delete existingUser.password;
	return await makeAuthUser(existingUser);
};

module.exports = { signUp: signUp, signIn: signIn };
