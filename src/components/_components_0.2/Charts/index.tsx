import React, { useState, useCallback } from 'react';
import {
  theme,
  Box,
  Text,
  Flex,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { DrawerEditGraphcs } from '../Drawer/DrawerEditGraphcs';
import { MenuChart } from '../MenuChart';

interface DateGraphicState {
  date_start: string;
  date_end: string;
}

interface PropsDrawer {
  title: string;
  categories: string[];
  loading: boolean;
  handleSendDataGraphic: (date: Omit<DateGraphicState, ''>) => void;
  series: {
    name: string;
    data: number[];
  }[];
}

export function ChartMiles({
  title,
  series,
  categories,
  loading,
  handleSendDataGraphic,
}: PropsDrawer) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handle = useFullScreenHandle();

  const [typeGraphic, setTypeGraphic] = useState();
  const [identificationGraphic, seIdentificationGraphic] = useState();

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },

    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      // enabled: false,
      theme: 'dark',
    },
    xaxis: {
      type: 'category',
      axisBorder: {
        color: theme.colors.gray[600],
      },
      categories,
    },

    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };
  // const seriesExample = [
  //   {
  //     name: 'atualize os dados',
  //     data: [0],
  //   },
  // ];
  const handleSendTypeGraphic = useCallback(type => {
    const typeFormated = type.split('-', 1);
    const IdentificationFormated = type.split('-', 2);
    seIdentificationGraphic(IdentificationFormated[1]);

    setTypeGraphic(typeFormated[0]);
  }, []);

  const handleAddTitleinDateGrafic = useCallback(
    (date: Omit<DateGraphicState, 'e'>) => {
      const { date_end, date_start } = date;

      const formatedData = {
        date_end,
        date_start,
        title,
      };
      handleSendDataGraphic(formatedData);
    },
    [handleSendDataGraphic, title],
  );

  return (
    <>
      <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4" height={270}>
        <DrawerEditGraphcs
          isOpen={isOpen}
          onClose={onClose}
          graphicTitle={title}
          handleSendTypeGraphic={handleSendTypeGraphic}
          handleSendDataGraphic={handleAddTitleinDateGrafic}
        />
        <FullScreen handle={handle}>
          {loading ? (
            <Flex textAlign="center" justify="center">
              <Spinner size="sm" />
            </Flex>
          ) : (
            <>
              <Flex justifyContent="space-between">
                <Text fontSize="lg" mb="4">
                  {title}
                </Text>

                <MenuChart onOpen={onOpen} handle={handle} />
              </Flex>
              <Chart
                options={options}
                series={series}
                type={title === identificationGraphic ? typeGraphic : 'area'}
                height={handle.active ? '95%' : 160}
              />
            </>
          )}
        </FullScreen>
      </Box>
    </>
  );
}
