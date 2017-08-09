function Identifiers(prefix, taskName) {
  this.settingsType = prefix + 'Settings'; // This is also a context
  this.contextType = this.settingsType;
  this.lifetimeType = prefix + 'Lifetime';
  this.taskName = taskName || 'Build';
  this.useSettings = false;
  this.useLifetime = false;
}

module.exports = Identifiers;
