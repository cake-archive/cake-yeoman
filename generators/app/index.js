'use strict';
var myBase = require('./base.js');

module.exports = myBase.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.greet();

    var prompts = [{
      type: 'confirm',
      name: 'installBootstrapper',
      message: 'Would you like to also install the bootstrappers?',
      default: true
    }, {
      type: 'confirm',
      name: 'installConfigFile',
      message: 'Would you like to install a config file?',
      default: false
    }, {
      type: 'confirm',
      name: 'downloadFromRemote',
      message: 'Do you want to grab updated resources from the Internet?',
      default: false,
      when: function(hash) {
        return hash.installBootstrapper || hash.installConfigFile;
      }
    }, {
      type: 'input',
      name: 'fileName',
      message: 'Enter a file name for your new build script',
      default: 'build.cake',
      store: true
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    this.log('Generating Cake build script');
    this.fs.copy(
      this.templatePath('build.cake'),
      this.destinationPath(this.props.fileName)
    );
    if (this.props.installBootstrapper) {
      this.composeWith('cake:bootstrapper', {
        options: {
          preconfig: true,
          download: this.props.downloadFromRemote
        }
      }, {
        local: require.resolve('../bootstrapper'),
        link: 'strong'
      });
    }
    if (this.props.installConfigFile) {
      this.composeWith('cake:config', {
        options: {
          preconfig: true,
          download: this.props.downloadFromRemote
        }
      }, {
        local: require.resolve('../config'),
        link: 'strong'
      });
    }
  }
});
