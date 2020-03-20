const mysql = require('mysql')

// Initialize mySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'wtr',
    password: '12345',
    database: 'recipedb'
});
db.connect()

//Remove all entries from each table
const tables = [
	'recipes',
	'steps',
	'ingredients_steps',
	'ingredients',
	'recipe_tags',
	'tags',
	'notes'
];

for (var t=0; t<tables.length; t++) deleteAllRows(tables[t]);

db.end((err) => {if (err) console.log(err)});

function deleteAllRows (table) {
	db.query(`
		DELETE FROM ${table};
	`, (error, results, fields) => {
		if (error) console.log(`Could not delete rows from ${table}.`);
		else if (results.affectedRows==0) console.log(`No rows to delete from ${table}.`);
		else console.log(`Deleted ${results.affectedRows} rows from ${table}.`);
	})
}
