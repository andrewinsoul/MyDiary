import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from '../seed-data/user-data';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary backend tests with postgres database for user model', () => {
  describe('tests method that inserts a user to the databse', () => {
    it('should return code 201 with row containing user information just added', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userData.userWithCompleteDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('auth');
          expect(res.body.auth).to.eql(true);
          done();
        });
    });
  });

  describe('tests method that logins a user', () => {
    it('should return code 200 with a message and token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.userWithCompleteDetails.email,
          password: userData.userWithCompleteDetails.password,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.eql('login successful');
          done();
        });
    });

    it('should return code 404 with error message and null token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrongmail@yahoo.com',
          password: userData.userWithCompleteDetails.password,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('error');
          expect(res.body.token).to.eql(null);
          done();
        });
    });

    it('should return code 401 with error message and null token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.userWithCompleteDetails.email,
          password: 'wrong_password',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('error');
          expect(res.body.token).to.eql(null);
          done();
        });
    });
  });
});
