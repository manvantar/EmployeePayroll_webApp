const controllerEmployee = require('../controllers/employee.js');
const helper = require('../middleware/helper.js');

module.exports = (app) => {

    // Create a new employee
    app.post('/add', controllerEmployee.create);

    // Retrieve all employees
    app.get('/employees',  helper.checkToken, controllerEmployee.findAllEmployees);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', helper.checkToken, controllerEmployee.findOneData);

    // Update a employee with employeeId
    app.put('/update/:employeeId', helper.checkToken, controllerEmployee.update);

    // Delete a employee with employeeId
    app.delete('/delete/:employeeId', helper.checkToken, controllerEmployee.delete);

    // login employee with emailId and Password
    app.post('/login', controllerEmployee.login);
}
