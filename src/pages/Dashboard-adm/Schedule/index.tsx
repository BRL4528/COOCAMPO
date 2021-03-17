/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState } from 'react';

// import { FiEdit, FiSend } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import Button from '../../../components/Global/Button';
import ModalAddSchedules from '../../../components/Admin/Modal/ModalAddSchedules';
import ModalEditSchedules from '../../../components/Admin/Modal/ModalEditSchedules';
import api from '../../../services/api';

import {
  Container,
  CardeHeader,
  CardButton,
  TableContainerList,
  ContainerSchedule,
} from './styles';

interface IAnalyticModule {
  id: string;
  name: string;
  address: string;
  name_schedule: string;
  created_at?: string;
}

const SelectorFolders: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAnalytic, setDataAnalytic] = useState<IAnalyticModule>();

  const [modalEditOpen, setModaEditOpen] = useState(false);

  // const [idSchedule, setIdSchedule] = useState('');

  const [dataAnalyticModule, setDataschedulesModule] = useState<
    IAnalyticModule[]
  >([]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setModaEditOpen(!modalEditOpen);
  }, [modalEditOpen]);

  // const handleEdit = useCallback(id => {
  //   setModaEditOpen(true);
  //   setIdSchedule(id);
  // }, []);

  // const handleSendEmail = useCallback(id => {
  //   setIdSchedule(id);
  // }, []);

  useEffect(() => {
    api.get('/schedules').then(response => {
      const reduced: IAnalyticModule[] = [];
      response.data.forEach((element: IAnalyticModule) => {
        const duplicated =
          reduced.findIndex(redItem => {
            return element.name_schedule === redItem.name_schedule;
          }) > -1;

        if (!duplicated) {
          reduced.push(element);

          // const qtd = response.data.reduce(
          //   (accumulator: number, currentValue: { name_chedule: string }) => {
          //     if (currentValue.name_chedule === element.name_schedule) {
          //       return accumulator + 1;
          //     }
          //     return 1;
          //   },
          //   0,
          // );
          // itensCont.push(qtd);
          // console.log(qtd);
        }
      });
      setDataschedulesModule(reduced);
    });
  }, [dataAnalytic]);

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

  const formateDate = useCallback((date: string) => {
    return format(new Date(date), " dd 'de' MMMM 'de' yyy", {
      locale: ptBR,
    });
  }, []);

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
        idSchedule="w"
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

        <ContainerSchedule>
          <TableContainerList>
            {dataAnalyticModule.map(analyticModule => (
              <Link
                key={analyticModule.id}
                to={`/chedule-only?${analyticModule.name_schedule}`}
              >
                {/* <span>
                  <h3>23 contatos</h3>
                </span> */}
                <div>
                  <main>
                    <div>
                      <h3>{analyticModule.name_schedule}</h3>
                    </div>
                    {/* <span>
                      <FiSend
                        size={20}
                        onClick={() => handleSendEmail(analyticModule.id)}
                      />
                      <FiEdit
                        onClick={() => handleEdit(analyticModule.id)}
                        size={20}
                      />
                    </span> */}
                  </main>
                  <footer>
                    <p>
                      Criada em{' '}
                      {analyticModule.created_at
                        ? formateDate(analyticModule.created_at)
                        : 'ver'}
                    </p>
                  </footer>
                </div>
              </Link>
            ))}
          </TableContainerList>
        </ContainerSchedule>
      </Container>
    </>
  );
};

export default SelectorFolders;
