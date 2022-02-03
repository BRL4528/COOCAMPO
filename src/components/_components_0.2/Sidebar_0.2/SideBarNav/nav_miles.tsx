import { Stack } from '@chakra-ui/react';
import {
  RiMenu2Fill,
  RiDashboardLine,
  // RiCalendarCheckLine,
  RiCompass3Line,
} from 'react-icons/ri';

import { BiGasPump } from 'react-icons/bi';
import { GiAutoRepair } from 'react-icons/gi';

import { NavLink } from '../NavLink';
import { NavSection } from '../NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink to="/menu" icon={RiMenu2Fill}>
          Menu
        </NavLink>

        <NavLink to="/miles/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
      </NavSection>

      <NavSection title="GESTÃO DE FROTA">
        {/* <NavLink  to="/miles/schedule" icon={RiCalendarCheckLine}>
          Agenda
        </NavLink> */}

        <NavLink to="/miles/kilometers" icon={RiCompass3Line}>
          Quilometragem
        </NavLink>
        <NavLink to="/miles/supply" icon={BiGasPump}>
          Abastecimento
        </NavLink>

        <NavLink to="/miles/maintenance" icon={GiAutoRepair}>
          Manutenção
        </NavLink>
        {/* <NavLink to="/vehicles" icon={BiCar}>
          Veiculos
        </NavLink> */}
      </NavSection>
    </Stack>
  );
}
