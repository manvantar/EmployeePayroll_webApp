const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.should();
chai.use(chaiHttp);
var expect = require('chai').expect;
var request = require('supertest');

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employee = JSON.parse(rawdata);

describe("POST /login", () => {
    it("It should post a new Login inputBody and return status 200, success=true", (done) => {
        const inputBody = employee.Data1;
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
        const inputBody2 = employee.Data2;
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
        const inputBody = employee.Data3;
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
        const inputBody = employee.Data4;
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

let token='';
    
beforeEach(done => {
    chai
        .request(server)
        .post("/login")
        .send(employee.Data1)
        .end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
            done();
        });
});

describe("/GET /employees", () => { 
    
    it("it should fetch all employeeData successfully with valid token returns status 200 and success=true", done => {
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', 'bearar ' + token)
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
            .set('Authorization', 'bearar ' + token.slice(10))
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('message').eq("Invalid Token...or Expired")
                done();
            });
    });

    it("it should not fetch all employeeData with empty token returns status 401 and success=false", done => {
        var emptyToken='';
        chai
            .request(server)
            .get("/employees")
            .set('Authorization', emptyToken)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('message').eq("Access Denied! Unauthorized User!! add Token and then Proceed ")
                done();
            });
    });

});

describe("/GET /employees/Id", () => { 
    
    it("it should give employeeData successfully with valid token and Object Id returns status 200 and success=true", done => {
        chai
            .request(server)
            .get("/employees/"+employee.Data5.Id)
            .set('Authorization', 'bearar ' + token)
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
            .get("/employees/"+employee.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });
});

describe("/PUT /update/Id", () => { 
    
    it("it should update employeeData successfully with valid token and Object Id returns status 200 and success=true", done => {
        const inputBody = employee.Data3;
        chai
            .request(server)
            .put("/update/"+employee.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .send(inputBody)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("it should not update employeeData with valid token and invalid Object Id returns status 404 and success=false", done => {
        const inputBody = employee.Data3;
        chai
            .request(server)
            .put("/update/"+employee.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .send(inputBody)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });
    
});

describe("/Delele /Id", () => { 
    
    it("it should delete employeeData successfully with valid token and Object Id returns status 200 and success=true", done => {
        chai
            .request(server)
            .delete("/delete/"+employee.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .end((err, response) => {
                response.should.have.status(200);
                //response.body.should.have.property('success').eq(false);
                done();
            });
    });

    it("it not should delete employeeData  with valid token and invalid and Object Id returns status 404 and success=false", done => {
        chai
            .request(server)
            .delete("/delete/"+employee.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });
    
});