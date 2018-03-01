process.env.NODE_ENV = "test";


const mongoose = require('mongoose');
const Book     = require('../models/book');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

// allow us to make http requests to our server
chai.use(chaiHttp)


describe("Books", () => {
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done()
    })
  })
describe('/GET book', () => {
  it('it should GET all the books', (done) => {
    chai.request(server)
    .get('/book')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
      // call done when test is over
    done();
    })
  })
})
describe('/POST book', () => {
  it('it should not POST a book withou complete parameters', (done) => {
    let book = {
      title: "Cats cradel",
      author: "Kurty",
      year: 1950
    }

    chai.request(server)
    .post('/book')
    .send(book)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.have.property('pages');
      res.body.errors.pages.should.have.property('kind').eql('required');
      done()
    })
  })
  it('it should POST a book ', (done) => {
    let book = {
      title: 'Cats Cradle',
      author: 'kurt',
      year: 1950,
      pages: 351
    }

    chai.request(server)
    .post('/book')
    .send(book)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Book successfully added");
      res.body.book.should.have.property('title');
      res.body.book.should.have.property('author');
      res.body.book.should.have.property('year');
      res.body.book.should.have.property('pages');
      done();
    })
  })
})// end of post describe

describe('/GET/:id book', () => {

  it('should get the book by the given id', (done) => {

  const book = new Book({
      title: 'Cats Cradle',
      author: 'kurt',
      year: 1950,
      pages: 351
    })

  book.save((err, book) => {
    chai.request(server)
    .get('/book/' + book.id)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object');
      res.body.should.have.property('title');
      res.body.should.have.property('author');
      res.body.should.have.property('year');
      res.body.should.have.property('pages');
      res.body.should.have.property('_id').eql(book.id);
      done()
    })
  })
})


})// end of get id describe

describe('/put/:id book', () => {

  it('should get the book by the given id', (done) => {

  const book = new Book({
      title: 'Cats Cradle',
      author: 'kurt',
      year: 1950,
      pages: 351
    })

  book.save((err, book) => {
    chai.request(server)
    .put('/book/' + book.id)
    .send({title: " Cats Cradle", author: "Kurt Vonnegut", year: 1951, pages: 351})
    .end((err, res) => {

      res.should.have.status(200)
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("book updated!")
      res.body.book.should.have.property('author').eql("Kurt Vonnegut");
      done()
    })
  })
})


})// end of get put describe

describe('/delete/:id book', () => {

  it('should get the book by the given id', (done) => {

  const book = new Book({
      title: 'Cats Cradle',
      author: 'kurt',
      year: 1950,
      pages: 351
    })

  book.save((err, book) => {
    chai.request(server)
    .delete('/book/' + book.id)
    .end((err, res) => {

      res.should.have.status(200)
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Book was deleted")
      res.body.result.should.have.property('ok').eql(1);
      res.body.result.should.have.property('n').eql(1);
      done()
    })
  })
})


})// end of get delete describe

})  // end of all the tests
