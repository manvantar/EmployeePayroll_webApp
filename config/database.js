const mongoose = require('mongoose');
require("dotenv").config();
/*
 * function to connect mongoose database 
 * @returns connection
 */
function dbconnect(){

    mongoose.promise;
    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    return mongoose.connection
    .once('open', () => console.log('Mongo database Connected'))
    .on('error', (error)=> {
        console.log("Eroor found",error)
    });
}

module.exports=dbconnect;