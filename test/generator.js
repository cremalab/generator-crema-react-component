'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

const componentLocations = [
  {name: 'Element', path: 'src/ui/elements'},
  {name: 'View', path: 'src/ui/views'}
];

describe('component generator', function () {
  describe('creates files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          componentName: 'Test',
          componentType: 'Stateless',
          componentLocation: 'Element'
        })
        .withLocalConfig({
          componentLocations
        })
        .toPromise();
    });
    it('with local config componentLocations', function () {
      assert.file([
        'src/ui/elements/Test/Test.css',
        'src/ui/elements/Test/Test.js',
        'src/ui/elements/Test/Test.story.js',
        'src/ui/elements/Test/Test.test.js',
        'src/ui/elements/Test/index.js'
      ]);
    });
  });
  describe('creates files', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          componentName: 'Test',
          componentType: 'Stateless'
        })
        .toPromise();
    });
    it('without local config', function () {
      assert.file([
        'Test/Test.css',
        'Test/Test.js',
        'Test/Test.story.js',
        'Test/Test.test.js',
        'Test/index.js'
      ]);
    });
  });
});
