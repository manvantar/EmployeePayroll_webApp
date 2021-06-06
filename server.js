require("dotenv").config();
const express = require('express');
const dbconnect = require('./config/database.js');
const logger = require('./config/logger.js');
const swaggerJsDoc= require('swagger-jsdoc');
const swaggerUi= require('swagger-ui-express');
require('../EmployeePayroll_app/server')

// create express app
const app = express();

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Employee API',
            description: "Employee API backend deployment",
            contact:{
                name: "Manu K V"
            },
            servers:["http://localhost:"+process.env.SERVER_PORT]
        }
    },
    apis:['../EmployeePayroll_app/server']
}
//Connect to DB
dbconnect();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())     

const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * /:
 *  get:
 *   description: Use to request welcome message
 *    responses:
 *        '200':
 *         description: A successful response    
 */
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePlayRoll application Backend"});
});

// Require Employee routes
require('./app/routes/employee')(app);

// listen for requests
const port = process.env.SERVER_PORT;
module.exports= app.listen(port, () =>
console.log('info',"Server is listening on port "+port));