const employeeModel = require('../models/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');

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
    findDataId = (userDataId, callback) => {
        employeeModel.findDataId(userDataId, (error, data) => {
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
    * @description checkLogindetails d
    * @param loginData having emailId and password
    * @return callback is used to callback controller with data or error message
    */
    checkLoginDetails=(loginData,callback)=>{     
        employeeModel.checkLoginDetails(loginData, (error, data) => {
            if(error){
                return callback(error, null) ;
            }
            else if(!bcrypt.compareSync(loginData.password, data.password)){
                return callback("Invalid Credentials",null); 
            }  
            return callback(null,"Login Successful");
        });
    }
     
}

module.exports = new RegisterService();