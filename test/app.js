'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var shared = require('./common.js');

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
    it('defaults to including the bootstrappers', function() {
      assert.file([
        'build.ps1',
        'build.sh'
      ]);
    });
    it('and does not include a config file', function() {
      assert.noFile([
        'cake.config'
      ]);
    });
    it('and uses local templates', shared.bootstrappers.areLocal);
  });
  describe('when selecting bootstrappers', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          installBootstrapper: true
        })
        .toPromise();
    });
    it('creates build script', function() {
      assert.file([
        'build.cake'
      ]);
    });
    it('and creates bootstrappers', shared.bootstrappers.created);
    it('and does not create config file', shared.config.notCreated);
  });
  describe('when deselecting bootstrappers', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          installBootstrapper: false
        })
        .toPromise();
    });
    it('creates build script', function() {
      assert.file([
        'build.cake'
      ]);
    });
    it('and does not create bootstrappers', shared.bootstrappers.notCreated);
    it('and does not create config file', shared.config.notCreated);
  });
  describe('when selecting config file', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          installConfigFile: true
        })
        .toPromise();
    });
    it('creates build script', function() {
      assert.file([
        'build.cake'
      ]);
    });
    it('and creates create config file', shared.config.created);
  });
  describe('when enabling download', function() {
    this.timeout(5000);
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          installBootstrapper: true,
          installConfigFile: true,
          downloadFromRemote: true
        })
        .toPromise();
    });
    it('creates build script', function() {
      assert.file([
        'build.cake'
      ]);
    });
    it('creates bootstrappers', shared.bootstrappers.created);
    it('creates config file', shared.config.created);
    it('uses online bootstrapper', shared.bootstrappers.areDownloaded);
    it('uses online config file', shared.config.areDownloaded);
  });
});
