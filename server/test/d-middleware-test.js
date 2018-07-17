import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary dummy-data backend tests for middlewares validating user input', () => {
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
    const wrongType = {
      name: 'Diary Name',
      type: 'wrongTYpe',
      desc: 'Diary description',
      userId: 2,
    };
    const userNotFound = {
      name: 'Diary Name',
      type: 'public',
      desc: 'Diary description',
      userId: 20,
    };
    const diaryNotFound = {
      entry: 'entry',
      diaryId: 90,
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
    it('should return status code 409 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(wrongType)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('type must be either private or public');
          done();
        });
    });
    it('should return status code 409 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(userNotFound)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('User not found');
          done();
        });
    });
    it('should return status code 404 with error message', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send(diaryNotFound)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('diary not found');
          done();
        });
    });
    it('should return status code 404 with error message', (done) => {
      chai.request(app)
        .put('/api/v1/entry/90')
        .send({ entry: 'update entry' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('entry not found');
          done();
        });
    });
    it('should return status code 400 with error message', (done) => {
      chai.request(app)
        .put('/api/v1/entry/1')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.message).to.eql('validation failed');
          done();
        });
    });
  });
});
