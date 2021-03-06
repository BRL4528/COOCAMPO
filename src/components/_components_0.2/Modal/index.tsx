/* eslint-disable react/require-default-props */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useBreakpointValue,
  Box,
} from '@chakra-ui/react';

interface IpropsModal {
  title: string;
  onClose: any;
  isOpen: boolean;
  children: any;
  scrollBehavior?: 'inside' | 'outside';
}

export function ModalComponent({
  title,
  children,
  isOpen,
  onClose,
  scrollBehavior,
}: IpropsModal) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box>
      <Modal
        blockScrollOnMount={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
        size={isWideVersion ? 'lg' : 'full'}
        scrollBehavior={scrollBehavior || 'outside'}
      >
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </Box>
  );
}
