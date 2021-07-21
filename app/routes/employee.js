/* eslint-disable import/extensions */
const controllerEmployee = require('../controllers/employee.js');
const helper = require('../middleware/helper.js');
const userController = require('../controllers/user.js');

module.exports = (app) => {
  // Create a new employee
  app.post('/add/employee', helper.checkToken, controllerEmployee.create);

  // Retrieve all employees
  app.get('/employees', helper.checkToken, controllerEmployee.findAllEmployees);

  // Retrieve a single employee with employeeId
  app.get('/employees/:employeeId', helper.checkToken, controllerEmployee.findOneData);

  // Update a employee with employeeId
  app.put('/update/employee/:employeeId', helper.checkToken, controllerEmployee.update);

  // Delete a employee with employeeId
  app.delete('/delete/employee/:employeeId', helper.checkToken, controllerEmployee.delete);

  // create user with emailId and Password
  app.post('/registration', userController.create);

  // login user emailId and Password
  app.post('/login', userController.login);
};
