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
});
db.connect()

// Get all entries from recipes table
recipes.get('/', (req, res, next) => {
	db.query(`SELECT * FROM recipes;`,
		(error, results, fields) => {
			res.send(results)
		})
})

// Get entry from recipes table with recipeID
recipes.get('/:recipeID', (req, res, next) => {
	db.query(`SELECT * FROM recipes
		WHERE id=${req.params.recipeID};`,
	(error, results, fields) => {
		if (results.length < 1) res.status(404).send();
		else res.send(results);
	})
})

// Get the steps for a recipe
recipes.get('/:recipeID/steps', (req, res, next) => {
	db.query(`
		SELECT step_number, instructions
		FROM steps
		WHERE recipeID = ${req.params.recipeID}
		ORDER BY step_number;`,
	(error, results, fields) => {
		if (results.length < 1) res.status(404).send();
		else res.send(results);
	})
})

// Get the ingredients for a recipe by step
recipes.get('/:recipeID/ingredients', (req, res, next) => {
	db.query(`
		SELECT ingredients.ingredient_name AS ingredient, 
			ingredients_steps.amount AS amount,
			steps.step_number FROM ingredients_steps
		JOIN ingredients ON ingredients_steps.ingredientID = ingredients.ingredientID
		JOIN steps ON steps.stepID = ingredients_steps.stepID
		WHERE ingredients_steps.recipeID = ${req.params.recipeID};`,
	(error, results, fields) => {
		if (results.length < 1) res.status(404).send();
		else res.send(results);
	})
})

module.exports = recipes;
