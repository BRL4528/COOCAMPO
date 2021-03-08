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
import api from '../../../../services/api';
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

  const [
    initialDataAnalyticModule,
    setInitialDataAnalyticModule,
  ] = useState<IAnalyticModule>();

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
          name: Yup.string().required('Nome obrigatório'),
          responsible: Yup.string().required('Representante obrigátorio'),
          email: Yup.string().required('Email do representante obrigátorio'),
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
        console.log(formData);
        const response = await api.put(
          `/analysis-module?analyze_module_id=${idAnalyticModule}`,
          formData,
        );
        handleAnalytic(response.data);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Módulo de analíse',
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
          title: 'Erro na atualização',
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
          <h2>Editar módulo de análise</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        {console.log(loading)}
        {loading ? (
          <>
            <p>Nome do módulo de análise</p>
            <SkeletonLoader style={opt} />
            <p>Modelo do módulo de análise</p>
            <SkeletonLoader style={opt} />
            <p>Nome do representante</p>
            <SkeletonLoader style={opt} />
            <p>E-mail do representante</p>
            <SkeletonLoader style={opt} />
            <p> Frequência(ocorrências no periodo de um mês)</p>
            <SkeletonLoader style={opt} />
          </>
        ) : (
          <>
            <p>Nome do módulo de análise</p>
            <Input
              type="text"
              name="name"
              placeholder="Ex: Limpeza e organização dos veículos e maquinas"
            />
            <Select
              name="model"
              label="Modelo do módulo de análise"
              value={subject}
              onChange={e => {
                handleSubject(e.target.value);
              }}
              options={[
                {
                  value: 'satisfaction-survey',
                  label: 'Pesquisa de satisfação',
                },
                { value: 'analytical', label: 'Módulo análitico' },
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
            <p>Frequência(ocorrências no periodo de um mês)</p>
            <Input type="text" name="condition" placeholder="Ex: 4" />
            <p>Observações</p>
            <TextArea name="observations" placeholder="Observações" />

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
