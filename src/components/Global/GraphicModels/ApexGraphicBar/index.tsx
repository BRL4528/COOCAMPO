import React from 'react';

import Chart from 'react-apexcharts';

interface ColorStyles {
  color?: string;
  title: string;
  width: number;
  height: number;
  result: number;
}

const GraphicBarApex: React.FC<ColorStyles> = ({
  title,
  width,
  height,
  result,
}) => {
  const options = {
    series: [
      {
        name: 'Metas',
        data: [5.61, 5.43, 4.75, 4.77, 4.45, 4.33, 4.17, 4.05, 3.95],
        color: '#118DFF',
      },
      {
        name: 'Resultados',
        data: [4.85, 3.14, 2.86, 2.97, 3.24, 3.57, 3.56, 3.25, result],
        color: '#E2C90A',
      },
    ],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },

    xaxis: {
      categories: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
      ],
    },
    // chart: {
    //   height: 350,
    //   type: 'line',
    // },
    // stroke: {
    //   width: [0, 4],
    // },

    // dataLabels: {
    //   enabled: true,
    //   enabledOnSeries: [1],
    // },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>{title}</h2>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={width}
        height={height}
      />
    </div>
  );
};

export default GraphicBarApex;
