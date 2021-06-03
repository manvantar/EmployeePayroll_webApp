const { sign } = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcrypt');

class Helper {

    /**
    * @description this method is used to generate JWT Token 
    * @param data->emailId, timelimit for the Token 
    * @return token
    */
    generateToken = (emailId, timeLimit) => {
        let token = sign({ email: emailId }, process.env.JWT_KEY, { expiresIn: timeLimit });
        return (!token) ? null : token;
    }

    /**
    * @description this method is used to checkpassword
    * @param userPassword from body, encryptedPassword from Database
    * @return boolen value
    */
    checkPassword = (Userpassword, encryptedPass) => {
        return (Userpassword && encryptedPass)? bcrypt.compareSync(Userpassword, encryptedPass): false;
    }

}
module.exports = new Helper();

