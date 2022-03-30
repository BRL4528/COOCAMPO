/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-curly-newline */
import { useEffect, useMemo, useState, useCallback } from 'react';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import {
  Box,
  Center,
  Checkbox,
  SimpleGrid,
  Text,
  Button,
  Spinner,
  Flex,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';

import { createArayHoursFormated } from '../../../../utils/createArayHoursFormated';
import { api } from '../../../../services/api';
import { apllyToast } from '../../../Global/Toast2.0';
import { ModalScheduleConfirmationAppointment } from '../../Modal/ModalScheduleConfirmationAppointment';
import { handleSendEmailNewAppointments } from '../../../../services/sendEmailNewApointments';

interface FloatlistHoursProps {
  daySelected: string;
  vehicleSelected: string;
  handleAddedNewAppointment: (newAp: any) => void;
}

interface IDateAvailable {
  date: string;
  available: boolean;
}
interface DestinyInfos {
  destiny: string;
  description: string;
  leader: string;
}

export function FloatlistHours({
  daySelected,
  vehicleSelected,
  handleAddedNewAppointment,
}: FloatlistHoursProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [hoursAvailable, setHoursAvailable] = useState<IDateAvailable[]>([]);

  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');

  const [handleButtonStatus, setHandleButtonStatus] = useState('start');
  const [reloadComponent, setReloadComponent] = useState(new Date());

  const handleCleanAppointment = useCallback(() => {
    setStart_date('');
    setEnd_date('');
    setHandleButtonStatus('start');
    setReloadComponent(new Date());
  }, []);

  useEffect(() => {
    if (vehicleSelected !== 'Nenhum veiculo selecionado') {
      try {
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
      } catch (err) {
        console.log(err);
        setLoading(false);
        apllyToast('warning', 'Problemas ao editar quilometragem!');
      }
    }
  }, [daySelected, vehicleSelected, reloadComponent]);

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

  const handleSubmitScheduleVehicle = useCallback(
    async (data: DestinyInfos) => {
      setLoading(true);
      try {
        await api
          .post('/appointments', {
            vehicle_id: vehicleSelected,
            date: format(new Date(start_date), 'yyyy-MM-dd'),
            start_date,
            end_date,
            route: data.destiny,
            description: data.description,
            status: 'Pendente',
          })
          .then(response => {
            onClose();
            apllyToast('success', 'Solicitação enviado com sucesso');
            handleCleanAppointment();
            handleAddedNewAppointment(response.data);
            handleSendEmailNewAppointments(
              'miles-schedule-group',
              data.leader,
              response.data,
            );
            setLoading(false);
          });
      } catch (err) {
        apllyToast('error', 'Erro ao confirmar solicitação');
        handleCleanAppointment();
        setLoading(false);
        console.log(err);
      }
    },
    [
      end_date,
      handleAddedNewAppointment,
      handleCleanAppointment,
      onClose,
      start_date,
      vehicleSelected,
    ],
  );

  const formateDateStartAppointments = useMemo(() => {
    if (start_date !== '') {
      return format(new Date(start_date), `d 'de' MMMM yyyy - HH:mm:ss`, {
        locale: ptBR,
      });
    }
    return '';
  }, [start_date]);

  const formateDateEndAppointments = useMemo(() => {
    if (end_date !== '') {
      return format(new Date(end_date), `d 'de' MMMM yyyy - HH:mm:ss`, {
        locale: ptBR,
      });
    }
    return '';
  }, [end_date]);

  // const handleVerifyHours = useMemo(() => {
  //   console.log('ver array', arrayHoursSelected);
  //   return arrayHoursSelected.length === 0 || handleButton === false;
  // }, [arrayHoursSelected, handleButton]);

  return (
    <Center flexDirection="column" mt="8">
      <ModalScheduleConfirmationAppointment
        loading={loading}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmitScheduleVehicle={handleSubmitScheduleVehicle}
        formateDateStartAppointments={formateDateStartAppointments}
        formateDateEndAppointments={formateDateEndAppointments}
      />

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
                <Tooltip hasArrow label="Horário de partida">
                  <Button
                    bg={handleButtonStatus === 'start' ? 'green.500' : 'grey'}
                    onClick={() => {}}
                    cursor={
                      handleButtonStatus === 'start' ? 'pointer' : 'not-allowed'
                    }
                  >
                    Partida
                  </Button>
                </Tooltip>
                <Text>.............</Text>
                <Tooltip hasArrow label="Horário de retorno">
                  <Button
                    bg={handleButtonStatus === 'return' ? 'green.500' : 'grey'}
                    onClick={() => {}}
                    cursor={
                      handleButtonStatus === 'return'
                        ? 'pointer'
                        : 'not-allowed'
                    }
                  >
                    Retorno
                  </Button>
                </Tooltip>
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
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </Box>

              <Box>
                <Button
                  onClick={handleCleanAppointment}
                  mt="15"
                  mb="20"
                  mr="5"
                  colorScheme="gray"
                  isDisabled={end_date === ''}
                >
                  Cancelar
                </Button>

                <Button
                  onClick={onOpen}
                  mt="15"
                  mb="20"
                  colorScheme="blue"
                  isDisabled={end_date === ''}
                >
                  Agendar
                </Button>
              </Box>
            </Center>
          )}
        </>
      )}
    </Center>
  );
}
