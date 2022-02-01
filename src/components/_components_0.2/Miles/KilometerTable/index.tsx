import { useEffect, useState, useCallback } from 'react';

import { format } from 'date-fns';

import {
  Box,
  // Button,
  Checkbox,
  Flex,
  Heading,
  // Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  useDisclosure,
  // Tooltip,
} from '@chakra-ui/react';
// import { RiFilter2Line } from 'react-icons/ri';

import { Pagination } from '../Pagination';
import { FilterCollapse } from '../Filter';
import { ModalAddNewKilometer } from '../../Modal/ModalAddNewKilometer';
import { ModalEditNewKilometer } from '../../Modal/ModalEditNewKilometer';

import { useAuth } from '../../../../hooks/auth';

import { api } from '../../../../services/api';
import { apllyToast } from '../../../Global/Toast2.0';

interface IKilometersTableProps {
  handleUpdateNewKm: (id_new_vehicle: string) => void;
  vehicleSelected: {
    id: string;
    km: number;
  };
}

interface IGetKilometers {
  kilometer: [
    {
      id: string;
      km_start: number;
      km_end: number;
      km_traveled: number;
      observations: string;
      reason: string;
      created_at: string;
      date: string;
    },
  ];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

interface IKilometers {
  // vehicle_id?: string;
  // access_id?: string;
  id?: string;
  km_start: number;
  km_end: number;
  km_traveled?: number;
  observations: string;
  reason: string;
  date: string;
}

export function KilometerTable({
  vehicleSelected,
  handleUpdateNewKm,
}: IKilometersTableProps) {
  const { user } = useAuth();
  const { isOpen } = useDisclosure();
  const [dataTable, setDataTable] = useState<IGetKilometers>();
  const [newRegister, setNewRegister] = useState<string>();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    // setLoading(true);
    api
      .get<IGetKilometers>(
        `/kilometers/filter?conductor_id=${user.id}&vehicle_id=${vehicleSelected.id}&take=6&page=1`,
      )
      .then(response => {
        setDataTable(response.data);
        // setLoading(false);
      });
  }, [user.id, vehicleSelected, newRegister]);

  const handleFormatDate = useCallback((data: string) => {
    const dataFormadet = format(new Date(data), 'dd/MM/yyyy');
    return dataFormadet;
  }, []);

  const handleFormatHours = useCallback((hours: string) => {
    const dataFormadet = format(new Date(hours), 'HH:mm:ss');
    return dataFormadet;
  }, []);

  const handleAddNewKilometer = useCallback(
    async (data: Omit<IKilometers, 'e'>) => {
      const { km_end, km_start, observations, reason, km_traveled, date } =
        data;

      const formatData = {
        km_end: Number(km_end),
        km_start: Number(km_start),
        observations,
        reason,
        km_traveled: Number(km_traveled),
        vehicle_id: vehicleSelected.id,
        conductor_id: user.id,
        date,
      };

      api.post('/kilometers', formatData).then(response => {
        setNewRegister(response.data.id);
        handleUpdateNewKm(response.data.id);
      });
    },
    [vehicleSelected.id, user.id, handleUpdateNewKm],
  );

  const handleEditKilometer = useCallback(
    async (data: Omit<IKilometers, 'e'>) => {
      const { km_end, km_start, observations, reason, km_traveled, id } = data;

      const formatData = {
        km_end: Number(km_end),
        km_start: Number(km_start),
        observations,
        reason,
        km_traveled: Number(km_traveled),
        vehicle_id: vehicleSelected.id,
        access_id: user.id,
      };
      console.log('km editado', formatData);
      try {
        api.put(`/kilometers?id=${id}`, formatData).then(response => {
          setNewRegister(response.data.id);
          apllyToast('success', 'Sucesso ao editar quilometragem!');
        });
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao editar quilometragem!');
      }
    },
    [vehicleSelected, user.id],
  );

  return (
    <Box>
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="md" fontWeight="normal">
            Quilometragem
          </Heading>

          <Box>
            {/* <Tooltip hasArrow label="Filtro">
              <Button
                size="sm"
                mr="2"
                colorScheme="blue"
                fontWeight="medium"
                onClick={onToggle}
              >
                <Icon as={RiFilter2Line} fontSize="20" />
              </Button>
            </Tooltip> */}

            <ModalAddNewKilometer
              km_initial={vehicleSelected.km || 0}
              handleAddNewKilometer={handleAddNewKilometer}
            />
          </Box>
        </Flex>
        <FilterCollapse isOpen={isOpen} />

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={['2', '4', '6']} color="gray.300" width="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Data</Th>
              {isWideVersion && <Th>KM Inicial</Th>}
              {isWideVersion && <Th>KM Final</Th>}
              <Th>KM Percorrido</Th>
              {isWideVersion && <Th>Destino</Th>}
              {isWideVersion && <Th>Motivo</Th>}

              <Th width="8" />
            </Tr>
          </Thead>

          <Tbody>
            {dataTable?.kilometer.map(data => (
              <Tr key={data.id}>
                <Td px={['2', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>

                <Td>
                  <Box>
                    <Text fontWeight="medium">
                      {handleFormatDate(data.date)}
                    </Text>
                    <Text fontSize="sm" color="gray.300">
                      {handleFormatHours(data.created_at)}
                    </Text>
                  </Box>
                </Td>

                {isWideVersion && <Td>{data.km_start} km</Td>}
                {isWideVersion && <Td>{data.km_end} km</Td>}
                <Td>{data.km_traveled} km</Td>
                {isWideVersion && <Td>{data.observations}</Td>}
                {isWideVersion && <Td>{data.reason}</Td>}

                <Td>
                  {isWideVersion ? (
                    <ModalEditNewKilometer
                      id_kilometer={data.id}
                      handleEditKilometer={handleEditKilometer}
                    />
                  ) : (
                    ''
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Pagination />
      </Box>
    </Box>
  );
}
