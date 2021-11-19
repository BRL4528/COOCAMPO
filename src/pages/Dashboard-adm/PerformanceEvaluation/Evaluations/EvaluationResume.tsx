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
}
interface DataSubordinate {
  name: string;
}

export default function EvaluationResume() {
  const { name_subordinate } = useParams<ParamsRouter>();
  console.log('name_subordinate', name_subordinate);
  const { user } = useAuth();
  const [dataEvaluation, setDataEvaluation] = useState<Evaluations[]>([]);
  const [dataSubordinate, setdataSubordinate] = useState<DataSubordinate>();

  useEffect(() => {
    api.get('/factors').then(response => {
      setDataEvaluation(response.data);
    });
    api.get(`/employees/${name_subordinate}`).then(response => {
      setdataSubordinate(response.data);
    });
  }, [name_subordinate]);

  const handleRadioSubmit = useCallback(
    (data): any => {
      // eslint-disable-next-line prettier/prettier
      const { factor_id, performance_id, result } = JSON.parse(data);
      const formatData = {
        factor_id,
        performance_id,
        result,
        leader: user.nickname,
      };
      console.log('data', formatData);
    },
    [user.nickname],
  );

  return (
    <ScaleFade initialScale={0.9} in>
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

        <Button mt="8" size="md" colorScheme="yellow">
          Finalizar avaliação
        </Button>
      </Flex>
    </ScaleFade>
  );
}
