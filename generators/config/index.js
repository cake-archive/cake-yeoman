'use strict';
var common = require('../app/subgenerator.js');

module.exports = common.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    if (this.options && this.options.preconfig) {
      return;
    }
    this.greet();
    return this.prompt(this.getPrompts('Do you want to use an updated template from the Internet?')).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.options.download = props.downloadFromRemote;
    }.bind(this));
  },
  writing: function() {
    if (this.options.download) {
      this.log('Downloading current cake.config from cake-build/resources repo');
      this.downloadFromRepo('cake.config', 'cake.config');
    } else {
      this.log('Generating cake.config file');
      this.copyFile('cake.config', 'cake.config');
    }
  }
});
