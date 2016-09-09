'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-cake:app', function() {
  describe('when run with defaults', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .toPromise();
    });
    it('creates files', function() {
      assert.file([
        'build.cake'
      ]);
    });
  })
});

describe('generator-cake:app', function() {
  before(function() {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        installBootstrapper: true
      })
      .toPromise();
  });
  it('creates files', function() {
    assert.file([
      'build.cake',
      'build.ps1',
      'build.sh'
    ]);
  });
});
