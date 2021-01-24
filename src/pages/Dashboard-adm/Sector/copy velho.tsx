/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState, useRef } from 'react';
// import { Pie } from '@reactchartjs/react-chart.js';
import ReactSpeedometer from 'react-d3-speedometer';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { useReactToPrint } from 'react-to-print';

import {
  FiEdit,
  FiPrinter,
  FiMaximize,
  FiTrendingDown,
  FiTrendingUp,
} from 'react-icons/fi';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/ModalAddGoals';

import {
  Container,
  CardeHeader,
  CardButton,
  CardGraphic,
  CardGraphicText,
  GraphicTitle,
  CardGoalsTrends,
  TrendsTitle,
  GoalItem,
  Info,
  GraphicSpeed,
  CardBodyGoals,
} from './styles';

const SelectorFolders: React.FC = () => {
  const handle = useFullScreenHandle();

  const componentRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  // const data = {
  //   // labels: ['1', '2', '3'],

  //   labels: ['Meta Global', 'Meta Setor', 'Meta Individual'],
  //   datasets: [
  //     {
  //       // width: 400,

  //       data: [12, 19, 3],

  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)',
  //       ],
  //     },
  //   ],
  // };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const options = {
  //   title: {
  //     display: true,
  //     fontSize: 20,
  //     text: 'Composição de metas',
  //   },
  // };

  // const handlePrint = useReactToPrint({
  //   content: () => <div>ererer</div>,
  // });

  return (
    <>
      <ModalAddGoals isOpen={modalOpen} setIsOpen={toggleModal} />
      <Container>
        <CardeHeader>
          <div>
            <h2>Setores</h2>
            <strong>Análise os setores da cooperativa.</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Adicionar novo setor
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        <FullScreen handle={handle}>
          <CardGraphic className="fullscreen-item" ref={componentRef}>
            <CardGraphicText>
              <GraphicTitle>Financeiro</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter onClick={handlePrint} />
                <FiMaximize onClick={handle.enter} />
              </span>
            </CardGraphicText>

            <CardBodyGoals>
              <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                  {/* <h4>Metas trends - 01/01/2021 a 01/02/2021</h4> */}
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends>

              <GraphicSpeed>
                <ReactSpeedometer
                  value={333}
                  maxSegmentLabels={2}
                  segments={1000}
                  width={100}
                />
                {/* <Pie type="pie" data={data} options={options} /> */}
              </GraphicSpeed>
            </CardBodyGoals>
            <CardBodyGoals>
              <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                  {/* <h4>Metas trends - 01/01/2021 a 01/02/2021</h4> */}
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends>

              <GraphicSpeed>
                <ReactSpeedometer
                  value={333}
                  maxSegmentLabels={2}
                  segments={1000}
                  width={100}
                />
                {/* <Pie type="pie" data={data} options={options} /> */}
              </GraphicSpeed>
            </CardBodyGoals>
            <CardBodyGoals>
              <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                  {/* <h4>Metas trends - 01/01/2021 a 01/02/2021</h4> */}
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends>

              <GraphicSpeed>
                <ReactSpeedometer
                  value={333}
                  maxSegmentLabels={2}
                  segments={1000}
                  width={100}
                />
                {/* <Pie type="pie" data={data} options={options} /> */}
              </GraphicSpeed>
            </CardBodyGoals>
            <CardBodyGoals>
              <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                  {/* <h4>Metas trends - 01/01/2021 a 01/02/2021</h4> */}
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends>

              <GraphicSpeed>
                <ReactSpeedometer
                  value={333}
                  maxSegmentLabels={2}
                  segments={1000}
                  width={100}
                />
                {/* <Pie type="pie" data={data} options={options} /> */}
              </GraphicSpeed>
            </CardBodyGoals>
            <CardBodyGoals>
              <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                  {/* <h4>Metas trends - 01/01/2021 a 01/02/2021</h4> */}
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends>

              <GraphicSpeed>
                <ReactSpeedometer
                  value={333}
                  maxSegmentLabels={2}
                  segments={1000}
                  width={100}
                />
                {/* <Pie type="pie" data={data} options={options} /> */}
              </GraphicSpeed>
            </CardBodyGoals>
          </CardGraphic>
        </FullScreen>
        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Contabilidade</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          {/* <GraphicBar /> */}
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Tecnologia da informação</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          {/* <GraphicBar /> */}
        </CardGraphic>
      </Container>
    </>
  );
};

export default SelectorFolders;
