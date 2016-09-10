'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var shared = require('./common.js');

describe('generator-cake:config', function() {
  describe('when run with defaults', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/config'))
        .toPromise();
    });
    it('creates the config file', shared.config.created);
    it('does not create the build script', shared.script.notCreated);
    it('does not include bootstrappers', shared.bootstrappers.notCreated);
    it('and uses local templates', shared.config.areLocal);
  });
  describe('when enabling download', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/config'))
        .withPrompts({
          downloadFromRemote: true
        })
        .toPromise();
    });
    it('creates the config file', shared.config.created);
    it('uses online templates', shared.config.areDownloaded);
  });
});
