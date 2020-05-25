import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

import Main from '~/pages/Main';
import List from '~/pages/List';

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: { color: '#4c41f2', fontWeight: 'bold' },
        headerBackImage: () => (
          <MaterialIcons name="chevron-left" size={30} color="#4c41f2" />
        ),
        headerLeftContainerStyle: { marginLeft: 5 },
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
