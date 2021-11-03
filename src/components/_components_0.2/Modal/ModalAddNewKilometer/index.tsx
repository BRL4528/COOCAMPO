import { Text } from '@chakra-ui/react';
import { ModalComponent } from '..';

interface IpropsModalAddKilometer {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddNewKilometer({
  isOpen,
  onClose,
}: IpropsModalAddKilometer) {
  return (
    <ModalComponent
      title="Nova quilometragem"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Text>Teste</Text>
    </ModalComponent>
  );
}
