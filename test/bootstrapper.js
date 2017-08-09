'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var shared = require('./common.js');

describe('generator-cake:bootstrapper', function() {
  describe('when run with defaults', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/bootstrapper'))
        .toPromise();
    });
    it('creates the bootstrappers', shared.bootstrappers.created);
    it('does not create the build script', shared.script.notCreated);
    it('does not create config', shared.config.notCreated);
    it('and uses local templates', shared.bootstrappers.areLocal);
  });
  describe('when enabling download', function() {
    this.timeout(5000);
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/bootstrapper'))
        .withOptions({})
        .withPrompts({
          downloadFromRemote: true
        })
        .toPromise();
    });
    it('creates the bootstrappers', shared.bootstrappers.created);
    it('uses online templates', shared.bootstrappers.areDownloaded);
  });
});
