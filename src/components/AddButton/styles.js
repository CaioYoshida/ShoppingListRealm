import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Button = styled(RectButton)`
  position: absolute;
  right: 20px;
  bottom: 20px;

  background: #4255f9;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
