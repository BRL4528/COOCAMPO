import React, { useState } from 'react';
import { Box, Flex, Button, ScaleFade } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ListOfResults } from './ListOfResults';

const PerformanceEvaluation: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <ScaleFade initialScale={0.9} in>
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
            <Button
              colorScheme="yellow"
              size="sm"
              onClick={handleToggle}
              mr="1rem"
            >
              {show ? 'Recolher' : 'Expandir'}
            </Button>
            <Button
              to="/management-ppr/listOf-evaluation"
              as={Link}
              size="sm"
              colorScheme="yellow"
            >
              Avaliações
            </Button>
          </Box>
        </Flex>

        {ListOfResults(show)}
      </Box>
    </ScaleFade>
  );
};

export default PerformanceEvaluation;
