import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

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
});
