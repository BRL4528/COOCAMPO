import { Flex, ScaleFade } from '@chakra-ui/react';

import { useCallback, useState } from 'react';
import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';
import { ListFloatCar } from '../../../../components/_components_0.2/Miles/FloatListCar';
import { KilometerTable } from '../../../../components/_components_0.2/Miles/KilometerTable';

interface IVehicle {
  id: string;
  km: number;
}

export default function Supply() {
  const [updateNewKm, setUpdateNewKm] = useState<string>('');
  const [vehicleSelected, setVehicleSelected] = useState<IVehicle>({
    id: '',
    km: 0,
  });

  const handleSelectedVehicleId = useCallback((vehicle: Omit<IVehicle, ''>) => {
    const { id, km } = vehicle;

    const car = {
      id,
      km,
    };
    setVehicleSelected(car);
  }, []);

  const handleUpdateNewKm = useCallback(id_new_vehicle => {
    setUpdateNewKm(id_new_vehicle);
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <HeaderUp path="miles" />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <Sidebar path="miles" />
        <ScaleFade initialScale={0.9} in>
          <ListFloatCar
            updateNewData={updateNewKm}
            handleSelectedVehicleId={handleSelectedVehicleId}
          />

          <KilometerTable
            handleUpdateNewKm={handleUpdateNewKm}
            vehicleSelected={vehicleSelected}
          />
        </ScaleFade>
      </Flex>
    </Flex>
  );
}
