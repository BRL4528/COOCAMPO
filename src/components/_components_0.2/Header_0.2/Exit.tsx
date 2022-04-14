import { Button, Tooltip } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';

export function Exit() {
  const { signOut } = useAuth();
  return (
    <Tooltip hasArrow bg="gray.650" label="Sair da aplicação">
      <Button bg="transparent" type="button" onClick={signOut}>
        <FiLogOut size="20" />
      </Button>
    </Tooltip>
  );
}
