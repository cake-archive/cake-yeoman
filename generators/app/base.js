'use strict';
var yeoman = require('yeoman-generator');
var remote = require('yeoman-remote');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  copyFile: function(src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  },
  downloadFromRepo(srcPath, dest) {
    var done = this.async();
    remote('cake-build', 'resources', function(err, cache) {
      if (err) {
        this.log(err);
      }
      this.fs.copy(
        path.join(cache, srcPath),
        this.destinationPath(dest)
      );
      done();
    }.bind(this));
  },
  greet() {
    this.log(yosay(
        'Welcome to the ' + chalk.yellow.underline.bold('Cake') + ' generator!'
      ));
  }
});
