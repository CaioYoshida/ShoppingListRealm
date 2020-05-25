/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

import database from '~/database/index';

import { loadList } from '~/store/modules/list/actions';

import Background from '~/components/Background';
import ListView from '~/components/ListView';
import AddButton from '~/components/AddButton';
import DatePicker from '~/components/DatePicker';

import {
  Title,
  ListContainer,
  Lists,
  ListHeader,
  ListHeaderText,
  NewListContainer,
  Input,
  ButtonView,
  SuccessButton,
  SuccessButtonText,
  CancelButton,
  CancelButtonText,
  UpdateListContainer,
  DeleteButton,
  DeleteButtonText,
  CloseButton,
} from './styles';

const NewListContainerAnimated = Animatable.createAnimatableComponent(
  NewListContainer,
);

const UpdateListContainerAnimated = Animatable.createAnimatableComponent(
  UpdateListContainer,
);

/* const listas = [
  {
    id: '1',
    title: 'Compras do mês',
    date: '2020-05-28T18:56:00.045Z',
    products:
      '[{"id":"1","name":"Pepsi 2 litros","quantity":"1","unit":"un","check":false},{"id":"2","name":"Filé mignon","quantity":"500","unit":"g","check":true},{"id":"3","name":"Patinho","quantity":"1.5","unit":"kg","check":true},{"id":"4","name":"Pizza Sadia","quantity":"2","unit":"cx","check":false}]',
  },
  {
    id: '2',
    title: 'Pão de açúcar',
    date: '2020-05-15T18:56:00.045Z',
    products:
      '[{"id":"1","name":"Manteiga","quantity":"1","unit":"un","check":false},{"id":"2","name":"Mussarela","quantity":"500","unit":"g","check":true},{"id":"3","name":"Salmão","quantity":"1.5","unit":"kg","check":true},{"id":"4","name":"Pizza Sadia","quantity":"2","unit":"cx","check":false}]',
  },
]; */

export default function Main({ navigation }) {
  const dispatch = useDispatch();

  const [lists, setLists] = useState([]);
  const [loadListTrigger, setLoadListTrigger] = useState(false);

  // creating state for new list
  const [newListName, setNewListName] = useState('');
  const [newListDate, setNewListDate] = useState(new Date());

  // creating state to make list updates
  const [updateListID, setUpdateListID] = useState('');
  const [updateListName, setUpdateListName] = useState('');
  const [updateListDate, setUpdateListDate] = useState(new Date());

  // loading lists from DB
  useEffect(() => {
    async function loadLists() {
      const listCollection = await database.collections.get('lists');
      const allLists = await listCollection.query().fetch();

      if (allLists.length === 0) {
        setLists([]);
      } else {
        setLists(allLists);
      }
    }

    loadLists();
  }, [loadListTrigger]);

  //creating a new list inside DB
  async function hanldeAddNewList() {
    const listCollection = await database.collections.get('lists');

    await database.action(async () => {
      await listCollection.create((list) => {
        list.name = newListName;
        list.date = newListDate;
        list.items = '[]';
      });
    });

    setLoadListTrigger(!loadListTrigger);
  }

  //updategin an existing list from DB
  async function handleUpdateProduct() {
    const listCollection = await database.collections.get('lists');
    const item = await listCollection.find(updateListID);

    await database.action(async () => {
      await item.update((list) => {
        list.name = updateListName;
        list.date = updateListDate;
      });
    });

    setLoadListTrigger(!loadListTrigger);

    moveUpdateListContainerDown();
  }

  //deleting a list from DB
  async function hanldeDeleteProduct() {
    const listCollection = await database.collections.get('lists');
    const item = await listCollection.find(updateListID);

    await database.action(async () => {
      await item.destroyPermanently();
    });

    setLoadListTrigger(!loadListTrigger);

    moveUpdateListContainerDown();
  }

  // creating state to handle with animations
  const NewListContainerRef = useRef();
  const UpdateListContainerRef = useRef();
  const [toogleNewListContainer, setToogleNewListContainer] = useState(false);
  const [toogleUpdateListContainer, setToogleUpdateListContainer] = useState(
    false,
  );

  // creating functions to handle animations
  async function moveNewListContainerUp() {
    await setToogleNewListContainer(true);
    NewListContainerRef.current.bounceInUp(1000);
  }

  async function moveNewListContainerDown() {
    await NewListContainerRef.current.bounceOutDown(1000);
    await setNewListName('');
    await setNewListDate(new Date());
    setToogleNewListContainer(false);
  }

  async function moveUpdateListContainerUp(item) {
    if (toogleNewListContainer === true) {
      setToogleNewListContainer(false);
    }
    await setUpdateListID(item.id);
    await setUpdateListName(item.name);
    await setUpdateListDate(item.date);
    await setToogleUpdateListContainer(true);
    UpdateListContainerRef.current.bounceInUp(1000);
  }

  async function moveUpdateListContainerDown() {
    await UpdateListContainerRef.current.bounceOutDown(1000);
    await setUpdateListID('');
    await setUpdateListName('');
    await setUpdateListDate('');
    setToogleUpdateListContainer(false);
  }

  return (
    <Background>
      <Title>Listas</Title>
      <ListContainer>
        <ListHeader>
          <ListHeaderText>Nome da Lista</ListHeaderText>
          <ListHeaderText>Data</ListHeaderText>
        </ListHeader>
        <Lists
          data={lists}
          renderItem={({ item }) => (
            <ListView
              item={item}
              onPress={async () => {
                await dispatch(loadList(item.items, item.id));
                navigation.navigate('List', {
                  listName: item.name,
                  listDate: item.date,
                });
              }}
              onLongPress={() => moveUpdateListContainerUp(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ListContainer>
      <AddButton onPress={moveNewListContainerUp} />

      {toogleNewListContainer && (
        <NewListContainerAnimated ref={NewListContainerRef}>
          <CloseButton onPress={moveNewListContainerDown}>
            <Icon name="close" size={25} color="#fff" />
          </CloseButton>
          <Input
            placeholder="Nome da lista"
            value={newListName}
            onChangeText={setNewListName}
          />
          <DatePicker
            initialDate={newListDate}
            onChangeDate={(value) => setNewListDate(value)}
          />
          <ButtonView>
            <SuccessButton style={{ elevation: 4 }} onPress={hanldeAddNewList}>
              <SuccessButtonText>Salvar</SuccessButtonText>
            </SuccessButton>
            <CancelButton
              style={{ elevation: 4 }}
              onPress={moveNewListContainerDown}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
          </ButtonView>
        </NewListContainerAnimated>
      )}

      {toogleUpdateListContainer && (
        <UpdateListContainerAnimated ref={UpdateListContainerRef}>
          <CloseButton onPress={moveUpdateListContainerDown}>
            <Icon name="close" size={25} color="#fff" />
          </CloseButton>
          <Input value={updateListName} onChangeText={setUpdateListName} />
          <DatePicker
            initialDate={updateListDate}
            onChangeDate={(value) => setUpdateListDate(value)}
          />
          <ButtonView>
            <SuccessButton
              style={{ elevation: 4 }}
              onPress={handleUpdateProduct}>
              <SuccessButtonText>Salvar</SuccessButtonText>
            </SuccessButton>
            <DeleteButton
              style={{ elevation: 4 }}
              onPress={hanldeDeleteProduct}>
              <DeleteButtonText>Deletar</DeleteButtonText>
            </DeleteButton>
          </ButtonView>
        </UpdateListContainerAnimated>
      )}
    </Background>
  );
}
