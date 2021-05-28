const { create } = require("../services/service.js");
const { genSaltSync, hashSync} = require("bcrypt");


// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    
    create(body, (err, res) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database Connection error"
            }) 
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Employee.find()
        .then(employees => {
            res.send(employees);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {

    Employee.findById(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving employee with id " + req.params.employeeId
            });
        });

};

// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {

    // Validate request
    var nonemptyflag = 0;
    var field = "";
    let nameRegex = new RegExp('^[A-Z]{1}[a-zA-Z\\s]{1,}$');
    let emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$');
    let passRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if (!nameRegex.test(req.body.firstName)) {
        nonemptyflag = 1; field = "firstname";
    }
    else if (!nameRegex.test(req.body.lastName)) {
        nonemptyflag = 1; field = "lastname";
    }
    else if (!emailRegex.test(req.body.emailId)) {
        nonemptyflag = 1; field = "emailId"
    }
    else if (!passRegex.test(req.body.password)) {
        nonemptyflag = 1; field = "password"
    }
    if (nonemptyflag == 1) {
        return res.status(400).send({
            message: "employee's " + field + " is Invalid"
        });
    }

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Error updating employee with id " + req.params.employeeId
            });
        });
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send({ message: "Employee deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Could not delete employee with id " + req.params.employeeId
            });
        });

};