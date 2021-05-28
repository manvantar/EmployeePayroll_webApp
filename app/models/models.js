const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    firstName: String, 
    lastName: String, 
    emailId: String,
    password: String
}, {
    timestamps: false
});

module.exports = mongoose.model('Employee', EmployeeSchema)