import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import validateUserInput from '../middlewares/validateFunction';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary dummy-data backend tests for middleware validating user input', () => {
  describe('test for middleware that validates user input for all defined routes', () => {
    const newUser = {
      email: 'andrewinsoul@gmail.com',
      username: 'andypy',
      password1: 'amazing',
      password2: 'amazing',
    };
    const oldUser = {
      email: 'andrewinsoul@gmail.com',
    };
    const newDiary = {
      name: 'perfect times',
    };
    const newEntry = {
      entry: 'text of entry',
    };
    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');

          expect(res.body.message).to.eql('validation failed');
          done();
        });
    });

    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send(oldUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');

          expect(res.body.message).to.eql('validation failed');
          done();
        });
    });

    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(newDiary)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.message).to.eql('validation failed');
          done();
        });
    });

    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send(newEntry)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.message).to.eql('validation failed');
          done();
        });
    });
  });

  describe('tests for middleware that gets a single entry', () => {
    it('should return code 200 with requested resource ', (done) => {
      chai.request(app)
        .get('/api/v1/entry/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.entry).to.eql('why now');
          done();
        });
    });
  });

  describe('tests for middleware that gets all entries', () => {
    it('should return code 200 with requested resource ', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.length).to.eql(4);
          done();
        });
    });
  });
});
