import React, { useCallback, useEffect, useRef, useState } from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form, DivLeft } from './styles';

// import { FormContainer } from './styles';
import Input from '../../../Global/Input';
import Button from '../../../Global/Button';

import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Modal from '../index';
import api from '../../../../services/api';
import Select from '../../../Global/SelectRelease';

interface IAnalyticModule {
  id: string;
  name: string;
  address: string;
  name_schedule: string;
}

interface IModalProps {
  isOpen: boolean;
  idSchedule: string;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAnalytic: (analytic: Omit<IAnalyticModule, 'status'>) => void;
}

const ModalEditAnalyticModule: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAnalytic,
  idSchedule,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const [
    initialDataAnalyticModule,
    setInitialDataAnalyticModule,
  ] = useState<IAnalyticModule>();

  useEffect(() => {
    if (isOpen === false) {
      setInitialDataAnalyticModule({
        id: '',
        name: '',
        address: '',
        name_schedule: '',
      });
      setSubject('');
    }
  }, [isOpen]);

  useEffect(() => {
    setLoading(true);
    if (isOpen) {
      if (idSchedule !== '') {
        api
          .get<IAnalyticModule>(`schedules/show?schedule_id=${idSchedule}`)
          .then(response => {
            setInitialDataAnalyticModule(response.data);
            setSubject(response.data.name_schedule);
            setLoading(false);
          });
      }
    }
  }, [idSchedule, isOpen]);

  const handleSubmit = useCallback(
    async (data: IAnalyticModule) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          address: Yup.string().required('Email do representante obrigátorio'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, address } = data;

        const formData = {
          name,
          address,
          name_schedule: subject,
        };
        const response = await api.put(
          `/schedules?schedule_id=${idSchedule}`,
          formData,
        );
        handleAnalytic(response.data);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Email atualizado',
          description: 'Informações atualizadas com sucesso com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar informações.',
        });
      }
    },
    [addToast, handleAnalytic, idSchedule, setIsOpen, subject],
  );

  const handleSubject = useCallback(
    e => {
      setSubject(e);
    },
    [setSubject],
  );

  const opt = {
    margin: '0px 0px 10px 0px',
    height: '35px',
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        initialData={initialDataAnalyticModule}
        onSubmit={handleSubmit}
      >
        <span>
          <h2>Editar informações da agenda</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        {loading ? (
          <>
            <p>Nome representante</p>
            <SkeletonLoader style={opt} />
            <p>Nome da agenda</p>
            <SkeletonLoader style={opt} />
            <p>E-mail do representante</p>
            <SkeletonLoader style={opt} />
          </>
        ) : (
          <>
            <p>Nome representante</p>
            <Input
              type="text"
              name="name"
              placeholder="Ex: Limpeza e organização dos veículos e maquinas"
            />
            <Select
              name="name_schedule"
              label="Nome da agenda"
              value={subject}
              onChange={e => {
                handleSubject(e.target.value);
              }}
              options={[
                {
                  value: 'lider-group',
                  label: 'Grupo de lideres',
                },
                {
                  value: 'analytical-group',
                  label: 'Grupo de modulo de análise',
                },
              ]}
            />
            <p>E-mail do representante</p>
            <Input
              type="email"
              name="address"
              placeholder="Ex: cristiano.mattei@cooasgo.com.br"
            />

            <DivLeft>
              <Button type="submit" data-testid="add-food-button">
                Salvar
              </Button>
            </DivLeft>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalEditAnalyticModule;
