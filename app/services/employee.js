const employeeModel = require('../models/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require("dotenv").config();

class RegisterService {

    /**
    * @description Create method of Model is called to save the new Employee Data, Which also encrypts the password
    * @param userdData is data sent from Controller
    * @return callback is used to callback Controller
    */
    create = (userData, callback) => {
        const salt = genSaltSync(5);
        userData.password = hashSync(userData.password, salt);
        employeeModel.create(userData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }

    /**
    * @description retrive all the Employee Data
    * @return callback is used to callback Controller with data or error message
    */
    findAllEmployees = (callback) => {
        employeeModel.findAllEmployees((error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description retrive Employee Data
    * @return callback is used to callback Controller with data or error message
    */
    findDataId = (employeObjectId, callback) => {
        employeeModel.findDataId(employeObjectId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description delete Employee Data
    * @return callback is used to callback Controller with or  without error message
    */
    deleteDataUsingId = (userDataId, callback) => {
        employeeModel.deleteDataUsingId(userDataId, error => {
            return (error) ? callback(error) : callback(null);
        });
    }

    /**
    * @description Create method of Model is called to save the new Employee Data  Which also encrypts the password
    * @param userdData is data sent from Controller
    * @return callback is used to callback Controller
    */
    updateByID = (userId, newUserData, callback) => {
        const salt = genSaltSync(5);
        newUserData.password = hashSync(newUserData.password, salt);
        employeeModel.updateById(userId, newUserData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }

    /**
   * @description checkLogindetails used to validate the username and password
   * @param loginData having emailId and password
   * @return callback is used to callback controller with JsonWebToken or error message
   */
    checkLoginDetails = (credentials, callback) => {
        employeeModel.checkLoginDetails(credentials, (error, data) => {
            let result=null;
            if (error) {
                return callback(error, null);
            }
            else if (result=bcrypt.compareSync(credentials.password, data.password)) {
                data.password = undefined;
                const jsontoken = sign({ result: data }, process.env.JWT_KEY, { expiresIn: "1h" });
                return callback(null, jsontoken);
            }
            return callback("Invalid Credentials", null);
        });
    }

}

module.exports = new RegisterService();