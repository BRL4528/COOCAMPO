import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface IpropsModal {
  title: string;
  onClose: any;
  isOpen: boolean;
  children: any;
}

export function ModalComponent({
  title,
  children,
  isOpen,
  onClose,
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
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
