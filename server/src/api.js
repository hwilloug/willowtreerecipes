const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 1337;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, PATCH, POST, DELETE");
	res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With, Authorization, Accept');
	next();
})

app.post('/register', (req,res,next) => {
	res.send({message: `Thanks ${req.body.email}! Your user was registered! Have fun!`})
})

app.listen(PORT);
