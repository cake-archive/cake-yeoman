'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var remote = require('yeoman-remote');
var path = require('path');
var myBase = yeoman.Base.extend({
  copyFile: function (src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  },
  downloadFromRepo(srcPath, dest) {
    var done = this.async();
    remote('cake-build', 'resources', function (err, cache) {
      this.fs.copy(
        path.join(cache, srcPath),
        this.destinationPath(dest)
      );
      done();
    }.bind(this));
  }
});
module.exports = myBase.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.black.bgYellow.underline.bold('Cake') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'installBootstrapper',
      message: 'Would you like to also install the bootstrappers?',
      default: true
    },
      {
        type: 'confirm',
        name: 'downloadFromRemote',
        message: 'Do you want to grab updated bootstrappers from the Internet?',
        default: false,
        when: function (hash) {
          return hash.installBootstrapper;
        }
      },
      {
        type: 'input',
        name: 'fileName',
        message: 'Enter a file name for your new build script',
        default: 'build.cake'
      }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.log('Generating Cake build script');
    this.fs.copy(
      this.templatePath('build.cake'),
      this.destinationPath(this.props.fileName)
    );
    if (this.props.installBootstrapper) {
      if (this.props.downloadFromRemote) {
        this.log('Downloading current bootstrapper scripts from cake-build/resources repo');
        this.downloadFromRepo('build.ps1', 'build.ps1');
        this.downloadFromRepo('build.sh', 'build.sh');
      } else {
        this.log('Generating bootstrapper scripts');
        this.copyFile('build.ps1', 'build.ps1');
        this.copyFile('build.sh', 'build.sh');
      }
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
