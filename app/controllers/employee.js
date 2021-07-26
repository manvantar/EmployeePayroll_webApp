const joiValidator = require("../middleware/validation.js");
const employeeService = require("../services/employee.js");
const logger = require("../../config/logger.js");

class Controll {
  /**
   * @description Create and save the new Employee Data after validation
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  create = (req, res) => {
    // logger.info(req);
    const employeeData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      city: req.body.city,
      salary: req.body.salary,
      mobile: req.body.mobile,
      company: req.body.company,
      designation: req.body.designation,
    };
    const validationResult =
      joiValidator.joiEmployeeValidator.validate(employeeData);
    if (validationResult.error) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.details[0].message,
      });
    }
    employeeService.create(employeeData, (error, resultdata) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Error occured while creating Employee",
          error: error.message,
        });
      }
      res.status(201).send({
        success: true,
        data: resultdata,
        message: "Employee Data Inserted successfully",
      });
    });
  };

  /**
   * @description find all the Employee Data
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  findAllEmployees = (req, res) => {
    try {
      employeeService.findAllEmployees((error, EmployeeData) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: "Some error occured while fetching Data",
          });
        }
        res.status(200).send({
          success: true,
          message: "Retrived all the employee data successfully",
          EmployeeData: EmployeeData,
        });
      });
    } catch {
      err;
    }
  };

  /**
   * @description find one the Employee Data
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  findOneData = (req, res) => {
    const employeObjectId = req.params.employeeId;
    employeeService.findDataId(employeObjectId, (error, userData) => {
      if (error) {
        logger.error("Employee not found with id " + employeObjectId);
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Employee not found with id " + employeObjectId,
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error retrieving employee with id " + employeObjectId,
        });
      }
      if (userData)
        res.send({
          success: true,
          foundData: userData,
        });
      else {
        return res.status(404).send({
          success: false,
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
    });
  };

  /**
   * @description find one the Employee Data and Delete
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  delete = (req, res) => {
    const employeObjectId = req.params.employeeId;
    employeeService.deleteDataUsingId(employeObjectId, (error) => {
      if (error) {
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Employee not found with id " + employeObjectId,
          });
        }
        return res.status(500).send({
          success: false,
          message: error + " " + employeObjectId,
        });
      }
      res.send({
        success: true,
        message: "Employee deleted successfully!",
      });
    });
  };

  /**
   * @description update Employee Data by using Id after the data validation
   * @param req is request sent from http
   * @param res is used to send the Response
   */
  update = (req, res) => {
    const employeeData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      city: req.body.city,
      salary: req.body.salary,
      mobile: req.body.mobile,
      company: req.body.company,
      designation: req.body.designation,
    };
    const validationResult =
      joiValidator.joiEmployeeValidator.validate(employeeData);
    if (validationResult.error) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.details[0].message,
      });
    }
    let existingUserId = req.params.employeeId;
    employeeService.updateByID(
      existingUserId,
      employeeData,
      (error, resultData) => {
        if (error) {
          if (error.kind === "ObjectId") {
            return res.status(404).send({
              success: false,
              message: "Employee not found with id " + existingUserId,
            });
          }
          return res.status(500).send({
            success: false,
            message:
              "Error occured while updating employeeID with " + existingUserId,
          });
        }
        res.send({
          success: true,
          message: "Employee Data updated successfully",
          UpdatedData: resultData,
        });
      }
    );
  };
}

module.exports = new Controll();
