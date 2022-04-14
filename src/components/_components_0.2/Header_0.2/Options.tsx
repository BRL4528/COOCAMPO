import { HStack } from '@chakra-ui/react';
import { NotificationNav } from './Notifications';

import { ToogleTheme } from './ToogleTheme';
import { Exit } from './Exit';

export function Options() {
  return (
    <HStack
      spacing={['6', '4']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <ToogleTheme />
      <NotificationNav />
      <Exit />
    </HStack>
  );
}
