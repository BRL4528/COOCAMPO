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
  placement: 'top' | 'left' | 'bottom' | 'right';
}

export function DrawerComponent({
  children,
  onClose,
  isOpen,
  placement,
}: PropsDrawer) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        // initialFocusRef={firstField}
        onClose={onClose}
        // size="sm"
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
