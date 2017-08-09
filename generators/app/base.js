'use strict';
const Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var got = require('got');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.config.save();
  }
  copyFile(src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }
  templateFile(src, dest, data) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      data
    );
  }
  downloadFromRepo(srcPath, dest, branch) {
    var done = this.async();
    branch = branch || 'develop';
    got(`https://raw.githubusercontent.com/cake-build/resources/${branch}/${srcPath}`)
      .then(response => {
        this.fs.write(this.destinationPath(dest), response.body);
        done();
      })
      .catch(err => {
        this.log(err);
      });
  }
  greet(message) {
    var msg = message || 'Cake';
    this.log(yosay(
      'Welcome to the ' + chalk.yellow.underline.bold(msg) + ' generator!'
    ));
  }
};
