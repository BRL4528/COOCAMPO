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
        'Adm Cent.',
        'Vet.',
        'Confi.',
        'Contab.',
        'Fab. 01',
        'Fab. 02',
        'Fat.',
        'Control.',
        'RH',
      ],
    },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>Resultado por setor</h2>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={500}
        height={320}
      />
    </div>
  );
};

export default GraphicBarApex;
