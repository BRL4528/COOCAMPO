import { useCallback, useState, useEffect, ChangeEvent } from 'react';
// eslint-disable-next-line import/no-duplicates
import { differenceInSeconds, format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
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
  Badge,
  Spinner,
  Center,
  ScaleFade,
} from '@chakra-ui/react';

import { RiAttachmentLine, RiFilter2Line, RiDraftLine } from 'react-icons/ri';
import { FilterCollapse } from '../Filter';
import { ModalAddNewMaintenance } from '../../Modal/ModalAddNewMaintenance';
import { ModalVisualizeImage } from '../../Modal/ModalVisualizeImage/index';
import { ModalEditNewMaintenance } from '../../Modal/ModalEditNewMaintenance';
import { apllyToast } from '../../../Global/Toast2.0';

import { useAuth } from '../../../../hooks/auth';
import { api } from '../../../../services/api';

interface IvehicleSelected {
  vehicleSelected: {
    id: string;
    km: number;
  };
}

interface IMaintenance {
  id?: string;
  date: string;
  type: string;
  amount_total: number;
  km: number;
  description: string;
  reason: string;
}

interface IGetMaintenance {
  id: string;
  date: string;
  type: string;
  amount_total: string;
  km: string;
  conductor: string;
  description: string;
  file: boolean;
  file_url: string;
  vehicle_id: string;
  created_at: string;
}

interface SupplyAdded {
  id: string;
}

