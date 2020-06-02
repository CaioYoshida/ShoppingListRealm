/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Realm from 'realm';

import { ListSchema } from '~/realm/schema';

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
      await Realm.open({ schema: [ListSchema] }).then((realm) => {
        const allLists = [];
        realm.objects('List').map((item) => allLists.push(item));
        if (allLists.length === 4) {
          setLists([]);
        } else {
          setLists(allLists);
        }
      });
    }

    loadLists();
  }, [loadListTrigger]);

  //creating a new list inside DB
  async function hanldeAddNewList() {
    await Realm.open({ schema: [ListSchema] }).then((realm) => {
      realm.write(() => {
        realm.create('List', {
          id: Date.now(),
          title: newListName,
          date: newListDate,
          products: '[]',
        });
      });
    });

    setLoadListTrigger(!loadListTrigger);
  }

  //updategin an existing list from DB
  async function handleUpdateProduct() {
    await Realm.open({ schema: [ListSchema] }).then((realm) => {
      const list = realm.objectForPrimaryKey('List', updateListID);

      realm.write(() => {
        list.title = updateListName;
        list.date = updateListDate;
      });
    });

    setLoadListTrigger(!loadListTrigger);

    moveUpdateListContainerDown();
  }

  //deleting a list from DB
  async function hanldeDeleteProduct() {
    await Realm.open({ schema: [ListSchema] }).then((realm) => {
      const list = realm.objectForPrimaryKey('List', updateListID);

      realm.write(() => {
        realm.delete(list);
      });
    });

    setLoadListTrigger(!loadListTrigger);

    moveUpdateListContainerDown();
  }

  // creating references and state to handle with animations
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
    await setUpdateListName(item.title);
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
                await dispatch(loadList(item.products, item.id));
                navigation.navigate('List', {
                  listName: item.title,
                  listDate: item.date,
                });
              }}
              onLongPress={() => moveUpdateListContainerUp(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
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
