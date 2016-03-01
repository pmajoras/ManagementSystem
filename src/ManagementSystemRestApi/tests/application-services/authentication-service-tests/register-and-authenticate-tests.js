"use strict";

var common = require("../../common");
var assert = common.assert;
var mongoose = common.mongoose;
var config = common.config;

var AuthenticationService = require('../../../application-services/authentication-service');
var target = new AuthenticationService();

before(function (done) {
  mongoose.connect(config.db.connectionString, function (err) {
    done(err);
  });
});

it("should register and authenticate the user", function (done) {
  target.registerAndAuthenticate({ username: "teste@teste22.com", password: "123456" })
    .then((data) => {
      assert.equal(data.success, true);
      done();
    }, (err) => {
      done(err);
    })
    .catch((err) => {
      done(err);
    });
});

it("should not register and authenticate the same user", function (done) {
  target.registerAndAuthenticate({ username: "teste@teste22.com", password: "123456" })
    .then((data) => {
      assert.equal(data.success, false);
      done();
    }, (err) => {
      done(err);
    })
    .catch((err) => {
      done(err);
    });
});

it("unmock", function (done) {
  mongoose.unmock(function () {
    done();
  });
});

after(function () {
});