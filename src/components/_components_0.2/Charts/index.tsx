import {
  theme,
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import { FiMenu, FiMaximize, FiEdit } from 'react-icons/fi';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { DrawerEditGraphcs } from '../Drawer/DrawerEditGraphcs';

interface PropsDrawer {
  title: string;
  categories: string[];

  series: {
    name: string;
    data: number[];
  }[];
}

export function ChartMiles({ title, series, categories }: PropsDrawer) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handle = useFullScreenHandle();
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
  return (
    <>
      <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4" height={270}>
        <DrawerEditGraphcs isOpen={isOpen} onClose={onClose} />
        <FullScreen handle={handle}>
          <Flex justifyContent="space-between">
            <Text fontSize="lg" mb="4">
              {title}
            </Text>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FiMenu color={theme.colors.gray[500]} />}
                // variant="outline"
                colorScheme="outline"
              />
              <MenuList>
                <MenuItem
                  i
                  command="⌘T"
                  onClick={handle.enter}
                  color="gray.600"
                  icon={<FiMaximize />}
                >
                  Maximize
                </MenuItem>
                <MenuItem
                  command="⌘N"
                  color="gray.600"
                  icon={<FiEdit />}
                  onClick={onOpen}
                >
                  Editar parâmetros
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Chart
            options={options}
            series={series}
            type="area"
            height={handle.active ? '95%' : 160}
          />
        </FullScreen>
      </Box>
    </>
  );
}
