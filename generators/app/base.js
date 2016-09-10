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
  templateFile(src, dest, data) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      data
    );
  },
  downloadFromRepo(srcPath, dest) {
    var done = this.async();
    remote('cake-build', 'resources', function(err, cache) {
      if (err) {
        this.log(err);
      } else {
        this.fs.copy(
          path.join(cache, srcPath),
          this.destinationPath(dest)
        );
        done();
      }
    }.bind(this));
  },
  greet(message) {
    var msg = message || 'Cake';
    this.log(yosay(
      'Welcome to the ' + chalk.yellow.underline.bold(msg) + ' generator!'
    ));
  }
});
