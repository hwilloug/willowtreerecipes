const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('client'));
app.use(morgan('tiny'));
app.use(bodyParser.json());

const PORT = 1337;

app.get('/register', (req, res, next) => {
	res.send(`<h1>Register</h1><p>Register Here!</p>`)
})

app.post('/register', (req, res, next) => {
	res.send({message: `Hello ${req.body.email}! Your user was registered! Have fun!`})
})


app.listen(PORT, () => {`Server running on port ${PORT}`});
