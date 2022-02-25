import { Stack } from '@chakra-ui/react';
import { RiMenu2Fill } from 'react-icons/ri';

import { NavLink } from '../NavLink';
import { NavSection } from '../NavSection';

export function SidebarNavProfile() {
  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="GERAL">
        <NavLink to="/menu" icon={RiMenu2Fill}>
          Menu
        </NavLink>
      </NavSection>
    </Stack>
  );
}
