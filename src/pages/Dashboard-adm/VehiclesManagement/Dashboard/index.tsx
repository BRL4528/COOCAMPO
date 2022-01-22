import { useCallback, useState, useEffect } from 'react';
import { Flex, SimpleGrid, Box, ScaleFade } from '@chakra-ui/react';

import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';
import { ListFloatCar } from '../../../../components/_components_0.2/Miles/FloatListCar';
import { ChartMiles } from '../../../../components/_components_0.2/Charts/index';
import { api } from '../../../../services/api';

interface IVehicle {
  id: string;
  km: number;
}

interface IKilometersTraveled {
  months: [string];
  results: [number];
}

export default function Dashboard() {
  const [veicleSelected, setVehicleSelected] = useState<IVehicle>({
    id: '',
    km: 0,
  });
  const [dataKilometersTraveled, seDataKilometersTraveled] =
    useState<IKilometersTraveled>();

  const handleSelectedVehicleId = useCallback((vehicle: Omit<IVehicle, ''>) => {
    const { id, km } = vehicle;

    const car = {
      id,
      km,
    };
    setVehicleSelected(car);
  }, []);

  useEffect(() => {
    try {
      api
        .get(
          `/kilometers/calc-km-traveled-month?vehicle_id=${veicleSelected.id}&start_date=2021-01-01&end_date=2022-01-31`,
        )
        .then(response => {
          seDataKilometersTraveled(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, [veicleSelected]);

  const v = [9];

  const seriesExample = [
    {
      name: 'atualize os dados',
      data: [0],
    },
  ];
  const series = [
    {
      name: 'rodou',
      data: dataKilometersTraveled?.results ?? v,
    },
  ];

  const categories = ['atualize os dados'];
  return (
    <ScaleFade initialScale={0.9} in>
      <Flex direction="column" h="100vh">
        <HeaderUp />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
          <Sidebar />
          <Box>
            <ListFloatCar handleSelectedVehicleId={handleSelectedVehicleId} />
            <SimpleGrid
              columns={2}
              flex="1"
              spacing={10}
              minChildWidth={['370px', '400', '420px']}
              align="flex-start"
            >
              <ChartMiles
                categories={categories}
                series={seriesExample}
                title="Taxa de utilização"
              />
              <ChartMiles
                categories={dataKilometersTraveled?.months ?? ['']}
                series={series}
                title="Quilometros rodados"
              />
              <ChartMiles
                categories={categories}
                series={seriesExample}
                title="Média de consumo por quilometragem"
              />
              <ChartMiles
                categories={categories}
                series={seriesExample}
                title="Quilometragem por veiculo"
              />
            </SimpleGrid>
          </Box>
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
