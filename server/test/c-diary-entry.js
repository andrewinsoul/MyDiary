import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import entries from '../models/entry';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary dummy-data backend tests for entry model', () => {
  describe('test for method that creates an entry', () => {
    const newEntry = {
      entry: 'whatever time it was, I did not know what came over me...',
      diaryId: 1,
    };
    it('should return code 201 with object of entry just added', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .send(newEntry)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.id).to.eql(4);
          done();
        });
    });
  });

  describe('tests for method that gets a single entry', () => {
    it('should return code 200 with requested resource ', (done) => {
      chai.request(app)
        .get('/api/v1/entry/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.entry).to.eql('My pre-andela days made me realize that you must finish a project before starting');
          done();
        });
    });
  });

  describe('tests for method that gets all entries', () => {
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

  describe('tests for method that updates an existing entry', () => {
    it('should return code 200 message entry successfully updated', (done) => {
      chai.request(app)
        .put('/api/v1/entry/1')
        .send({
          entry: 'why now',
        })
        .end((err, res) => {
          console.log(entries[0].entry === 'why now');
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('entry successfully modified');
          expect(entries[0].entry).to.eql('why now');
          done();
        });
    });
  });
});
