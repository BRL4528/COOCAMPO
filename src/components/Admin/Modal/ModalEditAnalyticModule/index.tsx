import React, { useCallback, useEffect, useRef, useState } from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form, DivLeft } from './styles';

// import { FormContainer } from './styles';
import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';

import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Modal from '../index';
import { api } from '../../../../services/api';
import Select from '../../../Global/SelectRelease';

interface IAnalyticModule {
  id: string;
  name: string;
  url: string;
  responsible: string;
  email: string;
  condition: string;
  observations: string;
  model: string;
}

interface IModalProps {
  isOpen: boolean;
  idAnalyticModule: string;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAnalytic: (analytic: Omit<IAnalyticModule, 'status'>) => void;
}

const ModalEditAnalyticModule: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAnalytic,
  idAnalyticModule,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const [initialDataAnalyticModule, setInitialDataAnalyticModule] =
    useState<IAnalyticModule>();

  useEffect(() => {
    if (isOpen === false) {
      setInitialDataAnalyticModule({
        id: '',
        name: '',
        url: '',
        responsible: '',
        email: '',
        condition: '',
        observations: '',
        model: '',
      });
      setSubject('');
    }
  }, [isOpen]);

  useEffect(() => {
    setLoading(true);
    if (isOpen) {
      if (idAnalyticModule !== '') {
        api
          .get<IAnalyticModule>(`analysis-module/${idAnalyticModule}`)
          .then(response => {
            setInitialDataAnalyticModule(response.data);
            setSubject(response.data.model);
            setLoading(false);
          });
      }
    }
  }, [idAnalyticModule, isOpen]);

  const handleSubmit = useCallback(
    async (data: IAnalyticModule) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigat??rio'),
          responsible: Yup.string().required('Representante obrig??torio'),
          email: Yup.string().required('Email do representante obrig??torio'),
          condition: Yup.string(),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, responsible, email, condition, observations } = data;

        const formData = {
          name,
          responsible,
          email,
          condition,
          observations,
          model: subject,
        };
        const response = await api.put(
          `/analysis-module?analyze_module_id=${idAnalyticModule}`,
          formData,
        );
        handleAnalytic(response.data);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'M??dulo de anal??se',
          description: 'Criado sucesso com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na atualiza????o',
          description: 'Ocorreu um erro ao atualizar perfil.',
        });
      }
    },
    [addToast, handleAnalytic, idAnalyticModule, setIsOpen, subject],
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
          <h2>Editar m??dulo de an??lise</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        {loading ? (
          <>
            <p>Nome do m??dulo de an??lise</p>
            <SkeletonLoader style={opt} />
            <p>Modelo do m??dulo de an??lise</p>
            <SkeletonLoader style={opt} />
            <p>Nome do representante</p>
            <SkeletonLoader style={opt} />
            <p>E-mail do representante</p>
            <SkeletonLoader style={opt} />
            <p> Frequ??ncia(ocorr??ncias no periodo de um m??s)</p>
            <SkeletonLoader style={opt} />
          </>
        ) : (
          <>
            <p>Nome do m??dulo de an??lise</p>
            <Input
              type="text"
              name="name"
              placeholder="Ex: Limpeza e organiza????o dos ve??culos e maquinas"
            />
            <Select
              name="model"
              label="Modelo do m??dulo de an??lise"
              value={subject}
              onChange={e => {
                handleSubject(e.target.value);
              }}
              options={[
                {
                  value: 'satisfaction-survey',
                  label: 'Pesquisa de satisfa????o',
                },
                { value: 'analytical', label: 'M??dulo an??litico' },
              ]}
            />
            <p>Nome do representante</p>
            <Input
              type="text"
              name="responsible"
              placeholder="Ex: Cristiano Mattei"
            />
            <p>E-mail do representante</p>
            <Input
              // type="email"
              name="email"
              placeholder="Ex: cristiano.mattei@cooasgo.com.br"
            />
            <p>Frequ??ncia(ocorr??ncias no periodo de um m??s)</p>
            <Input type="text" name="condition" placeholder="Ex: 4" />
            <p>Observa????es</p>
            <TextArea name="observations" placeholder="Observa????es" />

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
