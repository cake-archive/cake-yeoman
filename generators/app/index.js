'use strict';
var objectAssign = require('object-assign');
var yeoman = require('yeoman-generator');
var myBase = require('./base.js');

module.exports = myBase.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('installBootstrapper', {
      required: false
    });

    this.option('installConfigFile', {
      required: false
    });

    this.option('downloadFromRemote', {
      required: false
    });

    this.option('fileName', {
      required: false
    });
  },

  prompting: function() {
    var prompts = [{
      type: 'confirm',
      name: 'installBootstrapper',
      message: 'Would you like to also install the bootstrappers?',
      default: true,
      when: this.options.installBootstrapper === null || this.options.installBootstrapper === undefined
    }, {
      type: 'confirm',
      name: 'installConfigFile',
      message: 'Would you like to install a config file?',
      default: false,
      when: this.options.installConfigFile === null || this.options.installConfigFile === undefined
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
      when: this.options.fileName === null || this.options.fileName === undefined,
      store: true
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = objectAssign({
        installBootstrapper: this.options.installBootstrapper || props.installBootstrapper,
        installConfigFile: this.options.installConfigFile || props.installConfigFile,
        downloadFromRemote: this.options.downloadFromRemote || props.downloadFromRemote,
        fileName: this.options.fileName || props.fileName});
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
