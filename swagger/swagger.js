const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Employee Payroll Backend',
        description: 'Employee Registration form',
    },
    host: 'localhost:7000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../app/routes/employee.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);