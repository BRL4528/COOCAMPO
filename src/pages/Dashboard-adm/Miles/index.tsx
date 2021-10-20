import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from '../../../styles/theme';

import { HeaderUp } from '../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../components/_components_0.2/Sidebar_0.2';

const DashboardMiles = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" h="100vh">
        <HeaderUp />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default DashboardMiles;
