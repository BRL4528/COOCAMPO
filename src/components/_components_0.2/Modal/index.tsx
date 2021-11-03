import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

interface IpropsModal {
  // onOpen: any;
  onClose: any;
  isOpen: boolean;
  children: any;
  handleSubmitScheduleVehicle: () => void;
}

export function ModalListHours({
  children,
  isOpen,
  onClose,
  handleSubmitScheduleVehicle,
}: IpropsModal) {
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>Solicitar agendamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmitScheduleVehicle}
            >
              Confirmar
            </Button>
            <Button onClick={onClose} bg="gray.600">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
