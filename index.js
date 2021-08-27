/**
 * @format
 */

import 'text-encoding-polyfill'

import {AppRegistry} from 'react-native';
import Root from './src/Root';
import {name as appName} from './app.json';

import * as PokeApi from './src/utils/pokeapiClient'

PokeApi.init().then(() => {
  AppRegistry.registerComponent(appName, () => Root);
})
  