import React, { useCallback, useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import ReactToPrint from 'react-to-print';

import {
  FiEdit,
  FiPrinter,
  FiMaximize,
  FiChevronsDown,
  FiGrid,
} from 'react-icons/fi';

import Button from '../../../components/Global/Button';
import Select from '../../../components/Global/SelectRelease';
import ModalAddGoals from '../../../components/Admin/Modal/ModalAddSector';
import ModalEditGoals from '../../../components/Admin/Modal/ModalEditSector';
import Table from '../../../components/Admin/Table';

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
import { api } from '../../../services/api';

interface ISector {
  id: string;
  name: string;
  leader: string;
  observations?: string;
  codccu?: string;
}

const SelectorFolders: React.FC = () => {
  const handle = useFullScreenHandle();

  const componentRef = useRef<HTMLDivElement>(null);

  const [loadingSectors, setLoadingSectors] = useState(true);

  const [subject, setSubject] = useState('01/january/2021');

  const [modalEditSectorOpen, setModalEditSectorOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [dataEditSector, setDataEditSector] = useState('');

  const [dataSector, setDataSector] = useState<ISector>();
  const [dataUpdateSector, setDataUpdateSector] = useState<ISector[]>([]);

  const [grupSectorsSelected, setGrupSectorsSelected] = useState<string[]>([]);

  const handleLoadingSectors = useCallback(() => {
    setLoadingSectors(!loadingSectors);
  }, [loadingSectors]);

  const handleSubject = useCallback(
    e => {
      setLoadingSectors(false);
      setSubject(e);
    },
    [setSubject],
  );

  const toggleModal = useCallback(() => {
    setDataEditSector('');
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleModalEditSector = useCallback(() => {
    setDataEditSector('');
    setModalEditSectorOpen(!modalEditSectorOpen);
  }, [modalEditSectorOpen]);

  const handleEdit = useCallback((idSector: string) => {
    setModalEditSectorOpen(true);
    setDataEditSector(idSector);
  }, []);

  const togleOpenCard = useCallback(() => {
    setIsOpen(true);
  }, []);

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const handlePrint = useCallback(id => {
    const el = document.getElementById(id);
    return el;
  }, []);

  const handleHepand = useCallback(
    (id: string) => {
      setIsOpen(!isOpen);
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
    [grupSectorsSelected, isOpen],
  );

  // useEfect(() => {
  //   apiGeninfo.
  // })

  useEffect(() => {
    api.get('/sectors').then(response => {
      setDataUpdateSector(response.data);
    });
  }, [dataSector, subject]);

  const handleSector = useCallback((sector: Omit<ISector, ''>) => {
    try {
      const sectorData = sector;
      setDataSector(sectorData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <ModalAddGoals
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleSector={handleSector}
        dataEditSector={dataEditSector}
        // setDataEditSector={setHandleEdit}
      />
      <ModalEditGoals
        isOpen={modalEditSectorOpen}
        setIsOpen={toggleModalEditSector}
        handleSector={handleSector}
        dataEditSector={dataEditSector}
        // setDataEditSector={setHandleEdit}
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
        <span>
          <fieldset>
            <Select
              name="subject"
              label="Mês referência"
              value={subject}
              onChange={e => {
                handleSubject(e.target.value);
              }}
              options={[
                { value: '01/january/2021', label: 'Janeiro' },
                { value: '01/february/2021', label: 'Fevereiro' },
                { value: '01/march/2021', label: 'Março' },
                { value: '01/april/2021', label: 'Abril' },
                { value: '01/may/2021', label: 'Maio' },
                { value: '01/june/2021', label: 'Junho' },
                { value: '01/july/2021', label: 'Julho' },
                { value: '01/august/2021', label: 'Agosto' },
                { value: '01/september/2021', label: 'Setembro' },
                { value: '01/october/2021', label: 'Outubro' },
                { value: '01/november/2021', label: 'Novembro' },
                { value: '01/december/2021', label: 'Dezembro' },
              ]}
            />
          </fieldset>
          <Button type="button" onClick={() => handleLoadingSectors()}>
            {loadingSectors ? 'Limpar' : 'Carregar'}
          </Button>
        </span>

        {dataUpdateSector.map(sector => (
          <FullScreen key={sector.id} handle={handle}>
            <CardGraphic
              // className="fullscreen-item"
              className={
                grupSectorsSelected.includes(sector.id) ? 'selected' : ''
              }
              id={sector.id}
              ref={componentRef}
            >
              {/* Header */}
              <CardGraphicText>
                <GraphicTitle>
                  <h3>{sector.name}</h3>

                  <p>
                    Centro de custo:
                    {sector.codccu}
                  </p>
                </GraphicTitle>
                <span>
                  <FiEdit onClick={() => handleEdit(sector.id)} />
                  <ReactToPrint
                    trigger={() => <FiPrinter />}
                    content={() => handlePrint(sector.id)}
                  />
                  <FiMaximize onClick={handle.enter} />
                  <Link to={`sector-selected?${sector.id}`}>
                    <FiGrid />
                  </Link>
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
                {loadingSectors ? (
                  <>
                    <Table
                      idSector={sector.id}
                      isOpen={isOpen}
                      setIsOpen={togleOpenCard}
                      month={subject}
                    />
                  </>
                ) : (
                  <div>Aguardando carregar o filtro...</div>
                )}
              </div>
            </CardGraphic>
          </FullScreen>
        ))}
      </Container>
    </>
  );
};

export default SelectorFolders;
