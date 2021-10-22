import { Flex, ScaleFade, Text } from '@chakra-ui/react';

import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';

export default function Supply() {
  return (
    <Flex direction="column" h="100vh">
      <HeaderUp />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <Sidebar />
        <ScaleFade initialScale={0.9} in>
          <Text>Abastecimento</Text>
        </ScaleFade>
      </Flex>
    </Flex>
  );
}
