const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

// Mongo
const mongoose = require('mongoose');
// Server
require(__dirname + '/../server');

const BASE_URI = 'localhost:3000/image'

describe('The image router', () => {
	// Drop DB
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  // Create new images
  it('should create a new image on post', (done) => {
    chai.request(BASE_URI)
      .post('/new')
      .send({
        content: 'Some content',
        url: 'A sick url'
      })
      .end((err, res) => {
        console.log(err);
        expect(err).to.eql(null);
        expect(res.body.content).to.eql('Some content');
        expect(res.body.url).to.eql('A sick url');
        done();
      });
  });
  // Get all images
  it('should create a new image on post', (done) => {
    chai.request(BASE_URI)
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].content).to.eql('Some content');
        expect(res.body[0].url).to.eql('A sick url');
        done();
      });
  });
})