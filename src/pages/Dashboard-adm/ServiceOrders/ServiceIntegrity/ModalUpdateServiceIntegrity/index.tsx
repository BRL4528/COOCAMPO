import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import { useLoading, Oval } from '@agney/react-loading';

import { toast } from 'react-toastify';
import { Form, DivLeft } from './styles';

import Button from '../../../../../components/Global/Button';

import { useAuth } from '../../../../../hooks/auth';

import Modal from '../../../../../components/Admin/Modal';
import { api } from '../../../../../services/api';
import Select from '../../../../../components/Global/SelectRelease';
import TextArea from '../../../../../components/Global/TextArea';

interface IServices {
  id: string;
  service: string;
  status: string;
  level: string;
  created_at: string;
  updated_at: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAnalytic: (analytic: Omit<IServices, ''>) => void;
}

const ModalUpdateServiceIntegrity: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAnalytic,
}) => {
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [subject, setSubject] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: IServices) => {
      try {
        setLoading(true);
        const { service } = data;

        const formData = {
          urgency: subject,
          name: user.name,
          email: user.email,
          service,
          observations: 'null',
        };

        const response = await api.post('/services-orders', formData);
        handleAnalytic(response.data);

        setIsOpen();

        toast('Sucesso ao Atualizar serviço!', {
          position: 'bottom-right',
          autoClose: 5000,
          type: 'success',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast('Problemas ao Atualizar serviço!', {
          position: 'bottom-right',
          autoClose: 5000,
          type: 'warning',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
    },
    [handleAnalytic, setIsOpen, subject, user.email, user.name],
  );

  const handleSubject = useCallback(
    e => {
      setSubject(e);
    },
    [setSubject],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Atualizar integridade dos serviços</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <Select
          name="urgency"
          label="Serviço."
          value={subject}
          onChange={e => {
            handleSubject(e.target.value);
          }}
          options={[
            {
              value: 'Alto',
              label: 'Alto',
            },
            { value: 'Medio', label: 'Médio' },
            {
              value: 'Baixo',
              label: 'Baixo',
            },
          ]}
        />
        <section>
          <p>Motivo.</p>
        </section>

        <TextArea name="reason" placeholder="Ex: Troca de mouse e teclado." />

        <DivLeft>
          <Button
            type="submit"
            data-testid="add-food-button"
            disabled={loading}
            isUsed
          >
            {loading ? (
              <div {...containerProps} ref={componentRef}>
                {indicatorEl}
              </div>
            ) : (
              'Enviar'
            )}
          </Button>
        </DivLeft>
      </Form>
    </Modal>
  );
};

export default ModalUpdateServiceIntegrity;
