/**
 * @format
 */
console.disableYellowBox = true;

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import Login from './components/Login';
import Registeration from './components/Registeration';
import AddLocation from './components/AddLocation';
import Map from './components/Map';

AppRegistry.registerComponent(appName, () => Map);
