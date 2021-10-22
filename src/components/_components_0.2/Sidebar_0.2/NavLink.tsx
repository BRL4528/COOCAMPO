import {
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ElementType } from 'react';

import { Link as ReachLink } from 'react-router-dom';
import { ActiveLink } from '../ActiveLink';

interface PropsNavLink extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  to: string;
}

export function NavLink({ icon, children, to, ...rest }: PropsNavLink) {
  return (
    <ActiveLink toHref={to}>
      <ChakraLink
        to={to}
        display="flex"
        align="center"
        as={ReachLink}
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
