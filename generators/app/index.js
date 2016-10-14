'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var PATH = require('path');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.types = this.config.get('componentLocations');
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cool ' + chalk.red('crema-react-component') + ' generator!'
    ));

    const defaultPrompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Name of component:',
        required: true
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Choose Type:',
        choices: ['Stateless', 'Stateful'],
        required: true
      }
    ];

    const prompts = this.types ? defaultPrompts.concat({
      type: 'list',
      name: 'componentLocation',
      message: 'Choose location:',
      choices: this.types.map(x => x.name)
    }) : defaultPrompts;

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const {componentName: name, componentType, componentLocation} = this.props;
    const type = this.types && this.types.find(x => x.name === componentLocation);
    const path = type ? type.path : `./`;
    const dir = PATH.join(path, name) + '/';
    const file = name;

    this.fs.copyTpl(
      this.templatePath('Component.css.txt'),
      this.destinationPath(`${dir}${file}.css`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath(
        componentType === 'Stateless' ?
          'Component.stateless.js.txt' :
          'Component.stateful.js.txt'),
      this.destinationPath(`${dir}${file}.js`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('Component.story.js.txt'),
      this.destinationPath(`${dir}${file}.story.js`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('Component.test.js.txt'),
      this.destinationPath(`${dir}${file}.test.js`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('index.js.txt'),
      this.destinationPath(`${dir}index.js`),
      this.props
    );
  }
  // install: function () {
  //   this.installDependencies();
  // }
});
