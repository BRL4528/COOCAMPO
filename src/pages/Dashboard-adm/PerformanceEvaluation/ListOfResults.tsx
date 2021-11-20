import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Progress,
  Collapse,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../../../services/api';

interface ParamsRouter {
  nick_user: string;
}

interface EvaluationsResults {
  evaluations_results: [
    {
      id: string;
      result: string;
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

export function ListOfResults(show = false) {
  const { nick_user } = useParams<ParamsRouter>();
  const [dataEvaluationsResults, setDataEvaluationsResults] =
    useState<EvaluationsResults>();

  useEffect(() => {
    api
      .get(`/evaluations-results/show?subordinate=${nick_user}`)
      .then(response => {
        setDataEvaluationsResults(response.data);
      });
  }, [nick_user]);

  return (
    <Flex w="100%" my="6" maxWidth={1180} mx="auto" pb={4} px="6">
      <SimpleGrid
        columns={2}
        flex="1"
        spacing={8}
        minChildWidth={['370px', '400px', '420px']}
        align="flex-start"
      >
        {dataEvaluationsResults?.evaluations_results.map(data => (
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              {data.factor.name}
            </Text>
            <Text
              fontSize="small"
              ml={`${data.performance.weight}%`}
              mr="-55px"
              mt="-2"
            >
              {data.performance.weight}%
            </Text>
            <Progress
              hasStripe
              aria-valuenow={50}
              isAnimated
              value={Number(data.performance.weight)}
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
            </Collapse>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
