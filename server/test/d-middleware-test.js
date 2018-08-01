import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import userData from '../seed-data/user-data';
import entryData from '../seed-data/entry-data';
import diaryData from '../seed-data/diary-data';
import queryTool from '../config/config';

chai.use(chaiHttp);
const { expect } = chai;
let tokenValue;

describe('MyDiary backend tests with postgres database for middlewares', () => {
  after((done) => {
    queryTool.query('DROP TABLE users CASCADE')
      .then(() => queryTool.query('DROP TABLE diaries CASCADE'))
      .then(() => queryTool.query('DROP TABLE entries CASCADE'));
    done();
  });

  describe('login with valid credentials to get token', () => {
    it('should return token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'andrewinsoul@gmail.com',
          password: 'pythonismystack',
        })
        .end((err, res) => {
          tokenValue = res.body.token;
          done();
        });
    });
  });

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

    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userData.userWithNotSamePassword)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.error).to.eql('password mismatch');
          expect(res.body).to.have.property('error');
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

  describe('tests method that updates entry', () => {
    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .put('/api/v1/entries/1')
        .send(entryData.entryWithIncompleteDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('validation failed');
          expect(res.body).to.have.property('failures');
          done();
        });
    });
  });

  describe('tests method that adds a diary', () => {
    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(diaryData.diaryWithWrongType)
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.eql('type must be either private or public');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
