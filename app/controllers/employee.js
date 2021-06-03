const { authorise } = require('../validation/employee.js');
const employeeService = require('../services/employee.js');

class Controll {

    /**
     * @description Create and save the new Employee Data after validation
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    create = (req, res) => {
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                success: false,
                message: validationResult.error.details[0].message
            });
        }
        let userData = req.body;
        employeeService.create(userData, (error, resultdata) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: "Error occured while creating Employee",
                    error: error.message
                });
            }
            res.send({
                success: true,
                data: resultdata,
                message: "Employee Data Inserted successfully"
            })
        })
    }

    /**
     * @description find all the Employee Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findAllEmployees = (req, res) => {
        employeeService.findAllEmployees((error, EmployeeData) => {
            if (error) {
                logger.error("Some error occured while fetching Data")
                return res.status(500).send({
                    success: false,
                    message: "Some error occured while fetching Data"
                });
            }
            res.send(EmployeeData)
        })
    };

    /**
     * @description find one the Employee Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findOne = (req, res) => {
        let employeObjectId = req.params.employeeId;
        employeeService.findDataId(employeObjectId, (error, userData) => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        success: false,
                        message: "Employee not found with id " + employeId
                    });
                }
                return res.status(500).send({
                    success: false,
                    message: "Error retrieving employee with id " + employeId
                });
            }
            if (userData)
                res.send({
                    success: true,
                    foundData: userData
                });
            else {
                return res.status(404).send({
                    success: false,
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
        })
    }

    /**
     * @description find one the Employee Data and Delete
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    delete = (req, res) => {
        let employeObjectId = req.params.employeeId;
        employeeService.deleteDataUsingId(employeObjectId, error => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        success: false,
                        message: "Employee not found with id " + employeId
                    });
                }
                return res.status(500).send({
                    success: false,
                    message: "Error retrieving employee with id " + employeId
                });
            }
            res.send({
                success: true,
                message: "Employee deleted successfully!"
            });
        })
    };

    /**
      * @description update Employee Data by using Id after the data validation
      * @param req is request sent from http
      * @param res is used to send the Response
      */
    update = (req, res) => {
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                success: false,
                message: validationResult.error.details[0].message
            });
        }
        let userData = req.body;
        let existingUserId = req.params.employeeId;
        employeeService.updateByID(existingUserId, userData, (error, resultData) => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        success: false,
                        message: "Employee not found with id " + existingUserId
                    });
                }
                return res.status(500).send({
                    success: false,
                    message: "Error occured while updating employeeID with " + existingUserId
                });
            }
            res.send({
                success: true,
                message: "Employee Data updated successfully",
                UpdatedData: resultData
            })
        })
    };

    /**
     * @description to login the Employee Data
     * @param req is request sent from http having emailId and Password
     * @param res is used to send the Response
     */
    login = (req, res) => {
        let credentials = req.body;
        employeeService.checkLoginDetails(credentials, (error, data) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: error
                });
            }
            res.send({
                success: true,
                message: "logged in successfully",
                token: data
            });
        })
    }
}

module.exports = new Controll();