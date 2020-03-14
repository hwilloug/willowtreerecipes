const express = require('express');
const api = express.Router();

api.post('/register', (req,res,next) => {
	res.send({message: `Thanks ${req.body.email}! Your user was registered! Have fun!`})
})

module.exports = api
