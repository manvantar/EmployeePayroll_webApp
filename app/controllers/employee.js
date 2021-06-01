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
                message: validationResult.error.details[0].message
            });
        }
        let userData = req.body;
        employeeService.create(userData, (error, resultdata) => {
            if (error) {
                    return res.status(500).send({
                    message: "Error occured while creating Employee",
                    error: error.message
                });
            }
            res.send({
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
    findAll = (req, res) => {
        employeeService.findAll((error, EmployeeData) => {
            if (error) {
                logger.error("Some error occured while fetching Data")
                return res.status(500).send({
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
        employeeService.findById(req.params.employeeId, (error, userData) => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving employee with id " + req.params.employeeId
                });
            }
            if (userData)
                res.send(userData);
            else {
                return res.status(404).send({
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
        employeeService.deleteById(req.params.employeeId, error => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving employee with id " + req.params.employeeId
                });
            }
            res.send({ message: "Employee deleted successfully!" });
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
                message: validationResult.error.details[0].message
            });
        }
        let userData = req.body;
        employeeService.updateByID(req.params.employeeId, userData, (error, resultData) => {
            if (error) {
                logger.error("Some error occured while creating greeting")
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error occured while updating employeeID with " + req.params.employeeId
                });
            }
            res.send({
                message: "Employee Data updated successfully",
                data: resultData
            })
        })
    };

    /**
     * @description to login the Employee Data
     * @param req is request sent from http having emailId and Password
     * @param res is used to send the Response
     */
     login = (req, res) => {
        res.send(req.body)
     }
}

module.exports = new Controll();