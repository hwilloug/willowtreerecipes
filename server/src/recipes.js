const express = require('express');
const recipes = express.Router();
const morgan = require('morgan');

recipes.get('/', (req, res, next) => {
	console.log('second get request received')
	res.send({message: `This is the recipes page!`})
})

module.exports = recipes;
