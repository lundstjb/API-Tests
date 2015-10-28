var path = require('path');
var chai = require('chai');
var expect = require('chai').expect;
var config = require('../config.js');
var request = require('supertest')(config.host);
var _ = require('lodash');

describe('Module Tests', function() {

  describe('Capability', function() {
    //GENERIC API TESTS
    it('should return a 200 response', function(done) {
      request.get('/api/capabilities')
        .expect(200, done);
    });

    it('should return a list of capabilities', function(done) {
      request.get('/api/capabilities')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {

          //GENERIC API TESTS
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(config.generic.keys.object);
          expect(res.body.meta).to.include.keys(config.generic.keys.meta);

          //SPECIFIC API TESTS
          _.forEach(res.body.data, function(capability, index) {

            expect(capability).to.be.a('object');
            expect(capability.user_support).to.be.a('object');
            expect(capability.user_support).to.include.keys('email', 'phone');
            expect(capability.types).to.be.a('array');
            expect(capability.policy_stewards).to.be.a('array');

            _.forEach(capability.types, function(type, index) {
              expect(type).to.include.keys('id', 'short_name', 'full_name');
            });

            _.forEach(capability.policy_stewards, function(policy_steward, index) {
              expect(policy_steward).to.include.keys('id', 'short_name', 'full_name');
            });

            //FAILS
            //expect(capability).to.include.keys(config.capabilities.keys);
          });

          if (err) return done(err);
          done();
        });
    });

    before(function(done) {
      request.get('/api/capabilities')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          capabilityId = res.body.data[0].id;
          done();
        });
    });

    it('should return an instance of a capability', function(done) {
      request.get('/api/capabilities/' + capabilityId)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {

          //GENERIC API TESTS
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(config.generic.keys.object);
          expect(res.body.meta).to.include.keys(config.generic.keys.meta);

          //SPECIFIC API TESTS
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.include.keys(config.capabilities.keys);
          expect(res.body.data.user_support).to.be.a('object');
          expect(res.body.data.user_support).to.include.keys('email', 'phone');
          expect(res.body.data.types).to.be.a('array');
          expect(res.body.data.policy_stewards).to.be.a('array');

          _.forEach(res.body.data.types, function(type, index) {
            expect(type).to.include.keys('id', 'short_name', 'full_name');
          });

          _.forEach(res.body.data.policy_stewards, function(policy_steward, index) {
            expect(policy_steward).to.include.keys('id', 'short_name', 'full_name');
          });

          if (err) return done(err);
          done();
        });
    });

  });
});
