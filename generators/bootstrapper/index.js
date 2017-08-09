'use strict';
var common = require('../app/subgenerator.js');

module.exports = class extends common {
  prompting() {
    // Have Yeoman greet the user.
    if (this.options && this.options.preconfig) {
      return;
    }
    this.greet();
    return this.prompt(this.getPrompts('Do you want to use updated scripts from the Internet?')).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.options.download = props.downloadFromRemote;
    }.bind(this));
  }
  writing() {
    if (this.options.download) {
      this.log('Downloading current bootstrapper scripts from cake-build/resources repo');
      this.downloadFromRepo('build.ps1', 'build.ps1');
      this.downloadFromRepo('build.sh', 'build.sh');
    } else {
      this.log('Generating bootstrapper scripts');
      this.copyFile('build.ps1', 'build.ps1');
      this.copyFile('build.sh', 'build.sh');
    }
  }
};
