import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import entryData from '../seed-data/entry-data';

chai.use(chaiHttp);
const { expect } = chai;
let tokenValue;

describe('MyDiary backend tests with postgres database for entry model', () => {
  describe('tests method that inserts an entry to the databse', () => {
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
  });

  describe('tests method that adds an entry in the databse', () => {
    it('should return code 201 with entry just added', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send(entryData.entryWithCompleteDetails)
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('tests method that gets all entry in the databse', () => {
    it('should return code 200 with array containing all entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('tests method that modifies an entry in the databse', () => {
    it('should return code 200 with array containing modified entry', (done) => {
      chai.request(app)
        .put('/api/v1/entries/1')
        .send({
          title: 'My Best Journey',
          entry: 'I have been through many journrys but this',
        })
        .set('x-access-token', tokenValue)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
