const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 1337;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res,next) => {
	res.send({message: `Im Listening!`})
})

app.listen(PORT);
