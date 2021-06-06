require("dotenv").config();
const express = require('express');
const dbconnect = require('./config/database.js');
const logger = require('./config/logger.js');
// create express app
const app = express();

//Connect to DB
dbconnect();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())     

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePlayRoll application Backend"});
});

// Require Notes routes
require('./app/routes/employee')(app);

// listen for requests
const port = process.env.SERVER_PORT;

module.exports= app.listen(port, () =>
logger.log('info',"Server is listening on port "+port));


