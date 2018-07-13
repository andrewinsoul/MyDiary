import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('MyDiary dummy-data backend tests for diary model', () => {
  describe('tests for method that creates a diary', () => {
    const newDiary = {
      name: 'Vampire Diaries',
      desc: 'Lessons learnt from the popular season movie vampire diaries',
      userId: 2,
      type: 'private',
    };
    it('should return code 201 with object of diary just added', (done) => {
      chai.request(app)
        .post('/api/v1/diaries')
        .send(newDiary)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql(newDiary);
          done();
        });
    });
  });
});
