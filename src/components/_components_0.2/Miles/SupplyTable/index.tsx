import { useCallback } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Button,
  Tooltip,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { RiPencilLine, RiAttachmentLine, RiFilter2Line } from 'react-icons/ri';
import { api } from '../../../../services/api';
import { FilterCollapse } from '../Filter';
import { ModalAddNewSupply } from '../../Modal/ModalAddNewSupply/indext';

interface IKilometersTableProps {
  vehicleSelected: {
    id: string;
    km: number;
  };
}

interface ISupply {
  date: string;
  type: string;
  quantity: number;
  amount_total: number;
  km_odometer: number;
  observation: string;
}

export function SupplyTable({ vehicleSelected }: IKilometersTableProps) {
  const { onToggle, isOpen } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleAddNewSupply = useCallback(
    async (data: Omit<ISupply, 'supply'>) => {
      const { date, type, quantity, amount_total, km_odometer, observation } =
        data;

      const formatData = {
        date,
        type,
        quantity,
        amount_total,
        km_odometer,
        observation,
        vehicle_id: vehicleSelected.id,
      };
      console.log('resultado formulario', formatData);
      // api.post('/supplies', formatData).then(response => {
      //   console.log('resposta de supplies', response);
      // });
    },
    [vehicleSelected.id],
  );

  return (
    <Box>
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mg="8" justify="space-between" align="center">
          <Heading size="md" fontWeight="normal">
            Abastecimento
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

            <ModalAddNewSupply handleAddNewSupply={handleAddNewSupply} />
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
              {isWideVersion && <Th>Tipo do Combustível</Th>}
              {isWideVersion && <Th>Quantidade</Th>}
              <Th>Valor Total</Th>
              {isWideVersion && <Th>KM Odômetro</Th>}
              {isWideVersion && <Th>Observações</Th>}
              {isWideVersion && <Th>Anexo</Th>}

              {isWideVersion && <Th width="8">Editar</Th>}
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td px={['2', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>

              <Td>
                <Box>
                  <Text fontWeight="medium">31/07/2022</Text>
                </Box>
              </Td>

              {isWideVersion && <Td>Gasolina</Td>}
              <Td>120</Td>
              {isWideVersion && <Td>R$ 3244</Td>}
              {isWideVersion && <Td>3244</Td>}
              {isWideVersion && <Td>Precisei abastecer entes do previsto</Td>}
              {isWideVersion && (
                <Td>
                  <Tooltip hasArrow label="Anexo">
                    <Button
                      size="sm"
                      fontSize="sm"
                      bg="gray.600"
                      variant="ghost"
                    >
                      <Icon as={RiAttachmentLine} fontSize="20" />
                    </Button>
                  </Tooltip>
                </Td>
              )}

              {isWideVersion && (
                <Td>
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
                </Td>
              )}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
