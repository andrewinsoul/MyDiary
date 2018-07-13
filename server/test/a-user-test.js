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
          password1: 'sophee23',
          password2: 'sophee23',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
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
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('signed in as andyjs');
          done();
        });
    });
  });
});
