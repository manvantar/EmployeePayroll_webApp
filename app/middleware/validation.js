const joi = require("@hapi/joi");

class Validation {
  joiEmployeeValidator = joi.object({
    firstName: joi.string().alphanum().min(3).max(30),
    lastName: joi.string().alphanum().min(2).max(30),
    company: joi.string().alphanum().min(2).max(30),
    designation: joi.string().alphanum().min(2).max(30),
    salary: joi.number().min(100).max(999999999),
    city: joi.string().alphanum().min(2).max(30),
    emailId: joi.string().email().required(),
    mobile: joi.number().min(1000000000).required(),
  });

  //valiadtes newUserdata
  joiUserValidator = joi.object({
    firstName: joi.string().alphanum().min(3).max(30),
    lastName: joi.string().alphanum().min(2).max(30),
    emailId: joi.string().email().required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  //validates Credentials
  joiCredentialsValidator = joi.object({
    emailId: joi.string().email().required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });
}
module.exports = new Validation();
