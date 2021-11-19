import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Button,
  ScaleFade,
} from '@chakra-ui/react';
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

export default function EvaluationResume() {
  const [dataEvaluation, setDataEvaluation] = useState<Evaluations[]>();
  useEffect(() => {
    api.get('/factors').then(response => {
      const array: Evaluations[] = [];
      response.data.filter(async (dataEva: Evaluations) => {
        await api.get(`performances/show?factor_id=${dataEva.id}`).then(res => {
          const formated = {
            id: dataEva.id,
            name: dataEva.name,
            description: dataEva.description,
            status: dataEva.status,
            performances: res.data,
          };
          array.push(formated);
        });
      });
      console.log('aaaa', array);
      setDataEvaluation(response.data);
    });
  }, []);

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
            Bruno Luiz Guimarães Carvalho
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
            <RadioGroup mt="8">
              {data.performances?.map(dataPerformance => (
                <Box>
                  <Radio
                    value={`${dataPerformance.weight}`}
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
