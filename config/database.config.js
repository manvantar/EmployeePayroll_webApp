const mongoose = require('mongoose');

/*
 * function to connect mongoose database 
 * @returns connection
 */
function dbconnect(){

    mongoose.promise;
    const url='mongodb://localhost:27017/emp-payroll';
    mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    return mongoose.connection
    .once('open', () => console.log('database Connected'))
    .on('error', (error)=> {
        console.log("Eroor found",error)
    });
}
module.exports=dbconnect;