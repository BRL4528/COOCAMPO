import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Progress,
  Button,
  Collapse,
} from '@chakra-ui/react';

const PerformanceEvaluation: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex ml="8%" pr="145" align="center" mt="80px" justify="space-between">
        <header>
          <h1>Avaliação de desempenho</h1>
          <strong>Acompanhe suas Soft Skills</strong>
        </header>

        <Button size="sm" onClick={handleToggle} mt="1rem">
          Show {show ? 'Less' : 'More'}
        </Button>
      </Flex>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <SimpleGrid
          columns={2}
          flex="1"
          spacing={10}
          minChildWidth={['370px', '400', '420px']}
          align="flex-start"
        >
          <Box
            p={['6', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            // height={380}
            // w={['370px', '400', '820px']}
          >
            <Text fontSize="lg" mb="4">
              Pontualidade/Assiduidade
            </Text>

            <Progress
              hasStripe
              aria-valuenow={50}
              isAnimated
              value={50}
              colorScheme="yellow"
              variant="bold"
            />
            <Collapse startingHeight={15} in={show}>
              <Text mt="15">
                Presença do colaborador no local de trabalho dentro do horário
                estabelecido para o expediente da empresa.
              </Text>
            </Collapse>
          </Box>

          <Box
            p={['6', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            // height={380}
            // w={['370px', '400', '820px']}
          >
            <Text fontSize="lg" mb="4">
              Pontualidade/Assiduidade
            </Text>

            <Progress
              hasStripe
              aria-valuenow={50}
              isAnimated
              value={50}
              colorScheme="yellow"
            />
            <Collapse startingHeight={20} in={show}>
              <Text mt="15" color="gray.400">
                Presença do colaborador no local de trabalho dentro do horário
                estabelecido para o expediente da empresa.
              </Text>

              <Box>
                <Text mt="15" fontSize="1xl" fontWeight="bold">
                  Nivel de desempenho:
                </Text>
                Cumpre o horário e está sempre presente, permanece depois do
                horário de expediente quando necessário, mostrando-se disposto a
                atender às necessidades de trabalho.
              </Box>
            </Collapse>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default PerformanceEvaluation;
