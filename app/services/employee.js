const employeeModel = require('../models/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");
const helper = require('../middleware/helper.js');

class RegisterService {

    /**
    * @description Create method of Model is called to save the new Employee Data, Which also encrypts the password
    * @param userdData is data sent from Controller
    * @return callback is used to callback Controller
    */
    create = (userData, callback) => {
        employeeModel.create(userData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }

    /**
    * @description retrive all the Employee Data
    * @param callback is data sent from Controller
    * @return callback is used to callback Controller with data or error message
    */
    findAllEmployees = (callback) => {
        employeeModel.findAllEmployees((error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description retrive Employee Data
    * @param objectId and callback is data sent from Controller
    * @return callback is used to callback Controller with data or error message
    */
    findDataId = (employeObjectId, callback) => {
        employeeModel.findDataId(employeObjectId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description delete Employee Data
    * @param userdDataId and callback is data sent from Controller
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
            if (error) {
                return callback(error, null);
            }
            else if (helper.checkPassword(credentials.password,data.password)) {              
                    let token = helper.generateToken(data.emailId, process.env.JWT_TIMER);
                    return (!token) ? callback("Something went wrong while generating JWT", null) : callback(null, token)                             
            }
            return callback("Invalid Credentials", null);
        });
    }
}

module.exports = new RegisterService();
