/* eslint-disable array-callback-return */
// import io from 'socket.io-client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverArrow,
  Icon,
  Button,
  Box,
  Text,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiNotificationLine, RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { api } from '../../../services/api';

// interface AppointmentsMessage {
//   conductor: {
//     name: string;
//   };
//   content: string;
// }

// const appointmentsQueue: AppointmentsMessage[] = [];
// const socket = io('https://deploy.cooasgo.samasc.com.br');

// socket.on('new_notification', newMessage => {
//   console.log('mensagem', newMessage);
//   appointmentsQueue.push(newMessage);
// });
interface Appointments {
  appointment: [
    {
      id: string;
      conductor_id: string;
      vehicle_id: string;
      start_date: string;
      end_date: string;
      date: string;
      route: string;
      description: string;
      status: string;
      created_at: string;
      updated_at: string;
      conductor: {
        id: string;
        name: string;
        email: string;
      };
      vehicle: {
        name: string;
      };
    },
  ];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

export function NotificationAppointments() {
  const [appt, setappt] = useState<Appointments>();

  useEffect(() => {
    api
      .get<Appointments>('/appointments/filter', {
        params: {
          // vehicle_id: vehicleSelected,
          status: 'Pendente',
          take: 100,
          page: 1,
        },
      })
      .then(response => {
        setappt(response.data);

        // const arrayCheckbox = response.data.appointment.map(data => !data.id);
        // setCheckedItems(arrayCheckbox);
      });
  }, []);
  return (
    <Popover>
      <PopoverTrigger>
        {/* <Tooltip hasArrow bg="gray.650" label="Notificações"> */}
        <Button bg="transparent" as={Button}>
          <Box display="flex" alignItems="center">
            <Icon as={RiNotificationLine} fontSize="20" />

            {appt?.appointment !== undefined ? (
              <Box
                display={appt?.appointment.length > 0 ? '' : 'none'}
                alignItems="center"
                flexDirection="column"
              >
                <Icon
                  as={RiCheckboxBlankCircleFill}
                  fontSize="10"
                  color="red"
                  ml="-10px"
                  mt="-10px"
                />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Button>
        {/* </Tooltip> */}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader bg="gray.800">Notificações</PopoverHeader>
        <PopoverBody bg="gray.800" overflow="auto">
          {appt?.appointment.map(data => (
            <Button
              as={Link}
              key={data.id}
              borderRadius="none"
              textAlign="initial"
              alignItems="flex-start"
              w="100%"
              h="50"
              // size="sm"
              colorScheme="green"
              mb="2"
              display="flex"
              flexDirection="column"
              cursor="pointer"
            >
              <Box>{data.conductor.name}</Box>

              <Box>
                <Text fontSize="x-small" fontWeight="bold">
                  Está solicitando o veículo
                </Text>
                <Text fontSize="x-small">{data.vehicle.name}</Text>
              </Box>
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
