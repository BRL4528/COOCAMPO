import React from 'react';

import { ResponsiveBar } from '@nivo/bar';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import { Conatiner } from './styles';

const Dashboard: React.FC = () => {
  const data = [
    {
      country: 'AD',
      'hot dog': 59,
      'hot dogColor': 'hsl(278, 70%, 50%)',
      burger: 178,
      burgerColor: 'hsl(247, 70%, 50%)',
      sandwich: 75,
      sandwichColor: 'hsl(353, 70%, 50%)',
      kebab: 91,
      kebabColor: 'hsl(213, 70%, 50%)',
      fries: 162,
      friesColor: 'hsl(175, 70%, 50%)',
      donut: 28,
      donutColor: 'hsl(15, 70%, 50%)',
    },
    {
      country: 'AE',
      'hot dog': 56,
      'hot dogColor': 'hsl(257, 70%, 50%)',
      burger: 30,
      burgerColor: 'hsl(68, 70%, 50%)',
      sandwich: 45,
      sandwichColor: 'hsl(59, 70%, 50%)',
      kebab: 160,
      kebabColor: 'hsl(199, 70%, 50%)',
      fries: 81,
      friesColor: 'hsl(31, 70%, 50%)',
      donut: 56,
      donutColor: 'hsl(113, 70%, 50%)',
    },
    {
      country: 'AF',
      'hot dog': 142,
      'hot dogColor': 'hsl(195, 70%, 50%)',
      burger: 197,
      burgerColor: 'hsl(283, 70%, 50%)',
      sandwich: 159,
      sandwichColor: 'hsl(182, 70%, 50%)',
      kebab: 170,
      kebabColor: 'hsl(2, 70%, 50%)',
      fries: 120,
      friesColor: 'hsl(276, 70%, 50%)',
      donut: 12,
      donutColor: 'hsl(2, 70%, 50%)',
    },
    {
      country: 'AG',
      'hot dog': 159,
      'hot dogColor': 'hsl(96, 70%, 50%)',
      burger: 55,
      burgerColor: 'hsl(172, 70%, 50%)',
      sandwich: 181,
      sandwichColor: 'hsl(295, 70%, 50%)',
      kebab: 88,
      kebabColor: 'hsl(229, 70%, 50%)',
      fries: 113,
      friesColor: 'hsl(178, 70%, 50%)',
      donut: 191,
      donutColor: 'hsl(228, 70%, 50%)',
    },
    {
      country: 'AI',
      'hot dog': 188,
      'hot dogColor': 'hsl(238, 70%, 50%)',
      burger: 130,
      burgerColor: 'hsl(289, 70%, 50%)',
      sandwich: 177,
      sandwichColor: 'hsl(50, 70%, 50%)',
      kebab: 199,
      kebabColor: 'hsl(86, 70%, 50%)',
      fries: 85,
      friesColor: 'hsl(277, 70%, 50%)',
      donut: 149,
      donutColor: 'hsl(234, 70%, 50%)',
    },
    {
      country: 'AL',
      'hot dog': 21,
      'hot dogColor': 'hsl(305, 70%, 50%)',
      burger: 197,
      burgerColor: 'hsl(274, 70%, 50%)',
      sandwich: 150,
      sandwichColor: 'hsl(117, 70%, 50%)',
      kebab: 107,
      kebabColor: 'hsl(81, 70%, 50%)',
      fries: 78,
      friesColor: 'hsl(25, 70%, 50%)',
      donut: 198,
      donutColor: 'hsl(310, 70%, 50%)',
    },
    {
      country: 'AM',
      'hot dog': 3,
      'hot dogColor': 'hsl(198, 70%, 50%)',
      burger: 105,
      burgerColor: 'hsl(196, 70%, 50%)',
      sandwich: 117,
      sandwichColor: 'hsl(12, 70%, 50%)',
      kebab: 102,
      kebabColor: 'hsl(351, 70%, 50%)',
      fries: 157,
      friesColor: 'hsl(124, 70%, 50%)',
      donut: 163,
      donutColor: 'hsl(32, 70%, 50%)',
    },
  ];

  return (
    <>
      <Header>
        <span>Dashboard</span>
      </Header>
      <Sidebar />
      <Conatiner>
        <span>Teste</span>
        <ResponsiveBar
          data={data}
          keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: 'fries',
              },
              id: 'dots',
            },
            {
              match: {
                id: 'sandwich',
              },
              id: 'lines',
            },
          ]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
        />

        <ResponsiveBar
          data={data}
          keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: 'fries',
              },
              id: 'dots',
            },
            {
              match: {
                id: 'sandwich',
              },
              id: 'lines',
            },
          ]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </Conatiner>
    </>
  );
};

export default Dashboard;
