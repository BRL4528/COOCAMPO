import React, { useCallback, useEffect, useRef, useState } from 'react';

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

interface IAnalyticModule {
  id: string;
  name: string;
  url: string;
  responsible: string;
  condition: string;
  observations: string;
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

  const [
    initialDataAnalyticModule,
    setInitialDataAnalyticModule,
  ] = useState<IAnalyticModule>();

  useEffect(() => {
    if (isOpen) {
      if (idAnalyticModule !== '') {
        api.get(`analysis-module/${idAnalyticModule}`).then(response => {
          setInitialDataAnalyticModule(response.data);
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
          responsible: Yup.string()
            .required('Representante obrigátorio')
            .email('Digite um e-mail válido'),
          condition: Yup.string(),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, responsible, condition, observations } = data;

        const formData = {
          name,
          responsible,
          condition,
          observations,
        };

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
    [addToast, handleAnalytic, idAnalyticModule, setIsOpen],
  );

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
        <p>Nome do módulo de análise</p>
        <Input
          type="text"
          name="name"
          placeholder="Ex: Limpeza e organização dos veículos e maquinas"
        />
        <p>E-mail do representante</p>
        <Input
          type="email"
          name="responsible"
          placeholder="Ex: carlos.alto@empresa.com.br"
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
      </Form>
    </Modal>
  );
};

export default ModalEditAnalyticModule;
