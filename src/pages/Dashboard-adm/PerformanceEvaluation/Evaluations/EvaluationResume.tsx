import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Button,
  ScaleFade,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import { api } from '../../../../services/api';

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
  schooling: string;
}

export default function EvaluationResume() {
  const { name_subordinate, id_hierarchies } = useParams<ParamsRouter>();
  const { user } = useAuth();
  const [dataEvaluation, setDataEvaluation] = useState<Evaluations[]>([]);
  const [dataSubordinate, setdataSubordinate] = useState<DataSubordinate>();

  const [schooling, setSchooling] = useState('medio');

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
      schooling,
    };
    const alreadySelected = selectedItems.findIndex(
      item => item.factor_id === formatData.factor_id,
    );

    if (alreadySelected >= 0) {
      // const filteredItems = selectedItems.filter(
      //   item => item.factor_id !== formatData.factor_id,
      // );
      console.log('verisso', selectedItems.indexOf(formatData.factor_id));
      const filteredItems = selectedItems.splice(alreadySelected, 1);
      console.log('verisso2', filteredItems);

      setSelectedItems(filteredItems);
    } else {
      console.log('caiu');
      setSelectedItems([...selectedItems, formatData]);
    }

    // eslint-disable-next-line prettier/prettier
    // const { factor_id, performance_id, result } = JSON.parse(data);
    // const formatData = {
    //   factor_id,
    //   performance_id,
    //   result,
    //   date: new Date(),
    //   subordinate: name_subordinate,
    //   leader: user.nickname,
    //   schooling,
    // };
    // if (responseEvaluation?.includes(formatData)) {
    //   setResponseEvaluation([formatData]);
    // }
    // console.log('data', formatData);
    // console.log('data', responseEvaluation);
  }

  const handleFinishEvaluation = useCallback(() => {
    api.post('/evaluations-results', selectedItems);
    setSchooling('medio');
  }, [selectedItems]);

  return (
    <ScaleFade initialScale={0.9} in>
      {console.log('estado', selectedItems)}
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
            <Text fontWeight="medium" fontSize="2xl">
              {data.name}
            </Text>
            <Text
              color="gray.300"
              borderBottom="1px"
              borderColor="gray.700"
              pb="2"
            >
              {data.description}
            </Text>
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
          </Box>
        ))}

        <Button
          mt="8"
          size="md"
          colorScheme="yellow"
          onClick={handleFinishEvaluation}
        >
          Finalizar avaliação
        </Button>
      </Flex>
    </ScaleFade>
  );
}
