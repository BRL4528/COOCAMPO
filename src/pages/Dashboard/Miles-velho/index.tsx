import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import { HeaderUp } from '../../../components/_components_0.2/Header_0.2';
// import { Sidebar } from '../../../components/_components_0.2/Sidebar_0.2';

const options: ApexOptions = {
  chart: {
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
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
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

const series = [
  {
    name: 'Taxa',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
];
const veiculo = [
  {
    name: 'Taxa',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
  {
    name: 'veiculo1',
    data: [21, 180, 10, 68, 21, 18, 209],
  },
  {
    name: 'veiculo2',
    data: [81, 190, 20, 48, 31, 88, 309],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <HeaderUp path="miles" />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        {/* <Sidebar path="miles" /> */}

        <SimpleGrid
          columns={2}
          flex="1"
          spacing={10}
          minChildWidth="420px"
          align="flex-start"
          // width="100%"
        >
          <Box
            p={['4', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            height={270}
          >
            <Text fontSize="lg" mb="4">
              Taxa de utiliza????o
            </Text>

            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            p={['4', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            height={270}
          >
            <Text fontSize="lg" mb="4">
              Quilometros rodados
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            p={['4', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            height={270}
          >
            <Text fontSize="lg" mb="4">
              M??dia por quilometragen
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box
            p={['4', '8']}
            bg="gray.800"
            borderRadius={8}
            pb="4"
            height={270}
          >
            <Text fontSize="lg" mb="4">
              Quilometragem por veiculo
            </Text>
            <Chart
              options={options}
              series={veiculo}
              type="area"
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
