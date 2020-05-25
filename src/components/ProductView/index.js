import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import { checkItemFromList } from '~/store/modules/list/actions';

import {
  ProductQuantity,
  ProductUnit,
  ProductName,
  Viewer,
  CheckButton,
} from './styles';

const ProductView = ({ item, handleCheck, onLongPress }) => {
  const dispatch = useDispatch();

  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setID(item.id);
      setName(item.name);
      setQuantity(item.quantity);
      setUnit(item.unit);
      setCheck(item.check);
    }

    loadProduct();
  }, [item]);

  async function handleCheck() {
    setCheck(!check);
    dispatch(checkItemFromList(ID));
  }

  return (
    <>
      {item && (
        <Viewer onLongPress={onLongPress}>
          <CheckButton check={check} onPress={handleCheck}>
            {check ? <Icon name="check" size={20} color="#fff" /> : null}
          </CheckButton>
          <ProductName>{name}</ProductName>
          <ProductQuantity>{quantity}</ProductQuantity>
          <ProductUnit>{unit}</ProductUnit>
        </Viewer>
      )}
    </>
  );
};

export default ProductView;
