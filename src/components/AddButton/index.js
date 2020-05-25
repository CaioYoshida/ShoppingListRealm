import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Button } from './styles';

export default function AddButton({ onPress }) {
  return (
    <Button onPress={onPress}>
      <MaterialIcons name="add" size={30} color="#fff" />
    </Button>
  );
}
