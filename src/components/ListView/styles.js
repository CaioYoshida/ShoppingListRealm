import styled from 'styled-components/native';

export const Viewer = styled.TouchableOpacity`
  background: #fff;
  height: 60px;
  border-radius: 4px;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 8px;

  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
`;

export const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

export const ListDate = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;
