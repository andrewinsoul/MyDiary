import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import diaryData from '../seed-data/diary-data';

chai.use(chaiHttp);
const { expect } = chai;
let tokenValue = '';

describe('MyDiary backend tests with postgres database for diary model', () => {
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

  describe('tests method that inserts a diary to the databse', () => {
    it('should return code 201 with row containing user information just added', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(diaryData.diaryWithCompleteDetails)
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(diaryData.diaryWithNameAsSpace)
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should return code 400 with row containing user information just added', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(diaryData.diaryWithDescAsSpace)
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
