const controll = require('../controllers/employee.js');

//let {employeesObject }= new employees;
module.exports = (app) => {

    // Create a new employee
    app.post('/add', controll.create);
 
    // Retrieve all employees
    app.get('/employees', controll.findAll);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', controll.findOne);

    // Update a employee with employeeId
    app.put('/update/:employeeId', controll.update);

    // Delete a employee with employeeId
    app.delete('/delete/:employeeId', controll.delete);
}
