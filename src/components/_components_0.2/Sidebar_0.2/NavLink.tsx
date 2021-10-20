import {
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ElementType } from 'react';

interface PropsNavLink extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, ...rest }: PropsNavLink) {
  return (
    <ChakraLink display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </ChakraLink>
  );
}
