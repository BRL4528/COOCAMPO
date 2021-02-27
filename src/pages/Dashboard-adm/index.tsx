import React, { useCallback, useRef, useState } from 'react';

// import { useLoading, Oval } from '@agney/react-loading';

// import { FiPrinter, FiEdit, FiMaximize } from 'react-icons/fi';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import CardGraphic from '../../components/Global/GraphicModels/CardGraphic';

import GraphicBar from '../../components/Global/GraphicModels/ApexGraphicBar';
import GraphicLine from '../../components/Global/GraphicModels/ApexGraphicLine';
import GraphicPie from '../../components/Global/GraphicModels/ApexGraphicPie';

// import GraphicPie from '../../components/Global/GraphicModels/GraphicChartPie';

import {
  Conatiner,
  CardItem,
  // GraphicTitle,
  // CardGraphicText,
  CardGraphicItem,
  CardBodyGoals,
} from './styles';

const Dashboard: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [colorize, setcolorize] = useState('#240dac');

  const array = [];
  const temp1 = {
    name: 'Matriz',
    valor: '2',
    border: '#7fdaea',
    backcolor: '#f1fafc',
    data: [2.5, 2, 3, 2.5, 2, 3.5, 1],
    labels: ['12', '10', '15', '12', '10', '15'],
  };
  const temp2 = {
    name: 'UPL I',
    valor: '3',
    border: '#fed87e',
    backcolor: '#fdfaf1',
    data: [12, 19, 15, 14, 12, 9, 5],
    labels: ['12', '10', '15', '12', '10', '15'],
  };
  const temp3 = {
    name: 'Crechario',
    valor: '4',
    border: '#8ae0b7',
    backcolor: '#f1fbf7',
    data: [2.5, 2.0, 1, 2],
    labels: ['12', '19', '8', '10'],
  };
  const temp4 = {
    name: 'Confinamento',
    valor: '5',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
    data: [12, 13, 10, 10],
    labels: ['12', '19', '30', '10'],
  };
  const temp5 = {
    name: 'Veterinaria',
    valor: '6',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
    data: [10, 11, 15, 10],
    labels: ['12', '19', '30', '10'],
  };
  array.push(temp1);
  array.push(temp2);
  array.push(temp3);
  array.push(temp4);
  array.push(temp5);

  const handleColor = useCallback(() => {
    setcolorize('#a70dac');
  }, []);

  return (
    <>
      <Conatiner ref={componentRef}>
        {/* <FiPrinter onClick={handlePrint} /> */}

        <Carousel plugins={['arrows']}>
          <CardItem>
            {array.map(ar => (
              <CardGraphic
                key={ar.valor}
                backcolor={ar.backcolor}
                border={ar.border}
                name={ar.name}
                data={ar.data}
                labels={ar.labels}
              />
            ))}
          </CardItem>
        </Carousel>

        <CardBodyGoals>
          <CardGraphicItem>
            <GraphicBar color={colorize} />
          </CardGraphicItem>

          <CardGraphicItem>
            <GraphicPie />
          </CardGraphicItem>

          <CardGraphicItem>
            <GraphicLine color={colorize} />
          </CardGraphicItem>
        </CardBodyGoals>
        <CardBodyGoals>
          <CardGraphicItem>
            <GraphicBar color={colorize} />
          </CardGraphicItem>

          <CardGraphicItem>
            <GraphicPie />
          </CardGraphicItem>
          <CardGraphicItem>
            <GraphicLine color={colorize} />
          </CardGraphicItem>
        </CardBodyGoals>

        <button type="button" onClick={() => handleColor()}>
          Mudar
        </button>
      </Conatiner>
    </>
  );
};

export default Dashboard;
