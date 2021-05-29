const employees = require('../controllers/controller.js');

module.exports = (app) => {

    // Create a new employee
    app.post('/add', employees.create);
 
    // Retrieve all employees
    app.get('/employees', employees.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', employees.findOne);

    // Update a employee with employeeId
    app.put('/update/:employeeId', employees.update);

    // Delete a employee with employeeId
    app.delete('/delete/:employeeId', employees.delete);
}
