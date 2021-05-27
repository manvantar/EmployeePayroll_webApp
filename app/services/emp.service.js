const Employee = require('../models/emp.models.js');

module.exports ={
    create : (data, callback) => {
        
        // Create a Employee
    const employee = new Employee({
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
        password: data.password
    });

     // Save Employee in the database
     employee.save()
     .then(data => {
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while creating the Employee."
         });
     });
    }
}