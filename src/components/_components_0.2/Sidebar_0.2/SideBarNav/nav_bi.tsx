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

export function SidebarNavBi() {
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
            _hover={{ bg: 'gray.800' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
          >
            Administração
          </MenuButton>

          <MenuList bg="gray.800">
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/management-ppr/dashboard"
            >
              PPRS
            </MenuItem>

            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Energia
            </MenuItem>
            {/* <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem> */}
          </MenuList>
        </Menu>
        {/* </NavLink> */}

        <Menu>
          <MenuButton
            as={Button}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            bg="gray.900"
            borderColor="gray.800"
            _hover={{ bg: 'gray.800' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
          >
            Suinocultura
          </MenuButton>
          <MenuList bg="gray.800">
            <MenuItem
              _hover={{ bg: 'gray.600' }}
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
            _hover={{ bg: 'gray.800' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
          >
            Agropecuária
          </MenuButton>
          <MenuList bg="gray.800">
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Média de faturamento
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Margen de venda
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Estoque custo médio
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
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
            _hover={{ bg: 'gray.800' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
          >
            Supermercado
          </MenuButton>
          <MenuList bg="gray.800">
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Média de faturamento
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Margen de venda
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Estoque custo médio
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
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
            _hover={{ bg: 'gray.800' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
          >
            Insumos Agrícola
          </MenuButton>
          <MenuList bg="gray.800">
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Média de faturamento
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Margen de venda
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Estoque custo médio
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
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
            _hover={{ bg: 'gray.800' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            rightIcon={<BiChevronDown />}
          >
            Ração Suína
          </MenuButton>
          <MenuList bg="gray.800">
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Média de faturamento
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Margen de venda
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Estoque custo médio
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: 'gray.600' }}
              as={Link}
              to="/miles/schedule"
            >
              Estoque
            </MenuItem>
          </MenuList>
        </Menu>
      </NavSection>
    </Stack>
  );
}