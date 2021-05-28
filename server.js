const express = require('express');
const dbconnect = require('./config/database.js');


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
require('./app/routes/routes.js')(app);

// listen for requests
const portNumber=6050;
app.listen(portNumber, () => {
    console.log("Server is listening on port "+portNumber);
});