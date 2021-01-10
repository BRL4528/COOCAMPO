import React from 'react';

import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'japan',
    color: 'hsl(351, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 271,
      },
      {
        x: 'helicopter',
        y: 222,
      },
      {
        x: 'boat',
        y: 256,
      },
      {
        x: 'train',
        y: 289,
      },
      {
        x: 'subway',
        y: 47,
      },
      {
        x: 'bus',
        y: 279,
      },
      {
        x: 'car',
        y: 49,
      },
      {
        x: 'moto',
        y: 230,
      },
      {
        x: 'bicycle',
        y: 56,
      },
      {
        x: 'horse',
        y: 226,
      },
      {
        x: 'skateboard',
        y: 141,
      },
      {
        x: 'others',
        y: 292,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(178, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 213,
      },
      {
        x: 'helicopter',
        y: 93,
      },
      {
        x: 'boat',
        y: 247,
      },
      {
        x: 'train',
        y: 98,
      },
      {
        x: 'subway',
        y: 241,
      },
      {
        x: 'bus',
        y: 125,
      },
      {
        x: 'car',
        y: 34,
      },
      {
        x: 'moto',
        y: 125,
      },
      {
        x: 'bicycle',
        y: 159,
      },
      {
        x: 'horse',
        y: 11,
      },
      {
        x: 'skateboard',
        y: 126,
      },
      {
        x: 'others',
        y: 75,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(311, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 126,
      },
      {
        x: 'helicopter',
        y: 247,
      },
      {
        x: 'boat',
        y: 114,
      },
      {
        x: 'train',
        y: 54,
      },
      {
        x: 'subway',
        y: 177,
      },
      {
        x: 'bus',
        y: 274,
      },
      {
        x: 'car',
        y: 20,
      },
      {
        x: 'moto',
        y: 208,
      },
      {
        x: 'bicycle',
        y: 10,
      },
      {
        x: 'horse',
        y: 55,
      },
      {
        x: 'skateboard',
        y: 247,
      },
      {
        x: 'others',
        y: 262,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(155, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 267,
      },
      {
        x: 'helicopter',
        y: 259,
      },
      {
        x: 'boat',
        y: 105,
      },
      {
        x: 'train',
        y: 253,
      },
      {
        x: 'subway',
        y: 293,
      },
      {
        x: 'bus',
        y: 20,
      },
      {
        x: 'car',
        y: 37,
      },
      {
        x: 'moto',
        y: 212,
      },
      {
        x: 'bicycle',
        y: 39,
      },
      {
        x: 'horse',
        y: 210,
      },
      {
        x: 'skateboard',
        y: 151,
      },
      {
        x: 'others',
        y: 299,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(163, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 143,
      },
      {
        x: 'helicopter',
        y: 135,
      },
      {
        x: 'boat',
        y: 86,
      },
      {
        x: 'train',
        y: 95,
      },
      {
        x: 'subway',
        y: 170,
      },
      {
        x: 'bus',
        y: 141,
      },
      {
        x: 'car',
        y: 284,
      },
      {
        x: 'moto',
        y: 55,
      },
      {
        x: 'bicycle',
        y: 85,
      },
      {
        x: 'horse',
        y: 257,
      },
      {
        x: 'skateboard',
        y: 289,
      },
      {
        x: 'others',
        y: 57,
      },
    ],
  },
];

const GraphicPie: React.FC = () => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default GraphicPie;
