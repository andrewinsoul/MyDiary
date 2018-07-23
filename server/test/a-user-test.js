import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary dummy-data backend tests for user model', () => {
  describe('tests for method that adds a user', () => {
    it('should return code 201 with object of user just added', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          name: 'Tracey Sophia',
          username: 'sophee',
          email: 'sophee23@yahoo.com',
          password: 'sophee23',
          confirmPassword: 'sophee23',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.eql({
            id: 4,
            name: 'Tracey Sophia',
            username: 'sophee',
            email: 'sophee23@yahoo.com',
            password: 'sophee23',
          });
          done();
        });
    });
  });

  describe('tests for method that logins a user', () => {
    it('should return code 200 with message user logged in', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({
          email: 'andrewinsoul@gmail.com',
          password: 'andyjs+py',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.eql('signed in as andyjs');
          done();
        });
    });

    it('should return code 401 with error message incorrect credentials', (done) => {
      chai.request(app)
        .post('/api/v1/login')
        .send({
          email: 'andrewinsoul@gmail.com',
          password: 'andyjs+jpy',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('incorrect credentials supplied');
          done();
        });
    });
  });
});
