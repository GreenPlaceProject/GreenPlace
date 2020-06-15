/**
 * @format
 */
console.disableYellowBox = true;

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Container from './config/Router';

AppRegistry.registerComponent(appName, () => App);

class App extends Component {
  render() {
    return <Container />;
  }
}

import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
