import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  theme,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FiMenu, FiMaximize, FiEdit } from 'react-icons/fi';
import { FullScreenHandle } from 'react-full-screen';

interface IpropsMenuChart {
  handle: FullScreenHandle;
  onOpen: () => void;
}

export function MenuChart({ handle, onOpen }: IpropsMenuChart) {
  return (
    <Menu>
      <Tooltip hasArrow label="Opções do gráfico">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FiMenu color={theme.colors.gray[500]} />}
          // variant="outline"
          colorScheme="outline"
        />
      </Tooltip>
      <MenuList>
        <MenuItem
          i
          // command="⌘T"
          onClick={handle.enter}
          color="gray.600"
          icon={<FiMaximize />}
        >
          Maximize
        </MenuItem>
        <MenuItem
          // command="⌘N"
          color="gray.600"
          icon={<FiEdit />}
          onClick={onOpen}
        >
          Editar parâmetros
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
