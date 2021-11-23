/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Progress,
  Collapse,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import dataFake from '../../../utils/fakeDataEvaluation.json';
// import {  } from '../../../components/Admin/'

interface ParamsRouter {
  nick_user: string;
}

interface EvaluationsResults {
  evaluations_results: [
    {
      id: string;
      result: string;
      observations: string;
      factor: {
        name: string;
        description: string;
      };
      performance: {
        name: string;
        weight: string;
      };
    },
  ];
}

interface PropsListOfResults {
  show: boolean;
  handleFakeData: (arg0: boolean) => void;
  fakeData: boolean;
}

export const ListOfResults: React.FC<PropsListOfResults> = ({
  show,
  handleFakeData,
  fakeData,
}) => {
  const { nick_user } = useParams<ParamsRouter>();

  const [dataEvaluationsResults, setDataEvaluationsResults] =
    useState<EvaluationsResults>();

  useEffect(() => {
    api
      .get<EvaluationsResults>(
        `/evaluations-results/show?subordinate=${nick_user}`,
      )
      .then(response => {
        if (response.data.evaluations_results.length <= 0) {
          // @ts-ignore
          setDataEvaluationsResults(dataFake);
          handleFakeData(true);
        } else {
          setDataEvaluationsResults(response.data);
        }
        console.log('response', response.data);
      });
  }, [handleFakeData, nick_user]);

  return (
    <>
      <Box display={fakeData ? '' : 'none'}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          bg="gray.800"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Avaliação não respondida!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Aguarde até que sua avaliação de desempenho esteja disponivel.
          </AlertDescription>
        </Alert>
      </Box>
      <Flex w="100%" my="6" maxWidth={1180} mx="auto" pb={4} px="6">
        <SimpleGrid
          columns={2}
          flex="1"
          spacing={8}
          minChildWidth={['370px', '400px', '420px']}
          align="flex-start"
        >
          {dataEvaluationsResults?.evaluations_results.map(data => (
            <>
              <Box
                p={['6', '8']}
                bg="gray.800"
                borderRadius={8}
                pb="4"
                className={fakeData ? 'filter' : ''}
              >
                <Text fontSize="lg" mb="4">
                  {data.factor.name}
                </Text>
                <Text
                  fontSize="small"
                  ml={`${Number(data.performance.weight) * 10}%`}
                  mr="-55px"
                  mt="-2"
                >
                  {Number(data.performance.weight) * 10}%
                </Text>
                <Progress
                  hasStripe
                  aria-valuenow={50}
                  isAnimated
                  value={Number(data.performance.weight) * 10}
                  colorScheme="yellow"
                  variant="bold"
                />
                <Collapse startingHeight={20} in={show}>
                  <Text mt="6" color="gray.400">
                    {data.factor.description}
                  </Text>

                  <Box>
                    <Text mt="5" fontSize="1xl" fontWeight="bold">
                      Nivel de desempenho:
                    </Text>
                    {data.performance.name}
                  </Box>

                  <Box display={data?.observations ? '' : 'none'}>
                    <Text mt="5" fontSize="1xl" fontWeight="bold">
                      Observações anotadas:
                    </Text>
                    <Text color="gray.400">{data?.observations}</Text>
                  </Box>
                </Collapse>
              </Box>
            </>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};
