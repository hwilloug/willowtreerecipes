const express = require('express');
//const morgan = require('morgan');
//const bodyParser = require('body-parser');
//const cors = require('cors');

//const PORT = 1337;

//const api = express();

//api.use(morgan('tiny'));
//api.use(bodyParser.json());
//api.use(cors());

//api.all('/', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, PATCH, POST, DELETE");
//	res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With, Authorization, Accept');
//	next();
//})

const api = express.Router();

api.post('/register', (req,res,next) => {
	res.send({message: `Thanks ${req.body.email}! Your user was registered! Have fun!`})
})

//api.listen(PORT);

module.exports = api
