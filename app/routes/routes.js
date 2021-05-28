module.exports = (app) => {
    const employees = require('../controllers/controller.js');

    // Create a new employee
    app.post('/employees/add/', employees.create);
 
    // Retrieve all employees
    app.get('/employees/', employees.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', employees.findOne);

    // Update a employee with employeeId
    app.put('/employees/update/:employeeId', employees.update);

    // Delete a employee with employeeId
    app.delete('/employees/delete/:employeeId', employees.delete);
}
