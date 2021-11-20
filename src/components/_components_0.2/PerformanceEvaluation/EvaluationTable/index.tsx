/* eslint-disable @typescript-eslint/no-empty-function */
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
  Tooltip,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiPrinterLine, RiEyeLine, RiSurveyLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import { api } from '../../../../services/api';

interface DataTable {
  id: string;
  leader: string;
  subordinate: string;
}

export function EvaluationTable() {
  const { user } = useAuth();
  const [dataTable, setDataTable] = useState<DataTable[]>();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    api.get(`/hierarchies/show?leader=${user.nickname}`).then(response => {
      setDataTable(response.data);
    });
  }, [user.nickname]);

  return (
    <Box w="100%">
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="md" fontWeight="normal">
            Lista de avaliações
          </Heading>
        </Flex>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={['2', '4', '6']} color="gray.300" width="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Nome</Th>
              {isWideVersion && <Th>Data avaliação</Th>}
              {isWideVersion && <Th>Status</Th>}
              <Th>Resultado</Th>

              {isWideVersion && <Th />}
              {isWideVersion && <Th />}

              <Th width="8" />
            </Tr>
          </Thead>

          <Tbody>
            {dataTable?.map(data => (
              <Tr>
                <Td px={['2', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>

                <Td>{data.subordinate}</Td>

                {isWideVersion && (
                  <Td>
                    <Text>01/12/2021</Text>
                  </Td>
                )}

                {isWideVersion && (
                  <Td>
                    <Badge colorScheme="red">Não Avaliado</Badge>
                  </Td>
                )}
                <Td>78</Td>
                {isWideVersion && (
                  <Td>
                    <Tooltip hasArrow label="Visualizar">
                      <Button
                        colorScheme="yellow"
                        as={Link}
                        to={`/management-ppr/performance-evaluation/${data.subordinate}`}
                        size="sm"
                      >
                        <Icon as={RiEyeLine} fontSize="20" />
                      </Button>
                    </Tooltip>
                  </Td>
                )}
                {isWideVersion && (
                  <Td>
                    <Tooltip hasArrow label="Imprimir">
                      <Button colorScheme="yellow" as={Link} to="/" size="sm">
                        <Icon as={RiPrinterLine} fontSize="20" />
                      </Button>
                    </Tooltip>
                  </Td>
                )}

                <Td>
                  {isWideVersion ? (
                    <Tooltip hasArrow label="Avaliar">
                      <Button
                        colorScheme="yellow"
                        as={Link}
                        to={`/management-ppr/evaluation-resume/${data.subordinate}/${data.id}`}
                        size="sm"
                      >
                        <Icon as={RiSurveyLine} fontSize="20" />
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
      </Box>
    </Box>
  );
}
