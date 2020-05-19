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
// Validate payload for put and post requests
recipes.get('/', (req, res, next) => {
	res.locals.sort = "";
	if (req.query.sortCategory && req.query.sortDirection) res.locals.sort = `ORDER BY ${req.query.sortCategory} ${req.query.sortDirection}`;
	console.log(res.locals.sort);
	next();
})

//---------------------------------------------Gettin stuff

// Get all entries from recipes table
recipes.get('/', (req, res, next) => {
	db.query(`SELECT * FROM recipes ${res.locals.sort};`,
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
		SELECT * FROM steps
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
		SELECT ingredients_stepsID,
			ingredients.ingredient_name, 
			ingredients_steps.amount,
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

//------------------------------------------------Postin a new recipe
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
			res.locals.recipeID = results.insertId;
			console.log(`Added recipe id ${results.insertId}`);	
			next();
		}
	})
})

// Steps table
recipes.post('/', (req, res, next) => {
	// Get steps array in correct format
	let insertSteps = [];
	for (s in req.body.steps) {
		let step = req.body.steps[s];
		insertSteps.push([`(
			${res.locals.recipeID},
			${step.step_number},
			"${step.instructions}"
		)`]);
	}
	insertSteps = insertSteps.join(', ');
	
	db.query(`
		INSERT INTO steps (recipeID, step_number, instructions) VALUES ${insertSteps};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			console.log(`Added ${results.affectedRows} steps.`)
			next();
		}
	})
})

// Ingredients
recipes.post('/', (req, res, next) => {
	// Check all ingredients
	let insertIngredients = [];
	for (i in req.body.ingredients) {
		let ingredient = req.body.ingredients[i];
		insertIngredients.push([`("${ingredient.ingredient_name}")`])
	}
	insertIngredients = insertIngredients.join(', ');
	
	db.query(`
		INSERT INTO ingredients (ingredient_name)
		VALUES ${insertIngredients}
		ON DUPLICATE KEY UPDATE ingredient_name=ingredient_name;
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			console.log(`Added ${results.affectedRows} new ingredients.`)
			next();
		}
	})
})

// Temporary ingredients_amount table
recipes.post('/', (req, res, next) => {
	let ingredientAmountInsert = [];
	for (ing in req.body.ingredients) {
		let ingredient = req.body.ingredients[ing];
		ingredientAmountInsert.push([`(${res.locals.recipeID},"${ingredient.ingredient_name}", "${ingredient.amount}")`])
	}
	ingredientAmountInsert = ingredientAmountInsert.join(', ')

	let ingredientsStepsLogic = [];
	for (is in req.body.ingredients) {
		let ingredient = req.body.ingredients[is]
		ingredientsStepsLogic.push([`(
			ingredients.ingredient_name="${ingredient.ingredient_name}" AND 
			steps.step_number=${ingredient.ingredient_step} AND
			ingredient_amounts.ingredient="${ingredient.ingredient_name}"
		)`])
	}
	ingredientsStepsLogic = ingredientsStepsLogic.join(' OR ');

	db.query(`
		CREATE TEMPORARY TABLE ingredient_amounts (
			recipeID INT(11),
			ingredient VARCHAR(20),
			amount VARCHAR(20)
		);
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			db.query(`
				INSERT INTO ingredient_amounts (recipeID, ingredient, amount) VALUES ${ingredientAmountInsert};
			`, (error, results, fields) => {
				if (error) res.status(400).send(error);
				else {
					db.query(`
						INSERT INTO ingredients_steps (recipeID, stepID, ingredientID, amount)
						SELECT
							${res.locals.recipeID},
							steps.stepID,
							ingredients.ingredientID,
							ingredient_amounts.amount
						FROM ingredients
						JOIN steps ON steps.recipeID=${res.locals.recipeID}
						JOIN ingredient_amounts ON ingredient_amounts.recipeID=${res.locals.recipeID}
						WHERE ${ingredientsStepsLogic};
					`, (error, results, fields) => {
						if (error) res.status(400).send(error);
						else {
							console.log(`Inserted ${results.affectedRows} ingredients for the recipe.`)
							res.send(`Finished posting recipe ${res.locals.recipeID}`);
						}
					})
				}
			})
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
		DELETE FROM ingredients_steps
		WHERE recipeID=${req.params.recipeID}
			AND stepID=${req.params.stepID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			next();
		}
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
recipes.delete('/:recipeID/ingredients/:ingredientName', (req, res, next) => {
	db.query(`
		DELETE FROM ingredients_steps
		WHERE recipeID=${req.params.recipeID}
			AND ingredients_stepsID=${req.params.ingredientID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else res.send(results);
	})
})

