import styled from 'styled-components/native';

export const Container = styled.View``;

export const DateInputView = styled.TouchableOpacity`
  height: 50px;
  background: #fff;

  border-radius: 8px;
  border-color: #8d98f9;
  border-width: 0.75px;

  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  padding-left: 15px;
  padding-right: 15px;

  margin-top: 10px;
`;

export const DateInputText = styled.Text`
  font-size: 18px;
  font-weight: bold;

  margin-left: 10px;

  color: #444;
`;
