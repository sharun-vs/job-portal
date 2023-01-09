const express = require('express');
const app = express();

const { signIn, signUp } = require('./users.service');
const SignUpValidation = require('./users.middleware');

app.use(express.json());

app.post('/signUp', SignUpValidation, async (req, res) => {
	const newUser = await signUp(req.body);
	if (!newUser) return res.status(500).json({ error: true, message: `Couln't Create User` });
	return res.status(200).json(newUser);
});

app.post('/signIn', async (req, res) => {
	const userData = await signIn(req.body.email, req.body.password);
	if (!userData || userData.error)
		return res.status(500).json({ error: true, message: `Couldn't Sign In: ${userData.message ? userData.message : null}` });
	return res.status(200).json(userData);
});

module.exports = app;
