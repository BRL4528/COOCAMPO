import { useCallback, useState } from 'react';
import { Flex, ScaleFade, Box } from '@chakra-ui/react';

import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';
import { ListFloatCar } from '../../../../components/_components_0.2/Miles/FloatListCar';
import { SupplyTable } from '../../../../components/_components_0.2/Miles/SupplyTable';

interface IVehicle {
  id: string;
  km: number;
}

export default function Supply() {
  const [veicleSelected, setVehicleSelected] = useState<IVehicle>({
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

  return (
    <Flex direction="column" h="100vh">
      <HeaderUp />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <Sidebar />
        <Box>
          <ListFloatCar
            updateNewData=""
            handleSelectedVehicleId={handleSelectedVehicleId}
          />
          <ScaleFade initialScale={0.9} in>
            <SupplyTable vehicleSelected={veicleSelected} />
          </ScaleFade>
        </Box>
      </Flex>
    </Flex>
  );
}
