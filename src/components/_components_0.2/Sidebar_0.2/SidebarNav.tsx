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
        <NavLink to="/menu" icon={RiMenu2Fill}>
          Menu
        </NavLink>

        <NavLink to="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
      </NavSection>

      <NavSection title="GESTÃO DE FROTA">
        <NavLink to="/forms" icon={RiCalendarCheckLine}>
          Agenda
        </NavLink>

        <NavLink to="/automation" icon={RiCompass3Line}>
          Quilometragem
        </NavLink>
        <NavLink to="/forms" icon={BiGasPump}>
          Abastecimento
        </NavLink>

        <NavLink to="/automation" icon={GiAutoRepair}>
          Manutenção
        </NavLink>
        <NavLink to="/forms" icon={BiCar}>
          Veiculos
        </NavLink>
      </NavSection>
    </Stack>
  );
}
