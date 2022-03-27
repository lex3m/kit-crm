const express = require('express');
const exphbs = require('express-handlebars');
//const bodyParser = require('body-parser');

const { response } = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// Pasring middleware
// Parse application/x-www-form-urlendecode
// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static files
app.use(express.static('public'));

// Template engine
//app.engine('hbs', exphbs( {extname: '.hbs'} )); //v5.3.4
//app.set('view engine', 'hbs');

const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs'); 

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
