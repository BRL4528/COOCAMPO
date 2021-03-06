/* eslint-disable react/jsx-no-target-blank */
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

interface IDataOrderServices {
  id: string;
  name: string;
  urgency: string;
  reason: string;
  email: string;
  status: string;
  observations: string;
  end_date: string;
  created_at: string;
  identification: number;
  reason_observation: string;
  file: string;
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
  const [dataSelected, setDataSelected] = useState<IDataOrderServices>();
  const formRef = useRef<FormHandles>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDataId === id) {
      // setLoading(true);
      api.get(`/services-orders/show?id=${id}`).then(response => {
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
                <h2>Ordem de servi??o</h2>
                <p>{dataSelected?.identification}</p>
              </div>

              <FiX size={20} onClick={() => setToggleModal()} />
            </span>
            <header>
              <strong>Nome do usu??rio</strong>
              <SkeletonLoader style={opt} />

              <strong>Nivel de urg??ncia</strong>
              <SkeletonLoader style={opt} />
            </header>

            <strong>E-mail do solicitante</strong>
            <SkeletonLoader style={opt} />

            <strong>Motivo da OS</strong>
            <SkeletonLoader style={opt} />

            <strong>Situa????o atual</strong>
            <SkeletonLoader style={opt} />

            <strong>Observa????o</strong>
            <SkeletonLoader style={opt} />

            <strong>Anexo</strong>
            <SkeletonLoader style={opt} />

            <strong>Data e hora de abertura da solicita????o</strong>
            <p>
              <SkeletonLoader style={opt} />
            </p>

            <strong>Data e hora de atendimento da solicita????o</strong>
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
                <h2>Ordem de servi??o</h2>
                <p>{dataSelected?.identification}</p>
              </div>

              <FiX size={20} onClick={() => setToggleModal()} />
            </span>
            <header>
              <strong>Nome do usu??rio</strong>
              <p>{dataSelected?.name}</p>

              <strong>Nivel de urg??ncia</strong>
              <p>{dataSelected?.urgency}</p>
            </header>

            <strong>E-mail do solicitante</strong>
            <p>{dataSelected?.email}</p>

            <strong>Motivo da OS</strong>
            <p>{dataSelected?.reason}</p>

            <strong>Situa????o atual</strong>
            <p>{dataSelected?.status}</p>

            <strong>Observa????o</strong>
            <p>{dataSelected?.reason_observation}</p>

            <strong>Anexo</strong>
            <a
              href={`https://api-samasc.s3.sa-east-1.amazonaws.com/os/file/${dataSelected?.file}`}
              target="_blank"
            >
              arquivo
            </a>

            <strong>Data e hora de abertura da solicita????o</strong>
            <p>
              {format(
                new Date(
                  dataSelected?.created_at || '1999-01-01 00:00:00.74869',
                ),
                'dd/MM/yyyy - HH:mm:ss',
                {
                  locale: ptBR,
                },
              )}
            </p>

            <strong>Data de atendimento</strong>
            <p>
              {dataSelected?.end_date === null
                ? 'OS ainda aberta'
                : format(
                    new Date(
                      dataSelected?.end_date || '1999-01-01 00:00:00.74869',
                    ),
                    'dd/MM/yyyy - HH:mm:ss',
                    {
                      locale: ptBR,
                    },
                  )}
            </p>

            <strong>Tempo de atendimento</strong>
            <p>
              {dataSelected?.end_date === null
                ? 'OS ainda aberta'
                : formatDistance(
                    new Date(
                      dataSelected?.created_at || '1999-01-01 00:00:00.74869',
                    ),
                    new Date(
                      dataSelected?.end_date || '1999-01-01 00:00:00.74869',
                    ),
                    {
                      locale: ptBR,
                    },
                  )}
            </p>

            {dataSelected?.end_date === null ? (
              ''
            ) : (
              <>
                <strong>Observa????es da OS finalizada</strong>
                <p>{dataSelected?.observations}</p>
              </>
            )}
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalBoxItemTable;
