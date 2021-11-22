import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

interface PropsDrawer {
  children: any;
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerComponent({ children, onClose, isOpen }: PropsDrawer) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        // initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton />
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
}
