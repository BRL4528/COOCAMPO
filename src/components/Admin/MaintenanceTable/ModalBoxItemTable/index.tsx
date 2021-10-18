/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';

// eslint-disable-next-line import/no-duplicates
import formatDistance from 'date-fns/formatDistance';

// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import { FiX, FiPlus } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import Modal from '../../Modal';
import { api } from '../../../../services/api';
import { Form } from './styles';

interface IKilometers {
  vehicle_id?: string;
  access_id?: string;
  id?: string;
  km_start: number;
  km_end: number;
  km_traveled?: number;
  observations: string;
  reason: string;
}
interface IModalProps {
  isOpen: boolean;
  id: string;
  isDataId: string;
  setIsOpen: () => void;
  setToggleModal: () => void;
}

const ModalBoxItemTable: React.FC<IModalProps> = ({
  setIsOpen,
  setToggleModal,
  id,
  isDataId,
  isOpen,
}) => {
  const [dataSelected, setDataSelected] = useState<IKilometers>();
  const formRef = useRef<FormHandles>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDataId === id) {
      // setLoading(true);
      api.get(`/kilometers/show?id=${id}`).then(response => {
        setDataSelected(response.data);
      });
      setOpenModal(isOpen);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    if (isDataId !== id) {
      setOpenModal(false);
    }
  }, [id, isDataId, isOpen]);

  const opt = {
    margin: '0px 0px 5px 0px',
    height: '18px',
  };

  return (
    <Modal isOpen={openModal} setIsOpen={setToggleModal}>
      <Form ref={formRef} onSubmit={() => {}}>
        {loading ? (
          <>
            <span>
              <div>
                <h2>Ordem de serviço</h2>
                <p>{parseInt(dataSelected?.id || '0', 16)}</p>
              </div>

              <FiX size={20} onClick={() => setToggleModal()} />
            </span>
            <header>
              <strong>Nome do usuário</strong>
              <SkeletonLoader style={opt} />

              <strong>Nivel de urgência</strong>
              <SkeletonLoader style={opt} />
            </header>

            <strong>E-mail do solicitante</strong>
            <SkeletonLoader style={opt} />

            <strong>Motivo da OS</strong>
            <SkeletonLoader style={opt} />

            <strong>Situação atual</strong>
            <SkeletonLoader style={opt} />

            <strong>Data e hora de abertura da solicitação</strong>
            <p>
              <SkeletonLoader style={opt} />
            </p>

            <strong>Data e hora de atendimento da solicitação</strong>
            <p>
              <SkeletonLoader style={opt} />
            </p>

            <strong>Tempo de atendimento</strong>
            <p>
              <SkeletonLoader style={opt} />
            </p>
          </>
        ) : (
          <>
            <span>
              <div>
                <h2>Ordem de serviço</h2>
                <p>{parseInt(dataSelected?.id || 'x', 16)}</p>
              </div>

              <FiX size={20} onClick={() => setToggleModal()} />
            </span>
            <header>
              <strong>Id do Veiculo</strong>
              <p>{dataSelected?.vehicle_id}</p>
            </header>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalBoxItemTable;
