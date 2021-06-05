const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.should();
chai.use(chaiHttp);
var expect = require('chai').expect;
var request = require('supertest');

const fs = require('fs');
let rawdata = fs.readFileSync('test/test.json');
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

describe("GET /employees", () => {

    let token;

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

    describe("/get /employees", () => {
        it("should fetch all users successfully with valid token returns status 200 and success=true", done => {
            //console.log(token);
            chai
                .request(server)
                .get("/employees")
                .set('Authorization','bearar '+ token )
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("Retrived all the employee data successfully")
                    response.body.should.have.property('EmployeeData')
                    done();
                });
        });



        
    });

    
});
