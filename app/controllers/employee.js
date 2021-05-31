const { genSaltSync, hashSync } = require("bcrypt");
const { authorise } = require('../validation/employee.js');
const registerService = require('../services/employee.js');

class Controll {

    /**
     * @description Create and save the new Registration Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    create = (req, res) => {

        // Validate the data using Joi Validator if found error return status 400
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                message: validationResult.error.details[0].message
            });
        }

        //encrypting the Password 
        const salt = genSaltSync(5);
        req.body.password = hashSync(req.body.password, salt);

        //Create request is sent to Create method of services
        let userData = req.body;
        registerService.create(userData, (error, resultdata) => {
            if (error) {
                logger.error("Some error occured while creating greeting")
                return res.status(500).send({
                    //success : registrationResponse.suceess = false,
                    message: "Some error occured while creating greeting"
                });
            }

            res.send({
                data: resultdata,
                message: "Employee Data Inserted successfully"
            })
        })
    }

    /**
     * @description find all the Registration Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findAll = (req, res)=> {
        //findall request is sent to find all the data of Employee Data
        registerService.findAll((error,EmployeeData) => {
            if (error) {
                logger.error("Some error occured while fetching Data")
                return res.status(500).send({
                    message: "Some error occured while fetching Data"
                });
            }
            res.send(EmployeeData)
        })
    };

    /**
     * @description find one the Registration Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findOne = (req, res) => {

        //findall request is sent to find the Employee Data using EmployeeID
        registerService.findById(req.params.employeeId,(error,userData)=>{
            if(error){
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving employee with id " + req.params.employeeId
                });
            }
            if(userData)
                res.send(userData);
            else{
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
        })
    }

    /**
     * @description find one the Registration Data and Delete
     * @param req is request sent from http
     * @param res is used to send the Response
     */
     delete = (req, res) => {

        //Request is sent to delete the Employee Data using EmployeeID
        registerService.deleteById(req.params.employeeId,error=>{
           if(error){
               if (error.kind === 'ObjectId') {
                   return res.status(404).send({
                       message: "Employee not found with id " + req.params.employeeId
                   });
               }
               return res.status(500).send({
                   message: "Error retrieving employee with id " + req.params.employeeId
               });
           }
           res.send({ message: "Employee deleted successfully!" });
       })
   };

   /**
     * @description update Registration Data by using Id
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    // Update a employee identified by the employeeId in the request
    update = (req, res) => {

         // Validate the data using Joi Validator if found error return status 400
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                message: validationResult.error.details[0].message
            });
        }
        const salt = genSaltSync(5);
        req.body.password = hashSync(req.body.password, salt);

        //Create request is sent to Create method of services
        let userData = req.body;

        //Request is sent to update the Employee Data using EmployeeID
        registerService.updateByID(req.params.employeeId,userData,(error,resultData)=>{
            if (error) {
                logger.error("Some error occured while creating greeting")
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error occured while updating employeeID with " + req.params.employeeId
                });            
            }
            res.send({
                message: "Employee Data updated successfully",
                data: resultData
            })
        })
    };
    
}

module.exports = new Controll();