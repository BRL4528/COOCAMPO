import React from 'react';

import Chart from 'react-apexcharts';

const GraphicBarApex: React.FC = () => {
  const option = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: [
      'Adm Central',
      'Veterinaria',
      'Supercooasgo',
      'Confinamento',
      'Expedição',
    ],
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>Resultado por setor</h2>
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
