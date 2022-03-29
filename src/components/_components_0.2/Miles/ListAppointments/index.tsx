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
  Checkbox,
  Tooltip,
  Button,
  Icon,
} from '@chakra-ui/react';
// import { RiChatSmile3Line } from 'react-icons/ri';
import { RiCheckLine, RiCloseLine, RiMailSendLine } from 'react-icons/ri';
import { Pagination } from '../../Pagination';
import { api } from '../../../../services/api';
import { FilterCollapse } from '../Filter';
import { apllyToast } from '../../../Global/Toast2.0';
import {
  handleResendEmailAppointments,
  handleSendEmailForRequesterAppointments,
} from '../../../../services/sendEmailNewApointments';
import { useAuth } from '../../../../hooks/auth';

interface IPropsListAppointmens {
  vehicleSelected: string;
  month: number;
  tabFocus: number;
  statusFilter: string;
  // handleSetFocusTab: (tab: number) => void;
  handleSetStatusFilter: (newStatus: string) => void;
  handleUpdateAppointment: (updateAp: string) => void;
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

interface AppointmentsItem {
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
}

export function ListAppointments({
  vehicleSelected,
  month,
  tabFocus,
  statusFilter,
  handleSetStatusFilter,
  handleUpdateAppointment,
}: IPropsListAppointmens) {
  const { user } = useAuth();
  const [appointments, setListAppointments] = useState<Appointments>();
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [fetting, setFetting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isIndeterminate, setIsindeterminate] = useState<boolean>();

  const [updateSatus, setUpdateSatatus] = useState();

  // const [checkedItems, setCheckedItems] = useState([true]);

  const [allChecked, setAllChecked] = useState<boolean>();
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    if (allChecked) {
      setIsindeterminate(false);
    } else {
      setIsindeterminate(selectedItems.length > 0);
    }
  }, [allChecked, selectedItems, statusFilter]);

  useEffect(() => {
    if (appointments?.appointment.length) {
      setAllChecked(selectedItems.length === appointments?.appointment.length);
    } else {
      setAllChecked(false);
    }
  }, [appointments?.appointment.length, selectedItems]);

  useEffect(() => {
    api
      .get<Appointments>('/appointments/filter', {
        params: {
          // vehicle_id: vehicleSelected,
          month: `${month < 10 ? '0' : ''}${month}-2022`,
          status: statusFilter,
          take: 6,
          page,
        },
      })
      .then(response => {
        setListAppointments(response.data);

        // const arrayCheckbox = response.data.appointment.map(data => !data.id);
        // setCheckedItems(arrayCheckbox);
      });
  }, [month, page, statusFilter, vehicleSelected, updateSatus, tabFocus]);

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
  const handleUpdateSatatus = useCallback(
    async status => {
      try {
        setLoadingUpdate(true);
        await api
          .put('appointments/all', selectedItems, {
            params: {
              status,
              leader_id: user.id,
            },
          })
          .then(response => {
            setUpdateSatatus(response.data);
            handleSendEmailForRequesterAppointments(user.email, status);
            setSelectedItems([]);
            handleSetStatusFilter(status);
            handleUpdateAppointment(response.data);
            apllyToast('success', 'Sucesso ao atualizar status');
            setLoadingUpdate(false);
          });
      } catch (err) {
        console.log(err);
        apllyToast('error', 'Problemas ao atualizar status');
        setLoadingUpdate(false);
      }
    },
    [
      handleSetStatusFilter,
      handleUpdateAppointment,
      selectedItems,
      user.email,
      user.id,
    ],
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedItems.findIndex(item => item === id);

      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== id);

        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    },
    [selectedItems],
  );

  const handleSelectAllItem = useCallback(
    (ids: AppointmentsItem[] | undefined) => {
      if (ids) {
        console.log('ids', ids);
        if (selectedItems.length > 0) {
          setSelectedItems([]);
        } else {
          const filteredItems = ids.map(item => item.id);
          setSelectedItems(filteredItems);
        }
      }
    },
    [selectedItems.length],
  );

  const hadleResendEmail = useCallback(async () => {
    try {
      setLoadingResend(true);
      await handleResendEmailAppointments('miles-schedule-group');
      setLoadingResend(false);
      apllyToast('info', 'Solicitação reenviada com sucesso');
    } catch (err) {
      console.log(err);
      apllyToast('error', 'Problemas ao reenviar solicitação');
      setLoadingResend(false);
    }
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
          Acompanhe todos os agendamentos
        </Heading>

        <FilterCollapse
          isOpen={selectedItems.length > 0 && statusFilter !== 'Aprovado'}
        >
          <Box>
            <Tooltip
              bg="gray.650"
              hasArrow
              label={
                selectedItems.length > 1
                  ? 'Reencaminhar todas solicitações'
                  : 'Reencaminhar solicitação'
              }
            >
              <Button
                isLoading={loadingResend}
                size="sm"
                mr="2"
                colorScheme="blue"
                fontWeight="medium"
                onClick={hadleResendEmail}
              >
                <Icon as={RiMailSendLine} fontSize="20" />
              </Button>
            </Tooltip>
            <Tooltip
              bg="gray.650"
              hasArrow
              label={selectedItems.length > 1 ? 'Aprovar todos' : 'Aprovar'}
            >
              <Button
                isLoading={loadingUpdate}
                size="sm"
                mr="2"
                colorScheme="green"
                fontWeight="medium"
                onClick={() => handleUpdateSatatus('Aprovado')}
              >
                <Icon as={RiCheckLine} fontSize="20" />
              </Button>
            </Tooltip>
            {statusFilter !== 'Recusado' ? (
              <Tooltip
                bg="gray.650"
                hasArrow
                label={selectedItems.length > 1 ? 'Recusar todos' : 'Recusar'}
              >
                <Button
                  isLoading={loadingUpdate}
                  size="sm"
                  mr="2"
                  colorScheme="red"
                  fontWeight="medium"
                  onClick={() => handleUpdateSatatus('Recusado')}
                >
                  <Icon as={RiCloseLine} fontSize="20" />
                </Button>
              </Tooltip>
            ) : (
              ''
            )}
          </Box>
        </FilterCollapse>
      </Flex>

      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={() => handleSelectAllItem(appointments?.appointment)}
              />
            </Th>
            <Th>Usuários</Th>
            <Th>Data solicitação</Th>
            <Th>Data e hora de sai</Th>
            <Th>Data e hora de retorno</Th>
            <Th>Rota</Th>
            <Th>Descrição</Th>
            <Th>Status</Th>

            <Th width="8" />
          </Tr>
        </Thead>

        <Tbody>
          {appointments?.appointment.map(appointmentitem => (
            <Tr key={appointmentitem.id} fontSize="sm">
              <Td>
                <Checkbox
                  isChecked={selectedItems.includes(appointmentitem.id)}
                  onChange={() => handleSelectItem(appointmentitem.id)}
                />
              </Td>
              <Td w="100%">
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
                    <Text fontSize="x-small" color="gray.300">
                      {appointmentitem.vehicle.name}
                    </Text>
                  </Box>
                </Box>
              </Td>

              <Td>
                {' '}
                {format(
                  new Date(appointmentitem.created_at),
                  'dd/MM/yyyy HH:mm:ss',
                  {
                    locale: ptBR,
                  },
                )}{' '}
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
