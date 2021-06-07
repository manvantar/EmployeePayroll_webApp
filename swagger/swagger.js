const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Employee Payroll Schema',
        description: 'Employee Registration Data',
        contact:{
            name: "Manu K V"
        },
        servers:["http://localhost:"+process.env.SERVER_PORT]
    },
    apis:['../EmployeePayroll_app/server']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app/routes/employeepayroll.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);


