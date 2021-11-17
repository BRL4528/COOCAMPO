import React, { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ListOfResults } from './ListOfResults';

const PerformanceEvaluation: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <Box>
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
          <strong>Acompanhe suas Soft Skills</strong>
        </header>

        <Box>
          <Button size="sm" onClick={handleToggle} mt="1rem" bg="gray.300">
            {show ? 'Recolher' : 'Expandir'}
          </Button>
          <Link to="/management-ppr/listOf-evaluation">Avaliações</Link>
        </Box>
      </Flex>

      {ListOfResults(show)}
    </Box>
  );
};

export default PerformanceEvaluation;
