const mysql = require('mysql');

// Initialize mySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'wtr',
    password: '12345',
    database: 'recipedb'
});
db.connect()

db.query(`
	INSERT INTO recipes (id, name, difficulty, time, description)
	VALUES (
		1,
		'Poppys Soft Pudding',
		'Hard',
		'Short',
		'This pudding is deliciously soft and creamy.'
	);
`, (error, response, fields) => {
	if (error) console.log(error);
	else {
		console.log('Added row to recipes.');
		db.query(`
			INSERT INTO steps (stepID, recipeID, step_number, instructions)
			VALUES 
			(
				1,
				1,
				1,
				'Whisk together the egg yolks, milk, and sugar.'
			),
			(
				2,
				1,
				2,
				'Microwave on low for 2 minutes.'	
			),
			(
				3,
				1,
				3,
				'Pour into a ramekins and bake at 350 degrees for 45 minutes.'
			),
			(
				4,
				1,
				4,
				'Evenly put sugar on top and caramelize with a blowtorch.'
			);
		`, (error, response, fields) => {
			if (error) console.log(error);
			else {
				console.log(`Added ${response.affectedRows} rows into steps.`);
				db.query(`
					INSERT INTO ingredients (ingredientID, ingredient_name) 
					VALUES 
						(1, 'Egg Yolk'),
						(2, 'Milk'),
						(3, 'Granulated sugar');
				`, (error, response, fields) => {
					console.log(`Added ${response.affectedRows} rows to ingredients`);
					if (error) console.log(error);
					else {
						console.log(`Added ${response.affectedRows}`)
						db.query(`
							INSERT INTO ingredients_steps (ingredients_stepsID, recipeID, stepID, ingredientID, amount) VALUES
							(1, 1, 1, 1, '2'),
							(2, 1, 1, 2, '2 c.'),
							(3, 1, 1, 3, '1 c.'),
							(4, 1, 4, 3, '2 tbl')
						`, (error, response, fields) => {
							if (error) console.log(error)
							else {
								console.log(`Added ${response.affectedRows} rows to ingredients_steps`);
								console.log('Finished :)');
								db.end((err) => {if (err) console.log(err)});
							}
						})
					}
				})
			}
		})
	}
});

