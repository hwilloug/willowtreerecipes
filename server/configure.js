const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const api = require('./src/api')
const recipes = require('./src/recipes')

module.exports = app => {
	app.use(bodyParser.json())
	app.use(morgan('tiny'));
	app.use(cors());
	
	app.use('/api', api);
	app.use('/api/recipes', recipes);
}
