import {
  Center,
  ScaleFade,
  Table,
  Tr,
  Thead,
  Th,
  Tbody,
  Checkbox,
  Td,
  Box,
  Text,
} from '@chakra-ui/react';
import { HeaderUp } from '../../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../../components/_components_0.2/Sidebar_0.2';

export default function EnergyTable() {
  return (
    <>
      <HeaderUp path="bi" />
      <Sidebar path="bi" />
      <Center h="60vh">
        <ScaleFade initialScale={0.9} in>
          {/* <Flex alignItens="center"> */}

          {/* </Flex> */}
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['2', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Mês</Th>
                <Th>Ano</Th>
                <Th>Data de leitura</Th>
                <Th>Leitura ponta</Th>
                <Th>Leitura fora ponta</Th>
                <Th>Dias</Th>
                <Th>Consumo</Th>
                <Th>Consumo ponta</Th>
                <Th>Consumo fora ponta</Th>

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
                    <Text fontWeight="medium">teste1</Text>
                    <Text fontSize="sm" color="gray.300">
                      teste2
                    </Text>
                  </Box>
                </Td>

                <Td>teste03</Td>
                <Td>teste04</Td>
                <Td>teste05</Td>
                <Td>teste06</Td>
                <Td>teste07</Td>
              </Tr>
            </Tbody>
          </Table>
        </ScaleFade>
      </Center>
    </>
  );
}