//- - - - - - - - - - - -> Delete a step
recipes.delete('/:recipeID/steps/:stepNumber', [deleteIngredientsFromStep], (req, res, next) => {
	db.query(`
		DELETE FROM steps
		WHERE recipeID=${req.params.recipeID}
			AND stepID=${req.params.stepID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else res.send(results);
	})
})


//----------------------------------------------------Updating Stuff
// UPDATE table_name
// SET column1=value1, column2=value2, ...
// WHERE condition
recipes.put('/:recipeID', (req, res, next) => {
	db.query(`
		UPDATE recipes
		SET name="${req.body.name}",
			difficulty="${req.body.difficulty}",
			time="${req.body.time}",
			description="${req.body.description}"
		WHERE id=${req.params.recipeID};
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			res.send(results);
		}
	})
})
/*
recipes.put('/:recipeID/steps', (req, res, next) => {
	// Check the number of steps compared to that of the db
	// If less, delete
	// If more, add
	const putLength = req.body.length;	

	db.query(`
		SELECT COUNT(*) FROM steps
		WHERE recipeID=${req.params.recipeID};
	`, (error, results, fields) => {
		if (error) res.status(400).send();
		else {
			const prevLength = parseInt(results);
			if (prevLength > putLength) {
				// Delete
				var deleteSteps = [];
				for (i=putLength; i<=prevLength; i++) {
					deleteSteps.push(`stepNumber=${i}`);
				}
				deleteSteps = deleteSteps.join(' OR ');
				db.query(`
					DELETE FROM steps
					WHERE recipeID=${req.params.recipeID}
					AND (${deleteSteps});
				`, (error, results, fields) => {
					if (error) res.status(400).send();
					else next();
				})
			} else if ( prevLength < putLength) {
				// Insert
			} else next();
		}
	})
})

recipes.put('/:recipeID/steps', (req, res, next) => {
	// What about if the user adds a step while updating??
	// There won't be a stepID yet...
	// And what if they delete a step? That won't be reflected in the payload
	let updateSteps = [];
	for (s in req.body) {
		let step = req.body[s];
		updateSteps.push([`(
			${req.params.stepID}, // WE DON'T HAVE THIS IN THE PARAMS UGH
			${req.params.recipeID},
			${step.step_number},
			"${step.instructions}"
		)`]);
	}
	updateSteps = updateSteps.join(', ');
	
	db.query(`
		INSERT INTO steps (stepID, recipeID, step_number, instructions)
		VALUES ${updateSteps}
		ON DUPLICATE KEY UPDATE 
			step_number=VALUES(recipeID),
			instructions=VALUES(instructions);
	`, (error, results, fields) => {
		if (error) res.status(400).send(error);
		else {
			console.log(`Updated ${results.affectedRows} steps.`)
			res.send(results);
		}
	})
})

recipes.put(':recipeID/ingredients', (req, res, next) => {
    // Check all ingredients
    let insertIngredients = [];
    for (i in req.body) {
        let ingredient = req.body[i];
        insertIngredients.push([`("${ingredient.ingredient_name}")`])
    }
    insertIngredients = insertIngredients.join(', ');

	// Check if the ingredient exists before moving on
	db.query(`
        INSERT INTO ingredients (ingredient_name)
        VALUES ${insertIngredients}
        ON DUPLICATE KEY UPDATE ingredient_name=ingredient_name;
	`, (error, results, fields) => {
		if (error) res.status(400).send();
		else next();
	})
})

recipes.put(':recipeID/ingredients', (req, res, next) => {
	// Compare length of input vs number of ingredients
	const putLength = req.body.length;
	
	db.query(`
		SELECT COUNT(*) FROM ingredients_steps
		WHERE recipeID=
	`, (error, results, fields) => {
		if (error) res.status(400).send();
		else {
			const prevLength = parseInt(results);
			if (prevLength > putLength) {
				
			} else if { 
				
			} else next();
		}
	})
})

recipes.put(':recipeID/ingredients', (req, res, next) => {
	// What about if the user adds an ingredient while updating??
	// And what if they delete an ingredient? That won't be reflected in the payload
	db.query(`
		INSERT INTO ingredients_steps (ingredients_stepsID, recipeID, stepID, ingredientID, amount)
		VALUES ${req.body}
		ON DUPLICATE KEY UPDATE
			stepID=VALUES(stepID),
			ingredientID=VALUES(ingredientID),
			amount=VALUES(amount);
	`, (error, results, fields) => {
		if (error) res.status(400).send();
		else {
			console.log(`Updated ${results.affectedRows} ingredients`)
		}
	})
})
*/
module.exports = recipes;	
