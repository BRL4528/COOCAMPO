import { useCallback, useState, useEffect } from 'react';
import { Flex, SimpleGrid, ScaleFade } from '@chakra-ui/react';

import { format } from 'date-fns';

import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';
import { ChartMiles } from '../../../../components/_components_0.2/Charts/index';
import { apllyToast } from '../../../../components/Global/Toast2.0';
import callApiAccordingToTheGraphic from '../../../../utils/callApiAccordingToTheGraphic';

interface DateGraphicState {
  date_start: string;
  date_end: string;
  title?: string;
}

interface IVehicle {
  id: string;
  km: number;
}

interface IKilometersTraveled {
  months: [string];
  results: [number];
}

export default function Dashboard() {
  const [veicleSelected] = useState<IVehicle>({
    id: '',
    km: 0,
  });
  const [dataKilometersTraveled, seDataKilometersTraveled] =
    useState<IKilometersTraveled>();
  const [dataUsageFee, setDataUsageFee] = useState<IKilometersTraveled>();
  const [dataConsumption, setDataConsumption] = useState<IKilometersTraveled>();
  const [monthlyConsumption, setMonthlyConsumption] =
    useState<IKilometersTraveled>();
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [loadingThree, setLoadingThree] = useState(false);
  const [loadingFour, setLoadingFour] = useState(false);
  const [dateGraphic, setDateGraphic] = useState<DateGraphicState>({
    date_start: format(new Date('01-06-2021'), 'yyyy-dd-MM'),
    date_end: String(format(new Date(), 'yyyy-MM-dd')),
  });

  useEffect(() => {
    try {
      callApiAccordingToTheGraphic({
        veicleSelected,
        dateGraphic,
        seDataKilometersTraveled,
        setDataUsageFee,
        setDataConsumption,
        setMonthlyConsumption,
        setLoadingOne,
        setLoadingTwo,
        setLoadingThree,
        setLoadingFour,
      });
    } catch (e) {
      console.log(e);
      apllyToast('error', 'Erro ao carregar BI');
    }
  }, [dateGraphic, veicleSelected]);

  const handleSendDataGraphic = useCallback(
    (date: Omit<DateGraphicState, 'e'>) => {
      const dateFormated = date;
      setDateGraphic(dateFormated);
    },
    [],
  );
  return (
    <ScaleFade initialScale={0.9} in>
      <Flex direction="column" h="100vh">
        <HeaderUp path="miles" />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
          <Sidebar path="miles" />

          <SimpleGrid
            columns={2}
            flex="1"
            spacing={10}
            minChildWidth={['370px', '400', '420px']}
            align="flex-start"
          >
            <ChartMiles
              categories={dataUsageFee?.months ?? ['']}
              series={[
                {
                  name: 'Utilizou',
                  data: dataUsageFee?.results ?? [9],
                },
              ]}
              title="Taxa de utilização"
              loading={loadingOne}
              handleSendDataGraphic={handleSendDataGraphic}
            />
            <ChartMiles
              categories={dataKilometersTraveled?.months ?? ['']}
              series={[
                {
                  name: 'Rdou',
                  data: dataKilometersTraveled?.results ?? [9],
                },
              ]}
              title="Quilometros rodados"
              loading={loadingTwo}
              handleSendDataGraphic={handleSendDataGraphic}
            />
            <ChartMiles
              categories={dataConsumption?.months ?? ['']}
              series={[
                {
                  name: 'Média de',
                  data: dataConsumption?.results ?? [9],
                },
              ]}
              title="Média de consumo por quilometragem"
              loading={loadingThree}
              handleSendDataGraphic={handleSendDataGraphic}
            />
            <ChartMiles
              categories={monthlyConsumption?.months ?? ['']}
              series={[
                {
                  name: 'Consumiu',
                  data: monthlyConsumption?.results ?? [9],
                },
              ]}
              title="Consumo mensal"
              loading={loadingFour}
              handleSendDataGraphic={handleSendDataGraphic}
            />
          </SimpleGrid>
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
