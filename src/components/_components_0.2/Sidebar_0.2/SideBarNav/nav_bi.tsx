import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  MenuDivider,
} from '@chakra-ui/react';
import { RiMenu2Fill } from 'react-icons/ri';

import { BiChevronDown } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { NavLink } from '../NavLink';
import { NavSection } from '../NavSection';
import { useCan } from '../../../../hooks/useCan';

export function SidebarNavBi() {
  const userCanSeeEnergy = useCan({
    roles: ['master_user', 'user_energy_data'],
  });
  const userCanSeeOrderServices = useCan({
    roles: ['master_user', 'user_orderServices_data'],
  });
  const userCanSeeDataInDevelopment = useCan({
    roles: ['master_user'],
  });
  const userCanSeeMilesManager = useCan({
    roles: ['master_user', 'user_miles_data'],
  });
  const userCanSeePpr = useCan({
    roles: ['master_user', 'user_ppr_data'],
  });

  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="GERAL">
        <NavLink to="/menu" icon={RiMenu2Fill}>
          Menu
        </NavLink>
      </NavSection>

      <NavSection title="GRUPOS DE ANÁLISES">
        {/* <NavLink to="/miles/schedule" icon={RiCalendarCheckLine}>
          Administração */}
        <Menu>
          <MenuButton
            as={Button}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            bg="gray.900"
            borderColor="gray.800"
            _hover={{ bg: 'gray.650' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
            fontWeight="500"
          >
            Administração
          </MenuButton>

          <MenuList bg="gray.800">
            {userCanSeePpr && (
              <>
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/management-ppr/dashboard"
                >
                  PPRS
                </MenuItem>

                <MenuDivider />
              </>
            )}

            {userCanSeeEnergy && (
              <>
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/management-energy"
                >
                  Energia
                </MenuItem>
                <MenuDivider />
              </>
            )}
            {userCanSeeOrderServices && (
              <>
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/bi-management/orders"
                >
                  Ordens de serviço(TI)
                </MenuItem>
                <MenuDivider />
              </>
            )}
            {userCanSeeMilesManager && (
              <>
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/bi-management/fleet"
                >
                  Controle de frota
                </MenuItem>
                <MenuDivider />
              </>
            )}

            {/* <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.650' }}
              as={Link}
              to="/bi-management/results"
            >
              Distribuição de resultados
            </MenuItem> */}
            {/* <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem> */}
          </MenuList>
        </Menu>
        {/* </NavLink> */}
        {userCanSeeDataInDevelopment && (
          <>
            <Menu>
              <MenuButton
                as={Button}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                bg="gray.900"
                borderColor="gray.800"
                _hover={{ bg: 'gray.650' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
                rightIcon={<BiChevronDown />}
                fontWeight="500"
              >
                Suinocultura
              </MenuButton>
              <MenuList bg="gray.800">
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Faturamento de suinos
                </MenuItem>
                {/* <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem> */}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                bg="gray.900"
                borderColor="gray.800"
                _hover={{ bg: 'gray.650' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
                rightIcon={<BiChevronDown />}
                fontWeight="500"
              >
                Agropecuária
              </MenuButton>
              <MenuList bg="gray.800">
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Média de faturamento
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Margen de venda
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque custo médio
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={Button}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                bg="gray.900"
                borderColor="gray.800"
                _hover={{ bg: 'gray.650' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
                rightIcon={<BiChevronDown />}
                fontWeight="500"
              >
                Supermercado
              </MenuButton>
              <MenuList bg="gray.800">
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Média de faturamento
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Margen de venda
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque custo médio
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                bg="gray.900"
                borderColor="gray.800"
                _hover={{ bg: 'gray.650' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
                rightIcon={<BiChevronDown />}
                fontWeight="500"
              >
                Insumos Agrícola
              </MenuButton>
              <MenuList bg="gray.800">
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Média de faturamento
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Margen de venda
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque custo médio
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                bg="gray.900"
                borderColor="gray.800"
                _hover={{ bg: 'gray.650' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
                rightIcon={<BiChevronDown />}
                fontWeight="500"
              >
                Ração Suína
              </MenuButton>
              <MenuList bg="gray.800">
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Média de faturamento
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Margen de venda
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque custo médio
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.650' }}
                  as={Link}
                  to="/miles/schedule"
                >
                  Estoque
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </NavSection>
    </Stack>
  );
}
