/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const rawdata = fs.readFileSync('test/employee.json');
const employeeJSON = JSON.parse(rawdata);
let jwToken = '';

describe('POST /registration', () => {
  it('given new UserData When added Should return status 200, success=true', (done) => {
    const inputBody = employeeJSON.UserData1;
    chai
      .request(server)
      .post('/registration')
      .send(inputBody)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.have.property('success').eq(true);
        response.body.should.have
          .property('message')
          .eq('User Registered successfully');
        done();
      });
  });

  it('given new UserData When added Should return status 500, success=false', (done) => {
    const inputBody = employeeJSON.UserData1;
    chai
      .request(server)
      .post('/registration')
      .send(inputBody)
      .end((error, response) => {
        response.should.have.status(500);
        response.body.should.have.property('success').eq(false);
        response.body.should.have.property('message').eq('User already Exists');
        done();
      });
  });

  it('given new UserData When added Should return status 400, success=false', (done) => {
    const inputBody = employeeJSON.UserData2;
    chai
      .request(server)
      .post('/registration')
      .send(inputBody)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('success').eq(false);
        done();
      });
  });
});

beforeEach((done) => {
  chai
    .request(server)
    .post('/login')
    .send(employeeJSON.TestData1)
    .end((_err, res) => {
      jwToken = res.body.token;
      res.should.have.status(200);
      done();
    });
});

const invalidToken = jwToken.slice(12);
const empToken = '';

describe('POST /add/employee', () => {
  it('given new employeeData When added Should return status 200, success=true', (done) => {
    const inputBody = employeeJSON.TestData3;
    chai
      .request(server)
      .post('/add/employee')
      .set('Authorization', `Bearar ${jwToken}`)
      .send(inputBody)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.have.property('success').eq(true);
        response.body.should.have
          .property('message')
          .eq('Employee Data Inserted successfully');
        done();
      });
  });

  it('given new employeeData When added Should return status 400, success=false', (done) => {
    const inputBody = employeeJSON.TestData4;
    chai
      .request(server)
      .post('/add/employee')
      .set('Authorization', `Bearar ${jwToken}`)
      .send(inputBody)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('success').eq(false);
        response.body.should.have.property('message');
        done();
      });
  });
});

describe('POST /login', () => {
  it('given new inputBody When loggedIn should return status 200, success=true', (done) => {
    const inputBody = employeeJSON.TestData1;
    chai
      .request(server)
      .post('/login')
      .send(inputBody)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property('success').eq(true);
        response.body.should.have
          .property('message')
          .eq('logged in successfully');
        response.body.should.have.property('token');
        done();
      });
  });

  it('given new inputBody When loggedIn should return status 404, success=false', (done) => {
    const inputBody2 = employeeJSON.TestData2;
    chai
      .request(server)
      .post('/login')
      .send(inputBody2)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.have.property('success').eq(false);
        done();
      });
  });
});

