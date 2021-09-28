import React, { ChangeEvent, useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { FiPaperclip, FiX } from 'react-icons/fi';
import { useLoading, Oval } from '@agney/react-loading';
import { useAuth } from '../../../../../hooks/auth';

import getValidationErrors from '../../../../../utils/getValidationErrors';

import { apllyToast } from '../../../../../components/Global/Toast2.0';
import { Form, DivLeft, UploadInputt } from './styles';

import Button from '../../../../../components/Global/Button';
import Modal from '../../../../../components/Admin/Modal';
import Input from '../../../../../components/Global/Input';
import TextArea from '../../../../../components/Global/TextArea';
import Select from '../../../../../components/Global/SelectRelease';

interface IMaintenance {
  date: Date;
  km: number;
  reason: string;
  type: string;
  description: string;
  conductor: string;
  amount_total: number;
  observation: string;
}

interface IModalProps {
  isOpen: boolean;
  km_initial?: {
    km_start: number;
  };
  setIsOpen: () => void;
  handleAddNewMaintenance: (
    maintenance: Omit<IMaintenance, ''>,
    file: any,
  ) => void;
}

const ModalAddMaintenance: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  km_initial,
  handleAddNewMaintenance,
}) => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');

  const [file, setFile] = useState<any>();
  const [urlDocument, setDocument] = useState<any>();

  const handleSubmit = useCallback(
    async (data: IMaintenance) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.date().required('Data é obrigatória'),
          km: Yup.number().required('Quilonetragem é obrigatório'),
          reason: Yup.string().required('Motivo é obrigatório'),

          amount_total: Yup.number().required('Custo total é obrigatório'),
          description: Yup.string().required('Descrição é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { date, km, reason, amount_total, description } = data;

        const formatData = {
          date: new Date(date),
          km,
          reason,
          amount_total,
          description,
          type,
          conductor: user.name,
          observation: `${user.nickname} realizou esta operação`,
        };

        handleAddNewMaintenance(formatData, urlDocument);

        setIsOpen();

        apllyToast('success', 'Sucesso ao adicionar nova Manutenção!');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }
        setIsOpen();
        apllyToast('warning', 'Problemas ao adicionar nova Manutenção!');
      }
    },
    [
      handleAddNewMaintenance,
      setIsOpen,
      type,
      urlDocument,
      user.name,
      user.nickname,
    ],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handleType = useCallback(e => {
    setType(e);
  }, []);

  const handleDocumentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
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
        setLoading(false);
      }
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={km_initial}>
        <span>
          <h2>Nova manuteção</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <p>Data da manutenção</p>
        <Input type="datetime-local" name="date" />

        <p>Quilometragem</p>
        <Input type="number" name="km" placeholder="Ex: 1.200" />

        <Select
          name="type"
          label="Tipo de manutenção"
          value={type}
          onChange={e => {
            handleType(e.target.value);
          }}
          options={[
            {
              value: 'Corretiva',
              label: 'Corretiva',
            },
            {
              value: 'Preventiva',
              label: 'Preventiva',
            },
          ]}
        />

        <p>Qual o motivo?</p>
        <Input type="string" name="reason" />

        <p>Custo total</p>
        <Input type="number" name="amount_total" />

        <section>
          <p>Descrição da manutenção</p>

          <UploadInputt>
            <label htmlFor="avatar">
              {loading ? (
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
        <TextArea
          name="description"
          placeholder="Ex: foi realizado a troca de pneus e manutenção no radiador."
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

export default ModalAddMaintenance;
