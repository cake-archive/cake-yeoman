var myBase = require('../app/base.js');
var yeoman = require('yeoman-generator');

module.exports = myBase.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.option('download', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Download latest copy from GitHub'
    });
  },
  getPrompts(message) {
    return [{
      type: 'confirm',
      name: 'downloadFromRemote',
      message: message,
      default: false,
      when: !this.options.download
    }];
  }
});
