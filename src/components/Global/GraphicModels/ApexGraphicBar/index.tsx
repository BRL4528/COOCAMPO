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
        name: 'Resultado',
        data: [4.85, 3.14, 2.86, 2.97, 3.24, 3.57, 3.56, result],
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
