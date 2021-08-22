import React from 'react';

import Chart from 'react-apexcharts';

interface ColorStyles {
  color?: string;
  width: number;
  height: number;
  resultData: number;
}

const GraphicBarApex: React.FC<ColorStyles> = ({
  width,
  height,
  resultData,
}) => {
  const options = {
    colors: ['#77B6EA', '#545454'],
    series: [
      {
        name: 'Metas',
        data: [5.61, 5.43, 4.75, 4.77, 4.45, 4.33, 4.17],
      },
      {
        name: 'Resultados',
        data: [4.85, 3.14, 2.86, 2.97, 3.24, 3.57, resultData],
      },
    ],
    dataLabels: {
      enabled: true,
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
      ],
    },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type="line"
        width={width}
        height={height}
      />
    </div>
  );
};

export default GraphicBarApex;
