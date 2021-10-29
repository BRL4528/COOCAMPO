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
} from '@chakra-ui/react';
import { api } from '../../../../services/api';

interface FloatlistHoursProps {
  daySelected: string;
  vehicleSelected: string;
}

interface IAvailable {
  hour: number;
  available: boolean;
}

export function FloatlistHours({
  daySelected,
  vehicleSelected,
}: FloatlistHoursProps) {
  const [loading, setLoading] = useState(false);
  const [hoursAvailable, setHoursAvailable] = useState<IAvailable[]>([]);
  const [arrayHoursSelected, setArrayHoursSelected] = useState<any[]>([]);

  const [handleButton, setHandleButton] = useState(false);

  useEffect(() => {
    if (vehicleSelected !== 'Nenhum veiculo selecionado') {
      setLoading(true);
      const dayFormated =
        daySelected === '' ? new Date() : new Date(daySelected);
      api
        .get(`/vehicles-availability/${vehicleSelected}/day`, {
          params: {
            day: dayFormated.getDate(),

            year: dayFormated.getFullYear(),

            month: dayFormated.getMonth() + 1,
          },
        })
        .then(response => {
          setHoursAvailable(response.data);
          setLoading(false);
        });
    }
  }, [daySelected, vehicleSelected]);

  const morningAvailability = useMemo(() => {
    return hoursAvailable
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [hoursAvailable]);

  const afternoonAvailability = useMemo(() => {
    return hoursAvailable
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [hoursAvailable]);

  const handleHoursSelected = useCallback(
    (data: [string, boolean]) => {
      if (data[1]) {
        setHandleButton(false);
        setArrayHoursSelected([
          ...arrayHoursSelected,
          format(new Date().setHours(Number(data[0])), 'HH:00:00'),
        ]);
      } else if (!data[1]) {
        const array = arrayHoursSelected;

        const hourFormated = format(
          new Date().setHours(Number(data[0])),
          'HH:00:00',
        );
        const index = array.indexOf(hourFormated);
        if (index > -1) {
          array.splice(index, 1);
          setArrayHoursSelected(array);
          setHandleButton(true);
        }
      }
    },
    [arrayHoursSelected],
  );

  function createArayHours() {
    const dt = new Date(1970, 0, 1, 0, 0, 0, 0);
    const array = [];

    while (dt.getDate() === 1) {
      const point = dt.toLocaleTimeString('en-US');
      dt.setMinutes(dt.getMinutes() + 30);

      array.push(point);
    }
    return array;
  }

  const handleSubmitAppointments = useCallback(() => {
    const dayFormated =
      daySelected === ''
        ? format(new Date(), 'yyyy-MM-dd')
        : format(new Date(daySelected), 'yyyy-MM-dd');

    const dateFormated = arrayHoursSelected.map(data => {
      return `${dayFormated} ${data}`;
    });

    console.log(dateFormated);

    console.log('teste dde data', createArayHours());
  }, [arrayHoursSelected, daySelected]);

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
            <>
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
                      key={hour.hour}
                      p={['2', '4']}
                      value={String(hour.hour)}
                      bg={hour.available ? 'gray.700' : 'gray.800'}
                      borderRadius={8}
                      isDisabled={!hour.available}
                      cursor={hour.available ? 'pointer' : 'not-allowed'}
                      onChange={e =>
                        handleHoursSelected([e.target.value, e.target.checked])
                      }
                      m="2"
                    >
                      {hour.hourFormatted}
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
                      key={hour.hour}
                      p={['2', '4']}
                      value={String(hour.hour)}
                      bg={hour.available ? 'gray.700' : 'gray.800'}
                      borderRadius={8}
                      isDisabled={!hour.available}
                      cursor={hour.available ? 'pointer' : 'not-allowed'}
                      m="2"
                      onChange={e =>
                        handleHoursSelected([e.target.value, e.target.checked])
                      }
                    >
                      {hour.hourFormatted}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </Box>

              <Button
                onClick={handleSubmitAppointments}
                mt="15"
                mb="20"
                bg="blue.500"
                disabled={
                  arrayHoursSelected.length === 0 || handleButton === true
                }
              >
                Agendar veiculo
              </Button>
            </>
          )}
        </>
      )}
    </Center>
  );
}
