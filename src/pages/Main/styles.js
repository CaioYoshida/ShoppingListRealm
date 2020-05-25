import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Title = styled.Text`
  font-size: 32px;
  padding: 20px;
  font-weight: bold;
  color: #fff;
`;

export const ListContainer = styled.View`
  background: #fff;
  height: 85%;
  width: 100%;

  position: absolute;
  bottom: 0px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  padding: 25px;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ListHeaderText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #8dbafe;
`;

export const Lists = styled.FlatList`
  flex: 1;
`;

export const NewListContainer = styled.View`
  background: #8dbafe;
  height: 230px;
  width: 100%;

  position: absolute;
  bottom: 0px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;

  z-index: 1;
`;

export const UpdateListContainer = styled(NewListContainer)``;

export const Input = styled.TextInput`
  height: 50px;
  background: #fff;

  border-radius: 8px;

  border-color: #8d98f9;
  border-width: 0.75px;

  font-size: 18px;
  font-weight: bold;
  color: #444;

  padding-left: 15px;
  padding-right: 15px;

  align-items: center;
  justify-content: center;
`;

export const ButtonView = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const SuccessButton = styled.TouchableOpacity`
  background: #1ec92f;

  align-items: center;
  justify-content: center;

  border-radius: 8px;

  height: 55px;
  width: 165px;

  margin-top: 15px;
`;

export const SuccessButtonText = styled.Text`
  font-weight: bold;
  font-size: 18px;

  color: #fff;
`;

export const CancelButton = styled(SuccessButton)`
  background: #fff;
`;

export const CancelButtonText = styled(SuccessButtonText)`
  color: #8d98f9;
`;

export const DeleteButton = styled(SuccessButton)`
  background: #ec3232;
`;

export const DeleteButtonText = styled(SuccessButtonText)``;

export const CloseButton = styled(RectButton)`
  position: absolute;
  bottom: 210px;
  right: 20px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #4255f9;
  align-items: center;
  justify-content: center;
`;
