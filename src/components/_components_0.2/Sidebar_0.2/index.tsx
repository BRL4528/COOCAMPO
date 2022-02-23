import {
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Drawer,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../../contexts/SidebarDrawerContext';
import { SidebarNav } from './SideBarNav/nav_miles';
import { SidebarNavBi } from './SideBarNav/nav_bi';

interface Props {
  path: 'miles' | 'bi';
}

export function Sidebar({ path }: Props) {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar || path === 'bi') {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody overflow="auto">
              {path === 'miles' && <SidebarNav />}
              {path === 'bi' && <SidebarNavBi />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      {path === 'miles' && <SidebarNav />}
      {/* {path === 'bi' && <SidebarNavBi />} */}
    </Box>
  );
}
