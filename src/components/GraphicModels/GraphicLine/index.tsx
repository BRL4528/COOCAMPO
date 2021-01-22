import React from 'react';

import { Line } from '@reactchartjs/react-chart.js';
// import { ResponsiveLine } from '@nivo/line';

const data = {
  labels: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  datasets: [
    {
      data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
      label: 'Matriz',
      borderColor: '#49afee',
      fill: false,
    },
    {
      data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
      label: 'UPL',
      borderColor: '#b84ae7',
      fill: false,
    },
    {
      data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
      label: 'Crechario',
      borderColor: '#42e7c4',
      fill: false,
    },
    {
      data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
      label: 'Confinamento',
      borderColor: '#ff0000',
      fill: false,
    },
    {
      data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
      label: 'Veterinaria',
      borderColor: '#fff243',
      fill: false,
    },
  ],
};

const GraphicPie: React.FC = () => {
  return (
    <Line
      type="line"
      // chartArea={area}
      redraw
      data={data}
      // options={options}
    />
    // <ResponsiveLine
    //   data={data}
    //   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    //   xScale={{ type: 'point' }}
    //   yScale={{
    //     type: 'linear',
    //     min: 'auto',
    //     max: 'auto',
    //     stacked: true,
    //     reverse: false,
    //   }}
    //   yFormat=" >-.2f"
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     orient: 'bottom',
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: 'transportation',
    //     legendOffset: 36,
    //     legendPosition: 'middle',
    //   }}
    //   axisLeft={{
    //     orient: 'left',
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: 'count',
    //     legendOffset: -40,
    //     legendPosition: 'middle',
    //   }}
    //   pointSize={10}
    //   pointColor={{ theme: 'background' }}
    //   pointBorderWidth={2}
    //   pointBorderColor={{ from: 'serieColor' }}
    //   pointLabelYOffset={-12}
    //   useMesh
    //   legends={[
    //     {
    //       anchor: 'bottom-right',
    //       direction: 'column',
    //       justify: false,
    //       translateX: 100,
    //       translateY: 0,
    //       itemsSpacing: 0,
    //       itemDirection: 'left-to-right',
    //       itemWidth: 80,
    //       itemHeight: 20,
    //       itemOpacity: 0.75,
    //       symbolSize: 12,
    //       symbolShape: 'circle',
    //       symbolBorderColor: 'rgba(0, 0, 0, .5)',
    //       effects: [
    //         {
    //           on: 'hover',
    //           style: {
    //             itemBackground: 'rgba(0, 0, 0, .03)',
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />
  );
};

export default GraphicPie;
