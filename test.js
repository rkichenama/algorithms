const jasmine = new (require('jasmine-ts'));
const SpecReporter = require('jasmine-spec-reporter');

jasmine.env.clearReporters();
console.log(jasmine.env);
jasmine.addReporter(new SpecReporter({
  displaySpecDuration: true
}));
// jasmine.loadConfigFile('spec/support/jasmine.json');

jasmine.execute();
