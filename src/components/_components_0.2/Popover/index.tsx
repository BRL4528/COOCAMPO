/* eslint-disable react/require-default-props */
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
  Box,
  Badge,
  Flex,
  Tooltip,
  PopoverFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';

import { useAuth } from '../../../hooks/auth';
import { api } from '../../../services/api';
import { apllyToast } from '../../Global/Toast2.0';

interface Props {
  handleletedAppointments: (event: any) => void;
  conductor: string;
  hassPass: boolean;
  theme: string;
  appointments: {
    id: string;
    start_date: string;
    end_date: string;
    status: string;
    route: string;
    vehicle: {
      name: string;
    };
    leader: {
      name: string;
    };
  };
}

export default function PopoverComp({
  theme,
  conductor,
  hassPass,
  appointments,
  handleletedAppointments,
}: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  console.log('isLoading={loadingUpdate}', appointments);
  const formateDateStartAppointments = useMemo(() => {
    if (appointments.start_date !== '') {
      return format(
        new Date(appointments.start_date),
        `d 'de' MMMM yyyy - HH:mm:ss`,
        {
          locale: ptBR,
        },
      );
    }
    return '';
  }, [appointments]);

  const formateDateEndAppointments = useMemo(() => {
    if (appointments.end_date !== '') {
      return format(
        new Date(appointments.end_date),
        `d 'de' MMMM yyyy - HH:mm:ss`,
        {
          locale: ptBR,
        },
      );
    }
    return '';
  }, [appointments]);

  const defineColorStatus = useMemo(() => {
    if (appointments.status === 'Pendente') {
      return 'yellow';
    }
    if (appointments.status === 'Recusado') {
      return 'red';
    }
    if (appointments.status === 'Aprovado') {
      return 'green';
    }
    return '';
  }, [appointments.status]);

  const handleCancelAppointments = useCallback(async () => {
    try {
      setLoading(true);
      await api.delete(`/appointments/${appointments.id}`).then(response => {
        handleletedAppointments(response.data);
        apllyToast('success', 'Sucesso ao cancelar agendamento');
        setLoading(false);
      });
    } catch (err) {
      apllyToast('warning', 'Problemas ao cancelar agendamento');
      setLoading(false);
    }
  }, [appointments.id, handleletedAppointments]);

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button
          display="flex"
          mb="1"
          flexDirection="row"
          borderRadius="4px"
          // bg="#4e79f060"
          bg={theme === 'light' ? '#1d3557' : '#4e79f060'}
          maxHeight="3"
          fontSize="9"
          w="100%"
          p="0"
          textAlign="left"
        >
          <Tooltip hasArrow placement="right" label={conductor} bg="gray.650">
            <Text
              m="0"
              w="100%"
              textAlign="left"
              maxWidth="50px"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {conductor}
            </Text>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg={theme === 'light' ? 'gray.200' : 'gray.700'}
        color="white"
        disabled
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          Agendamento de
          <Text>{conductor}</Text>
        </PopoverHeader>
        <PopoverBody>
          <Badge
            textAlign="center"
            radius="full"
            w="100%"
            colorScheme={defineColorStatus}
          >
            {appointments.status}
          </Badge>
          <Flex direction="column" p="2">
            <Box>
              <Tooltip bg="gray.100" hasArrow label="Horário de saida">
                <Badge colorScheme="cyan">Saindo</Badge>
              </Tooltip>
              <Text>{formateDateStartAppointments} </Text>
            </Box>

            <Box mt="2">
              <Tooltip bg="gray.100" hasArrow label="Horário de retorno">
                <Badge colorScheme="cyan">Retornando</Badge>
              </Tooltip>
              <Text>{formateDateEndAppointments} </Text>
            </Box>

            <Box mt="2">
              <Tooltip bg="gray.100" hasArrow label="Destino da viagem">
                <Badge colorScheme="cyan">Destino</Badge>
              </Tooltip>
              <Text>{appointments.route} </Text>
            </Box>
            <Box mt="2">
              <Tooltip bg="gray.100" hasArrow label="Destino da viagem">
                <Badge colorScheme="cyan">Veículo</Badge>
              </Tooltip>
              <Text>{appointments.vehicle.name} </Text>
            </Box>
            {appointments.leader ? (
              <Box mt="2">
                <Tooltip bg="gray.100" hasArrow label="Autorizado por:">
                  <Badge colorScheme="cyan">Autorizado por</Badge>
                </Tooltip>
                <Text>{appointments.leader.name} </Text>
              </Box>
            ) : (
              ''
            )}
          </Flex>
        </PopoverBody>
        {user.name === conductor && hassPass && (
          <PopoverFooter d="flex" justifyContent="center">
            <ButtonGroup size="sm">
              <Button
                isLoading={loading}
                loadingText="Cancelando"
                onClick={handleCancelAppointments}
                colorScheme="red"
              >
                Cancelar agendamento
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
}
