module.exports = (app) => {
    const employees = require('../controllers/emp.controller.js');

    // Create a new employee
    app.post('/employees', employees.create);

    // Retrieve all employees
    app.get('/employees', employees.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', employees.findOne);

    // Update a employee with employeeId
    app.put('/employees/:employeeId', employees.update);

    // Delete a employee with employeeId
    app.delete('/employees/:employeeId', employees.delete);
}
