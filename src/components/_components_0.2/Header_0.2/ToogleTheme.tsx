import { useContext } from 'react';
import { Icon, Button, Tooltip } from '@chakra-ui/react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

import { SetToggleThemeContext } from '../../../contexts/SetToggleThemeContext';

export function ToogleTheme() {
  const { handleToggleTheme, toggleTheme } = useContext(SetToggleThemeContext);
  return (
    <Tooltip hasArrow bg="gray.650" label="Mudar de tema">
      <Button
        bg="transparent"
        type="button"
        onClick={() => handleToggleTheme()}
      >
        {toggleTheme === 'light' ? (
          <Icon as={RiMoonFill} fontSize="20" />
        ) : (
          <Icon as={RiSunFill} fontSize="20" />
        )}
      </Button>
    </Tooltip>
  );
}
