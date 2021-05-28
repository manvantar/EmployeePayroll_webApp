const { genSaltSync, hashSync} = require("bcrypt");
const salt = genSaltSync(10);
let password = hashSync("n@@nU2897", salt);
console.log(password);