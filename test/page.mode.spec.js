var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('Page model', function () {
var instance
  var models = require('../models');
  var Page = models.Page;
  var User = models.User;
  var page;


  before(function(done) { //// runs before all tests in this block
    User.sync({force : true})
    .then(function(){
      return Page.sync({force : true}) // we need to return because the .sync creates a promise but does not return it
    })
    .then(function() {
      return Page.create({
        title : 'foo',
        content : 'bar',
        tags : ['foo', 'bar']
      })
    })
    .then(function(foo) {
      instance = foo;
      done()});
    })

  // after(function(done) {
  //   Page.sync({force : true})
  //   .then(function() {
  //     User.sync({force : true})
  //     done();
  //   });
  // });


  describe('Virtuals', function () {

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
        instance.urlTitle = 'some_title';
        expect(instance.route).to.equal('/wiki/some_title');
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        instance.content = 'some content';
        expect(instance.renderedContent).to.equal('<p>some content</p>\n');
      });
    });
  });

  describe('Class methods', function () {
    
    describe('findByTag', function () {

      it('gets pages with the search tag', function(done) {
        Page.findByTag('bar')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(1);
          done();
        })
        .catch(done) //move on to the next thing and fail this spec
      });

      it('does not get pages without the search tag', function(done) {
        Page.findByTag('cdohfs')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(0);
          done();
        })
        .catch(done)
      });
    });
  });

  describe('Instance methods', function () {
    
    describe('findSimilar', function (done) {
       var instanceWithSharedTag = Page.create({
        title : 'SharedTag',
        content : 'SharedTag',
        tags : ['bar']
      })
       .then(function(SharedTag) {
      instance = SharedTag;
      done()
      });
    })

      page = Page.create({
        title : 'NoSharedTag',
        content : 'NoSharedTag',
        tags : ['clue']
      })
      .then(function(NoSharedTag) {
        var instanceWithoutSharedTag = NoSharedTag;
        done()
      });

      console.log(instance.findSimilar());

      it('never gets itself', function() {

      });

      xit('gets other pages with any common tags', function() {

      });

      xit('does not get other pages without any common tags', function() {

      });

    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});