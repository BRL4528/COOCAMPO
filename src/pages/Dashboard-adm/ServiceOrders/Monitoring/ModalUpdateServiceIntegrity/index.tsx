import React, { useCallback, useRef, useState, useEffect } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import { useLoading, Oval } from '@agney/react-loading';

import { apllyToast } from '../../../../../components/Global/Toast2.0';
import { Form, DivLeft } from './styles';

import Button from '../../../../../components/Global/Button';

import Modal from '../../../../../components/Admin/Modal';
import { api } from '../../../../../services/api';
import Select from '../../../../../components/Global/SelectRelease';
import TextArea from '../../../../../components/Global/TextArea';

interface IServices {
  id: string;
  service: string;
  status: string;
  observations: string;
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

  const [subject, setSubject] = useState('');

  const [status, setStatus] = useState('');

  const [loading, setLoading] = useState(false);

  const [dataServices, setDataServices] = useState<IServices[]>([]);

  useEffect(() => {
    api.get<IServices[]>('/services-integrity').then(response => {
      setDataServices(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: IServices) => {
      try {
        setLoading(true);
        const { observations } = data;
        console.log(observations);
        const formData = {
          level: 'Geral',
          status,
          // observations,
        };

        const response = await api.put(
          `/services-integrity?id=${subject}`,
          formData,
        );
        handleAnalytic(response.data);

        setIsOpen();
        setStatus('');
        setSubject('');

        apllyToast('success', 'Sucesso ao Atualizar serviço!');

        setLoading(false);
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao Atualizar serviço!');
        setLoading(false);
      }
    },
    [handleAnalytic, setIsOpen, status, subject],
  );

  const handleSubject = useCallback(
    e => {
      setSubject(e);
    },
    [setSubject],
  );
  const handleStatus = useCallback(e => {
    setStatus(e);
  }, []);

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
          name="service"
          label="Serviço"
          value={subject}
          onChange={e => {
            handleSubject(e.target.value);
          }}
          // options={[
          //   {
          //     value: 'Alto',
          //     label: 'Alto',
          //   },
          //   { value: 'Medio', label: 'Médio' },
          //   {
          //     value: 'Baixo',
          //     label: 'Baixo',
          //   },
          // ]}
          options={dataServices.map(service => {
            return {
              value: service.id,
              label: service.service,
            };
          })}
        />

        <span>
          <Select
            name="status"
            label="Status"
            value={status}
            onChange={e => {
              handleStatus(e.target.value);
            }}
            options={[
              {
                value: 'Online',
                label: 'Online',
              },
              { value: 'Manutenção', label: 'Manutenção' },
              {
                value: 'Offline',
                label: 'Offline',
              },
            ]}
          />
        </span>
        <section>
          <p>Ocorrência</p>
        </section>

        <TextArea
          name="observations"
          placeholder="Ex: Troca de mouse e teclado."
        />

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
