import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';

import Routes from '~/routes';

import store from './store';

const App = () => (
  <Provider store={store}>
    <StatusBar backgroundColor="#8DBAFE" barStyle="dark-content" />
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  </Provider>
);

export default App;
