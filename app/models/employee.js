const mongoose = require('mongoose');

/**
 * @description Create Schema model of Employee Data with Schema level data valiadtion
 */
const EmployeeSchema = mongoose.Schema({
    emailId: { type: String, required: true, unique: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/ },
    firstName: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
    lastName: { type: String, required: true, validate: /^[a-zA-Z ]{1,30}$/ },
    company: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
    designation: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ },
    salary: { type: Number, required: true, validate: /^[0-9]{3,}$/ },
    city: { type: String, required: true, validate: /^[a-zA-Z ]{3,30}$/ }, 
    password: { type: String, required: true }
}, {
    timestamps: false,
    versionKey: false
});

const Employee = mongoose.model('Employee', EmployeeSchema)

class RegisterModel {

    /**
    * @description Create method is to save the new Employee Data
    * @param userdData is data sent from Services
    * @return callback is used to callback Services includes error message or data
    */
    create = (userdata, callback) => {
        const employee = new Employee({
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            emailId: userdata.emailId,
            password: userdata.password,
            city:userdata.city,
            salary:userdata.salary,
            company:userdata.company,
            designation:userdata.designation
        });
        employee.save({}, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description retrive all the Employee Data from MongoDB
    * @param callback is data sent from Services
    * @return callback is used to callback Services with data or error message
    */
    findAllEmployees = (callback) => {
        Employee.find({}, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
    * @description retrive all the Employee Data from MongoDB
    * @param objectId, callback is data sent from Services
    * @return callback is used to callback Services with data or error message
    */
    findDataId = (employeObjectId, callback) => {
        Employee.findById(employeObjectId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }

    /**
    * @description delete the Employee Data from MongoDB
    * @param objectId, callback is data sent from Services
    * @return callback is used to callback Services with or without error message
    */
    deleteDataUsingId = (userDataID, callback) => {
        Employee.findByIdAndDelete(userDataID, (error, data) => {
            if (!data && !error) {
                error = "no EmployeeDataFound with ObjectId";
            }
            return (error) ? callback(error) : callback(null);
        })
    }

    /**
    * @description Update the Registration_Data by Id
    * @param oldregistration_Id, New_UserData and callback
    * @return callback is used to callback Services with data or error message
    */
    updateById = (userId, newUserData, callback) => {
        Employee.findByIdAndUpdate(userId, {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password,
            city:userdata.city,
            salary:userdata.salary,
            company:userdata.company,
            designation:userdata.designation
        }, { new: true }, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

}

module.exports = new RegisterModel();