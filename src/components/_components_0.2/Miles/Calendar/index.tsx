import { Text, Center, Tooltip, Flex } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

interface Appointments {
  id: string;
  date: string;
  status: string;
  day: number;
}

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

  const [appointments, setAppointments] = useState<Appointments[]>();

  const [monthAvailability, setMonthAvalability] = useState<
    monthAvailabilityIem[]
  >([]);

  useEffect(() => {
    api.get<Appointments[]>('/appointments').then(resonse => {
      const formatedData = resonse.data
        .filter(
          data =>
            new Date(data.date).getMonth() + 1 === currentMonth.getMonth() + 1,
        )
        .map(appontent => {
          return {
            ...appontent,
            day: new Date(appontent.date).getDate() + 1,
          };
        });

      setAppointments(formatedData);
    });
  }, [currentMonth]);

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

  function renderDay(day: Date) {
    const date = day.getDate();
    const appointmentsFiltred = appointments?.filter(appointmentsDay => {
      return appointmentsDay.day === date;
    });
    return (
      <div>
        <div>{date}</div>
        <div>
          {appointmentsFiltred?.map(e => {
            return (
              <Tooltip hasArrow label={e.date}>
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  borderRadius="4px"
                  bg="#4e79f060"
                  maxHeight="3"
                  mb="2"
                  cursor="pointer"
                  fontSize="9"
                >
                  {e.id}
                </Flex>
              </Tooltip>
            );
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
