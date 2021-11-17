import React, { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';

import { EvaluationTable } from '../../../../components/_components_0.2/PerformanceEvaluation/EvaluationTable';

const ListOfEvaluation: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
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
          <strong>Ac3 ddhe suas Soft Skills</strong>
        </header>

        <Button size="sm" onClick={handleToggle} mt="1rem" bg="gray.300">
          {show ? 'Fechar' : 'Abrir'}
        </Button>
      </Flex>
      <Flex width="100%" maxWidth={1180} mx="auto" align="center">
        <EvaluationTable />
      </Flex>
    </Box>
  );
};

export default ListOfEvaluation;
