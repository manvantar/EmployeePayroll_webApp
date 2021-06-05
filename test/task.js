const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.should();
chai.use(chaiHttp);

describe("Tasks", () => {

    describe("POST /login", () => {
        it("It should post a new Login task and return status 200, success=true", (done) => {
            const inputBody = {
                "emailId": "manukvshetty2@gmail.com",
                "password": "n@@nU2897"
            };

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
    })

    describe("POST /login", () => {
        it("It should post a new Login task and return status 404, success=false", (done) => {
            const inputBody2 = {
                "emailId": "manuk22121222@gmail.com",
                "password": "n@@nU2897"
            };

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

})

