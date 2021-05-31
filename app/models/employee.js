const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String
}, {
    timestamps: false
});

const Employee = mongoose.model('Employee', EmployeeSchema)

class RegisterModel {

    /**
    * @description Create method is to save the new Registration Data
    * @param userdData is data sent from Services
    * @return callback is used to callback Services includes error message or data
    */
    create = (userdata, callback) => {
        const employee = new Employee({
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            emailId: userdata.emailId,
            password: userdata.password
        });
        //save method of mongoose is used to save the data in DB
        employee.save({}, (error, data) => {
            if (error)
                return callback(error, null)
            else
                return callback(null, data)
        });
    }

    /**
    * @description retrive all the Registration Data from MongoDB
    * @return callback is used to callback Services with data or error message
    */
    findAll = (callback) => {
        Employee.find({}, (error, data) => {
            if (error)
                return callback(error, null);
            return callback(null, data);
        });
    }

    /**
    * @description retrive all the Registration Data from MongoDB
    * @return callback is used to callback Services with data or error message
    */
    findById = (userDataID, callback) => {
        Employee.findById(userDataID, (error, data) => {
            if (error)
                return callback(error, null);
            return callback(null, data)
        })
    }

    /**
    * @description delete the Registration Data from MongoDB
    * @return callback is used to callback Services with or without error message
    */
    deleteById = (userDataID, callback) => {
        Employee.findByIdAndRemove(userDataID, error => {
            if (error)
                return callback(error);
            return callback(null)
        })
    }

    /**
    * @description Update the Registration_Data by Id
    * @param oldregistration_Id, New_UserData
    * @return callback is used to callback Services with data or error message
    */
    updateById = (userId, newUserData, callback) => {
        Employee.findByIdAndUpdate(userId, {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password
        }, { new: true },(error,data) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, data);
        }); 
    }
}

module.exports = new RegisterModel();