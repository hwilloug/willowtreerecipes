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
db.connect((err) =>{
	if (err) console.log(`There was an error ${err}.`);
	else console.log('You are now connected to the recipes database!')
})

//---------------------------------------------Gettin stuff

// Get all entries from recipes table
recipes.get('/', (req, res, next) => {
	db.query(`SELECT * FROM recipes;`,
		(error, results, fields) => {
			if (error) res.status(400).send(error);
			else res.send(results)
		})
})

// Get entry from recipes table with recipeID
recipes.get('/:recipeID', (req, res, next) => {
	db.query(`SELECT * FROM recipes
		WHERE id=${req.params.recipeID};`,
	(error, results, fields) => {
		if (error) res.status(400).send(error);
		else if (results.length < 1) res.status(404).send();
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
		if (error) res.status(400).send();
		else if (results.length < 1) res.status(404).send(error);
		else res.send(results);
	})
})

// Get the ingredients for a recipe
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
		if (error) res.status(400).send(error);
		else if (results.length < 1) res.status(404).send();
		else res.send(results);
	})
})

//------------------------------------------------Postin stuff

// Recipes table
recipes.post('/', (req, res, next) => {	
	db.query(`
		INSERT INTO recipes (name, difficulty, time, description) VALUES (
			'${req.body.name}',
			'${req.body.difficulty}',
			'${req.body.time}',
			'${req.body.description}'
		);
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			console.log(`Added recipe id ${results.insertId}`);	
			res.send(results);
		}
	})
})

// Steps table
recipes.post('/:recipeID/steps', (req, res, next) => {
	db.query(`
		INSERT INTO steps (recipeID, step_number, instructions) VALUES (
			'${req.params.recipeID}',
			'${req.body.step_number}',
			'${req.body.instructions}'
		);
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			console.log(`Added step id ${results.insertId}`)
			res.send(results);
		}
	})
})

// Ingredients tables
recipes.post('/:recipeID/steps/:stepNumber/ingredients', (req, res, next) => {
	insertIngredient(
			req.params.recipeID, 
			req.params.stepNumber,
			req.body.ingredient_name,
			req.body.amount
	).then((resp) => {
		res.send(resp);
	}).catch((err) => {
		if (err) res.status(400).send(err);
		else res.status(404).send();
	})
})

//db.end((err) => {if (err) console.log(err)});

function ingredientCheck(ingredient_name) {
	return new Promise( (resolve, reject) => {
		db.query(`
			SELECT * FROM ingredients
			WHERE ingredient_name = '${ingredient_name}';
		`, (error, results, fields) => {
			if (results.length < 1) {
				// If not, add and get new ingredientID
				db.query(`
					INSERT INTO ingredients (ingredient_name) VALUES (
						'${ingredient_name}'
					);
				`, (error, results, fields) => {
					if (error) {
						reject(error);
					}
					else {
						resolve(results.insertId)
					}
				})
			} else {
				// If yes, get ingredient
				resolve(results[0].ingredientID);
			}
		})
	})
}

async function insertIngredient(recipeID, stepNumber, ingredient_name, amount) {
	const ingredientID = await ingredientCheck(ingredient_name);
	return new Promise( (resolve, reject) => {
		db.query(`
			INSERT INTO ingredients_steps (recipeID, stepID, ingredientID, amount)
			SELECT 
				${recipeID},
				steps.stepID,
				${ingredientID},
				'${amount}'
			FROM steps
			WHERE steps.recipeID = ${recipeID}
			AND steps.step_number = ${stepNumber};
		`, (error, results, fields) => {
			if (error) reject(error);
			else if (results.insertId.length <1) reject('');
			else resolve(results);
		})
	})
}

module.exports = recipes;
