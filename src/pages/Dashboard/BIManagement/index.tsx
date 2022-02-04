import { Flex, ScaleFade, Image } from '@chakra-ui/react';

import { HeaderUp } from '../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../components/_components_0.2/Sidebar_0.2';

export default function BIManagementDashboard() {
  return (
    <ScaleFade initialScale={0.9} in>
      <Flex direction="column" h="100vh">
        <HeaderUp path="bi" />
        <Flex my="6" maxWidth={1480} mx="auto" pb={4} px="6" textAlign="center">
          <Sidebar path="bi" />
          <Image
            src="https://www.in1.com.br/hs-fs/hubfs/6-passos-cultura-data-literacy.png?width=600&name=6-passos-cultura-data-literacy.png"
            alt="Dan Abramov"
            width="480px"
          />
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
