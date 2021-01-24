import React from 'react';

import { Pie } from '@reactchartjs/react-chart.js';

const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
  datasets: [
    {
      data: [86, 200, 50, 40, 150, 111, 10],
      label: 'Matriz',
      backgroundColor: '#0189dd',
      // fill: false,
    },
  ],
};

const GraphicPie: React.FC = () => {
  return (
    <Pie
      type="doughnut"
      // chartArea={area}
      // redraw
      data={data}
      // options={options}
    />
  );
};

export default GraphicPie;
