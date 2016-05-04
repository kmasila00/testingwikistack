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

  Page.sync().then(function(){User.sync()});

  beforeEach(function(done) {
  page = Page.create({
    title : 'foo',
    content : 'bar',
    tags : ['foo', 'bar']
  }).then(function(foo) {
    instance = foo;
    done()});

    })

  // afterEach(function() {
  //   Page.sync({force : true});
  //   User.sync({force : true});
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
      it('gets pages with the search tag', function() {
        expect(findByTag('foo')).to.equal(page);
      });
      it('does not get pages without the search tag', function() {
        expect(findByTag().to.equal(undefined));
      });
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
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