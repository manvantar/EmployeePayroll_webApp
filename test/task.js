const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

describe("POST /login", () => {
    it("It should post a new Login inputBody and return status 200, success=true", (done) => {
        const inputBody = { "emailId": "manukvshetty2@gmail.com", "password": "n@@nU2897" };
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
        const inputBody2 = { "emailId": "manuk22121222@gmail.com", "password": "n@@nU2897" };
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
        const inputBody = {
            "firstName": "Manu",
            "lastName": "KV",
            "emailId": "manukvshetty2@gmail.com",
            "password": "n@@nU2897"
        };
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
        const inputBody = {
            "firstName": "Manu",
            "lastName": "KV",
            "emailId": "manukvshetty2@gmail.com",
            "password": "n@2897"
        };
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
