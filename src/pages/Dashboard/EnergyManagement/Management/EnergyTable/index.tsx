import { useEffect, useState, useCallback } from 'react';
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
  TableContainer,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { apllyToast } from '../../../../../components/Global/Toast2.0';
import { HeaderUp } from '../../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../../components/_components_0.2/Sidebar_0.2';
import { api } from '../../../../../services/api';
import { Pagination } from '../../../../../components/_components_0.2/Pagination';

import { Container } from './styles';
import { ModalAddNewEnergy } from '../../../../../components/_components_0.2/Modal/ModalAddNewEnergy';
import { ModalEditNewEnergy } from '../../../../../components/_components_0.2/Modal/ModalEditNewEnergy';

interface EnergyConsumption {
  energyConsumption: [
    {
      id: string;
      month: string;
      year: number;
      reading_date: string;
      reading_tip: number;
      reading_outside_tip: number;
      days: number;
      consumption: number;
      consumption_tip: number;
      consumption_outside_tip: number;
      consumption_reactive_tip: number;
      consumption_reactive_outside_tip: number;
      demand_measure_tip: number;
      demand_contracted_tip: number;
      demand_billed_tip: number;
      demand_surplus_tip: number;
      factor_power_tip: number;
      factor_power_outside_tip: number;
      unity: string;
      cost_center: string;
      cost_in_reals: string;
      unity_cost_center: string;
    },
  ];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}
interface IEnergy {
  id: string;
  month: string;
  year: number;
  reading_date: string;
  reading_tip: number;
  reading_outside_tip: number;
  days: number;
  consumption: number;
  consumption_tip: number;
  consumption_outside_tip: number;
  consumption_reactive_tip: number;
  consumption_reactive_outside_tip: number;
  demand_measure_tip: number;
  demand_contracted_tip: number;
  demand_billed_tip: number;
  demand_surplus_tip: number;
  factor_power_tip: number;
  factor_power_outside_tip: number;
  unity: string;
  cost_center: string;
  cost_in_reals: string;
  unity_cost_center: string;
}

export default function EnergyTable() {
  const [dataEnergy, setdataEnergy] = useState<EnergyConsumption>();
  const [page, setPage] = useState(1);
  const [newRegister, setNewRegister] = useState<string>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      api
        .get('/energy-consumption', {
          params: {
            take: 7,
            page,
          },
        })
        .then(response => {
          setdataEnergy(response.data);
        });
    } catch (err) {
      console.log(err);
      apllyToast('error', 'Problemas ao carregar informações');
    }
  }, [page, newRegister]);

  const handleAddNewEnergy = useCallback(async (data: Omit<IEnergy, 'e'>) => {
    try {
      api.post('/energy-consumption', data).then(response => {
        setNewRegister(response.data.id);
        const addresFormated = {
          name: 'bot',
          address: 'bruno.carvalho@cooasgo.com.br',
        };

        const bodyEmail = {
          leader: true,
          conductor: '',
          link: 'https://cooasgo.samasc.com.br/miles/schedule',
          subject: `Atualização relatório de energia`,
          to: addresFormated,
        };
        api.post('/send-email-appointment', bodyEmail);

        apllyToast('success', 'Sucesso ao adicionar custo!');
      });
    } catch (err) {
      console.log(err);
      apllyToast('warning', 'Problemas ao adicionar custo');
    }
  }, []);
  const handleEditNewEnergy = useCallback(
    async (data: Omit<IEnergy, 'e'>) => {
      try {
        api
          .put(`/energy-consumption?id=${selectedItems[0]}`, data)
          .then(response => {
            setNewRegister(response.data.id);
            setSelectedItems([]);
            apllyToast('success', 'Sucesso ao atualizar custo!');
          });
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao atualiza custo');
      }
    },
    [selectedItems],
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedItems.findIndex(item => item === id);

      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== id);

        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([id]);
      }
    },
    [selectedItems],
  );
  return (
    <Container>
      <HeaderUp path="bi" />
      <Sidebar path="bi" />
      <Center>
        <ScaleFade initialScale={0.9} in>
          {/* <Flex alignItens="center"> */}

          {/* </Flex> */}
          <TableContainer>
            <Box
              maxWidth="1200px"
              // maxHeight="450px"
              flex="1"
              borderRadius={8}
              bg="gray.800"
              p={['4', '8']}
              overflowX="auto"
            >
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="md" fontWeight="normal">
                  Dados de energia
                </Heading>

                <Flex>
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
                  <ModalEditNewEnergy
                    disabled={!(selectedItems.length > 0)}
                    handleEditNewEnergy={handleEditNewEnergy}
                    idEnergy={selectedItems[0]}
                  />
                  <ModalAddNewEnergy handleAddNewEnergy={handleAddNewEnergy} />
                </Flex>
              </Flex>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    {/* <Th px={['2', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="blue" />
                    </Th> */}
                    <Th />
                    <Th>Mês</Th>
                    <Th>Ano</Th>
                    <Th>Data de leitura</Th>
                    <Th>Leitura ponta</Th>
                    <Th>Leitura fora ponta</Th>
                    <Th>Dias</Th>
                    <Th>Consumo</Th>
                    <Th>Consumo ponta</Th>
                    <Th>Consumo fora ponta</Th>
                    <Th>Consumo reativo ponta</Th>
                    <Th>Consumo reativo fora ponta</Th>

                    <Th>Demanda Medida Ponta</Th>
                    <Th>Demanda contratada ponta</Th>
                    <Th>Demanda Faturada Ponta</Th>
                    <Th>Demanda excedente ponta</Th>
                    <Th>Fator potência ponta</Th>
                    <Th>Fator potência fora ponta</Th>
                    <Th>Unidade</Th>
                    <Th>Centro de custo</Th>
                    <Th>Custo em R$</Th>
                    <Th>unidade+centro de custo</Th>

                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {dataEnergy?.energyConsumption.map(energy => (
                    <Tr key={energy.id}>
                      <Td px={['2', '4', '6']}>
                        <Checkbox
                          colorScheme="blue"
                          isChecked={selectedItems.includes(energy.id)}
                          onChange={() => handleSelectItem(energy.id)}
                        />
                      </Td>

                      <Td>{energy.month}</Td>
                      <Td>{energy.year}</Td>
                      <Td>{energy.reading_date}</Td>
                      <Td>{energy.reading_tip}</Td>
                      <Td>{energy.reading_outside_tip}</Td>

                      <Td>{energy.days}</Td>
                      <Td>{energy.consumption}</Td>
                      <Td>{energy.consumption_tip}</Td>
                      <Td>{energy.consumption_outside_tip}</Td>
                      <Td>{energy.consumption_reactive_tip}</Td>
                      <Td>{energy.consumption_reactive_outside_tip}</Td>
                      <Td>{energy.demand_measure_tip}</Td>
                      <Td>{energy.demand_contracted_tip}</Td>
                      <Td>{energy.demand_billed_tip}</Td>
                      <Td>{energy.demand_surplus_tip}</Td>
                      <Td>{energy.factor_power_tip}</Td>
                      <Td>{energy.factor_power_outside_tip}</Td>
                      <Td>{energy.unity}</Td>
                      <Td>{energy.cost_center}</Td>
                      <Td>{energy.cost_in_reals}</Td>
                      <Td>{energy.unity_cost_center}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TableContainer>
          <Pagination
            totalCountOfRegisters={dataEnergy?.pagination.total || 0}
            currentPage={page}
            onPageChange={setPage}
            registersPerPage={dataEnergy?.pagination.take || 0}
          />
        </ScaleFade>
      </Center>
    </Container>
  );
}
