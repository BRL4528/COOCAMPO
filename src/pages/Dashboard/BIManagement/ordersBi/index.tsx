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
            reportLoading="8b9d7c10-1ba8-4039-a8f3-b2ff2b030df3"
            embedId="5bcae3aa-1c60-4d60-b4ed-f5bcfeedfe7d"
            embedUrl="https://app.powerbi.com/reportEmbed?reportId=5bcae3aa-1c60-4d60-b4ed-f5bcfeedfe7d&groupId=99dac3b3-6af1-4445-a13e-ff16882c296d&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJhbmd1bGFyT25seVJlcG9ydEVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBab25lUGF0Y2giOnRydWV9fQ%3d%3d"
            workspaceId="99dac3b3-6af1-4445-a13e-ff16882c296d"
          />
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
