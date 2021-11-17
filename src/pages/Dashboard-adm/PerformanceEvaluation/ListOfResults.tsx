import React from 'react';
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Progress,
  Collapse,
} from '@chakra-ui/react';

export function ListOfResults(show = false) {
  return (
    <Flex w="100%" my="6" maxWidth={1180} mx="auto" pb={4} px="6">
      <SimpleGrid
        columns={2}
        flex="1"
        spacing={8}
        minChildWidth={['370px', '400px', '420px']}
        align="flex-start"
      >
        <Box
          p={['6', '8']}
          bg="gray.800"
          borderRadius={8}
          pb="4"
          // height={380}
        >
          <Text fontSize="lg" mb="4">
            Pontualidade/Assiduidade
          </Text>
          <Text fontSize="small" ml="95%" mr="-55px" mt="-2">
            95%
          </Text>
          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={95}
            colorScheme="yellow"
            variant="bold"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              Presença do colaborador no local de trabalho dentro do horário
              estabelecido para o expediente da empresa.
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              Cumpre o horário e está sempre presente, permanece depois do
              horário de expediente quando necessário, mostrando-se disposto a
              atender às necessidades de trabalho.
            </Box>
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
            Diciplina
          </Text>
          <Text fontSize="small" ml="80%" mr="-55px" mt="-2">
            80%
          </Text>

          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={80}
            colorScheme="yellow"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              Observa sistematicamente aos regulamentos e às normas emanadas do
              superior imediato.
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              Mantém um comportamento satisfatório atendendo às normas e deveres
              da empresa.
            </Box>
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
            Atitude
          </Text>
          <Text fontSize="small" ml="75%" mr="-55px" mt="-2">
            75%
          </Text>

          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={75}
            colorScheme="yellow"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              Adota providências em situações não definidas pela chefia ou não
              previstas nos procedimentos da empresa ou normas/regras de
              serviço.
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              Esforça-se para solucionar algumas situações imprevistas na
              execução do trabalho.
            </Box>
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
            Senso de responsabilidade
          </Text>
          <Text fontSize="small" ml="60%" mr="-55px" mt="-2">
            60%
          </Text>

          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={60}
            colorScheme="yellow"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              PCondição de trabalhar sem necessidade de supervisão, adquirida
              pelo desenvolvimento profissional do colaborador;comprometido com
              suas tarefas e com metas estabelecidas pela empresa
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              Tem consciência de suas funções, porém ainda requer um mínimo de
              supervisão.Pode assumir maiores responsabilidades, desde que
              devidamente treinado.Executa adequadamente as suas atividades.
            </Box>
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
            Capacidade de Apendizagem
          </Text>
          <Text fontSize="small" ml="60%" mr="-55px" mt="-2">
            60%
          </Text>

          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={60}
            colorScheme="yellow"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              Facilidade de compreender e reter instruções e informações
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              Facilidade para aprender. Poucas instruções são suficientes.
            </Box>
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
            Adaptabilidade/Flexibilidade
          </Text>
          <Text fontSize="small" ml="60%" mr="-55px" mt="-2">
            60%
          </Text>

          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={60}
            colorScheme="yellow"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              Reage bem a mudança e procura adaptar-se a elas de forma
              produtiva. Tem atitudes de cooperação que evidencia no trabalho em
              geral.
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              Aceita e acata as mudanças, no entanto não existe o esforço para
              adaptação a elas.
            </Box>
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
            Trabalho em Equipe
          </Text>
          <Text fontSize="small" ml="60%" mr="-55px" mt="-2">
            60%
          </Text>

          <Progress
            hasStripe
            aria-valuenow={50}
            isAnimated
            value={60}
            colorScheme="yellow"
          />
          <Collapse startingHeight={20} in={show}>
            <Text mt="6" color="gray.400">
              Habilidade de interagir e manter o bom relacionamento com seus
              pares, superiores, subordinados (se houver). Busca alternativa e
              contribui para a atuação positiva dos demais. Consegue lidar com
              as diferenças e está sempre disposto a cooperar.
            </Text>

            <Box>
              <Text mt="5" fontSize="1xl" fontWeight="bold">
                Nivel de desempenho:
              </Text>
              O relacionamento em equipe é comprometido pela dificuldade de
              expressar suas idéias e opiniões, manifestando-se sempre alheio
              aos acontecimentos da equipe.
            </Box>
          </Collapse>
        </Box>
      </SimpleGrid>
    </Flex>
  );
}
