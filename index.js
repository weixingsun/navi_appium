"use strict";

require("./setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./appium-servers');

describe("android install navi latest version", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./logging").configure(driver);

    var desired =  _.clone(require("./caps").android23);
    desired.app = require("./apps").android_navi_dev;
    if (process.env.npm_package_config_sauce) {
      desired.name = 'android install navi latest version';
      desired.tags = ['install'];
    }
    desired.noReset = true;
    desired.fullReset = false;
    desired.appPackage = 'com.navi';
    desired.appActivity = 'com.navi.MainActivity';
    return driver
      .init(desired)
      .setImplicitWaitTimeout(10000)
      .sleep(10000);
  });

  //after(function () {
  //  return driver
  //    .quit()
  //    .finally(function () {
  //      if (process.env.npm_package_config_sauce) {
  //        return driver.sauceJobStatus(allPassed);
  //      }
  //    });
  //});

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("search a place, cancel, search again, show drive route", function () {
    return driver
      .elementByName('SearchIcon').should.eventually.exist  //elementByAccessibilityId()==elementByName()
      .click()
      .sleep(1000)
      .elementByName('SearchInput').should.eventually.exist
      .sendKeys('the white house')
      .sleep(1000)
      .elementByName('suggetlist_item0')
      .click()
      .sleep(1000)
      .elementByName('ClearIcon').should.eventually.exist
      .click()
      .sleep(1000)
      .elementByName('SearchIcon').should.eventually.exist
      .click()
      .sleep(1000)
      .elementByName('SearchInput').should.eventually.exist
      .sendKeys('the white house')
      .sleep(1000)
      .elementByName('suggetlist_item0')
      .click()
      .sleep(1000)
      .elementByName('DrivingIcon').should.eventually.exist //DrivingIcon,TransitIcon,WalkingIcon
      .click()
      .sleep(1000)
      //.elementByName('ClearIcon').should.eventually.exist
      //.sendKeys('title1')
      //.back()
      //.elementByAccessibilityId('settings_list:push_listener')
      //.click()
      //.elementByAccessibilityId('settings_list:push_listener')
      //  .should.eventually.exist
	  //.elementByAccessibilityId('settings_list:push_listener_list#1')
	  //  .should.eventually.exist
      //  .should.exists; .should.eventually.exist; .should.eventually.have.length(12); .should.eventually.have.length.above(20);
  });
});
