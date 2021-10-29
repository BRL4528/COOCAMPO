import React, { useContext } from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import {
  RiNotificationLine,
  RiUserAddLine,
  RiMoonFill,
  RiSunFill,
} from 'react-icons/ri';

import { SetToggleThemeContext } from '../../../contexts/SetToggleThemeContext';

export function NotificationNav() {
  const { handleToggleTheme, toggleTheme } = useContext(SetToggleThemeContext);
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <button type="button" onClick={() => handleToggleTheme()}>
        {toggleTheme === 'light' ? (
          <Icon as={RiMoonFill} fontSize="20" />
        ) : (
          <Icon as={RiSunFill} fontSize="20" />
        )}
      </button>
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  );
}
