import React from 'react';
import { Box, Text, Flex, SimpleGrid, Badge } from '@chakra-ui/react';

export default function EvaluationResume() {
  return (
    <Flex w="100%" my="6" maxWidth={1180} mx="auto" pb={4} px="6">
      <SimpleGrid
        columns={1}
        flex="1"
        spacing={8}
        minChildWidth={['70px', '100', '220px']}
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
            Bruno Luiz Guimarães Carvalho
            <Badge colorScheme="red">Não Avaliado</Badge>
          </Text>
        </Box>
      </SimpleGrid>
    </Flex>
  );
}
