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
      assert.fileContent('cake.config', 'https://github.com/cake-build/resources');
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
      assert.fileContent('build.ps1', 'https://github.com/cake-build/resources');
      assert.fileContent('build.sh', 'https://github.com/cake-build/resources');
    },
    areLocal() {
      assert.fileContent('build.ps1', 'generator-cake');
      assert.fileContent('build.sh', 'generator-cake');
    }
  },
  script: {
    created() {
      assert.file([
        'build.cake'
      ]);
    },
    notCreated() {
      assert.noFile(['build.cake']);
    }
  },
  frosting: {
    programCreated() {
      assert.file(['Program.cs']);
    },
    projectJsonCreated() {
      assert.file(['project.json']);
    },
    nugetConfigCreated() {
      assert.file(['nuget.config']);
    },
    defaultTaskCreated() {
      assert.file(['DefaultTask.cs']);
    }
  }
};
module.exports = shared;
