import React, { useCallback, useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import ReactToPrint from 'react-to-print';

import {
  FiEdit,
  FiPrinter,
  FiMaximize,
  // FiChevronsDown,
  FiGrid,
} from 'react-icons/fi';

import Button from '../../../../components/Global/Button';
import ModalAddGoals from '../../../../components/Admin/Modal/ModalAddSector';
import ModalEditGoals from '../../../../components/Admin/Modal/ModalEditSector';

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
import { api } from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';

interface ISector {
  id: string;
  name: string;
  leader: string;
  observations?: string;
  codccu?: string;
}

interface IDataSectorToUser {
  access_id: string;
  sector_id: string;
  sector: {
    id: string;
    name: string;
    leader: string;
    branch: string;
    observations?: string;
    codccu?: string;
  };
}

interface PropsItem {
  title?: string;
}

const SelectorFolders: React.FC<PropsItem> = ({ title }) => {
  const handle = useFullScreenHandle();
  const { user } = useAuth();

  const componentRef = useRef<HTMLDivElement>(null);

  const [modalEditSectorOpen, setModalEditSectorOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [dataEditSector, setDataEditSector] = useState('');

  const [dataSector, setDataSector] = useState<ISector>();
  const [dataUpdateSector, setDataUpdateSector] = useState<ISector[]>([]);

  // const [grupSectorsSelected, setGrupSectorsSelected] = useState<string[]>([]);

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

  // const togleOpenCard = useCallback(() => {
  //   setIsOpen(true);
  // }, []);

  const handlePrint = useCallback(id => {
    const el = document.getElementById(id);
    return el;
  }, []);

  // const handleHepand = useCallback(
  //   (id: string) => {
  //     setIsOpen(!isOpen);
  //     const alreadySelected = grupSectorsSelected.findIndex(
  //       (item: string) => item === id,
  //     );

  //     if (alreadySelected >= 0) {
  //       const filteredItems = grupSectorsSelected.filter(
  //         (item: string) => item !== id,
  //       );

  //       setGrupSectorsSelected(filteredItems);
  //     } else {
  //       setGrupSectorsSelected([...grupSectorsSelected, id]);
  //     }
  //   },
  //   [grupSectorsSelected, isOpen],
  // );

  useEffect(() => {
    if (user.tag !== 'admin') {
      api
        .get<IDataSectorToUser[]>(`/accesses-of-sectors/${user.id}`)
        .then(response => {
          const dataFormated = response.data.map(data => {
            return data.sector;
          });

          setDataUpdateSector(dataFormated);
        });
    } else {
      api.get('/sectors').then(response => {
        setDataUpdateSector(response.data);
      });
    }
  }, [dataSector, user.id, user.tag]);

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
        <CardeHeader titleItem={title}>
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
              // className={
              //   grupSectorsSelected.includes(sector.id) ? 'selected' : ''
              // }
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
                  <Link to={`/management-ppr/sector-resume?${sector.id}`}>
                    <FiGrid />
                  </Link>
                  {/* <FiChevronsDown
                    className={
                      grupSectorsSelected.includes(sector.id) ? 'logo' : ''
                    }
                    onClick={() => handleHepand(sector.id)}
                  /> */}
                </span>
              </CardGraphicText>

              {/* <div
                className={
                  grupSectorsSelected.includes(sector.id) ? 'selected' : ''
                }
              >
                {loadingSectors ? (
                  <>
                    <Table
                      idSector={sector.id}
                      isOpen={isOpen}
                      startOpen={false}
                      setIsOpen={togleOpenCard}
                      month={subject}
                    />
                  </>
                ) : (
                  <div>Aguardando carregar o filtro...</div>
                )}
              </div> */}
            </CardGraphic>
          </FullScreen>
        ))}
      </Container>
    </>
  );
};

export default SelectorFolders;
