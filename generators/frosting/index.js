'use strict';
var myBase = require('../app/base.js');
var Ident = require('./identifiers.js');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = myBase.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.greet('Cake Frosting');

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Give your script a name/prefix?',
      default: 'Build'
    }, {
      type: 'confirm',
      name: 'useCustomLifetime',
      message: 'Would you like to use a custom lifetime?',
      default: false,
      store: true
    }, {
      type: 'confirm',
      name: 'useCustomSettings',
      message: 'Would you like to create a custom settings class?',
      default: false,
      store: true
    }, {
      type: 'input',
      name: 'taskName',
      message: 'Give your build task a name',
      default: 'Build',
      store: true
    }];
    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  configuring() {
    var data = new Ident(this.props.appName, this.props.taskName);
    data.useLifetime = this.props.useCustomLifetime || false;
    data.useSettings = this.props.useCustomLifetime || false;
    this.templateData = data;
  },
  writing: function() {
    this.log('Generating Cake Frosting app');
    this.copyFile('project.json', 'project.json');
    this.copyFile('nuget.config', 'nuget.config');
    this.copyFile('default.cs', 'DefaultTask.cs');
    this.templateFile('task.cs', this.props.taskName + 'Task.cs', this.templateData);
    this.templateFile('program.cs', 'Program.cs', this.templateData);
    if (this.props.useCustomLifetime) {
      this.templateFile('lifetime.cs', this.templateData.lifetimeType + '.cs', this.templateData);
    }
    if (this.props.useCustomSettings) {
      this.templateFile('context.cs', this.templateData.settingsType + '.cs', this.templateData);
    }
  },
  install() {
    try {
      var done = this.async();
      this.log('Attempting to restore NuGet packages');
      return this.spawnCommand('dotnet', ['restore']).on('exit', done);
    } catch (err) {
      this.log(err);
      this.log('Failed to restore NuGet packages. Try running \'dotnet restore \'');
    }
  },
  end() {
    this.log('We have generated a Cake Frosting application in the current directory!');
    this.log('You may need to customise it to suit your needs.');
    this.log(yosay(
      'You can now run ' + chalk.blue.underline.bold('dotnet run') + ' to run your new Cake build!'
    ));
  }
});
