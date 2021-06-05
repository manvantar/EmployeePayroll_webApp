let chai =require("chai");
let chaiHttp= require("chai-http");
let server= require("../server");

chai.should();
chai.use(chaiHttp);

describe('Tasks ', () =>{

    describe("POST /login", () =>{
        it("It should post a new task", (done)=>{
            const task={
                "emailId": "manukvshetty2@gmail.com",
                "password": "n@@nU2897"
            };
            chai.request(server)
            .post("/login")
            .send(task)
            .end((error,response)=>{
                response.should.have.status(201);
                response.body.should.have.property('success'.eq(true));
                response.body.should.have.property('message'.eq("logged in successfully"));
                response.body.should.have.property('token');
            done();
            })
        })
    })

})