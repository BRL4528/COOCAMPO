import React from 'react';
import { Box, Flex, ScaleFade } from '@chakra-ui/react';

import { EvaluationTable } from '../../../../components/_components_0.2/PerformanceEvaluation/EvaluationTable';

const ListOfEvaluation: React.FC = () => {
  return (
    <ScaleFade initialScale={0.9} in>
      <Box ml="50">
        <Flex
          pr="145"
          w="100%"
          my="6"
          maxWidth={1180}
          mx="auto"
          pb={4}
          px="6"
          mt="80px"
          justify="space-between"
        >
          <header>
            <h1>Avaliação de desempenho</h1>
            <strong>Inicie </strong>
          </header>
        </Flex>
        <Flex width="100%" maxWidth={1180} mx="auto" align="center">
          <EvaluationTable />
        </Flex>
      </Box>
    </ScaleFade>
  );
};

export default ListOfEvaluation;
