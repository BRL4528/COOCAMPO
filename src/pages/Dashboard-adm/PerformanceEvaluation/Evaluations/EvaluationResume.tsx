import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Button,
  ScaleFade,
  Icon,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { RiFileWarningLine } from 'react-icons/ri';
import { DrawerEvaluation } from '../../../../components/_components_0.2/Drawer/DrawerEvaluation';
import { useAuth } from '../../../../hooks/auth';
import { api } from '../../../../services/api';
import { apllyToast } from '../../../../components/Global/Toast2.0';

interface Evaluations {
  id: string;
  name: string;
  description: string;
  status: Boolean;
  performances: [
    {
      id: string;
      name: string;
      weight: string;
    },
  ];
}
interface ParamsRouter {
  name_subordinate: string;
  id_hierarchies: string;
}
interface DataSubordinate {
  name: string;
}

interface ResponseEvaluation {
  factor_id: string;
  performance_id: string;
  result: string;
  date: Date;
  subordinate: string;
  leader: string;
  // schooling: string;
}

interface ObservationsFactor {
  id_factor: string;
  observations: string;
}

const options = [
  { value: 'Fundamental Incompleto', label: 'Fundamental Incompleto' },
  { value: 'Fundamental', label: 'Fundamental' },
  { value: 'Médio Incompleto', label: 'Médio Incompleto' },
  { value: 'Médio', label: 'Médio' },
  { value: 'Superior Incompleto', label: 'Superior Incompleto' },
  { value: 'Superior', label: 'Superior' },
  { value: 'Pós-graduado', label: 'Pós-graduado' },
  { value: 'Mestrado', label: 'Mestrado' },
  { value: 'Doutorado', label: 'Doutorado' },
];