export function MaintenanceTable({ vehicleSelected }: IvehicleSelected) {
  const { user } = useAuth();
  const { onToggle, isOpen } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [dataTable, setDataTable] = useState<IGetMaintenance[]>([]);
  const [addedMaintenance, setMaintenanceAdded] = useState<SupplyAdded>();
  const [idSupplySelectedChange, setIdSupplySelectedChange] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  const [open, setOpen] = useState('');
  const [updateTable, setUpdateTable] = useState<string>('');

  useEffect(() => {
    async function getApi() {
      try {
        if (vehicleSelected.id !== '') {
          setLoadingTable(true);
          await api
            .get<IGetMaintenance[]>(
              `/maintenance/show?vehicle_id=${vehicleSelected.id}`,
            )
            .then(response => {
              setDataTable(response.data);
              setLoadingTable(false);
            });
        }
      } catch (err) {
        console.log(err);
        apllyToast('error', 'Problemas ao carregar informações de manutenção@');
        setLoadingTable(false);
      }
    }
    getApi();
  }, [addedMaintenance, idSupplySelectedChange, updateTable, vehicleSelected]);

  const handleEditAddNewMaintenance = useCallback(
    async (data: Omit<IMaintenance, 'e'>) => {
      const { amount_total, date, km, reason, type, description, id } = data;
      const fomatData = {
        amount_total,
        date,
        km,
        reason,
        type,
        vehicle_id: vehicleSelected.id,
        conductor_id: user.id,
        description,
      };
      console.log('data', data);

      api.put(`/maintenance?id=${id}`, fomatData).then(response => {
        setMaintenanceAdded(response.data.id);
      });
    },
    [user.id, vehicleSelected.id],
  );

  const handleAddNewMaintenance = useCallback(
    async (data: Omit<IMaintenance, 'maintenance'>) => {
      try {
        const { date, type, amount_total, km, description, reason } = data;

        const formatData = {
          date,
          type,
          amount_total,
          km,
          description,
          reason,
          vehicle_id: vehicleSelected.id,
          conductor: user.id,
        };
        await api.post('/maintenance', formatData).then(response => {
          setMaintenanceAdded(response.data.id);
          apllyToast('success', 'Manutenção adicionada com sucesso!');
        });
      } catch (err) {
        console.log(err);
        apllyToast('error', 'Problemas ao adicionar nova manutenção!');
      }
    },
    [user.id, vehicleSelected.id],
  );

  const handleVerifyDateIsNew = useCallback(date => {
    if (differenceInSeconds(new Date(), new Date(date)) < 600) {
      return true;
    }
    return false;
  }, []);

  const handleReceiptChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setLoading(true);
        setLoadingId(e.target.id);
        if (e.target.files) {
          const data = new FormData();

          data.append('file', e.target.files[0]);
          await api
            .patch(`/maintenance/upload/file?id=${e.target.id}`, data)
            .then(response => {
              setIdSupplySelectedChange(response.data);
              apllyToast('success', 'Comprovante adicionado');
              setLoading(false);
              setLoadingId('');
            });
        }
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao adicionar comprovante');
        setLoading(false);
        setLoadingId('');
      }
    },
    [],
  );

  const handleOpenImage = useCallback(id => {
    setOpen(id);
  }, []);
  const handleCloseImage = useCallback(() => {
    setOpen('');
  }, []);
  const hadleUpdateTable = useCallback(file => {
    setUpdateTable(file);
  }, []);

  return (
    <Box>
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mg="8" justify="space-between" align="center">
          <Flex>
            <Heading size="md" fontWeight="normal">
              Manutenções
            </Heading>
            <Text color="gray.400" fontSize="xs" ml="2" mt="1">
              (total de registro: {dataTable.length})
            </Text>
          </Flex>

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

            <ModalAddNewMaintenance
              handleAddNewMaintenance={handleAddNewMaintenance}
            />
          </Box>
        </Flex>

        <FilterCollapse isOpen={isOpen} />
        {loadingTable ? (
          <ScaleFade initialScale={0.9} in>
            <Center>
              <Spinner size="sm" />
            </Center>
          </ScaleFade>
        ) : (
          <>
            {dataTable.length <= 0 ? (
              <ScaleFade initialScale={0.9} in>
                <Center>
                  <Flex flexDirection="row">
                    <Icon as={RiDraftLine} fontSize="20" mr="2" />
                    <Text>Sem resgistro para este veiculo</Text>
                  </Flex>
                </Center>
              </ScaleFade>
            ) : (
              <ScaleFade initialScale={0.9} in>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={['2', '4', '6']} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>

                      <Th>Data</Th>
                      {isWideVersion && <Th>KM Odômetro</Th>}
                      <Th>Valor Total</Th>
                      {isWideVersion && <Th>Tipo</Th>}
                      {isWideVersion && <Th>Descrição da manutenção</Th>}
                      {isWideVersion && <Th>Anexo</Th>}

                      {isWideVersion && <Th width="8">Editar</Th>}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {dataTable.map(data => (
                      <Tr key={data.id}>
                        <Td px={['2', '4', '6']}>
                          <Box mb="2">
                            {handleVerifyDateIsNew(data.created_at) ? (
                              <Badge colorScheme="green">Novo</Badge>
                            ) : (
                              ''
                            )}
                          </Box>
                          <Checkbox colorScheme="pink" />
                        </Td>

                        <Td>
                          <Box>
                            <Text fontWeight="medium">
                              {format(new Date(data.date), "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </Text>
                          </Box>
                        </Td>

                        <Td>{data.km}</Td>
                        {isWideVersion && <Td>{data.amount_total}</Td>}
                        {isWideVersion && <Td>{data.type}</Td>}

                        {isWideVersion && <Td>{data.description}</Td>}
                        {isWideVersion && (
                          <Td>
                            {data.file ? (
                              <Tooltip hasArrow label="Visualizar comprovante">
                                <Box>
                                  <Button
                                    onClick={() => handleOpenImage(data.id)}
                                    onContextMenu={() => console.log('teste')}
                                    size="sm"
                                    fontSize="sm"
                                    bg="green.500"
                                  >
                                    <Icon as={RiAttachmentLine} fontSize="20" />
                                    <ModalVisualizeImage
                                      url={data.file_url}
                                      open={open === data.id}
                                      handleCloseImage={handleCloseImage}
                                      idSupply={data.id}
                                      hadleUpdateTable={hadleUpdateTable}
                                    />
                                  </Button>
                                </Box>
                              </Tooltip>
                            ) : (
                              <Tooltip hasArrow label="Adicionar comprovante">
                                <Box
                                  as="label"
                                  px="3"
                                  py="1.5"
                                  borderRadius="6"
                                  htmlFor={data.id}
                                  bg="tomato"
                                  cursor="pointer"
                                >
                                  {loading && loadingId === data.id ? (
                                    <Spinner size="sm" />
                                  ) : (
                                    <Icon as={RiAttachmentLine} fontSize="20" />
                                  )}
                                  <Box
                                    display="none"
                                    as="input"
                                    type="file"
                                    id={data.id}
                                    onChange={handleReceiptChange}
                                  />
                                </Box>
                              </Tooltip>
                            )}
                          </Td>
                        )}

                        <Td>
                          {isWideVersion ? (
                            <ModalEditNewMaintenance
                              id_maintenance={data.id}
                              handleEditAddNewMaintenance={
                                handleEditAddNewMaintenance
                              }
                            />
                          ) : (
                            ''
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </ScaleFade>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
