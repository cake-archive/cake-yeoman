var myBase = require('../app/base.js');

module.exports = class extends myBase {
  constructor(args, options) {
    super(args, options);
    this.option('download', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Download latest copy from GitHub'
    });
  }
  getPrompts(message) {
    return [{
      type: 'confirm',
      name: 'downloadFromRemote',
      message: message,
      default: false,
      when: !this.options.download
    }];
  }
};
