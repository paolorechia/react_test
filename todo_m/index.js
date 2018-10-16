/** @format */

import {AppRegistry} from 'react-native';
import App from './App.tsx'
//import {Hello} from './components/Hello.tsx';
import {name as appName} from './app.json';

console.log(App);
AppRegistry.registerComponent(appName, () => App);
