import styled from 'styled-components/native';

export const Viewer = styled.TouchableOpacity`
  background: #fff;
  height: 40px;
  border-radius: 4px;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const CheckButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background: ${(props) => (props.check ? '#23D623' : '#ccc')};

  align-items: center;
  justify-content: center;
`;

export const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  width: 55%;
`;

export const ProductQuantity = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  width: 10%;
`;

export const ProductUnit = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  width: 20%;
`;
