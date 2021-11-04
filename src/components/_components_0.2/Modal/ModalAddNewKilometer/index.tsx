import {
  Text,
  Button,
  Icon,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';
import { ModalComponent } from '..';

export function ModalAddNewKilometer() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Button
        as="a"
        size="sm"
        colorScheme="blue"
        fontWeight="medium"
        onClick={onOpen}
        cursor="pointer"
      >
        <Icon as={RiAddLine} fontSize="20" />
        {isWideVersion && <Text>Adicionar novo KM</Text>}
      </Button>
      <ModalComponent
        title="Nova quilometragem"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Text>Teste</Text>
      </ModalComponent>
    </>
  );
}
