const employeeModel = require('../models/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");

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
    findAll = (callback) => {
        employeeModel.findAll((error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description retrive Employee Data
    * @return callback is used to callback Controller with data or error message
    */
    findById = (userDataId, callback) => {
        employeeModel.findById(userDataId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description delete Employee Data
    * @return callback is used to callback Controller with or  without error message
    */
    deleteById = (userDataId, callback) => {
        employeeModel.deleteById(userDataId, error => {
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

}

module.exports = new RegisterService();