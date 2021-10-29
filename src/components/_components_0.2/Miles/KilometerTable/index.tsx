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
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { Pagination } from '../Pagination';

export function KilometerTable() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Box flex="1" borderRadius={8} bg="gray.800" p={['6', '8']}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários
          </Heading>

          <Link to="/users/create">
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
          </Link>
        </Flex>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={['2', '4', '6']} color="gray.300" width="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Usuários</Th>
              {isWideVersion && <Th>Data de cadastro</Th>}

              <Th width="8" />
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td px={['2', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>

              <Td>
                <Box>
                  <Text fontWeight="bold">Bruno Luiz</Text>
                  <Text fontSize="sm" color="gray.300">
                    blgc.sgo@hotmail.com
                  </Text>
                </Box>
              </Td>

              {isWideVersion && <Td>04 de Abril, 2021</Td>}
              <Td>
                {isWideVersion ? (
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="20" />}
                  >
                    Editar
                  </Button>
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
