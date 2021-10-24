import React from 'react';
import DayPicker from 'react-day-picker';
import { Calendar } from './styles';

export function CalendarPiker() {
  return (
    <Calendar>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        fromMonth={new Date()}
      />
    </Calendar>
  );
}
