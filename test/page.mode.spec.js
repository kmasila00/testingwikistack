var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('Page model', function () {

  var models = require('../models');
  var Page = models.Page;
  var page;
  beforeEach(function() {
  page = Page.build();

    })

  describe('Virtuals', function () {

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
        page.urlTitle = 'some_title';
        expect(page.route).to.equal('/wiki/some_title');
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        page.content = 'some content';
        expect(page.renderedContent).to.equal('<p>some content</p>\n');
      });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag', function() {
        page.findBy
      });
      it('does not get pages without the search tag');
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