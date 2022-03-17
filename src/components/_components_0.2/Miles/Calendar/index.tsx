/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
import { Text, Center } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { format, parseISO } from 'date-fns';

import DayPicker, { DayModifiers } from 'react-day-picker';
import { Calendar } from './styles';
import 'react-day-picker/lib/style.css';
import { api } from '../../../../services/api';

interface monthAvailabilityIem {
  day: number;
  available: boolean;
}

// interface Appointments {
//   id: string;
//   date: string;
//   hourFormatted: string;
//   user: {
//     name: string;
//     avatar_url: string;
//   };
// }

interface ICalendarProps {
  vehicleSelected: any;
  handleDateSelected: (day: Omit<string, ''>) => void;
}

export function CalendarPiker({
  vehicleSelected,
  handleDateSelected,
}: ICalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvalability] = useState<
    monthAvailabilityIem[]
  >([]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day);

        handleDateSelected(String(day));
      }
    },
    [handleDateSelected],
  );

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    if (vehicleSelected !== 'Nenhum veiculo selecionado') {
      api
        .get(`/vehicles-availability/${vehicleSelected}/month`, {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        })
        .then(response => {
          setMonthAvalability(response.data);
        });
    }
  }, [currentMonth, vehicleSelected]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // const nextAppointments = useMemo(() => {
  //   return appointments.find(appointment =>
  //     isAfter(parseISO(appointment.date), new Date()),
  //   );
  // }, [appointments]);

  const birthdays = [
    {
      name: 'joaõ-foop',
      day: 14,
    },
    {
      name: 'joaõ-foop',
      day: 10,
    },
    {
      name: 'joaõ-foop',
      day: 9,
    },
  ];

  function renderDay(day: Date) {
    const date = day.getDate();
    console.log(day);
    const d = birthdays.filter(q => {
      return q.day === date;
    });
    console.log('d', d);
    return (
      <div>
        <div>{date}</div>
        <div>
          🎁{' '}
          {d.map(e => {
            return e.name;
          })}
        </div>
        {/* {birthdays.day === date
          ? birthdays.map((name: void) => (
              <div>
                <Tooltip label="agendamento">🎁 {name}</Tooltip>
              </div>
            ))
          : ''} */}
      </div>
    );
  }
  return (
    <Calendar>
      {vehicleSelected === 'Nenhum veiculo selecionado' ? (
        <Center>
          <Text>{vehicleSelected}</Text>
        </Center>
      ) : (
        <DayPicker
          weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
          fromMonth={new Date()}
          onMonthChange={handleMonthChange}
          selectedDays={selectedDate}
          disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
          renderDay={renderDay}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5] },
          }}
          onDayClick={handleDateChange}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
        />
        //   )}
        // </>
      )}
    </Calendar>
  );
}
