import { useCallback, useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';

import DayPicker, { DayModifiers } from 'react-day-picker';
import { Calendar } from './styles';
import 'react-day-picker/lib/style.css';
import { api } from '../../../services/api';

interface monthAvailabilityIem {
  day: number;
  available: boolean;
}

interface Appointments {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
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

  const [monthAvailability, setMonthAvalability] = useState<
    monthAvailabilityIem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointments[]>([]);
  console.log(appointments);

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
      console.log(vehicleSelected);
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

  useEffect(() => {
    api
      .get<Appointments[]>('/appointments', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

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

  return (
    <Calendar>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        fromMonth={new Date()}
        onMonthChange={handleMonthChange}
        selectedDays={selectedDate}
        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
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
    </Calendar>
  );
}
