/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-newline */
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
  useBreakpointValue,
  Tooltip,
  Badge,
  Collapse,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import { RiPrinterLine, RiEyeLine, RiSurveyLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { setTimeout } from 'timers';
import { useAuth } from '../../../../hooks/auth';
import { api } from '../../../../services/api';
import { ModalComponent } from '../../Modal';

interface DataTable {
  id: string;
  leader: string;
  subordinate: string;
  status: boolean;
  result: string;
  percentage: number;
  file_url: string;
  file: string;
}

export function EvaluationTable() {
  const { user } = useAuth();
  const [dataTable, setDataTable] = useState<DataTable[]>([]);
  const [urlFileUser, setUrlFileUser] = useState<string[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    api.get(`/hierarchies/show?leader=${user.nickname}`).then(response => {
      setDataTable(response.data);
    });
  }, [user.nickname]);

  const handleSelectedUrlFile = useCallback(
    data => {
      const alreadySelected = urlFileUser.findIndex(item => item === data);

      if (alreadySelected >= 0) {
        const filteredItems = urlFileUser.filter(item => item !== data);

        setUrlFileUser(filteredItems);
      } else {
        setUrlFileUser([...urlFileUser, data]);
      }
    },
    [urlFileUser],
  );

  const handlePrintEvaluations = useCallback(() => {
    setOpenAlert(true);
    setMessageAlert('Trabalhando nos arquivos...');
    setTimeout(() => {
      urlFileUser.forEach(async data => {
        await window.open(data);
      });
      setOpenAlert(false);
    }, 3000);
  }, [urlFileUser]);

  function handleClose() {
    setOpenAlert(!openAlert);
  }

  return (
    <Box w="100%">
      <Box flex="1" borderRadius={8} bg="gray.800" p={['4', '8']}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="md" fontWeight="normal">
            Lista de avaliações
          </Heading>

          <Collapse in={urlFileUser.length > 0} animateOpacity>
            <Box>
              <Tooltip hasArrow label="Imprimir avaliação">
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={handlePrintEvaluations}
                >
                  <Icon as={RiPrinterLine} fontSize="20" />
                </Button>
              </Tooltip>
            </Box>
          </Collapse>
        </Flex>

        <ModalComponent
          title="Atenção"
          isOpen={openAlert}
          onClose={handleClose}
        >
          <Box p="15">{messageAlert}</Box>
        </ModalComponent>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              {isWideVersion && (
                <Th px={['2', '4', '6']} color="gray.300" width="8"></Th>
              )}
              <Th>Nome</Th>

              {isWideVersion && <Th>Status</Th>}
              <Th>Resultado</Th>

              {isWideVersion && <Th>Visualizar</Th>}

              <Th width="8">Avaliar</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dataTable?.map(data => (
              <Tr key={data.id}>
                {isWideVersion && (
                  <Td px={['2', '4', '6']}>
                    {data.file ? (
                      <Checkbox
                        colorScheme="blue"
                        onChange={() => handleSelectedUrlFile(data.file_url)}
                      />
                    ) : (
                      ''
                    )}
                  </Td>
                )}

                <Td>{data.subordinate}</Td>

                {isWideVersion && (
                  <Td>
                    {data.status ? (
                      <Badge colorScheme="green">Avaliado</Badge>
                    ) : (
                      <Badge colorScheme="red">Não Avaliado</Badge>
                    )}
                  </Td>
                )}
                <Td>
                  {data.status ? `${Number(data.percentage) / 10}%` : '-'}
                </Td>
                {isWideVersion && (
                  <Td>
                    <Tooltip
                      hasArrow
                      label={data.status ? 'Visualizar' : 'Não avaliado'}
                    >
                      <Button
                        disabled={!data.status}
                        colorScheme="yellow"
                        as={data.status ? Link : Button}
                        to={`/management-ppr/performance-evaluation/${data.subordinate}`}
                        size="sm"
                      >
                        <Icon as={RiEyeLine} fontSize="20" />
                      </Button>
                    </Tooltip>
                  </Td>
                )}

                {isWideVersion ? (
                  <Td>
                    {data.status ? (
                      <Tooltip hasArrow label="Avaliar">
                        <Button colorScheme="yellow" disabled size="sm">
                          <Icon as={RiSurveyLine} fontSize="20" />
                        </Button>
                      </Tooltip>
                    ) : (
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
                    )}
                  </Td>
                ) : (
                  ''
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
