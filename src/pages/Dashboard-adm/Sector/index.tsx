import React, { useCallback, useState, useRef, useEffect } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { useReactToPrint } from 'react-to-print';

import { FiEdit, FiPrinter, FiMaximize, FiChevronsDown } from 'react-icons/fi';

import Button from '../../../components/Global/Button';
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
import api from '../../../services/api';

interface ISector {
  id: string;
  name: string;
  leader: string;
  observations?: string;
}

const SelectorFolders: React.FC = () => {
  const handle = useFullScreenHandle();

  const componentRef = useRef<HTMLDivElement>(null);

  const [modalEditSectorOpen, setModalEditSectorOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [dataEditSector, setDataEditSector] = useState('');

  const [dataSector, setDataSector] = useState<ISector>();
  const [dataUpdateSector, setDataUpdateSector] = useState<ISector[]>([]);

  const [grupSectorsSelected, setGrupSectorsSelected] = useState<string[]>([]);

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
                  <FiEdit onClick={() => handleEdit(sector.id)} />
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
                <Table
                  idSector={sector.id}
                  isOpen={isOpen}
                  setIsOpen={togleOpenCard}
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
