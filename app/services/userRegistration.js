const Employee = require('../models/userRegistration.js');

module.exports = {
    create: (data, callback) => {

        // Create a Employee
        const employee = new Employee({
            firstName: data.firstName,
            lastName: data.lastName,
            emailId: data.emailId,
            password: data.password
        });
        // Save Employee in the database
        employee.save({},(error, data) => {
            if(errors){
                return callback(error,null);
            }
            else
                return 

        })
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Employee."
                });
            });

        ((error, results, fields) => {
            
            return callback(null, results)
        });




    }


}