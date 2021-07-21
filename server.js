require("dotenv").config();
const express = require('express');
var cors = require('cors')
const dbconnect = require('./config/database.js');
const logger = require('./config/logger.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// create express app
const app = express();

//Connect to DB
dbconnect();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())     

// parse requests of content-type - cors
app.use(cors())

//swagger requests to app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//api for welcome message
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePlayRoll application Backend"});
});

// Require Employee routes
require('./app/routes/employee')(app);

// listen for requests
const port = process.env.SERVER_PORT;
module.exports= app.listen(port, () =>
logger.info("Server is listening on port "+port));
