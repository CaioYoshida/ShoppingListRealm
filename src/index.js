import 'react-native-gesture-handler';
import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import database from '~/database/index';

import '~/config/ReactotronConfig';

import Routes from '~/routes';

import store from './store';

const App = () => (
  <DatabaseProvider database={database}>
    <Provider store={store}>
      <StatusBar backgroundColor="#8DBAFE" barStyle="dark-content" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  </DatabaseProvider>
);

export default App;
