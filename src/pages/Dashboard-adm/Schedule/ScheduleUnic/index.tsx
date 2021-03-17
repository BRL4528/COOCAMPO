import React, { useCallback, useEffect, useState } from 'react';

import { FiEdit, FiSend } from 'react-icons/fi';

import Button from '../../../../components/Global/Button';
import ModalAddSchedules from '../../../../components/Admin/Modal/ModalAddSchedules';
import ModalEditSchedules from '../../../../components/Admin/Modal/ModalEditSchedules';
import api from '../../../../services/api';

import {
  Container,
  CardeHeader,
  CardButton,
  TableContainerList,
} from './styles';

interface IAnalyticModule {
  id: string;
  name: string;
  address: string;
  name_schedule: string;
}

const SelectorFolders: React.FC = () => {
  const parsed = window.location.search;
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAnalytic, setDataAnalytic] = useState<IAnalyticModule>();

  const [modalEditOpen, setModaEditOpen] = useState(false);

  const [idSchedule, setIdSchedule] = useState('');

  const [dataAnalyticModule, setDataschedulesModule] = useState<
    IAnalyticModule[]
  >([]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setModaEditOpen(!modalEditOpen);
  }, [modalEditOpen]);

  const handleEdit = useCallback(id => {
    setModaEditOpen(true);
    setIdSchedule(id);
  }, []);

  const handleSendEmail = useCallback(id => {
    setIdSchedule(id);
  }, []);

  useEffect(() => {
    api
      .get(`/schedules/show?name_schedule=${parsed.slice(1)}`)
      .then(response => {
        setDataschedulesModule(response.data);
      });
  }, [dataAnalytic, parsed]);

  const handleAnalytic = useCallback(
    (analytic: Omit<IAnalyticModule, 'status'>) => {
      try {
        const temp = analytic;
        setDataAnalytic(temp);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  return (
    <>
      <ModalAddSchedules
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAnalytic={handleAnalytic}
      />
      <ModalEditSchedules
        isOpen={modalEditOpen}
        setIsOpen={toggleEditModal}
        handleAnalytic={handleAnalytic}
        idSchedule={idSchedule}
      />

      <Container>
        <CardeHeader>
          <div>
            <h2>Agenda</h2>
            <strong>sua agenda de emails.</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Adicionar novo email
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        <TableContainerList>
          {dataAnalyticModule.map(analyticModule => (
            <span key={analyticModule.id}>
              <div>
                <main>
                  <div>
                    <strong>{analyticModule.name}</strong>
                    <p>{analyticModule.address}</p>
                  </div>
                  <span>
                    <FiSend
                      size={20}
                      onClick={() => handleSendEmail(analyticModule.id)}
                    />
                    <FiEdit
                      onClick={() => handleEdit(analyticModule.id)}
                      size={20}
                    />
                  </span>
                </main>
                <footer>
                  <p>
                    Agenda-
                    {analyticModule.name_schedule}
                  </p>
                </footer>
              </div>
            </span>
          ))}
        </TableContainerList>
      </Container>
    </>
  );
};

export default SelectorFolders;
