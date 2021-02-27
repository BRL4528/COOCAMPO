import React from 'react';

import Chart from 'react-apexcharts';

interface ColorStyles {
  color: string;
}

const GraphicBarApex: React.FC<ColorStyles> = ({ color }) => {
  const options = {
    colors: [color],
    series: [
      {
        name: 'sales',

        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [
        'Matriz',
        'Vet.',
        'Confi.',
        1994,
        1995,
        1996,
        1997,
        1998,
        1999,
      ],
    },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>Grafico de barra</h2>
      <Chart
        options={options}
        series={options.series}
        type="line"
        width={500}
        height={320}
      />
    </div>
  );
};

export default GraphicBarApex;
