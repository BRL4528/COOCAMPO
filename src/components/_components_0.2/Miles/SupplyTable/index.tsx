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

import { RiAttachmentLine, RiDraftLine } from 'react-icons/ri';
import { FilterCollapse } from '../Filter';
import { ModalAddNewSupply } from '../../Modal/ModalAddNewSupply/indext';
import { ModalEditNewSupply } from '../../Modal/ModalEditNewSupply';
import { ModalVisualizeImage } from '../../Modal/ModalVisualizeImage/index';
import { apllyToast } from '../../../Global/Toast2.0';
import { Pagination } from '../../Pagination';

import { useAuth } from '../../../../hooks/auth';
import { api } from '../../../../services/api';

interface IKilometersTableProps {
  vehicleSelected: {
    id: string;
    km: number;
  };
}

interface ISupply {
  id?: string;
  date: string;
  type: string;
  quantity: number;
  amount_total: number;
  km_odometer: number;
  observation: string;
}

interface IGetSupply {
  supplies: [
    {
      id: string;
      date: string;
      type: string;
      quantity: string;
      amount_total: string;
      km_odometer: string;
      conductor: string;
      observation: string;
      file: boolean;
      file_url: string;
      vehicle_id: string;
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

interface SupplyAdded {
  id: string;
}

interface Supply {
  supplies: [
    {
      id: string;
      date: string;
      type: string;
      quantity: string;
      amount_total: string;
      km_odometer: string;
      conductor: string;
      observation: string;
      file: boolean;
      file_url: string;
      vehicle_id: string;
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

export function SupplyTable({ vehicleSelected }: IKilometersTableProps) {
  const { user } = useAuth();
  const { isOpen } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [dataTable, setDataTable] = useState<Supply>();
  const [addedSupply, setSupplyAdded] = useState<SupplyAdded>();
  const [idSupplySelectedChange, setIdSupplySelectedChange] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);
  const [open, setOpen] = useState('');
  const [updateTable, setUpdateTable] = useState<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (vehicleSelected.id !== '') {
      try {
        setLoadingTable(true);
        api
          .get<IGetSupply>(`/supplies/filter`, {
            params: {
              conductor_id: user.id,
              vehicle_id: vehicleSelected.id,
              take: 6,
              page,
            },
          })
          .then(response => {
            setDataTable(response.data);
            setLoadingTable(false);
          });
      } catch (err) {
        console.log(err);
        apllyToast('error', 'Problemas ao carregar abastecimento');
      }
    }
  }, [
    addedSupply,
    idSupplySelectedChange,
    page,
    updateTable,
    user.id,
    vehicleSelected,
  ]);

  const handleAddNewSupply = useCallback(
    async (data: Omit<ISupply, 'supply'>) => {
      try {
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
          conductor_id: user.id,
        };
        await api.post('/supplies', formatData).then(response => {
          setSupplyAdded(response.data.id);
          apllyToast('success', 'Sucesso ao adicionar abastecimento');
        });
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao adicionar abastecimento');
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
            .patch(`/supplies/upload/file?id=${e.target.id}`, data)
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

  const handleEditSupply = useCallback(
    async (data: Omit<ISupply, 'e'>) => {
      const {
        amount_total,
        date,
        km_odometer,
        observation,
        quantity,
        type,
        id,
      } = data;

      const formatData = {
        amount_total,
        date,
        km_odometer,
        observation,
        quantity,
        type,
        vehicle_id: vehicleSelected.id,
        access_id: user.id,
      };

      try {
        await api.put(`/supplies?id=${id}`, formatData).then(response => {
          setSupplyAdded(response.data.id);
          apllyToast('success', 'Sucesso ao editar abastecimento!');
        });
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao editar abastecimento!');
      }
    },
    [vehicleSelected, user.id],
  );

  return (
    <Box>
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mg="8" justify="space-between" align="center">
          <Flex>
            <Heading size="md" fontWeight="normal">
              Abastecimento
            </Heading>
            <Text color="gray.400" fontSize="xs" ml="2" mt="1">
              (total de registro: {dataTable?.pagination.total})
            </Text>
          </Flex>

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

            <ModalAddNewSupply
              handleAddNewSupply={handleAddNewSupply}
              vehicleSelected={vehicleSelected.id}
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
            {dataTable && dataTable?.supplies.length <= 0 ? (
              <ScaleFade initialScale={0.9} in>
                <Center>
                  <Flex flexDirection="row">
                    <Icon as={RiDraftLine} fontSize="20" mr="2" />
                    <Text>Sem resgistro para este veiculo</Text>
                  </Flex>
                </Center>
              </ScaleFade>
            ) : (
              <>
                <ScaleFade initialScale={0.9} in>
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
                      {dataTable?.supplies.map(data => (
                        <>
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

                            {isWideVersion && <Td>{data.type}</Td>}
                            {isWideVersion && <Td>{data.quantity}</Td>}
                            <Td>{data.amount_total}</Td>
                            {isWideVersion && <Td>{data.km_odometer}</Td>}
                            {isWideVersion && <Td>{data.observation}</Td>}
                            {/* {isWideVersion && ( */}
                            <Td>
                              {data.file ? (
                                <Tooltip
                                  hasArrow
                                  label="Visualizar comprovante"
                                >
                                  <Box>
                                    <Button
                                      onClick={() => handleOpenImage(data.id)}
                                      // onContextMenu={() =>
                                      //   console.log('teste')
                                      // }
                                      size="sm"
                                      fontSize="sm"
                                      bg="green.500"
                                    >
                                      <Icon
                                        as={RiAttachmentLine}
                                        fontSize="20"
                                      />
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
                                      <Icon
                                        as={RiAttachmentLine}
                                        fontSize="20"
                                      />
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
                            {/* )} */}

                            {isWideVersion && (
                              <Td>
                                <ModalEditNewSupply
                                  id_supply={data.id}
                                  handleEditSupply={handleEditSupply}
                                />
                              </Td>
                            )}
                          </Tr>
                        </>
                      ))}
                    </Tbody>
                  </Table>
                </ScaleFade>
                <Pagination
                  totalCountOfRegisters={dataTable?.pagination.total || 0}
                  currentPage={page}
                  onPageChange={setPage}
                  registersPerPage={dataTable?.pagination.take || 0}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
