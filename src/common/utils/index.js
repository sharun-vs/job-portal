const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');

const app = express();
const upload = multer();

app.use(express.json());

module.exports = {
	expressApp: app,
	objectId: mongoose.Types.ObjectId,
	schema: mongoose.Schema,
	model: mongoose.model,
	dbConnect: mongoose.connect,
	dbConnection: mongoose.connection,
	upload: upload,
	joi: joi,
	jwt: jwt,
	bCrypt: bCrypt,
};
