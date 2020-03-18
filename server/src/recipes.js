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

//---------------------------------------------Gettin stuff

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
			steps.step_number 
		FROM ingredients_steps
		JOIN ingredients ON ingredients_steps.ingredientID = ingredients.ingredientID
		JOIN steps ON steps.stepID = ingredients_steps.stepID
		WHERE ingredients_steps.recipeID = ${req.params.recipeID};`,
	(error, results, fields) => {
		if (results.length < 1) res.status(404).send();
		else res.send(results);
	})
})

//------------------------------------------------Postin stuff

// Add new recipe!
recipes.post('/', (req, res, next) => {
	
	// Recipes table
	db.query(`
		INSERT INTO recipes (name, difficulty, time, description) VALUES (
			'${req.body.name}',
			'${req.body.difficulty}',
			'${req.body.time}',
			'${req.body.description}'
		);
	`, (error, results, fields) => {
		recipeID = results.insertId;	
	})

	// Steps table
	for (let s=0; s<req.body.steps.length; s++) {
		db.query(`
			INSERT INTO steps (recipeID, step_number, instructions) VALUES (
				'${recipeID}',
				'${s+1}',
				'${req.body.steps[s].instructions}'
			);
		`, (error, results, fields) => {})
	}

	// Ingredients tables
	for (let i=0; i<req.body.ingredients.length; i++) {
		// Query if ingredient already exists in db
		db.query(`
			SELECT * FROM ingredients
			WHERE ingredient_name = '${req.body.ingredients[i].ingredient_name}';
		`, (error, results, fields) => {
			if (results.length < 1) {
				// If not, add and get new ingredientID
				db.query(`
					INSERT INTO ingredients (ingredient_name) VALUES (
						'${req.body.ingredients[i].ingredient_name}'
					);
				`, (error, results, fields) => {ingredientID = results.insertId})
			} else {
				// If yes, get ingredientID
				ingredientID = results.ingredientID;
			}
		})
		
		// Find stepID for the step
		db.query(`
			SELECT stepID FROM steps
			WHERE recipeID = ${recipeID}
				AND step_number = ${req.body.ingredients[i].step}
		`, (error, results, fields) => {stepID = results.stepID})

		// Insert into ingredients_steps for stepID and recipeID
		db.query(`
			INSERT INTO ingredients_steps (recipeID, stepID, ingredientID, amount)
			VALUES (
				${recipeID},
				${stepID},
				${ingredientID},
				'${req.body.ingredients[i].amount}'
			)
		`, (error, results, fields) => {console.log('New Recipe Created with ID: ${results.insertId}')})
	}
})

module.exports = recipes;
