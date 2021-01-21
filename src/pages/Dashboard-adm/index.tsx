import React from 'react';

// import { FiMaximize, FiPrinter, FiEdit } from 'react-icons/fi';

import CardGraphic from '../../components/GraphicModels/CardGraphic';

// import GraphicBar from '../../components/GraphicModels/GraphicBar';
// import GraphicPie from '../../components/GraphicModels/GraphicPie';
// import GraphicLine from '../../components/GraphicModels/GraphicLine';
// import GraphicBump from '../../components/GraphicModels/GraphicBump';

import {
  Conatiner,

  // GraphicTitle,
  // CardGraphicText,
} from './styles';

// interface PropsArray {
//   name: string;
// }

const Dashboard: React.FC = () => {
  const array = [];
  const temp1 = {
    name: 'Matriz',
    valor: '2',
    border: '#7fdaea',
    backcolor: '#f1fafc',
  };
  const temp2 = {
    name: 'UPL I',
    valor: '3',
    border: '#fef0cf',
    backcolor: '#fdfaf1',
  };
  const temp3 = {
    name: 'Crechario',
    valor: '4',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
  };
  array.push(temp1);
  array.push(temp2);
  array.push(temp3);

  return (
    <>
      <Conatiner>
        {array.map(ar => (
          <CardGraphic
            key={ar.valor}
            backcolor={ar.backcolor}
            border={ar.border}
            name={ar.name}
          />
        ))}

        {/* <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Desempenho mensal</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          <GraphicBar />
        </CardGraphic> */}

        {/* <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Desempenho metas gerais</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          <GraphicPie />
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Análise critica</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>

          <GraphicLine />
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Rotina interna</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>

          <GraphicBump />
        </CardGraphic> */}
      </Conatiner>
    </>
  );
};

export default Dashboard;
