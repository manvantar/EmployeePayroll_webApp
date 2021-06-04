const controllerEmployee = require('../controllers/employee.js');
const tokenvalidation = require('../../middleware/tokenValidation.js');

module.exports = (app) => {

    // Create a new employee
    app.post('/add', tokenvalidation.checkToken, controllerEmployee.create);

    // Retrieve all employees
    app.get('/employees', tokenvalidation.checkToken, controllerEmployee.findAllEmployees);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', tokenvalidation.checkToken, controllerEmployee.findOneData);

    // Update a employee with employeeId
    app.put('/update/:employeeId', tokenvalidation.checkToken, controllerEmployee.update);

    // Delete a employee with employeeId
    app.delete('/delete/:employeeId', tokenvalidation.checkToken, controllerEmployee.delete);

    // login employee with emailId and Password
    app.post('/login', controllerEmployee.login);
}
