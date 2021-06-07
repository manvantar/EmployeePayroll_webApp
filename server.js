require("dotenv").config();
const express = require('express');
const dbconnect = require('./config/database.js');
const logger = require('./logger/loggerCofig');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

require('../EmployeePayroll_app/server')

// create express app
const app = express();

//Connect to DB
dbconnect();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())     


var options = {
    swaggerOptions:{
        url: 'http://petstore.swagger.io/v2/swagger.json'
  }
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePlayRoll application Backend"});
});

// Require Employee routes
require('./app/routes/employee')(app);

// listen for requests
const port = process.env.SERVER_PORT;
module.exports= app.listen(port, () =>
console.log("Server is listening on port "+port));