describe('/GET /employees', () => {
  it('given valid token When retrived Should return status 200 and success=true', (done) => {
    chai
      .request(server)
      .get('/employees')
      .set('Authorization', `Bearar ${jwToken}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have
          .property('message')
          .eq('Retrived all the employee data successfully');
        response.body.should.have.property('EmployeeData');
        done();
      });
  });

  it('given invalidValid token When retrived Should return status 400 and success=false', (done) => {
    chai
      .request(server)
      .get('/employees')
      // eslint-disable-next-line no-useless-concat
      .set('Authorization', 'Bearar ' + '  ')
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Invalid Token...or Expired');
        done();
      });
  });

  it('given empty token When retrived Should return status 401 and success=false', (done) => {
    chai
      .request(server)
      .get('/employees')
      .set('Authorization', empToken)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Access Denied! Unauthorized User!! add Token and then Proceed ');
        done();
      });
  });
});

describe('/GET /employees/Id', () => {
  it('given ObjectID and Valid token When retrived Should return status 200 and success=true', (done) => {
    chai
      .request(server)
      .get(`/employees/${employeeJSON.TestData10.Id}`)
      .set('Authorization', `Bearar ${jwToken}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property('success').eq(true);
        response.body.should.have.property('foundData');
        done();
      });
  });

  it('given invalidObjectID and Valid token When retrived Should return status 404 and success=false', (done) => {
    chai
      .request(server)
      .get(`/employees/${employeeJSON.TestData6.Id}`)
      .set('Authorization', `Bearar ${jwToken}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('success').eq(false);
        done();
      });
  });

  it('given ObjectID and invalidValid token When retrived Should return status 400 and success=false', (done) => {
    chai
      .request(server)
      .get(`/employees/${employeeJSON.TestData5.Id}`)
      .set('Authorization', `Bearar ${invalidToken}`)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Invalid Token...or Expired');
        done();
      });
  });

  it('given ObjectID and empty token When retrived Should return status 401 and success=false', (done) => {
    chai
      .request(server)
      .get(`/employees/${employeeJSON.TestData5.Id}`)
      .set('Authorization', empToken)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Access Denied! Unauthorized User!! add Token and then Proceed ');
        done();
      });
  });
});

describe('/PUT /update/employee/Id', () => {
  it('given employeeData and Valid token When updated Should return status 200 and success=true', (done) => {
    const inputBody = employeeJSON.TestData8;
    chai
      .request(server)
      .put(`/update/employee/${employeeJSON.TestData5.Id}`)
      .set('Authorization', `Bearar ${jwToken}`)
      .send(inputBody)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property('success').eq(true);
        done();
      });
  });

  it('given invalidEmployeeData and Valid token When updated Should return status 404 and success=false', (done) => {
    const inputBody = employeeJSON.TestData3;
    chai
      .request(server)
      .put(`/update/employee/${employeeJSON.TestData6.Id}`)
      .set('Authorization', `Bearar ${jwToken}`)
      .send(inputBody)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('success').eq(false);
        done();
      });
  });

  it('given employeeData and invalid token When updated Should return status 400 and success=false', (done) => {
    const inputBody = employeeJSON.TestData3;
    chai
      .request(server)
      .put(`/update/employee/${employeeJSON.TestData5.Id}`)
      .set('Authorization', `Bearar ${invalidToken}`)
      .send(inputBody)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Invalid Token...or Expired');
        done();
      });
  });

  it('given employeeData and empty token When updated Should return status 401 and success=false', (done) => {
    const inputBody = employeeJSON.TestData3;
    chai
      .request(server)
      .put(`/update/employee/${employeeJSON.TestData5.Id}`)
      .set('Authorization', empToken)
      .send(inputBody)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Access Denied! Unauthorized User!! add Token and then Proceed ');
        done();
      });
  });
});

describe('/Delele /delete/employee/Id', () => {
  it('given employeeId and validToken When deleted Should return status 200 and success=true', (done) => {
    chai
      .request(server)
      .delete(`/delete/employee/${employeeJSON.TestData5.Id}`)
      .set('Authorization', `Bearar ${jwToken}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('given invalidEmployeeId and validToken When deleted Should return status 404 and success=false', (done) => {
    chai
      .request(server)
      .delete(`/delete/employee/${employeeJSON.TestData6.Id}`)
      .set('Authorization', `Bearar ${jwToken}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('success').eq(false);
        done();
      });
  });

  it('given employeeId and invalidToken When deleted Should return status 400 and success=false', (done) => {
    chai
      .request(server)
      .delete(`/delete/employee/${employeeJSON.TestData5.Id}`)
      .set('Authorization', `Bearar ${invalidToken}`)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Invalid Token...or Expired');
        done();
      });
  });

  it('given employeeId and emptyToken When deleted Should return status 401 and success=false', (done) => {
    chai
      .request(server)
      .delete(`/delete/employee/${employeeJSON.TestData5.Id}`)
      .set('Authorization', empToken)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('success').eq(false);
        response.body.should.have
          .property('message')
          .eq('Access Denied! Unauthorized User!! add Token and then Proceed ');
        done();
      });
  });
});
