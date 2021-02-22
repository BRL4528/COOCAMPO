/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-return-assign */
/* eslint-disable no-alert */
import React, { useCallback, useState, useRef, useEffect } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { useReactToPrint } from 'react-to-print';

import { FiEdit, FiPrinter, FiMaximize, FiChevronsDown } from 'react-icons/fi';

import { React15Tabulator } from 'react-tabulator';

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css';
// import GraphicSpeedometer from '../../../components/Global/GraphicModels/GraphicSpeedometer';

import Button from '../../../components/Global/Button';
import ModalAddGoals from '../../../components/Admin/Modal/ModalAddSector';

import {
  Container,
  CardeHeader,
  CardButton,
  CardGraphic,
  GraphicTitle,
  // GraphicSpeed,
  // CardBodyGoals,
  CardGraphicText,
} from './styles';
import api from '../../../services/api';

interface ISector {
  id: string;
  name: string;
  leader: string;
  observations: string;
}

const SelectorFolders: React.FC = () => {
  const tableRef = useRef(null);
  const handle = useFullScreenHandle();

  const componentRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [dataSector, setDataSector] = useState<ISector>();
  const [dataUpdateSector, setDataUpdateSector] = useState<ISector[]>([]);

  // const [checked, setChecked] = useState(true);
  const [grupSectorsSelected, setGrupSectorsSelected] = useState<string[]>([]);

  console.log('teste', grupSectorsSelected);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleHepand = useCallback(
    (id: string) => {
      const alreadySelected = grupSectorsSelected.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = grupSectorsSelected.filter(
          (item: string) => item !== id,
        );

        setGrupSectorsSelected(filteredItems);
      } else {
        setGrupSectorsSelected([...grupSectorsSelected, id]);
      }
    },
    [grupSectorsSelected],
  );

  useEffect(() => {
    api.get('/sectors').then(response => {
      setDataUpdateSector(response.data);
    });
  }, [dataSector]);

  const handleSector = useCallback((sector: Omit<ISector, ''>) => {
    try {
      const sectorData = sector;
      setDataSector(sectorData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const columns = [
    { title: 'Nome', field: 'name', width: 300 },
    { title: 'Peso', field: 'weight', align: 'center' },
    { title: 'Resultado', field: 'result', align: 'center' },
    { title: 'Alcance', field: 'age', align: 'left', formatter: 'progress' },
    { title: 'Mês corrente', field: 'dob', align: 'center' },
    { title: 'Etrelas', field: 'rating', align: 'center', formatter: 'star' },
    {
      title: 'Realizado',
      field: 'passed',
      align: 'center',
      formatter: 'tickCross',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Resultado financeiro',
      age: '12',
      weight: '80%',
      result: '75%',
      dob: 'Janeiro',
      rating: 5,
      passed: false,
      goal: 'Meta global',
      // subgoal: 'Meta global',
    },
    {
      id: 2,
      name: 'Incorformidades dos orçamentos',
      age: '1',
      weight: '1%',
      result: '1%',
      dob: 'Janeiro',
      rating: 4,
      passed: true,
      goal: 'Metas do setor',
    },
    {
      id: 3,
      name: 'Avaliação do gestor',
      age: '42',
      weight: '10%',
      result: '7%',
      dob: 'Outubro',
      rating: 4,
      passed: false,
      goal: 'Meta Individual',
      // subgoal: 'Meta Individual',
    },
    {
      id: 4,
      name: 'Dispêndios/Despesas com Pessoal',
      age: '125',
      weight: '0.5%',
      result: '0.5%',
      dob: 'Janeiro',
      rating: 4.5,
      passed: true,
      goal: 'Metas do setor',
      // subgoal: 'Metas do setor',
    },
    {
      id: 5,
      name: 'Manutenção de Máquinas e equipamentos',
      age: '16',
      weight: '0.5%',
      result: '0.5%',
      dob: 'Janeiro',
      rating: 4,
      passed: false,
      goal: 'Metas do setor',
    },
    {
      id: 6,
      name: 'Manutenção de Edifícios e Construção',
      age: '37',
      weight: '0.5%',
      result: '0.5%',
      dob: 'Janeiro',
      rating: 4,
      passed: true,
      goal: 'Metas do setor',
    },
    {
      id: 7,
      name: 'Atendimento as normas do MAPA',
      age: '37',
      weight: '2.5%',
      result: '2%',
      dob: 'Janeiro',
      rating: 4,
      passed: true,
      goal: 'Metas do setor',
    },
    {
      id: 8,
      name: 'Atendimento as normas da SST',
      age: '37',
      weight: '2.5%',
      result: '1.5%',
      dob: 'Janeiro',
      rating: 4,
      passed: true,
      goal: 'Metas do setor',
    },
  ];
  const options = {
    groupBy: ['goal'],
    layout: 'fitColumns',
    movableRows: true,
    groupStartOpen: false,
    groupHeader: [
      function (value: any) {
        // generate header contents for gender groups
        return `${value}<span style=' color: var(--text-primary);; margin-left:10px;'>(Em Janeiro atingiu 50% de 75%)</span>`;
      },
    ],
  };

  return (
    <>
      <ModalAddGoals
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleSector={handleSector}
      />
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

        {dataUpdateSector.map(sector => (
          <FullScreen key={sector.id} handle={handle}>
            <CardGraphic
              // className="fullscreen-item"
              className={
                grupSectorsSelected.includes(sector.id) ? 'selected' : ''
              }
              ref={componentRef}
            >
              {/* Header */}
              <CardGraphicText>
                <GraphicTitle>{sector.name}</GraphicTitle>
                <span>
                  <FiEdit />
                  <FiPrinter onClick={handlePrint} />
                  <FiMaximize onClick={handle.enter} />
                  <FiChevronsDown
                    className={
                      grupSectorsSelected.includes(sector.id) ? 'logo' : ''
                    }
                    onClick={() => handleHepand(sector.id)}
                  />
                </span>
              </CardGraphicText>

              {/* <CardBodyGoals>
                <GraphicSpeed>
                  <CardGraphicText>
                    <GraphicTitle>Meta 03</GraphicTitle>
                  </CardGraphicText>
                  <GraphicSpeedometer dataValue={450} />
                </GraphicSpeed>
              </CardBodyGoals> */}
              <div
                className={
                  grupSectorsSelected.includes(sector.id) ? 'selected' : ''
                }
              >
                <React15Tabulator
                  ref={tableRef}
                  columns={columns}
                  data={data}
                  // rowClick={this.rowClick}
                  options={options}
                  data-custom-attr="test-custom-attribute"
                  className="custom-css-class"
                />
              </div>
            </CardGraphic>
          </FullScreen>
        ))}
      </Container>
    </>
  );
};

export default SelectorFolders;
