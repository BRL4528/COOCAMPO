import { Flex, ScaleFade } from '@chakra-ui/react';

import { useCallback, useState } from 'react';
import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';
import { ListFloatCar } from '../../../../components/_components_0.2/Miles/FloatListCar';
import { KilometerTable } from '../../../../components/_components_0.2/Miles/KilometerTable';

interface IVehicle {
  id: string;
}

export default function Supply() {
  const [vehicleSelected, setVehicleSelected] = useState(
    'Nenhum veiculo selecionado',
  );

  const handleSelectedVehicleId = useCallback((vehicle: Omit<IVehicle, ''>) => {
    setVehicleSelected(vehicle.id);
  }, []);
  return (
    <Flex direction="column" h="100vh">
      <HeaderUp />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <Sidebar />
        <ScaleFade initialScale={0.9} in>
          <ListFloatCar handleSelectedVehicleId={handleSelectedVehicleId} />

          <KilometerTable vehicleSelected={vehicleSelected} />
        </ScaleFade>
      </Flex>
    </Flex>
  );
}
