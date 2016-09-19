'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var shared = require('./common.js');
var assert = require('yeoman-assert');

describe('generator-cake:frosting', function() {
  this.timeout(30000);
  describe('when run with defaults', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/frosting'))
        .toPromise();
    });
    it('creates project.json', shared.frosting.projectJsonCreated);
    it('creates NuGet config', shared.frosting.nugetConfigCreated);
    it('creates entry point', shared.frosting.programCreated);
    it('creates default task', shared.frosting.defaultTaskCreated);
  });
  describe('when specifying a task name', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/frosting'))
        .withPrompts({
          taskName: 'Test'
        })
        .toPromise();
    });
    it('creates correctly named task', function() {
      assert.file(['TestTask.cs']);
    });
    it('sets TaskName attribute correctly', function() {
      assert.fileContent('TestTask.cs', '[TaskName("Test")]');
    });
  });
  describe('when enabling custom context', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/frosting'))
        .withPrompts({
          appName: 'Testing',
          useCustomSettings: true
        })
        .toPromise();
    });
    it('creates context class', function() {
      assert.file(['TestingSettings.cs']);
    });
    it('creates class named correctly', function() {
      assert.fileContent('TestingSettings.cs', 'public class TestingSettings');
    });
  });
  describe('when enabling custom lifetime', function() {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/frosting'))
        .withPrompts({
          appName: 'Testing',
          useCustomLifetime: true
        })
        .toPromise();
    });
    it('creates lifetime class', function() {
      assert.file(['TestingLifetime.cs']);
    });
    it('creates class named correctly', function() {
      assert.fileContent('TestingLifetime.cs', 'public class TestingLifetime');
    });
  });
});
