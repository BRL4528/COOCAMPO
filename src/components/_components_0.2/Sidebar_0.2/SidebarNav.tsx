import { Stack } from '@chakra-ui/react';
import {
  RiMenu2Fill,
  RiDashboardLine,
  RiCalendarCheckLine,
  RiCompass3Line,
} from 'react-icons/ri';

import { BiCar, BiGasPump } from 'react-icons/bi';
import { GiAutoRepair } from 'react-icons/gi';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/menu" icon={RiMenu2Fill}>
          Menu
        </NavLink>

        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
      </NavSection>

      <NavSection title="GESTÃO DE FROTA">
        <NavLink href="/forms" icon={RiCalendarCheckLine}>
          Agenda
        </NavLink>

        <NavLink href="/automation" icon={RiCompass3Line}>
          Quilometragem
        </NavLink>
        <NavLink href="/forms" icon={BiGasPump}>
          Abastecimento
        </NavLink>

        <NavLink href="/automation" icon={GiAutoRepair}>
          Manutenção
        </NavLink>
        <NavLink href="/forms" icon={BiCar}>
          Veiculos
        </NavLink>
      </NavSection>
    </Stack>
  );
}
