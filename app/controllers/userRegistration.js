const { genSaltSync, hashSync } = require("bcrypt");
const Employee = require('../models/userRegistration.js');
const { authorise } = require('../validation/userRegistration.js');
const service = require('../services/userRegistration.js');

class Controll {

    /**
     * @description Create and save the new Registration Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    create = (req, res) => {

        // Validate the data using Joi Validator if found error return status 400
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                message: validationResult.error.details[0].message
            });
        }

        //encrypting the Password 
        const salt = genSaltSync(5);
        req.body.password = hashSync(req.body.password, salt);

        //Create request is sent to Create method of services
        let userData = req.body;
        service.create(userData, (error, resultdata) => {
            if (error) {
                logger.error("Some error occured while creating greeting")
                return res.status(500).send({
                    //success : registrationResponse.suceess = false,
                    message: "Some error occured while creating greeting"
                });
            }

            res.send({
                data: resultdata,
                message: "Employee Data Inserted successfully"
            })
        })
    }

    /**
     * @description find all the Registration Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findAll = (req, res)=> {
        //findall request is sent to find all the data of Employee Data
        service.findAll((error,EmployeeData) => {
            if (error) {
                logger.error("Some error occured while fetching Data")
                return res.status(500).send({
                    message: "Some error occured while fetching Data"
                });
            }
            res.send(EmployeeData)
        })
    };

    // Find a single employee with a employeeId
    findOne = (req, res) => {

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
    update = (req, res) => {

        var validationResult = authoriseData.validate(req.body);

        if (validationResult.error) {
            return res.status(400).send({
                message: validationResult.error.details[0].message
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
    delete = (req, res) => {
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

}

module.exports = new Controll();