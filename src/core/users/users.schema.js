const { schema, model } = require('../../common/utils');
const UserRoles = require('../../common/enums/users.role.enum');

const UserSchema = new schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true, enum: UserRoles },
	isActive: { type: Boolean, default: true },
});

const User = model('User', UserSchema);
module.exports = User;
