import React, { useCallback, useRef, useState, ChangeEvent } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiPaperclip } from 'react-icons/fi';

import { useLoading, Oval } from '@agney/react-loading';

import { toast } from 'react-toastify';
import { Form, DivLeft, UploadInputt } from './styles';

import Button from '../../../Global/Button';

import { useAuth } from '../../../../hooks/auth';

import Modal from '../index';
import { api } from '../../../../services/api';
import Select from '../../../Global/SelectRelease';
import TextArea from '../../../Global/TextArea';

interface IServicesOrders {
  created_at: string;
  email: string;
  id: string;
  name: string;
  observations: string;
  reason: string;
  status: string;
  updated_at: string;
  urgency: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAnalytic: (analytic: Omit<IServicesOrders, ''>) => void;
}

interface IUpload {
  document_url: string;
}

const ModalOrderServices: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAnalytic,
}) => {
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [subject, setSubject] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [urlDocument, setUrlDocument] = useState<IUpload>();

  const handleSubmit = useCallback(
    async (data: IServicesOrders) => {
      try {
        setLoading(true);
        const { reason } = data;

        const formData = {
          urgency: subject,
          name: user.name,
          email: user.email,
          reason,
          observations: 'null',
        };

        const response = await api.post('/services-orders', formData);
        handleAnalytic(response.data);

        setIsOpen();

        toast('Sucesso ao abrir nova OS!', {
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
        toast('Problemas ao abrir nova OS!', {
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
    loading: loadingUpload,
    indicator: <Oval />,
  });

  const handleDocumentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoadingUpload(true);
      if (e.target.files) {
        const data = new FormData();

        data.append('document', e.target.files[0]);

        api
          .patch(
            `/vehicles/upload/document?id=7f2428ca-7f8c-482b-adf8-5184a7167821`,
            data,
          )
          .then(response => {
            setUrlDocument(response.data.document_url);
            setLoadingUpload(false);
          });
      }
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Nova ordem de serviço</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <Select
          name="urgency"
          label="Qual o nivel de urgencia?"
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
          <p>Qual o motivo?</p>

          <UploadInputt>
            <label htmlFor="avatar">
              {loadingUpload ? (
                <div {...containerProps} ref={componentRef}>
                  {indicatorEl}
                </div>
              ) : (
                <FiPaperclip />
              )}
              <input type="file" id="avatar" onChange={handleDocumentChange} />
            </label>
          </UploadInputt>
          <div>
            {urlDocument ? <a href={`${urlDocument}`}>Visualizar</a> : ''}
          </div>
        </section>

        {/* {loadingUpload ? (
          <div {...containerProps} ref={componentRef}>
            {indicatorEl}
          </div>
        ) : (
          <a href={`${urlDocument}`}>Documento</a>
        )} */}
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

export default ModalOrderServices;
