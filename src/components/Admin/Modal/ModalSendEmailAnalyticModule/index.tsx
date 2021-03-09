import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form, DivLeft } from './styles';

// import { FormContainer } from './styles';
import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';
import Select from '../../../Global/SelectRelease';

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

interface IToFormated {
  id?: string;
  name: string;
  address: string;
  name_schedule?: string;
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
  const [subjectSchedules, setSubject] = useState('');

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

  // async function handleEmail(
  //   subject: string,
  //   body: string,
  //   formatedTo: { name: string; address: string }[],
  // ) {
  //   if (subjectSchedules !== '') {
  //     await api.post('/send-email-analysis-module', {
  //       id: idAnalyticModule,
  //       body,
  //       subject,
  //       to: formatedTo,
  //     });
  //   }
  // }

  const handleSubmit = useCallback(
    async (data: IAnalyticModule) => {
      try {
        // formRef.current?.setErrors({});

        // const schema = Yup.object().shape({
        //   name: Yup.string().required('Nome obrigatório'),
        //   address: Yup.string()
        //     .required('Email do representante obrigátorio')
        //     .email('Digite um e-mail válido'),
        // });
        // await schema.validate(data, {
        //   abortEarly: false,
        // });

        const { body, subject } = data;

        const emailUnit = [{ name: data.name, address: data.email }];

        const formData = {
          id: idAnalyticModule,
          body,
          subject,
          to: emailUnit,
        };
        if (subjectSchedules !== '') {
          api
            .get<IToFormated[]>(
              `schedules/show?name_schedule=${subjectSchedules}`,
            )
            .then(async response => {
              const formatedTo: { name: string; address: string }[] = [];

              response.data.forEach(item => {
                const arrayObj = {
                  name: item.name,
                  address: item.address,
                };
                formatedTo.push(arrayObj);
              });

              // setToFormated(formatedTo);
              // handleEmail(subject, body, formatedTo);
              // setsubjectTo(subject);
              // setbody(body);
              await api.post('/send-email-analysis-module', {
                id: idAnalyticModule,
                body,
                subject,
                to: formatedTo,
              });
            });
        } else {
          await api.post('/send-email-analysis-module', formData);
        }

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
    [addToast, idAnalyticModule, setIsOpen, subjectSchedules],
  );

  const handleSubject = useCallback(
    e => {
      setSubject(e);
    },
    [setSubject],
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

        <Select
          name="name_schedule"
          label="Nome da agenda"
          value={subjectSchedules}
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
