/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-curly-newline */
import { useEffect, useMemo, useState, useCallback } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Center,
  Checkbox,
  SimpleGrid,
  Text,
  Button,
  Spinner,
  Flex,
} from '@chakra-ui/react';

import { createArayHoursFormated } from '../../../../utils/createArayHoursFormated';
import { api } from '../../../../services/api';
import { apllyToast } from '../../../Global/Toast2.0';

interface FloatlistHoursProps {
  daySelected: string;
  vehicleSelected: string;
}

interface IDateAvailable {
  date: string;
  available: boolean;
}

export function FloatlistHours({
  daySelected,
  vehicleSelected,
}: FloatlistHoursProps) {
  const [loading, setLoading] = useState(false);
  const [hoursAvailable, setHoursAvailable] = useState<IDateAvailable[]>([]);

  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');

  const [handleButtonStatus, setHandleButtonStatus] = useState('start');

  useEffect(() => {
    if (vehicleSelected !== 'Nenhum veiculo selecionado') {
      setLoading(true);
      const dayFormated =
        daySelected === '' ? new Date() : new Date(daySelected);
      api
        .get(`/appointments/vehicle`, {
          params: {
            vehicle_id: vehicleSelected,

            day: dayFormated.getDate(),

            year: dayFormated.getFullYear(),

            month: dayFormated.getMonth() + 1,
          },
        })
        .then(response => {
          const dateFormated = createArayHoursFormated(
            response.data,
            daySelected,
          );
          setHoursAvailable(dateFormated);
          setLoading(false);
        });
    }
  }, [daySelected, vehicleSelected]);

  const morningAvailability = useMemo(() => {
    const dayFormated =
      daySelected === ''
        ? format(new Date(), 'yyyy-MM-dd')
        : format(new Date(daySelected), 'yyyy-MM-dd');
    const daySelectedFormated = `${dayFormated} 12:00:00`;

    return hoursAvailable
      .filter(({ date }) => new Date(date) < new Date(daySelectedFormated))
      .map(({ date, available }) => {
        return {
          date,
          available,
          hourFormated: format(new Date(date), 'HH:mm'),
          availableDateSelected:
            new Date(date) >= new Date(start_date) &&
            new Date(date) <= new Date(end_date),
        };
      });
  }, [daySelected, end_date, hoursAvailable, start_date]);

  const afternoonAvailability = useMemo(() => {
    const dayFormated =
      daySelected === ''
        ? format(new Date(), 'yyyy-MM-dd')
        : format(new Date(daySelected), 'yyyy-MM-dd');
    const daySelectedFormated = `${dayFormated} 12:00:00`;

    return hoursAvailable
      .filter(({ date }) => new Date(date) >= new Date(daySelectedFormated))
      .map(({ date, available }) => {
        return {
          date,
          available,
          hourFormated: format(new Date(date), 'HH:mm'),
          availableDateSelected:
            new Date(date) >= new Date(start_date) &&
            new Date(date) <= new Date(end_date),
        };
      });
  }, [daySelected, end_date, hoursAvailable, start_date]);

  const handleHoursSelected = useCallback(
    (data: [string, boolean]) => {
      if (handleButtonStatus === 'start') {
        setStart_date(data[0]);
        setHandleButtonStatus('return');
      } else if (new Date(data[0]) <= new Date(start_date)) {
        apllyToast('error', 'Verifique a data selecionada');
      } else if (handleButtonStatus === 'return') {
        setEnd_date(data[0]);
      }
    },
    [handleButtonStatus, start_date],
  );

  const handleSubmitScheduleVehicle = useCallback(() => {
    api.post('/appointments', {
      vehicle_id: vehicleSelected,
      start_date,
      end_date,
    });
  }, [end_date, start_date, vehicleSelected]);

  // const handleVerifyHours = useMemo(() => {
  //   console.log('ver array', arrayHoursSelected);
  //   return arrayHoursSelected.length === 0 || handleButton === false;
  // }, [arrayHoursSelected, handleButton]);

  return (
    <Center flexDirection="column" mt="8">
      {vehicleSelected === 'Nenhum veiculo selecionado' ? (
        <Center>
          <Text>{vehicleSelected}</Text>
        </Center>
      ) : (
        <>
          <Text fontSize={['md', 'lg', 'xl']} mt="10" mb="10">
            Selecione um horario disponivel para agendar este veiculo
          </Text>

          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Center flexDirection="column">
              <Flex mb="30px">
                <Button
                  colorScheme="teal"
                  bg={handleButtonStatus === 'start' ? 'green.500' : 'blue.500'}
                  onClick={() => {}}
                >
                  Partida
                </Button>
                <Text>.............</Text>
                <Button
                  colorScheme="teal"
                  bg={
                    handleButtonStatus === 'return' ? 'green.500' : 'blue.500'
                  }
                  onClick={() => {}}
                >
                  Retorno
                </Button>
              </Flex>
              <Box>
                <Text>Manhã</Text>

                <SimpleGrid
                  // minChildWidth="100%"
                  columns={[3, null, 5]}
                  spacing={2}
                  mt={4}
                  bg="re"
                >
                  {morningAvailability.map(hour => (
                    <Checkbox
                      key={hour.date}
                      p={['2', '4']}
                      value={String(hour.date)}
                      bg={hour.available ? 'gray.700' : 'gray.800'}
                      color={hour.availableDateSelected ? 'blue.500' : ''}
                      borderRadius={8}
                      isDisabled={!hour.available || hour.availableDateSelected}
                      cursor={hour.available ? 'pointer' : 'not-allowed'}
                      onChange={e =>
                        handleHoursSelected([e.target.value, e.target.checked])
                      }
                      m="2"
                    >
                      {hour.hourFormated}
                    </Checkbox>
                  ))}
                </SimpleGrid>

                <Text mt="10">Tarde</Text>

                <SimpleGrid
                  // minChildWidth="100%"
                  columns={[3, null, 5]}
                  spacing={2}
                  mt={4}
                  bg="re"
                >
                  {afternoonAvailability.map(hour => (
                    <Checkbox
                      key={hour.date}
                      p={['2', '4']}
                      value={String(hour.date)}
                      bg={hour.available ? 'gray.700' : 'gray.800'}
                      color={hour.availableDateSelected ? 'blue.500' : ''}
                      borderRadius={8}
                      isDisabled={!hour.available || hour.availableDateSelected}
                      cursor={hour.available ? 'pointer' : 'not-allowed'}
                      onChange={e =>
                        handleHoursSelected([e.target.value, e.target.checked])
                      }
                      m="2"
                    >
                      {hour.hourFormated}
                      {console.log(hour)}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </Box>

              <Button
                onClick={handleSubmitScheduleVehicle}
                mt="15"
                mb="20"
                bg="blue.500"
              >
                Agendar veiculo
              </Button>
            </Center>
          )}
        </>
      )}
    </Center>
  );
}
