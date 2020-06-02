/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import Realm from 'realm';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { ListSchema } from '~/realm/schema';

import {
  addToList,
  removeFromList,
  updateProductFromList,
  unloadList,
} from '~/store/modules/list/actions';

import Background from '~/components/Background';
import ProductView from '~/components/ProductView';

import {
  TitleContainer,
  Title,
  DateTitleContainer,
  DateTitle,
  ProductList,
  ProductListContainer,
  ProductListHeader,
  ProductListHeaderText,
  AddNewProductContainer,
  AddNewProductButton,
  AddNewProductButtonText,
  NewProductContainer,
  UpdateProductContainer,
  Input,
  ButtonView,
  InformationView,
  InformationInput,
  SuccessButton,
  SuccessButtonText,
  CancelButton,
  CancelButtonText,
  DeleteButton,
  DeleteButtonText,
  CloseButton,
} from './styles';

const NewProductContainerAnimated = Animatable.createAnimatableComponent(
  NewProductContainer,
);
const UpdateProductContainerAnimated = Animatable.createAnimatableComponent(
  UpdateProductContainer,
);

export default function List({ route }) {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  // loading all products for list
  const [listID, setListID] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      await setProducts(list.products);
      await setListID(list.listID);
    }

    loadProducts();
  }, [list.products, list.listID]);

  //unload list if !isFocused
  useEffect(() => {
    async function unloadProducts() {
      if (isFocused === false) {
        await Realm.open({ schema: [ListSchema] }).then((realm) => {
          const item = realm.objectForPrimaryKey('List', listID);
          realm.write(() => {
            item.products = JSON.stringify(products);
          });
        });

        dispatch(unloadList());
      }
    }
    unloadProducts();
  }, [isFocused]);

  //creating a state for a new product
  const [newProductName, setNewProductName] = useState();
  const [newProductQuantity, setNewProductQuantity] = useState();
  const [newProductUnit, setNewProductUnit] = useState();

  // function to add product to List
  async function handleAddToList() {
    await dispatch(
      addToList({
        id: new Date().getTime().toString(),
        name: newProductName,
        quantity: newProductQuantity,
        unit: newProductUnit,
      }),
    );
    setNewProductName('');
    setNewProductQuantity('');
    setNewProductUnit('');
  }

  // function to remove products from list
  async function handleRemoveFromList() {
    await dispatch(removeFromList(updateProductID));
    moveUpdateProductContainerDown();
  }

  //creaintg a state for product updates
  const [updateProductID, setUpdateProductID] = useState();
  const [updateProductName, setUpdateProductName] = useState();
  const [updateProductQuantity, setUpdateProductQuantity] = useState();
  const [updateProductUnit, setUpdateProductUnit] = useState();

  // function to update products from list
  async function handleUpdateProductFromList() {
    await dispatch(
      updateProductFromList(
        updateProductID,
        updateProductName,
        updateProductQuantity,
        updateProductUnit,
      ),
    );
    moveUpdateProductContainerDown();
  }

  // creating references and state to handle with animations
  const NewProductContainerRef = useRef();
  const UpdateProductContainerRef = useRef();
  const [toogleNewProductContainer, setToogleNewProductContainer] = useState(
    false,
  );
  const [
    toogleUpdateProductContainer,
    setToogleUpdateProductContainer,
  ] = useState(false);

  // creating functions to handle animations
  async function moveNewProductContainerUp() {
    await setToogleNewProductContainer(true);
    NewProductContainerRef.current.bounceInUp(1000);
  }

  async function moveNewProductContainerDown() {
    await NewProductContainerRef.current.bounceOutDown(1000);
    await setNewProductName('');
    await setNewProductQuantity('');
    await setNewProductUnit('');
    setToogleNewProductContainer(false);
  }

  async function moveUpdateProductContainerUp(item) {
    if (toogleNewProductContainer === true) {
      setToogleNewProductContainer(false);
    }
    await setUpdateProductID(item.id);
    await setUpdateProductName(item.name);
    await setUpdateProductQuantity(item.quantity);
    await setUpdateProductUnit(item.unit);
    await setToogleUpdateProductContainer(true);
    UpdateProductContainerRef.current.bounceInUp(1000);
  }

  async function moveUpdateProductContainerDown() {
    await UpdateProductContainerRef.current.bounceOutDown(1000);
    setToogleUpdateProductContainer(false);
  }

  //Format date function
  const dateFormatted = useMemo(
    () =>
      format(new Date(route.params.listDate), 'dd/MM/yyyy', {
        locale: pt,
      }),
    [route.params.listDate],
  );

  return (
    <Background>
      <TitleContainer>
        <Title>{route.params.listName}</Title>
        <DateTitleContainer>
          <Icon name="event" size={20} color="#FFF" />
          <DateTitle>{dateFormatted}</DateTitle>
        </DateTitleContainer>
      </TitleContainer>
      <ProductListContainer>
        <ProductListHeader>
          <ProductListHeaderText>Nome do produto</ProductListHeaderText>
          <ProductListHeaderText>Quantidade</ProductListHeaderText>
        </ProductListHeader>
        {products && (
          <ProductList
            data={products}
            renderItem={({ item }) => (
              <ProductView
                item={item}
                onLongPress={() => moveUpdateProductContainerUp(item)}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        )}
      </ProductListContainer>
      <AddNewProductContainer>
        <AddNewProductButton onPress={moveNewProductContainerUp}>
          <AddNewProductButtonText>
            Adicionar novo produto
          </AddNewProductButtonText>
        </AddNewProductButton>
      </AddNewProductContainer>

      {toogleNewProductContainer && (
        <NewProductContainerAnimated ref={NewProductContainerRef}>
          <CloseButton onPress={moveNewProductContainerDown}>
            <Icon name="close" size={25} color="#fff" />
          </CloseButton>
          <Input
            placeholder="Nome do produto"
            value={newProductName}
            onChangeText={setNewProductName}
          />
          <InformationView>
            <InformationInput
              placeholder="Quantidade"
              keyboardType={'number-pad'}
              value={newProductQuantity}
              onChangeText={setNewProductQuantity}
            />
            <InformationInput
              placeholder="Unidade"
              autoCapitalize={'none'}
              value={newProductUnit}
              onChangeText={setNewProductUnit}
            />
          </InformationView>
          <ButtonView>
            <SuccessButton style={{ elevation: 4 }} onPress={handleAddToList}>
              <SuccessButtonText>Salvar</SuccessButtonText>
            </SuccessButton>
            <CancelButton
              style={{ elevation: 4 }}
              onPress={moveNewProductContainerDown}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
          </ButtonView>
        </NewProductContainerAnimated>
      )}

      {toogleUpdateProductContainer && (
        <UpdateProductContainerAnimated ref={UpdateProductContainerRef}>
          <CloseButton onPress={moveUpdateProductContainerDown}>
            <Icon name="close" size={25} color="#fff" />
          </CloseButton>
          <Input
            value={updateProductName}
            onChangeText={setUpdateProductName}
          />
          <InformationView>
            <InformationInput
              placeholder="Quantidade"
              keyboardType={'number-pad'}
              value={updateProductQuantity}
              onChangeText={setUpdateProductQuantity}
            />
            <InformationInput
              placeholder="Unidade"
              autoCapitalize={'none'}
              value={updateProductUnit}
              onChangeText={setUpdateProductUnit}
            />
          </InformationView>
          <ButtonView>
            <SuccessButton
              style={{ elevation: 4 }}
              onPress={handleUpdateProductFromList}>
              <SuccessButtonText>Salvar</SuccessButtonText>
            </SuccessButton>
            <DeleteButton
              style={{ elevation: 4 }}
              onPress={handleRemoveFromList}>
              <DeleteButtonText>Deletar</DeleteButtonText>
            </DeleteButton>
          </ButtonView>
        </UpdateProductContainerAnimated>
      )}
    </Background>
  );
}
