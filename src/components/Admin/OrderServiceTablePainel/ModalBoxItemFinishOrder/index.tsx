/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';

// eslint-disable-next-line import/no-duplicates
import formatDistance from 'date-fns/formatDistance';

import { toast } from 'react-toastify';

import { useLoading, Oval } from '@agney/react-loading';

// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import { FiX } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import Modal from '../../Modal';
import { api } from '../../../../services/api';
import { DivLeft, Form } from './styles';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';

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
}

interface IModalProps {
  isOpen: boolean;
  id: string;
  isDataId: string;
  setIsOpen: () => void;
  setToggleModal: () => void;
  handleReturnFinishOrder: (
    finishOrder: Omit<IDataOrderServices, 'status'>,
  ) => void;
}

const ModalBoxItemTable: React.FC<IModalProps> = ({
  setIsOpen,
  setToggleModal,
  id,
  isDataId,
  isOpen,
  handleReturnFinishOrder,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [dataSelected, setDataSelected] = useState<IDataOrderServices>();
  const formRef = useRef<FormHandles>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingConfirm, setLoadingCinfirm] = useState(false);

  useEffect(() => {
    if (isDataId === id) {
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

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoadingCinfirm(true);

        formRef.current?.setErrors({});

        const status = 'Finalizado';

        const { observations } = data;

        const formData = {
          observations,

          status,
        };

        api.put(`/services-orders?id=${id}`, formData).then(response => {
          handleReturnFinishOrder(response.data);
        });

        toast.success('Ordem finalizada', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setIsOpen();
        setLoadingCinfirm(false);
      } catch (err) {
        console.log('ver esso', err);
        toast.warning('problemas ao finalizar OS', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoadingCinfirm(false);
        setIsOpen();
      }
    },
    [handleReturnFinishOrder, id, setIsOpen],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading: loadingConfirm,
    indicator: <Oval />,
  });

  return (
    <Modal isOpen={openModal} setIsOpen={setToggleModal}>
      <Form ref={formRef} onSubmit={handleSubmit}>
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

            <strong>Data e hora de abertura da solicita????o</strong>
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

            <section>
              <strong>Adicione uma oberva????o</strong>
              <TextArea
                name="observations"
                placeholder="Reparo concluido, sugiro a troca do aparelho"
              />

              <DivLeft>
                <Button isUsed type="submit">
                  {loadingConfirm ? (
                    <div {...containerProps} ref={componentRef}>
                      {indicatorEl}
                    </div>
                  ) : (
                    ' Confirmar'
                  )}
                </Button>
              </DivLeft>
            </section>

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
