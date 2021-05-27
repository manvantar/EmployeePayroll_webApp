const express = require('express');

// create express app
const app = express();

//Connect to DB
const dbconnect = require('./config/database.config.js');
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
require('./app/routes/emp.routes.js')(app);

// listen for requests
const portNumber=6000;
app.listen(portNumber, () => {
    console.log("Server is listening on port "+portNumber);
});