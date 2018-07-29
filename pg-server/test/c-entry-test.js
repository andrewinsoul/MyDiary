import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import queryTool from '../config/config';
import entryData from '../seed-data/entry-data';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary backend tests with postgres database for entry model', () => {
  after((done) => {
    queryTool.query('DROP TABLE users CASCADE')
      .then(() => queryTool.query('DROP TABLE diaries CASCADE'))
      .then(() => queryTool.query('DROP TABLE entries CASCADE'));
    done();
  });

  describe('tests method that inserts an entry to the databse', () => {
    it('should return code 201 with row containing entry just added', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send(entryData.entryWithCompleteDetails)
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
        .send({
          token: entryData.entryWithCompleteDetails.token,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
