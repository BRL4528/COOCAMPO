import React, { useCallback, useEffect, useState } from 'react';

import { FiEdit, FiLink, FiSend } from 'react-icons/fi';

import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle';

import Button from '../../../components/Global/Button';
import ModalAddAnalyticModule from '../../../components/Admin/Modal/ModalAddAnalyticModule';
import ModalEditAnalyticModule from '../../../components/Admin/Modal/ModalEditAnalyticModule';
import ModalSendEmailAnalyticModule from '../../../components/Admin/Modal/ModalSendEmailAnalyticModule';
import api from '../../../services/api';

import {
  Container,
  CardeHeader,
  CardButton,
  TableContainerList,
} from './styles';

interface IAnalyticModule {
  id: string;
  url?: string;
  name: string;
  email: string;
  responsible: string;
  condition: string;
  observations: string;
}

const SelectorFolders: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAnalytic, setDataAnalytic] = useState<IAnalyticModule>();

  const [modalEditOpen, setModaEditOpen] = useState(false);
  const [modalOpenSendEmail, setModaOpenSendEmail] = useState(false);
  const [idAnalyticModule, setIdAnalyticModule] = useState('');

  const [dataAnalyticModule, setDataAnalyticModule] = useState<
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
    setIdAnalyticModule(id);
  }, []);

  const toggleSendEmailModal = useCallback(() => {
    setModaOpenSendEmail(!modalOpenSendEmail);
  }, [modalOpenSendEmail]);

  const handleSendEmail = useCallback(id => {
    setModaOpenSendEmail(true);
    setIdAnalyticModule(id);
  }, []);

  useEffect(() => {
    api.get('/analysis-module').then(response => {
      setDataAnalyticModule(response.data);
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
  return (
    <>
      <ModalAddAnalyticModule
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAnalytic={handleAnalytic}
      />
      <ModalEditAnalyticModule
        isOpen={modalEditOpen}
        setIsOpen={toggleEditModal}
        handleAnalytic={handleAnalytic}
        idAnalyticModule={idAnalyticModule}
      />
      <ModalSendEmailAnalyticModule
        isOpen={modalOpenSendEmail}
        setIsOpen={toggleSendEmailModal}
        idAnalyticModule={idAnalyticModule}
      />
      <Container>
        <CardeHeader>
          <div>
            <h2>Módulo de Análise</h2>
            <strong>Verifique as formas de inserção de dados manuais.</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Criar novo módulo de análise
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
                    <p>{analyticModule.observations}</p>
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
                  {analyticModule.url !== null ? (
                    <>
                      <FiLink size={18} color="#7159c1" />
                      <a href={analyticModule.url}>
                        Acessar painel módulo de ánalise
                      </a>
                    </>
                  ) : (
                    <>
                      <div>
                        <UseAnimations
                          animation={alertCircle}
                          size={30}
                          strokeColor="#f2c811"
                          style={{ padding: 50 }}
                        />
                        {/* <FiEdit size={20} /> */}
                      </div>

                      <p>
                        Link de acesso ao painel de módulo de análise, ainda não
                        disponivel!
                      </p>
                    </>
                  )}
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
