import React from 'react';

import Chart from 'react-apexcharts';

interface ColorStyles {
  color?: string;
  title: string;
}

const GraphicBarApex: React.FC<ColorStyles> = ({ title }) => {
  const options = {
    series: [
      {
        name: 'Resultado',
        type: 'column',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: 'Meta',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22],
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
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
    },

    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>{title}</h2>
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
