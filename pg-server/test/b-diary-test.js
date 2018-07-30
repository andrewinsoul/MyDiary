import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import diaryData from '../seed-data/diary-data';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary backend tests with postgres database for diary model', () => {
  describe('tests method that inserts a diary to the databse', () => {
    it('should return code 201 with row containing user information just added', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(diaryData.diaryWithCompleteDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
