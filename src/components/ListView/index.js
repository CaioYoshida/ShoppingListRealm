import React, { useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Viewer, ListTitle, ListDate } from './styles';

export default function ListView({ item, onPress, onLongPress }) {
  const dateFormatted = useMemo(
    () =>
      format(new Date(item.date), 'dd/MM/yyyy', {
        locale: pt,
      }),
    [item.date],
  );

  return (
    <Viewer onPress={onPress} onLongPress={onLongPress}>
      <ListTitle>{item.name}</ListTitle>
      <ListDate>{dateFormatted}</ListDate>
    </Viewer>
  );
}
