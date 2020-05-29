/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import Login from './components/Login';
import Registeration from './components/Registeration';
import AddLocation from './components/AddLocation';
import Map from './components/Map';

AppRegistry.registerComponent(appName, () => AddLocation);
