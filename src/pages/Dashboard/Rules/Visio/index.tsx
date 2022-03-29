/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useCallback, useState, useEffect } from 'react';

import ModalAddGoals from '../../../../components/Admin/Modal/ModalAddSector';
import ModalEditGoals from '../../../../components/Admin/Modal/ModalEditSector';

import { Container, CardeHeader } from './styles';
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
  const { user } = useAuth();

  const [modalEditSectorOpen, setModalEditSectorOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [dataEditSector, setDataEditSector] = useState('');

  const [dataSector, setDataSector] = useState<ISector>();

  // const [grupSectorsSelected, setGrupSectorsSelected] = useState<string[]>([]);

  const toggleModal = useCallback(() => {
    setDataEditSector('');
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleModalEditSector = useCallback(() => {
    setDataEditSector('');
    setModalEditSectorOpen(!modalEditSectorOpen);
  }, [modalEditSectorOpen]);

  // const togleOpenCard = useCallback(() => {
  //   setIsOpen(true);
  // }, []);

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
      api.get<IDataSectorToUser[]>(`/accesses-of-sectors/${user.id}`);
    } else {
      api.get('/sectors');
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
            <h2>Normas interna</h2>
            <strong>Visualize as normas internas da cooperativa.</strong>
          </div>
        </CardeHeader>

        <div>
          <iframe
            src="https://midascorpdev0-my.sharepoint.com/:u:/g/personal/controller_midascorp_dev/ERYHbAKTjlBGgNO1D2F6NKUBlvVw-PnIacFGCuvq_xwzxQ?e=jomW6F&amp;action=embedview"
            width="1200px"
            height="800px"
            frameBorder="0"
          >
            Este é um diagrama do{' '}
            <a target="_blank" href="https://office.com">
              Microsoft Office
            </a>{' '}
            incorporado, da plataforma{' '}
            <a target="_blank" href="https://office.com/webapps">
              Office
            </a>
          </iframe>
        </div>
      </Container>
    </>
  );
};

export default SelectorFolders;
