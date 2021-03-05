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

interface ISendEmail {
  name: string;
  address: string;
}
interface IAnalyticModule {
  id: string;
  name: string;
  email: string;
  responsible: string;
  subject: string;
  body: string;
  to?: ISendEmail[];
}

interface IModalProps {
  isOpen: boolean;
  idAnalyticModule: string;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  // handleAnalytic: (analytic: Omit<IAnalyticModule, 'status'>) => void;
}

const ModalEditAnalyticModule: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
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
        // formRef.current?.setErrors({});

        // const schema = Yup.object().shape({
        //   name: Yup.string().required('Nome obrigatório'),
        //   responsible: Yup.string().required('Representante obrigátorio'),
        //   email: Yup.string()
        //     .required('Email do representante obrigátorio')
        //     .email('Digite um e-mail válido'),
        //   condition: Yup.string(),
        //   observations: Yup.string(),
        // });
        // await schema.validate(data, {
        //   abortEarly: false,
        // });

        const { body, subject } = data;

        if (data.name === 'global') {
          const emailsGlobal = [
            {
              name: 'Cristiano Mattei',
              address: 'cristiano.mattei@cooasgo.com.br',
            },
            {
              name: 'Marcos Angelo Piaia',
              address: 'marcos.piaia@cooasgo.com.br',
            },
            {
              name: 'Carlos Alexandre',
              address: 'carlos.gobetti@cooasgo.com.br',
            },
            {
              name: 'Fernando Yukio Yoshida',
              address: 'fernando.yoshida@cooasgo.com.br',
            },
            {
              name: 'Amanda Ami ',
              address: 'udg@cooasgo.com.br',
            },
            {
              name: 'José Martini',
              address: 'financeiro@cooasgo.com.br',
            },
            {
              name: 'Ivonei Scotton',
              address: 'ivonei.scotton@cooasgo.com.br',
            },
            {
              name: 'Sueli Cristina',
              address: 'coordenacao.rh@cooasgo.com.br',
            },
            {
              name: 'Katiele Fernanda',
              address: 'katiele.silva@cooasgo.com.br',
            },
            {
              name: 'Davi Correa da Silva',
              address: 'davi.silva@cooasgo.com.br',
            },
            {
              name: 'Greice Suelen Ceolin',
              address: 'sesmt@cooasgo.com.br',
            },
            {
              name: 'Jean Carlos',
              address: 'manutencao@cooasgo.com.br',
            },
            {
              name: 'Anderson Paranzini',
              address: 'comercial.agricola@cooasgo.com.br',
            },
            {
              name: 'Ricardo Antonio',
              address: 'ricardo.antonio@cooasgo.com.br',
            },
            {
              name: 'Cesário Teixeira',
              address: 'cesario.pereira@cooasgo.com.br',
            },
            {
              name: 'Lisiane Strelow Barela',
              address: 'lisiane.barela@cooasgo.com.br',
            },
          ];

          const formData = {
            id: idAnalyticModule,
            body,
            subject,
            to: emailsGlobal,
          };

          await api.post('/send-email-analysis-module', formData);
        }

        if (data.name === 'global-gooasgo-test') {
          const emailsGlobal = [
            {
              name: 'Cristiano Mattei',
              address: 'cristiano.mattei@cooasgo.com.br',
            },
            {
              name: 'Sueli Cristina',
              address: 'coordenacao.rh@cooasgo.com.br',
            },
            {
              name: 'Bruno Luiz',
              address: 'bruno.carvalhoa@cooasgo.com.br',
            },
            {
              name: 'Lisiane Strelow Barela',
              address: 'lisiane.barela@cooasgo.com.br',
            },
          ];

          const formData = {
            id: idAnalyticModule,
            body,
            subject,
            to: emailsGlobal,
          };

          await api.post('/send-email-analysis-module', formData);
        }

        if (data.name === 'midas') {
          const emailsGlobal = [
            {
              name: 'Bruno Luiz',
              address: 'blgc.sgo@hotmail.com',
            },
            {
              name: 'Alessandro Silva',
              address: 'alessandro@midascorp.dev',
            },
            {
              name: 'Bruno Luiz',
              address: 'bruno@midascorp.dev',
            },
            {
              name: 'KronaMesin',
              address: 'kronamesin@gmail.com',
            },
          ];

          const formData = {
            id: idAnalyticModule,
            body,
            subject,
            to: emailsGlobal,
          };

          await api.post('/send-email-analysis-module', formData);
        }

        const emailUnit = [{ name: data.name, address: data.email }];

        const formData = {
          id: idAnalyticModule,
          body,
          subject,
          to: emailUnit,
        };

        await api.post('/send-email-analysis-module', formData);

        setIsOpen();
        addToast({
          type: 'success',
          title: 'Email enviado!',
          description: 'sucesso ao enviar email',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro ao enviar email',
          description: 'Ocorreu um erro ao enviar email.',
        });
      }
    },
    [addToast, idAnalyticModule, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        initialData={initialDataAnalyticModule}
        onSubmit={handleSubmit}
      >
        <span>
          <h2>Enviar email</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
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
        <p>Assunto</p>
        <Input type="text" name="subject" placeholder="Ex: Módulo de análise" />

        <p>Corpo do e-mail</p>
        <TextArea
          name="body"
          placeholder="Ex: Email de acesso ao modulo de analise"
        />

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
