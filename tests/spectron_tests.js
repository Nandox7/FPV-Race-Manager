const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '..');

var app = new Application({
            path: electronPath,
            args: [appPath]
        });


global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});


describe('Spectron Tests', function () {
  beforeEach(function () {
      return app.start();
  });

  afterEach(function () {
      return app.stop();
  });

  // Test if all 3 renderer windows are started
  it('Start all renderer windows', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(3);
  });

  // Test if the main window is starting
	it('Check if main window opens', function() {
			return app.client.windowByIndex(0)
			.getTitle().should.eventually.equal('FPV Race Manager');
	})

  // Test if the application is properly loaded
  it('Checks for the tittle', function () {
    return app.client.waitUntilWindowLoaded()
      .getTitle().should.eventually.equal('FPV Race Manager');
  });
});