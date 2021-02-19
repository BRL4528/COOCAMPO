import React from 'react';

import Chart from 'react-apexcharts';

const GraphicBarApex: React.FC = () => {
  const option = {
    options: {},
    colors: ['#240dac'],
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E'],
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>Grafico de barra</h2>
      <Chart
        options={option}
        series={option.series}
        type="pie"
        width={500}
        height={320}
      />
    </div>
  );
};

export default GraphicBarApex;
