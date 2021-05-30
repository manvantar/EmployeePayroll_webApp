const employeeModel = require('../models/userRegistration.js');

class RegisterService{

    /**
    * @description Create method of Model is called to save the new Registration Data
    * @param userdData is data sent from Controller
    * @return callback is used to callback Controller
    */
    create= (userData, callback)=> {
        employeeModel.create( userData,(error,data) => {
            if(error)
                return callback(error,null);
            return callback(null,data);
        })     
    }

    /**
    * @description retrive all the Registration Data
    * @return callback is used to callback Controller with data or error message
    */
    findAll=(callback) => {
        employeeModel.findAll((error, data)=>{
            if(error)
                return callback(error,null);
            return callback(null,data);
        });
    }

    /**
    * @description retrive Registration Data
    * @return callback is used to callback Controller with data or error message
    */
     findById=(userDataId,callback) => {
        employeeModel.findById(userDataId,(error, data)=>{
            if(error)
                return callback(error,null);
            return callback(null,data);
        });
    }
}

module.exports= new RegisterService();