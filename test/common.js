var assert = require('yeoman-assert');

const shared = {
  config: {
    created() {
      this.timeout(5000);
      assert.file([
        'cake.config'
      ]);
    },
    notCreated() {
      assert.noFile([
        'cake.config'
      ]);
    },
    areDownloaded() {
      assert.fileContent('cake.config', 'https://github.com/cake-build/resource');
    },
    areLocal() {
      assert.fileContent('cake.config', 'generator-cake');
    }
  },
  bootstrappers: {
    created() {
      this.timeout(5000);
      assert.file([
        'build.ps1',
        'build.sh'
      ]);
    },
    notCreated() {
      assert.noFile([
        'build.ps1',
        'build.sh'
      ]);
    },
    areDownloaded() {
      assert.fileContent('build.ps1', 'https://github.com/cake-build/resource');
      assert.fileContent('build.sh', 'https://github.com/cake-build/resource');
    },
    areLocal() {
      assert.fileContent('build.ps1', 'generator-cake');
      assert.fileContent('build.sh', 'generator-cake');
    }
  }
};
module.exports = shared;
