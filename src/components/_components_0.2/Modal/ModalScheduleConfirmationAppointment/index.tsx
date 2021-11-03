import { Flex, Box, Badge, Text, ModalFooter, Button } from '@chakra-ui/react';

import { ModalComponent } from '..';

interface IpropsModal {
  formateDateStartAppointments: string;
  formateDateEndAppointments: string;
  isOpen: boolean;
  onClose: () => void;
  handleSubmitScheduleVehicle: () => void;
}

export function ModalScheduleConfirmationAppointment({
  handleSubmitScheduleVehicle,
  formateDateStartAppointments,
  formateDateEndAppointments,
  isOpen,
  onClose,
}: IpropsModal) {
  return (
    <ModalComponent
      title="Solicitar agendamento"
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex direction="column">
        <Box>
          <Badge colorScheme="green">Saindo</Badge>
          <Text>{formateDateStartAppointments} </Text>
        </Box>

        <Box mt="5">
          <Badge colorScheme="red">Retornoando</Badge>
          <Text>{formateDateEndAppointments} </Text>
        </Box>
      </Flex>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleSubmitScheduleVehicle}>
          Confirmar
        </Button>
        <Button onClick={onClose} bg="gray.600">
          Cancelar
        </Button>
      </ModalFooter>
    </ModalComponent>
  );
}
