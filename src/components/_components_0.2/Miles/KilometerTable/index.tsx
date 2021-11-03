import { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine, RiFilter2Line } from 'react-icons/ri';

import { Pagination } from '../Pagination';
import { FilterCollapse } from '../Filter';
import { ModalAddNewKilometer } from '../../Modal/ModalAddNewKilometer';

import { useAuth } from '../../../../hooks/auth';

import { api } from '../../../../services/api';

interface IKilometersTableProps {
  vehicleSelected: string;
}

interface IKilometers {
  // vehicle_id?: string;
  // access_id?: string;
  kilometer: [
    {
      id: string;
      km_start: number;
      km_end: number;
      km_traveled: number;
      observations: string;
      reason: string;
      created_at: string;
    },
  ];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

export function KilometerTable({ vehicleSelected }: IKilometersTableProps) {
  const { user } = useAuth();
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const [dataTable, setDataTable] = useState<IKilometers>();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    // setLoading(true);
    api
      .get<IKilometers>(
        `/kilometers/filter?access_id=${user.id}&vehicle_id=${vehicleSelected}&take=6&page=1`,
      )
      .then(response => {
        setDataTable(response.data);
        // setLoading(false);
      });
  }, [user.id, vehicleSelected]);

  const handleFormatDate = useCallback((data: string) => {
    const dataFormadet = format(new Date(data), 'dd/MM/yyyy');
    return dataFormadet;
  }, []);

  const handleFormatHours = useCallback((hours: string) => {
    const dataFormadet = format(new Date(hours), 'HH:mm:ss');
    return dataFormadet;
  }, []);

  return (
    <Box>
      <ModalAddNewKilometer isOpen={isOpen} onClose={onClose} />
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="md" fontWeight="normal">
            Quilometragem
          </Heading>

          <Box>
            <Tooltip hasArrow label="Filtro">
              <Button
                size="sm"
                mr="2"
                colorScheme="blue"
                fontWeight="medium"
                onClick={onToggle}
              >
                <Icon as={RiFilter2Line} fontSize="20" />
              </Button>
            </Tooltip>

            <Button
              as="a"
              size="sm"
              colorScheme="blue"
              fontWeight="medium"
              onClick={onOpen}
            >
              <Icon as={RiAddLine} fontSize="20" />
              {isWideVersion && <Text>Adicionar novo KM</Text>}
            </Button>
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
              <Tr>
                <Td px={['2', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>

                <Td>
                  <Box>
                    <Text fontWeight="medium">
                      {handleFormatDate(data.created_at)}
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
                    <Tooltip hasArrow label="Editar">
                      <Button
                        size="sm"
                        fontSize="sm"
                        bg="gray.600"
                        variant="ghost"
                      >
                        <Icon as={RiPencilLine} fontSize="20" />
                      </Button>
                    </Tooltip>
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
