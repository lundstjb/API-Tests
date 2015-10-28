var path = require('path');
var chai = require('chai');
var expect = require('chai').expect;
var config = require('../config.js');
var request = require('supertest')(config.host);
var _ = require('lodash');

describe('Generic Tests', function() {

  describe('Errors - AVSE-BPIC-1', function() {

    it('should return 404 error', function() {
      request.get('/')
        .expect(404)
        .end(function(err, res) {
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.include.keys(config.generic.keys.error);
        });
    });

  });

  describe('Pagination - AVSE-BPIC-3', function() {
    it('should allow limit', function() {

    });

    it('should allow offset', function() {

    });
  });

  describe('Sorting - AVSE-BPIC-15', function() {
    it('should allow sorting', function() {

    });
  });

  describe('Filtering - AVSE-BPIC-16, AVSE-BPIC-17', function() {
    it('should allow filtering', function() {

    });

    it('should allow field filtering', function() {

    });
  });

});
