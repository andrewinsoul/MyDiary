import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
// import diaries from '../models/diary';

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
          console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.id).to.eql(4);
          done();
        });
    });
  });

  // describe('tests for method that deletes a diary', () => {
  //   it('should return code 204 with message diary deleted', (done) => {
  //     chai.request(app)
  //       .delete('/api/v1/diaries/4')
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.have.property('msg');
  //         expect(res.body.msg).to.eql('diary successfully deleted');
  //         done();
  //       });
  //   });

  //   it('should return the number of entries in diary model as 3', () => {
  //     expect(diaries.length).to.eql(3);
  //   });
  // });
});
