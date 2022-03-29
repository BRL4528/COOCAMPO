import {
  Box,
  Button,
  ButtonGroup,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Flex,
} from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { ListAppointments } from '../../../../../components/_components_0.2/Miles/ListAppointments';
import { MonthList } from './MonthList';

interface IPropsListAppointmens {
  vehicleSelected: string;
  tabFocus: number;
  // handleSetFocusTab: (tab: number) => void;
  handleUpdateAppointment: (updateAp: string) => void;
}

export function ListAllAppointments({
  vehicleSelected,
  // handleSetFocusTab,
  handleUpdateAppointment,
  tabFocus,
}: IPropsListAppointmens) {
  const [statusFilter, setStatusFilter] = useState('Aprovado');
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleSetStatusFilter = useCallback(newStatus => {
    setStatusFilter(newStatus);
  }, []);

  return (
    <>
      <Box
        display="flex"
        w={[370, 460, 600, 950, 1100, 1200]}
        flexDirection="column"
        mb="10"
        mt="8"
      >
        <Flex flexDirection="row" alignItens="center">
          <ButtonGroup mb="4" w="50%">
            <Button
              size="sm"
              colorScheme="green"
              opacity={statusFilter === 'Aprovado' ? '' : '0.2'}
              onClick={() => handleSetStatusFilter('Aprovado')}
            >
              Aprovado
            </Button>
            <Button
              size="sm"
              colorScheme="yellow"
              opacity={statusFilter === 'Pendente' ? '' : '0.2'}
              onClick={() => handleSetStatusFilter('Pendente')}
            >
              Pendente
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              opacity={statusFilter === 'Recusado' ? '' : '0.2'}
              onClick={() => handleSetStatusFilter('Recusado')}
            >
              Recusado
            </Button>
          </ButtonGroup>
          <Box w="100%">
            <Slider
              onChangeEnd={val => setMonth(val)}
              defaultValue={month}
              min={1}
              max={12}
              step={1}
            >
              <MonthList />
              <SliderTrack bg="blue.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="blue.500" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Box>
        </Flex>
      </Box>

      <ListAppointments
        tabFocus={tabFocus}
        month={month}
        statusFilter={statusFilter}
        vehicleSelected={vehicleSelected}
        // handleSetFocusTab={handleSetFocusTab}
        handleSetStatusFilter={handleSetStatusFilter}
        handleUpdateAppointment={handleUpdateAppointment}
      />
    </>
  );
}
