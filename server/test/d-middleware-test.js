import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

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

    it('should return code 400 with error message', (done) => {
      chai.request(app)
        .put('/api/v1/entry/1')
        .send({ wrongParameter: 'entry' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.message).to.eql('validation failed');
          done();
        });
    });
  });

  describe('test for middleware that checks for certain conditions', () => {
    const userBadPassword = {
      email: 'azukaokoye99@yahoo.com',
      username: 'az',
      name: 'Veronica',
      password1: 'qwerty',
      password2: 'asdfgh',
    };
    const userBadMail = {
      email: 'andrewinsoul@gmail.com',
      username: 'aaaa',
      name: 'Andrew Johnson',
      password1: 'qwertyuiop',
      password2: 'qwertyuiop',
    };

    const userBadUsername = {
      email: 'azukaokoye99@gmail.com',
      username: 'slava',
      name: 'Andrew Johnson',
      password1: 'qwertyuiop',
      password2: 'qwertyuiop',
    };
    it('should return status code 409 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userBadPassword)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('password mismatch');
          done();
        });
    });

    it('should return status code 409 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userBadMail)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('user with this mail already has an account');
          done();
        });
    });

    it('should return status code 409 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userBadUsername)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('username already taken, choose another one');
          done();
        });
    });
  });
});
