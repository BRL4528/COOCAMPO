import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

import { Container } from './styles';

const GrapichBar: React.FC = () => {
  const data = [
    {
      country: 'Janeiro',

      meta01: 200,
      meta01Color: 'hsl(353, 70%, 50%)',
    },
    {
      country: 'Fevereiro',
      meta02: 500,
      meta02Color: 'hsl(257, 70%, 50%)',
    },
    {
      country: 'Março',

      meta03: 350,
      meta03Color: 'hsl(276, 70%, 50%)',
    },
    {
      country: 'Abril',

      meta04: 800,
      meta04Color: 'hsl(229, 70%, 50%)',
    },
    {
      country: 'Maio',
      meta05: 188,
      meta05Color: 'hsl(238, 70%, 50%)',
    },
    {
      country: 'Junho',

      meta06: 150,
      meta06Color: 'hsl(117, 70%, 50%)',
    },
    {
      country: 'Julho',

      meta01: 157,
      meta01Color: 'hsl(124, 70%, 50%)',
    },
  ];

  return (
    <Container>
      <ResponsiveBar
        data={data}
        keys={['meta01', 'meta02', 'meta03', 'meta04', 'meta05', 'meta06']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="stacked"
        layout="horizontal"
        enableGridX
        enableGridY
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: false }}
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
              id: 'Meta03',
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
          // legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'food',
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
    </Container>
  );
};

export default GrapichBar;