export default function EvaluationResume() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name_subordinate, id_hierarchies } = useParams<ParamsRouter>();
  const { user } = useAuth();
  const [dataEvaluation, setDataEvaluation] = useState<Evaluations[]>([]);
  const [dataSubordinate, setdataSubordinate] = useState<DataSubordinate>();
  const [arrayObservationsFactor, setArrayObservationsFactor] = useState<
    ObservationsFactor[]
  >([]);
  const [idFactor, setIdfactor] = useState('');

  const [schooling, setSchooling] = useState('');

  const [selectedItems, setSelectedItems] = useState<ResponseEvaluation[]>([]);

  useEffect(() => {
    api.get('/factors').then(response => {
      setDataEvaluation(response.data);
    });
    api.get(`/employees/${name_subordinate}`).then(response => {
      setdataSubordinate(response.data);
    });
  }, [name_subordinate]);

  function handleRadioSubmit(data: any) {
    const { factor_id, performance_id, result } = JSON.parse(data);
    const formatData = {
      factor_id,
      performance_id,
      result,
      date: new Date(),
      subordinate: name_subordinate,
      hierarchies_id: id_hierarchies,
      leader: user.nickname,
    };

    const alreadySelected = selectedItems.findIndex(
      item => item.factor_id === formatData.factor_id,
    );

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.splice(alreadySelected, 1);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, formatData]);
    }
  }

  const handleFinishEvaluation = useCallback(async () => {
    try {
      const formatedItem = selectedItems.map(item => {
        const filtered = arrayObservationsFactor.filter(obs => {
          return obs.id_factor === item.factor_id;
        });

        if (filtered.length > 0) {
          const formated = {
            ...item,
            observations: filtered[0].observations,
            schooling,
          };
          return formated;
        }
        const formatedSchooling = {
          ...item,
          schooling,
        };
        return formatedSchooling;
      });
      await api.post('/evaluations-results', formatedItem);
      setSchooling('');
      apllyToast('success', 'Sucesso ao finalizar avaliação!');
      history.push('/management-ppr/listOf-evaluation');
    } catch (err) {
      console.log('err', err);
      apllyToast('error', 'Erro ao finalizar avaliação!');
    }
  }, [arrayObservationsFactor, history, schooling, selectedItems]);

  const handleAddObservation = useCallback(
    id => {
      setIdfactor(id);
      onOpen();
    },
    [onOpen],
  );

  const handleSubmitObservationFactor = useCallback(
    observation => {
      const formatData = {
        id_factor: idFactor,
        observations: observation,
      };
      const alreadySelected = arrayObservationsFactor.findIndex(
        item => item.id_factor === idFactor,
      );
      if (alreadySelected >= 0) {
        const filteredItems = arrayObservationsFactor.filter(
          item => item.id_factor !== idFactor,
        );

        filteredItems.push(formatData);
        setArrayObservationsFactor(filteredItems);
      } else {
        setArrayObservationsFactor([...arrayObservationsFactor, formatData]);
      }

      setIdfactor('');
      onClose();
    },
    [arrayObservationsFactor, idFactor, onClose],
  );

  const filterObservationsAded = useCallback(
    id => {
      const filterred = arrayObservationsFactor.filter(item => {
        return item.id_factor === id;
      });

      const formated = {
        obsAded: filterred.length > 0,
        observation: filterred[0]?.observations,
      };

      return formated;
    },
    [arrayObservationsFactor],
  );

  const handleSelect = useCallback(e => {
    console.log('teste', e.target.value);
    setSchooling(e.target.value);
  }, []);

  return (
    <ScaleFade initialScale={0.9} in>
      <DrawerEvaluation
        isOpen={isOpen}
        onClose={onClose}
        idFactor={idFactor}
        arrayObservationsFactor={arrayObservationsFactor}
        handleSubmitObservationFactor={handleSubmitObservationFactor}
      />
      <Flex
        w="100%"
        my="6"
        maxWidth={1180}
        mx="auto"
        pb={4}
        px="6"
        flexDirection="column"
      >
        <Box
          p={['4', '8']}
          bg="rgb(255, 242, 1, 0.1)"
          borderRadius={8}
          w="100%"
          mt="80px"
          align="center"
        >
          <Text>Avaliação de desempenho</Text>
          <Text fontWeight="medium" fontSize="2xl">
            {dataSubordinate?.name}
          </Text>
        </Box>

        {dataEvaluation?.map(data => (
          <Box
            key={data.id}
            p={['4', '8']}
            bg="gray.800"
            borderRadius={8}
            w="100%"
            mt="8"
          >
            <Flex
              direction="row"
              borderBottom="1px"
              borderColor="gray.700"
              justifyContent="space-between"
            >
              <Box>
                <Text fontWeight="medium" fontSize="2xl">
                  {data.name}
                </Text>
                <Text color="gray.300" pb="2">
                  {data.description}
                </Text>
              </Box>
            </Flex>
            <RadioGroup mt="8" onChange={handleRadioSubmit}>
              {data.performances?.map(dataPerformance => (
                <Box>
                  <Radio
                    value={`{"factor_id":"${data.id}", "result":"${dataPerformance.weight}", "performance_id":"${dataPerformance.id}"}`}
                    m="5"
                    cursor="pointer"
                    key={dataPerformance.id}
                  >
                    {dataPerformance.name}
                  </Radio>
                </Box>
              ))}
            </RadioGroup>
            <Box w="100%">
              <Tooltip
                hasArrow
                label={
                  filterObservationsAded(data.id).obsAded
                    ? filterObservationsAded(data.id).observation
                    : 'Adicionar observações'
                }
              >
                <Button
                  colorScheme={
                    filterObservationsAded(data.id).obsAded ? 'green' : 'yellow'
                  }
                  onClick={() => handleAddObservation(data.id)}
                  w="100%"
                >
                  <Text>
                    Adicione uma observação para este fator de desempenho
                    <Icon ml="3" as={RiFileWarningLine} fontSize="20" />
                  </Text>
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
        <Box mt="15">
          <Text>Escolaridade:</Text>
          <select className="selectOpt" onChange={handleSelect}>
            <option>Selecione...</option>
            {options.map(dataEmail => (
              <option value={dataEmail.value}>{dataEmail.label}</option>
            ))}
          </select>
        </Box>
        {selectedItems.length === 7 && schooling !== '' ? (
          <Button
            mt="8"
            size="md"
            colorScheme="yellow"
            onClick={handleFinishEvaluation}
          >
            Finalizar avaliação
          </Button>
        ) : (
          ''
        )}
      </Flex>
    </ScaleFade>
  );
}
