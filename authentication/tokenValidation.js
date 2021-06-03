const jwt = require("jsonwebtoken");
module.exports = {

    /**
    * @description CheckToken method is used to validate the Token before the execution of next
    * @param req from the user, res to server , next method 
    */
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.status(400).send({
                        success: 0,
                        message: "Invalid Token..."
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(404).send({
                success: 0,
                message: "Access Denied! Unauthorized User!! add Token and then Proceed "
            });
        }
    }
};