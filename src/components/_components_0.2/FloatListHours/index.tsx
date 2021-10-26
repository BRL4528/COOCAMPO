import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  RadioGroup,
  Center,
  Radio,
  SimpleGrid,
  Text,
  Button,
} from '@chakra-ui/react';
import { api } from '../../../services/api';

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
  const [hoursAvailable, setHoursAvailable] = useState<IAvailable[]>([]);

  useEffect(() => {
    api
      .get(`/vehicles-availability/${vehicleSelected}/day`, {
        params: {
          day:
            daySelected === ''
              ? new Date().getDate()
              : new Date(daySelected).getDate(),

          year:
            daySelected === ''
              ? new Date().getDate()
              : new Date(daySelected).getFullYear(),

          month:
            daySelected === ''
              ? new Date().getDate()
              : new Date(daySelected).getMonth() + 1,
        },
      })
      .then(response => {
        setHoursAvailable(response.data);
      });
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

  return (
    <Center flexDirection="column" mt="8">
      <Text fontSize={['md', 'lg', 'xl']} mt="10" mb="10">
        Selecione um horario disponivel para agendar este veiculo
      </Text>
      <RadioGroup>
        <Text>Manhâ</Text>
        <SimpleGrid
          // minChildWidth="100%"
          columns={[3, null, 5]}
          spacing={2}
          mt={4}
          bg="re"
        >
          {morningAvailability.map(hour => (
            <Radio
              key={hour.hour}
              p={['2', '4']}
              value={String(hour.hour)}
              bg={hour.available ? 'gray.700' : 'gray.800'}
              borderRadius={8}
              isDisabled={!hour.available}
              cursor={hour.available ? 'pointer' : 'not-allowed'}
              m="2"
            >
              {hour.hourFormatted}
            </Radio>
          ))}

          {/* <Radio p={['2', '4']} value="1" bg="gray.700" borderRadius={8} m="2">
            9:00 AM - 9:15 AM
          </Radio>

          <Radio p={['2', '4']} value="2" bg="gray.700" borderRadius={8} m="2">
            9:15 AM - 9:30 AM
          </Radio>

          <Radio p={['2', '4']} value="3" bg="gray.700" borderRadius={8} m="2">
            9:30 AM - 9:45 AM
          </Radio>

          <Radio p={['2', '4']} value="4" bg="gray.700" borderRadius={8} m="2">
            10:00 AM - 10:15 AM
          </Radio>

          <Radio p={['2', '4']} value="5" bg="gray.700" borderRadius={8} m="2">
            10:15 AM - 10:30 AM
          </Radio>

          <Radio p={['2', '4']} value="6" bg="gray.700" borderRadius={8} m="2">
            10:30 AM - 10:45 AM
          </Radio> */}
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
            <Radio
              key={hour.hour}
              p={['2', '4']}
              value={String(hour.hour)}
              bg={hour.available ? 'gray.700' : 'gray.800'}
              borderRadius={8}
              isDisabled={!hour.available}
              cursor={hour.available ? 'pointer' : 'not-allowed'}
              m="2"
            >
              {hour.hourFormatted}
            </Radio>
          ))}
        </SimpleGrid>
      </RadioGroup>

      <Button mt="15" mb="20" bg="blue.500">
        Agendar veiculo
      </Button>
    </Center>
  );
}
