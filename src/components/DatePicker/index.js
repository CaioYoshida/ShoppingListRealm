import React, { useMemo, useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, subHours, formatISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, DateInputView, DateInputText } from './styles';

export default function DatePicker({ initialDate, onChangeDate }) {
  // subHours is been used to set TimeZone
  const [date, setDate] = useState(subHours(new Date(initialDate), 3));
  const [show, setShow] = useState(false);
  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
    [date],
  );

  function showDatePicker() {
    setShow(true);
  }

  function onChange(event, selectedDate) {
    setShow(Platform.OS === 'ios');
    const currentDate = selectedDate || date;

    setDate(subHours(currentDate, 3));
    onChangeDate(subHours(currentDate, 3));
  }

  return (
    <Container>
      <DateInputView onPress={() => showDatePicker()}>
        <Icon name="calendar" size={20} color="#999" />
        <DateInputText>{dateFormatted}</DateInputText>
      </DateInputView>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={onChange}
            mode="date"
            display="default"
          />
        )}
      </View>
    </Container>
  );
}
