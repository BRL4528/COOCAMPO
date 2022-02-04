import React, { useCallback, useState, useEffect } from 'react';
import { Box, Flex, Button, ScaleFade } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ListOfResults } from './ListOfResults';
import { EvaluationsResumeResult } from './EvaluationsResumeResult';

const PerformanceEvaluation: React.FC = () => {
  const [show, setShow] = useState(true);
  const [fakeData, setFakeData] = useState(false);

  const handleSetfakeData = useCallback(data => {
    setFakeData(data);
  }, []);

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    if (fakeData) {
      window.scroll(0, 100);
    }
  }, [fakeData]);

  return (
    <ScaleFade initialScale={0.9} in>
      <Box>
        <Flex
          id="scroll"
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
        <EvaluationsResumeResult fakeData={fakeData} />
        <ListOfResults
          show={show}
          handleFakeData={handleSetfakeData}
          fakeData={fakeData}
        />
      </Box>
    </ScaleFade>
  );
};

export default PerformanceEvaluation;
