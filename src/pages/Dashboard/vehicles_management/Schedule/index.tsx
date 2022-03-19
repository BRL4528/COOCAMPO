/* eslint-disable no-shadow */
import { useCallback, useState } from 'react';
import {
  Flex,
  ScaleFade,
  Box,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';

import { CalendarPiker } from '../../../../components/_components_0.2/Miles/Calendar';
import { ListFloatCar } from '../../../../components/_components_0.2/Miles/FloatListCar';
import { FloatlistHours } from '../../../../components/_components_0.2/Miles/FloatListHours';
import { ListYouAppointments } from '../../../../components/_components_0.2/Miles/ListYouAppointments';
import { ListAllAppointments } from './ListAllAppointments';

interface IVehicle {
  id: string;
}

export default function Schedule() {
  const [vehicleSelected, setVehicleSelected] = useState(
    'Nenhum veiculo selecionado',
  );
  const [daySelected, setDaySelected] = useState('');
  const [newAppointment, setNewAppointment] = useState('');

  const handleSelectedVehicleId = useCallback((vehicle: Omit<IVehicle, ''>) => {
    setVehicleSelected(vehicle.id);
  }, []);

  const handleDateSelected = useCallback((day: Omit<string, ''>) => {
    setDaySelected(String(day));
  }, []);

  const handleAddedNewAppointment = useCallback(newAp => {
    setNewAppointment(newAp);
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <HeaderUp path="miles" />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <Sidebar path="miles" />

        <Tabs>
          <TabList>
            <Tab>Novo agendamento</Tab>
            <Tab>Seus agendamentos</Tab>
            <Tab>Lista de agendamentos</Tab>
            <Tab>Solicitações</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ListFloatCar
                updateNewData=""
                handleSelectedVehicleId={handleSelectedVehicleId}
              />
              <ScaleFade initialScale={0.9} in>
                <SimpleGrid columns={[1, null, 1]} spacing={10} flex="1">
                  {/* <SimpleGrid
                columns={1}
                flex="1"
                spacing={10}
                minChildWidth={['120px', '220px']}
                align="flex-start"
              >
                <Flex
                  direction="row"
                  align="center"
                  justify="initial"
                  p={['6', '8']}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                >
                  <Avatar size="md" name="Bruno Luiz" mr="5" />
                  <Flex
                    // flex-direction="column"
                    direction="column"
                    justify="initial"
                  >
                    <Text>Bruno Luiz Guimarães Carvalho</Text>
                    <Text color="gray.300">Fiat Etios</Text>
                  </Flex>
                </Flex> */}

                  <Box
                    borderRadius={8}
                    bg="gray.800"
                    p={['4', '8']}
                    // height="470"
                  >
                    <CalendarPiker
                      vehicleSelected={vehicleSelected}
                      handleDateSelected={handleDateSelected}
                      newAppointment={newAppointment}
                    />
                  </Box>
                </SimpleGrid>
                <FloatlistHours
                  vehicleSelected={vehicleSelected}
                  daySelected={daySelected}
                  handleAddedNewAppointment={handleAddedNewAppointment}
                />
              </ScaleFade>
            </TabPanel>

            <TabPanel>
              <ListFloatCar
                updateNewData=""
                handleSelectedVehicleId={handleSelectedVehicleId}
              />
              <ScaleFade initialScale={0.9} in>
                <SimpleGrid columns={[1]} spacing={10} flex="1">
                  <ListYouAppointments vehicleSelected={vehicleSelected} />
                </SimpleGrid>
              </ScaleFade>
            </TabPanel>

            <TabPanel>
              {/* <ListFloatCar
                updateNewData=""
                handleSelectedVehicleId={handleSelectedVehicleId}
              /> */}

              <ListAllAppointments vehicleSelected={vehicleSelected} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
