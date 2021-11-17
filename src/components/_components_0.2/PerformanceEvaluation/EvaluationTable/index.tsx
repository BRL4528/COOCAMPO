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
import { RiFilter2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Pagination } from '../../Miles/Pagination';

export function EvaluationTable() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="md" fontWeight="normal">
            Lista de avaliações
          </Heading>

          <Box>
            <Tooltip hasArrow label="Filtro">
              <Button
                size="sm"
                mr="2"
                colorScheme="blue"
                fontWeight="medium"
                onClick={() => {}}
              >
                <Icon as={RiFilter2Line} fontSize="20" />
              </Button>
            </Tooltip>
          </Box>
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
            <Tr>
              <Td px={['2', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>

              <Td>Bruno luiz</Td>

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
              {isWideVersion && <Td>Visualizar</Td>}
              {isWideVersion && <Td>Imprimir</Td>}

              <Td>
                {isWideVersion ? (
                  <Link to="/management-ppr/evaluation-resume">Avaliar</Link>
                ) : (
                  ''
                )}
              </Td>
            </Tr>
            <Tr>
              <Td px={['2', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>

              <Td>Bruno luiz</Td>

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
              {isWideVersion && <Td>Visualizar</Td>}
              {isWideVersion && <Td>Imprimir</Td>}

              <Td>
                {isWideVersion ? (
                  <Link to="/management-ppr/evaluation-resume">Avaliar</Link>
                ) : (
                  ''
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Pagination />
      </Box>
    </Box>
  );
}
