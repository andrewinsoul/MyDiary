import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from '../seed-data/user-data';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary backend tests with postgres database for middlewares', () => {
  describe('tests method that inserts a user to the databse', () => {
    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userData.userWithIncompleteDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('validation failed');
          expect(res.body).to.have.property('failures');
          done();
        });
    });
  });

  describe('tests method that logins a user', () => {
    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrong email format',
          password: userData.userWithCompleteDetails.password,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('validation failed');
          expect(res.body).to.have.property('failures');
          done();
        });
    });
  });
});
