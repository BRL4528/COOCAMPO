/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-target-blank */
import React, { useCallback, useRef, useState, ChangeEvent } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiPaperclip } from 'react-icons/fi';

import { useLoading, Oval } from '@agney/react-loading';

import { toast } from 'react-toastify';
import { Form, DivLeft, UploadInputt } from './styles';

import Button from '../../../Global/Button';

import { useAuth } from '../../../../hooks/auth';

import Modal from '../index';
import { api, apiPowerBiDashboard } from '../../../../services/api';
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
  identification: number;
  file: string;
  reason_observation: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAnalytic: (analytic: Omit<IServicesOrders, ''>) => void;
}

// interface IUpload {
//   document_url: string;
// }

const ModalOrderServices: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAnalytic,
}) => {
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [reason, setReson] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [urlDocument, setDocument] = useState<any>();

  const [file, setFile] = useState<any>();

  const handleSubmit = useCallback(
    async (data: IServicesOrders) => {
      try {
        setLoading(true);
        const { observations } = data;
        const formData = {
          urgency: subject,
          name: user.name,
          email: user.email,
          reason,
          reason_observation: observations,
          observations: 'Ordem pendente',
          identification: Math.round(2),
        };

        await api
          .post<IServicesOrders>('/services-orders', formData)
          .then(response => {
            handleAnalytic(response.data);
            apiPowerBiDashboard.post(
              '/rows?key=EhZzhiqBfjtUAjPRCjGOoKHJXhyoSY0iiImiXXSy2h%2BoVJYW7Q1G%2BPjp3ATpxYNw2Oj%2BCOjU8qmJl0QTgH4cIA%3D%3D',
              [
                {
                  name: response.data.name,
                  urgency: response.data.urgency,
                  reason: response.data.reason,
                  status: response.data.status,
                  created_at: response.data.created_at,
                  id: response.data.id,
                },
              ],
            );

            api.patch(
              `/services-orders/upload?id=${response.data.id}`,
              urlDocument,
            );
          });

        setIsOpen();
        // setUrlDocument({ document_url: '' });

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
          type: 'error',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
    },
    [
      handleAnalytic,
      reason,
      setIsOpen,
      subject,
      urlDocument,
      user.email,
      user.name,
    ],
  );

  const handleSubject = useCallback(
    e => {
      setSubject(e);
    },
    [setSubject],
  );
  const handleReason = useCallback(e => {
    setReson(e);
  }, []);

  const { containerProps, indicatorEl } = useLoading({
    loading: loadingUpload,
    indicator: <Oval />,
  });

  const handleDocumentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoadingUpload(true);
      if (e.target.files) {
        setFile(e.target.files);
        const data = new FormData();

        data.append('file', e.target.files[0]);
        setDocument(data);
        // api
        //   .patch(
        //     `/services-orders/upload?id=00f55605-4470-49eb-aa1b-8ad5460d031e`,
        //     data,
        //   )
        //   .then(response => {
        //   });
        setLoadingUpload(false);
      }
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Nova ordem de servi??o</h2>
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
            { value: 'Medio', label: 'M??dio' },
            {
              value: 'Baixo',
              label: 'Baixo',
            },
          ]}
        />

        <Select
          name="reason"
          label="Qual o motivo da OS?"
          value={reason}
          onChange={e => {
            handleReason(e.target.value);
          }}
          options={[
            {
              value: 'Manuten????o da esta????o de trabalho',
              label: 'Manuten????o da esta????o de trabalho',
            },
            {
              value: 'Manuten????o de rede e internet',
              label: 'Manuten????o de rede e internet',
            },
            {
              value: 'Manuten????o de impressora',
              label: 'Manuten????o de impressora',
            },
            {
              value: 'Manuten????o de Gescooper',
              label: 'Manuten????o de Gescooper',
            },
            {
              value: 'Manuten????o de servidores',
              label: 'Manuten????o de servidores',
            },
            {
              value: 'ausente',
              label: 'T??cnico ausente',
            },
            {
              value: 'Outros',
              label: 'Outros',
            },
          ]}
        />
        <section>
          <p>Observa????es?</p>

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
            {urlDocument ? (
              <>
                <strong>{file[0].name}</strong>
              </>
            ) : (
              ''
            )}
          </div>
        </section>

        {/* {loadingUpload ? (
          <div {...containerProps} ref={componentRef}>
            {indicatorEl}
          </div>
        ) : (
          <a href={`${urlDocument}`}>Documento</a>
        )} */}
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

export default ModalOrderServices;
