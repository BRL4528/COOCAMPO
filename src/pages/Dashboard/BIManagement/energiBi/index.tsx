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
          <ReportBIManagement
            reportLoading="4698352e-7ef8-49bf-9f5c-cc13e2960adf"
            embedId="4698352e-7ef8-49bf-9f5c-cc13e2960adf"
            embedUrl="https://app.powerbi.com/reportEmbed?reportId=4698352e-7ef8-49bf-9f5c-cc13e2960adf&groupId=a47600b6-b86d-40b3-bed0-ceca18041576&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d"
            workspaceId="a47600b6-b86d-40b3-bed0-ceca18041576"
          />
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
