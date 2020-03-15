const express	 = require('express');
const recipes	 = express.Router();
const morgan	 = require('morgan');
const mysql		 = require('mysql');

// Initialize mySQL
const db = mysql.createConnection({
	host: 'localhost',
	user: 'wtr',
	password: '12345',
	database: 'recipedb'
})
db.connect()

recipes.get('/', (req, res, next) => {
	db.query('SELECT * FROM recipes', (error, results, fields) => {
		res.send(results)
	})
})

module.exports = recipes;
