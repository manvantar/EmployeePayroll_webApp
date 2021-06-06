const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employeeJSON = JSON.parse(rawdata);

describe("POST /login", () => {
    it("It should post a new Login inputBody and return status 200, success=true", (done) => {
        const inputBody = employeeJSON.TestData1;
        chai.request(server)
            .post("/login")
            .send(inputBody)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.have.property('success').eq(true);
                response.body.should.have.property('message').eq("logged in successfully");
                response.body.should.have.property('token');
                done();
            });
    })

    it("It should post a new Login inputBody2 and return status 404, success=false", (done) => {
        const inputBody2 = employeeJSON.TestData2;
        chai.request(server)
            .post("/login")
            .send(inputBody2)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    })
})

describe("POST /add", () => {
    it("It should post a new employeeData  and return status 200, success=true", (done) => {
        const inputBody = employeeJSON.TestData3;
        chai.request(server)
            .post("/add")
            .send(inputBody)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.have.property('success').eq(true);
                response.body.should.have.property('message').eq("Employee Data Inserted successfully");
                done();
            });
    })

    it("It should post a new employeeData  and return status 400, success=false", (done) => {
        const inputBody = employeeJSON.TestData4;
        chai.request(server)
            .post("/add")
            .send(inputBody)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false);
                response.body.should.have.property('message')
                done();
            });
    })
})

let jwToken='';
    
beforeEach(done => {
    chai
        .request(server)
        .post("/login")
        .send(employeeJSON.TestData1)
        .end((err, res) => {
            jwToken = res.body.token;
            res.should.have.status(200);
            done();
        });
});

let invalidToken=jwToken.slice(10);
let empToken='';

describe("/GET /employees", () => { 
    
    it("it should fetch all employeeData successfully with valid token returns status 200 and success=true", done => {
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('message').eq("Retrived all the employee data successfully")
                response.body.should.have.property('EmployeeData')
                done();
            });
    });

    it("it should not fetch all employeeData with invalid valid token returns status 400 and success=false", done => {
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', 'Bearar ' + invalidToken)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('message').eq("Invalid Token...or Expired")
                done();
            });
    });

    it("it should not fetch all employeeData with empty token returns status 401 and success=false", done => {
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', empToken)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('message').eq("Access Denied! Unauthorized User!! add Token and then Proceed ")
                done();
            });
    });

});

describe("/GET /employees/Id", () => { 
    
    it("it should give employeeTestData successfully with valid token and Object Id returns status 200 and success=true", done => {
        chai
            .request(server)
            .get("/employees/"+employeeJSON.TestData5.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('success').eq(true);
                response.body.should.have.property('foundData');
                done();
            });
    });

    it("it not should give employeeData  with valid token and invalid and Object Id returns status 404 and success=false", done => {
        chai
            .request(server)
            .get("/employees/"+employeeJSON.TestData6.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });

    it("it not should give employeeData  with invalid valid token and valid and Object Id returns status 400 and success=false", done => {
        chai
            .request(server)
            .get("/employees/"+employeeJSON.TestData5.Id)
            .set('Authorization', 'Bearar ' + invalidToken)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false);
                response.body.should.have.property('message').eq("Invalid Token...or Expired")
                done();
            });
    });

    it("it not should give employeeData  with empty token and valid Object Id returns status 401 and success=false", done => {
        chai
            .request(server)
            .get("/employees/"+employeeJSON.TestData5.Id)
            .set('Authorization', empToken)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property('success').eq(false);
                response.body.should.have.property('message').eq("Access Denied! Unauthorized User!! add Token and then Proceed ")
                done();
            });
    });
});

describe("/PUT /update/Id", () => { 
    
    it("it should update employeeData successfully with valid token and Object Id returns status 200 and success=true", done => {
        const inputBody = employeeJSON.TestData3;
        chai
            .request(server)
            .put("/update/"+employeeJSON.TestData5.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .send(inputBody)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("it should not update employeeData with valid token and invalid Object Id returns status 404 and success=false", done => {
        const inputBody = employeeJSON.TestData3;
        chai
            .request(server)
            .put("/update/"+employeeJSON.TestData6.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .send(inputBody)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });

    it("it should not update employeeData with invalid token and valid Object Id returns status 400 and success=false", done => {
        const inputBody = employeeJSON.TestData3;
        chai
            .request(server)
            .put("/update/"+employeeJSON.TestData5.Id)
            .set('Authorization', 'Bearar ' + invalidToken)
            .send(inputBody)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false);
                response.body.should.have.property('message').eq("Invalid Token...or Expired")
                done();
            });
    });

    it("it should not update employeeData with empty and valid Object Id returns status 401 and success=false", done => {
        const inputBody = employeeJSON.TestData3;
        chai
            .request(server)
            .put("/update/"+employeeJSON.TestData5.Id)
            .set('Authorization', empToken)
            .send(inputBody)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('message').eq("Access Denied! Unauthorized User!! add Token and then Proceed ")
                done();
            });
    });
    
});

describe("/Delele /Id", () => { 
    
    it("it should delete employeeData successfully with valid token and valid Object Id returns status 200 and success=true", done => {
        chai
            .request(server)
            .delete("/delete/"+employeeJSON.TestData5.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(200);
                //response.body.should.have.property('success').eq(false);
                done();
            });
    });

    it("it not should delete employeeData  with valid token and invalid and Object Id returns status 404 and success=false", done => {
        chai
            .request(server)
            .delete("/delete/"+employeeJSON.TestData6.Id)
            .set('Authorization', 'Bearar ' + jwToken)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });

    it("it not should delete employeeData  with invalid token and invalid and Object Id returns status 400 and success=false", done => {
        chai
            .request(server)
            .delete("/delete/"+employeeJSON.TestData5.Id)
            .set('Authorization', 'Bearar ' + invalidToken)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false);
                response.body.should.have.property('message').eq("Invalid Token...or Expired")
                done();
            });
    });

    it("it not should delete employeeData  with empty token and valid Object Id returns status 401 and success=false", done => {
        chai
            .request(server)
            .delete("/delete/"+employeeJSON.TestData5.Id)
            .set('Authorization', invalidToken)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('message').eq("Access Denied! Unauthorized User!! add Token and then Proceed ")
                done();
            });
    });
    
});