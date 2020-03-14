const bodyParser = require('body-parser')
//const moragn = require('morgan')
const cors = require('cors')
const api = require('./src/api')

module.exports = app => {
	app.use(bodyParser.json())
	//app.use(morgan('tiny'));
	app.use(cors());
	app.use('/api', api)
}
