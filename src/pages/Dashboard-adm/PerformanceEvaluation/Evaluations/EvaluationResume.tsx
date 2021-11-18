import React from 'react';
import {
  Box,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Button,
  ScaleFade,
} from '@chakra-ui/react';

export default function EvaluationResume() {
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

        <Box p={['4', '8']} bg="gray.800" borderRadius={8} w="100%" mt="8">
          <Text fontWeight="medium" fontSize="2xl">
            Pontualidade/Assiduidade
          </Text>
          <Text
            color="gray.300"
            borderBottom="1px"
            borderColor="gray.700"
            pb="2"
          >
            Presença do colaborador no local de trabalho dentro do horário
            estabelecido para o expediente da empresa.
          </Text>
          <RadioGroup mt="8">
            <Radio value="10" m="5" cursor="pointer">
              Cumpre o horário e está sempre presente, permanece depois do
              horário de expediente quando necessário, mostrando-se disposto a
              atender às necessidades de trabalho.
            </Radio>
            <Radio value="7.5" m="5" cursor="pointer">
              Cumpre o horário estabelecido e é pontual nos seus compromissos de
              trabalho, não há o hábito de trabalhar fora do horário de
              expediente.
            </Radio>

            <Radio value="5" m="5" cursor="pointer">
              Normalmente não cumpre o horário estabelecido, mas, quando
              presente, atende às necessidades de trabalho.
            </Radio>
            <Radio value="2.5" m="5" cursor="pointer">
              Nunca cumpre horário e está sempre ausente.
            </Radio>
          </RadioGroup>
        </Box>
        <Box p={['4', '8']} bg="gray.800" borderRadius={8} w="100%" mt="8">
          <Text fontWeight="medium" fontSize="2xl">
            Diciplina
          </Text>
          <Text
            color="gray.300"
            borderBottom="1px"
            borderColor="gray.700"
            pb="2"
          >
            Observa sistematicamente aos regulamentos e às normas emanadas do
            superior imediato.
          </Text>
          <RadioGroup mt="8">
            <Radio value="10" m="5" cursor="pointer">
              Sempre cumpre as normas e deveres, além de contribuir para a
              manutenção da ordem no ambiente de trabalho.
            </Radio>
            <Radio value="7.5" m="5" cursor="pointer">
              CMantém um comportamento satisfatório atendendo às normas e
              deveres da empresa.
            </Radio>

            <Radio value="5" m="5" cursor="pointer">
              Eventualmente descumpre as determinações que lhes são atribuídas e
              tem um comportamento instável no grupo.
            </Radio>
            <Radio value="2.5" m="5" cursor="pointer">
              Mostra-se resistente a cumprir normas e deveres e sempre
              influencia negativamente no comportamento do grupo.
            </Radio>
          </RadioGroup>
        </Box>
        <Button mt="8" size="md" colorScheme="yellow">
          Finalizar avaliação
        </Button>
      </Flex>
    </ScaleFade>
  );
}
