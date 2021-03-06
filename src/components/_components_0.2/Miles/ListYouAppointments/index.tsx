/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { differenceInSeconds, format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
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
  Heading,
  Badge,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
// import { RiChatSmile3Line } from 'react-icons/ri';
import { Pagination } from '../../Pagination';
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

export function ListYouAppointments({
  vehicleSelected,
}: IPropsListAppointmens) {
  const [appointments, setListAppointments] = useState<Appointments>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get('/appointments/filter', {
        params: {
          // vehicle_id: vehicleSelected,
          take: 6,
          page,
        },
      })
      .then(response => {
        setListAppointments(response.data);
      });
  }, [page, vehicleSelected]);

  const handleVerifyDateIsNew = useCallback(date => {
    if (differenceInSeconds(new Date(date), new Date()) > 13800) {
      return true;
    }
    return false;
  }, []);

  const defineColorStatus = useCallback((status): string => {
    if (status === 'Pendente') {
      return 'yellow';
    }
    if (status === 'Recusado') {
      return 'red';
    }
    if (status === 'Aprovado') {
      return 'green';
    }
    return '';
  }, []);

  return (
    <Box
      overflow="auto"
      borderRadius={8}
      bg="gray.800"
      p={['4', '8']}
      // height="450"
    >
      <Flex justify="space-between" align="center">
        <Heading size="md" fontWeight="normal">
          Seus agedamentos
        </Heading>
      </Flex>

      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Usu??rios</Th>
            <Th>Data e hora de sai</Th>
            <Th>Data e hora de retorno</Th>
            <Th>Rota</Th>
            <Th>Descri????o</Th>
            <Th>Status</Th>

            <Th width="8" />
          </Tr>
        </Thead>

        <Tbody>
          {appointments?.appointment.map(appointmentitem => (
            <Tr key={appointmentitem.id}>
              <Td>
                <Box display="flex" alignItens="center" flexDirection="row">
                  {handleVerifyDateIsNew(appointmentitem.created_at) ? (
                    <Badge
                      position="absolute"
                      fontSize="x-small"
                      colorScheme="green"
                      ml="-10"
                    >
                      New
                    </Badge>
                  ) : (
                    ''
                  )}
                  <Box>
                    <Text fontWeight="bold">
                      {appointmentitem.conductor.name}{' '}
                    </Text>
                    <Text fontSize="sm" color="gray.300">
                      {appointmentitem.vehicle.name}
                    </Text>
                  </Box>
                </Box>
              </Td>

              <Td>
                {' '}
                {format(
                  new Date(appointmentitem.start_date),
                  'dd/MM/yyyy HH:mm:ss',
                  {
                    locale: ptBR,
                  },
                )}{' '}
              </Td>
              <Td>
                {' '}
                {format(
                  new Date(appointmentitem.end_date),
                  'dd/MM/yyyy HH:mm:ss',
                  {
                    locale: ptBR,
                  },
                )}{' '}
              </Td>
              <Td> {appointmentitem.route}</Td>
              <Td> {appointmentitem.description}</Td>
              <Td>
                <Tag
                  colorScheme={defineColorStatus(appointmentitem.status)}
                  borderRadius="full"
                >
                  <TagLabel>{appointmentitem.status}</TagLabel>
                </Tag>
              </Td>
              <Td>
                {/* <Popover>
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
                </Popover> */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        totalCountOfRegisters={appointments?.pagination.total || 0}
        currentPage={page}
        onPageChange={setPage}
        registersPerPage={appointments?.pagination.take || 0}
      />
    </Box>
  );
}
