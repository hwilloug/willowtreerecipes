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

//-----------------------------------------------Checkin if stuff is there


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
		SELECT stepID, step_number, instructions
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
		SELECT ingredients_steps.ingredients_stepsID,
			ingredients.ingredient_name AS ingredient, 
			ingredients_steps.amount AS amount,
			steps.step_number 
		FROM ingredients_steps
		JOIN ingredients ON ingredients_steps.ingredientID = ingredients.ingredientID
		JOIN steps ON steps.stepID = ingredients_steps.stepID
		WHERE ingredients_steps.recipeID = ${req.params.recipeID}
		;`,
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
			"${req.body.name}",
			"${req.body.difficulty}",
			"${req.body.time}",
			"${req.body.description}"
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
	// Add handling for an array of dictionaries
	db.query(`
		INSERT INTO steps (recipeID, step_number, instructions) VALUES (
			"${req.params.recipeID}",
			"${req.body.step_number}",
			"${req.body.instructions}"
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
// Check if method is post, and if yes, check if the ingredient is in the ingredient table
// Return the ingredient ID
recipes.use('/:recipeID/steps/:stepNumber/ingredients', (req, res, next) => {
	// Change the url to /:recipeID/ingredients
	// Add handling for multiple ingredients
	if (req.method=='POST') {
		db.query(`
			SELECT * FROM ingredients
			WHERE ingredient_name = "${req.body.ingredient_name}";
		`, (error, results, fields) => {
			if (error) res.status(400).send(error);
			else if (results.length < 1) {
				// If not, add and get new ingredientID
				db.query(`
					INSERT INTO ingredients (ingredient_name) VALUES (
						"${req.body.ingredient_name}"
					);
				`, (error, results, fields) => {
					if (error) res.status(400).send(error);
					else {
						res.locals.ingredientID = results.insertId;
						next();
					}
				})
			} else {
				// If yes, get ingredient
				res.locals.ingredientID = results[0].ingredientID;
				next();
			}
		})
	}	
})

recipes.post('/:recipeID/steps/:stepNumber/ingredients', (req, res, next) => {
	// Change url to /:recipeID/ingredients and just add step to the payload
	// Add handling for multiple ingredients
	db.query(`
		INSERT INTO ingredients_steps (recipOBeID, stepID, ingredientID, amount)
		SELECT 
			${req.params.recipeID},
			steps.stepID,
			${res.locals.ingredientID},
			"${req.body.amount}"
		FROM steps
		WHERE steps.recipeID = ${req.params.recipeID}
		AND steps.step_number = ${req.params.stepNumber};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else if (results.insertId.length <1) res.status(400).send('');
		else {
			res.send(results);
		}
	})
})

//--------------------------------------------------Deleting Stuff
//What does fields contain?
// DELETE helper middleware
function deleteAllIngredients (req, res, next) {
	db.query(`
		DELETE FROM ingredients_steps WHERE recipeID=${req.params.recipeID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else next();
	})
}

function deleteAllSteps (req, res, next) {
	db.query(`
		DELETE FROM steps WHERE recipeID=${req.params.recipeID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else next();
	})
}

function deleteIngredientsFromStep (req, res, next) {
	db.query(`
		DELETE FROM recipes_steps
		WHERE recipeID=${req.params.recipeID}
			AND stepID=${req.params.stepID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else next();
	})
}

//- - - - - - - - - - - > Delete a recipe
recipes.delete('/:recipeID', [deleteAllIngredients, deleteAllSteps], (req, res, next) => {
	db.query(`
		DELETE FROM recipes WHERE id=${req.params.recipeID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else res.send(results);
	})
})

//- - - - - - - - - - - -> Delete an ingredient
recipes.delete('/:recipeID/ingredient/:ingredientID', (req, res, next) => {
	db.query(`
		DELETE FROM ingredients_steps
		WHERE recipeID=${req.params.recipeID}
			AND ingredientID=${req.params.ingredientID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else res.send(results);
	})
})

//- - - - - - - - - - - -> Delete a step
recipes.delete('/:recipeID/steps/:stepID', [deleteIngredientsFromStep], (req, res, next) => {
	db.query(`
		DELETE FROM steps
		WHERE recipeID=${req.params.recipeID}
			AND stepID=${req.params.stepID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else next();
	})
})


//----------------------------------------------------Updating Stuff

module.exports = recipes;	
