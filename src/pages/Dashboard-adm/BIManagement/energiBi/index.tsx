import { Flex, ScaleFade } from '@chakra-ui/react';
import { ReportBIManagement } from '../../../../components/Admin/Reports/ReportBIManagement';

import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';

export default function BIManagementDashboard() {
  return (
    <ScaleFade initialScale={0.9} in>
      <Flex direction="column" h="100vh">
        <HeaderUp path="bi" />
        <Flex my="6" maxWidth={1480} mx="auto" pb={4} px="6" textAlign="center">
          <Sidebar path="bi" />
          <ReportBIManagement />
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
