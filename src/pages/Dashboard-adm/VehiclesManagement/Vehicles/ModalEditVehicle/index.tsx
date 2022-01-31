/* eslint-disable react/jsx-no-target-blank */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiPlus, FiCamera } from 'react-icons/fi';

import { Form, DivLeft, AvatarInput } from './styles';

import Input from '../../../../../components/Global/Input';
import Button from '../../../../../components/Global/Button';
import TextArea from '../../../../../components/Global/TextArea';

import Modal from '../../../../../components/Admin/Modal';
import { api } from '../../../../../services/api';

interface IVehicles {
  id: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: string;
  image: string;
  document: string;
  observations: string;
  image_url: string;
  document_url: string;
}

interface IModalProps {
  isOpen: boolean;
  dataEditVehicle: string;
  setIsOpen: () => void;
  handleVehicle: (vehicle: Omit<IVehicles, ''>, id: string) => void;
}

const ModalEditVehicle: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleVehicle,
  dataEditVehicle,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [dataVehicle, setDataVehicle] = useState<IVehicles>();

  useEffect(() => {
    if (isOpen === false) {
      setDataVehicle({
        id: '',
        name: '',
        plate: '',
        year: '',
        fuel: '',
        km: '',
        image: '',
        document: '',
        observations: '',
        image_url: '',
        document_url: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    api
      .get<IVehicles>(`/vehicles/show?id=${dataEditVehicle}`)
      .then(response => {
        setDataVehicle(response.data);
      });
  }, [dataEditVehicle]);

  const handleSubmit = useCallback(
    async (data: IVehicles) => {
      handleVehicle(data, dataEditVehicle);
      setIsOpen();
    },
    [dataEditVehicle, handleVehicle, setIsOpen],
  );

  const handleDocumentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('document', e.target.files[0]);
        api
          .patch(`/vehicles/upload/document?id=${dataEditVehicle}`, data)
          .then(response => {
            setDataVehicle(response.data);
          });
      }
    },
    [dataEditVehicle],
  );
  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('image', e.target.files[0]);
        api
          .patch(`/vehicles/upload/image?id=${dataEditVehicle}`, data)
          .then(response => {
            setDataVehicle(response.data);
          });
      }
    },
    [dataEditVehicle],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={dataVehicle}>
        <span>
          <div>
            <h2>Editar veículo</h2>
            <FiPlus size={20} />
          </div>

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <AvatarInput>
          <img
            src={
              dataVehicle?.image
                ? dataVehicle?.image_url
                : 'https://png.pngtree.com/element_our/png_detail/20180926/car-silhouette-vector-sport-car-silhouette-vector-png_113092.jpg'
            }
            alt="carro"
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleImageChange} />
          </label>
        </AvatarInput>
        <header>
          <p>Documento do veículo</p>
          {dataVehicle?.document ? (
            <span>
              <a href={dataVehicle.document_url} target="_blank">
                Visualizar
              </a>

              <label htmlFor="document">
                Editar
                <input
                  id="document"
                  name="document"
                  type="file"
                  onChange={handleDocumentChange}
                />
              </label>
            </span>
          ) : (
            <Input
              name="document"
              type="file"
              onChange={handleDocumentChange}
            />
          )}

          <p>Nome do veículo</p>
          <Input name="name" type="text" placeholder="Ex: Fiat Strada" />

          <p>Placa do veículo</p>
          <Input name="plate" type="text" placeholder="Ex: 589E8FR" />
        </header>

        <p>Tipo de combustível</p>
        <Input name="fuel" type="text" placeholder="Ex: flex" />

        <p>Ano do veículo</p>
        <Input name="year" type="text" placeholder="Ex: ano 2021 modelo 2022" />

        <p>Quilometragem atual</p>
        <Input name="km" type="number" placeholder="Ex: 1.000" />

        <p>Observação geral</p>
        <TextArea
          name="observations"
          placeholder="Ex: Veículo entregue ao setor em estado novo"
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

export default ModalEditVehicle;
