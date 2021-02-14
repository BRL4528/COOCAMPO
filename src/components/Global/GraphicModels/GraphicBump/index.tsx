import React from 'react';

import { ResponsiveBump } from '@nivo/bump';

const data = [
  {
    id: 'Matriz',
    data: [
      {
        x: 2000,
        y: 6,
      },
      {
        x: 2001,
        y: 8,
      },
      {
        x: 2002,
        y: 7,
      },
      {
        x: 2003,
        y: 11,
      },
      {
        x: 2004,
        y: 2,
      },
    ],
  },
  {
    id: 'UPL I',
    data: [
      {
        x: 2000,
        y: 5,
      },
      {
        x: 2001,
        y: 9,
      },
      {
        x: 2002,
        y: 5,
      },
      {
        x: 2003,
        y: 6,
      },
      {
        x: 2004,
        y: 12,
      },
    ],
  },
  {
    id: 'Crechario',
    data: [
      {
        x: 2000,
        y: 2,
      },
      {
        x: 2001,
        y: 1,
      },
      {
        x: 2002,
        y: 9,
      },
      {
        x: 2003,
        y: 5,
      },
      {
        x: 2004,
        y: 10,
      },
    ],
  },
  {
    id: 'Confinamento',
    data: [
      {
        x: 2000,
        y: 9,
      },
      {
        x: 2001,
        y: 12,
      },
      {
        x: 2002,
        y: 11,
      },
      {
        x: 2003,
        y: 9,
      },
      {
        x: 2004,
        y: 6,
      },
    ],
  },
  {
    id: 'Veterinaria',
    data: [
      {
        x: 2000,
        y: 4,
      },
      {
        x: 2001,
        y: 4,
      },
      {
        x: 2002,
        y: 2,
      },
      {
        x: 2003,
        y: 1,
      },
      {
        x: 2004,
        y: 3,
      },
    ],
  },
];

const GraphicPie: React.FC = () => {
  return (
    <ResponsiveBump
      data={data}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      colors={{ scheme: 'spectral' }}
      // lineWidth={3}
      // activeLineWidth={6}
      // inactiveLineWidth={3}
      // inactiveOpacity={0.15}
      animate={false}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: 'serie.color' }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
      }}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
    />
  );
};

export default GraphicPie;
