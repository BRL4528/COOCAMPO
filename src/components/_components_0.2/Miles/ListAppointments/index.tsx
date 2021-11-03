import { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Heading,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Badge,
} from '@chakra-ui/react';
import { RiChatSmile3Line } from 'react-icons/ri';
import { Pagination } from '../Pagination';
import { api } from '../../../../services/api';

interface IPropsListAppointmens {
  vehicleSelected: string;
}

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
      status: string;
      created_at: string;
      updated_at: string;
    },
  ];
}

export function ListAppointments({ vehicleSelected }: IPropsListAppointmens) {
  const [appointments, setListAppointments] = useState<Appointments>();

  useEffect(() => {
    api
      .get('/appointments/filter', {
        params: {
          vehicle_id: vehicleSelected,
          take: 3,
          page: 1,
        },
      })
      .then(response => {
        setListAppointments(response.data);
      });
  }, [vehicleSelected]);

  return (
    <Box
      overflow="auto"
      borderRadius={8}
      bg="gray.800"
      p={['4', '8']}
      height="470"
    >
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="md" fontWeight="normal">
          Fila de saida
        </Heading>
      </Flex>

      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Usuários</Th>
            <Th>Horario S-H</Th>

            <Th width="8" />
          </Tr>
        </Thead>

        <Tbody>
          {appointments?.appointment.map(appointmentitem => (
            <Tr>
              <Td>
                <Box>
                  <Text fontWeight="bold">
                    {appointmentitem.conductor_id}{' '}
                    <Badge colorScheme="green">Novo</Badge>
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    {appointmentitem.vehicle_id}
                  </Text>
                </Box>
              </Td>

              <Td> {appointmentitem.start_date}</Td>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <Button as="a" size="sm" fontSize="sm" colorScheme="blue">
                      <Icon as={RiChatSmile3Line} fontSize="20" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent bg="gray.700">
                    <PopoverArrow bg="gray.700" borderColor="gray.700" />
                    <PopoverCloseButton />
                    <PopoverHeader>Solicite um favor!</PopoverHeader>
                    <PopoverBody>
                      Caso queira pedir para que Bruno Luiz leve algo em algum
                      lugar que seja dentro da rota planejada, solicite por
                      aqui.
                    </PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end">
                      <ButtonGroup size="sm">
                        <Button colorScheme="blue">Verificar rota</Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination />
    </Box>
  );
}
