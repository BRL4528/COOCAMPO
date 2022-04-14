import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  Button,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { RiAddLine } from 'react-icons/ri';
import { useLoading, Oval } from '@agney/react-loading';

import Input from '../../../Global/Input';

import Select from '../../../Global/SelectRelease';
import { ModalComponent } from '..';
import { apllyToast } from '../../../Global/Toast2.0';
import { api } from '../../../../services/api';

interface IEnergy {
  id: string;
  month: string;
  year: number;
  reading_date: string;
  reading_tip: number;
  reading_outside_tip: number;
  days: number;
  consumption: number;
  consumption_tip: number;
  consumption_outside_tip: number;
  consumption_reactive_tip: number;
  consumption_reactive_outside_tip: number;
  demand_measure_tip: number;
  demand_contracted_tip: number;
  demand_billed_tip: number;
  demand_surplus_tip: number;
  factor_power_tip: number;
  factor_power_outside_tip: number;
  unity: string;
  cost_center: string;
  cost_in_reals: string;
  unity_cost_center: string;
  reasonUnity?: string;
  reasonCost_center?: string;
}

interface IModalProps {
  handleEditNewEnergy: (energy: Omit<IEnergy, ''>) => void;
  idEnergy: string;
  disabled: boolean;
}

export function ModalEditNewEnergy({
  handleEditNewEnergy,
  idEnergy,
  disabled,
}: IModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [reasonUnityItem, setReason] = useState('');
  const [reasonCost_center, setReasonCost_center] = useState('');
  const [initialData, setInitialData] = useState<IEnergy>();

  useEffect(() => {
    try {
      api
        .get<IEnergy>(`energy-consumption/show?id=${idEnergy}`)
        .then(response => {
          setInitialData(response.data);
          setReasonCost_center(response.data.cost_center);
          setReason(response.data.unity);
        });
    } catch (err) {
      apllyToast('error', 'Problemas ao carregar dados');
      console.log(err);
    }
  }, [idEnergy]);

  const handleSubmit = useCallback(
    async (data: IEnergy) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        // eslint-disable-next-line no-param-reassign
        delete data.reasonUnity;
        // eslint-disable-next-line no-param-reassign
        delete data.reasonCost_center;
        const formatData = {
          ...data,
          unity: reasonUnityItem,
          cost_center: reasonCost_center,
          unity_cost_center: `${reasonUnityItem}_${reasonCost_center}`,
        };

        handleEditNewEnergy(formatData);
        onClose();

        setLoading(false);
      } catch (err) {
        onClose();
      }
    },
    [handleEditNewEnergy, onClose, reasonCost_center, reasonUnityItem],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handleOpenModal = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleReason = useCallback(e => {
    setReason(e);
  }, []);
  const handleReasonCost_center = useCallback(e => {
    setReasonCost_center(e);
  }, []);

  return (
    <>
      <Tooltip bg="gray.650" hasArrow label="Editar custo">
        <Button
          size="sm"
          colorScheme="blue"
          fontWeight="medium"
          onClick={() => handleOpenModal()}
          cursor="pointer"
          mr="5px"
          disabled={disabled}
          // isActive={disabled}
        >
          <Icon as={RiAddLine} fontSize="20" />
          {isWideVersion && <Text>Editar custo</Text>}
        </Button>
      </Tooltip>
      <ModalComponent
        title="Editar custo"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <p>Mês resumido</p>
            <Input type="text" name="month" placeholder="Ex: fev" />

            <p>Ano</p>
            <Input type="number" name="year" placeholder="Ex: 2022" />

            <p>Data de leitura</p>
            <Input
              type="string"
              name="reading_date"
              placeholder="Ex: 01/01/2022"
            />

            <p>Leitura Ponta</p>
            <Input type="number" name="reading_tip" placeholder="Ex: 601" />

            <p>Leitura Fora Ponta</p>
            <Input
              type="number"
              name="reading_outside_tip"
              placeholder="Ex: 601"
            />

            <p>Dias</p>
            <Input type="number" name="days" placeholder="Ex: 28" />
            <p>Consumo</p>
            <Input type="number" name="consumption" placeholder="Ex: 25468" />
            <p>Consumo ponta</p>
            <Input
              type="number"
              name="consumption_tip"
              placeholder="Ex: 965458"
            />
            <p>Consumo fora ponta</p>
            <Input
              type="number"
              name="consumption_outside_tip"
              placeholder="Ex: 5452"
            />
            <p>Consumo reativo ponta</p>
            <Input
              type="number"
              name="consumption_reactive_tip"
              placeholder="Ex: 98489"
            />
            <p>Consumo reativo fora ponta</p>
            <Input
              type="number"
              name="consumption_reactive_outside_tip"
              placeholder="Ex: 4575"
            />
            <p>Demanda medida ponta</p>
            <Input
              type="number"
              name="demand_measure_tip"
              placeholder="Ex: 16565"
            />
            <p>Demanda contratada ponta</p>
            <Input
              type="number"
              name="demand_contracted_tip"
              placeholder="Ex: 98465"
            />
            <p>Demanda faturada ponta</p>
            <Input
              type="number"
              name="demand_billed_tip"
              placeholder="Ex: 874546"
            />
            <p>Demanda faturada ponta</p>
            <Input
              type="number"
              name="demand_billed_tip"
              placeholder="Ex: 89465"
            />
            <p>Demanda excedente ponta</p>
            <Input
              type="number"
              name="demand_surplus_tip"
              placeholder="Ex: 8943"
            />
            <p>Fator potência ponta</p>
            <Input
              type="number"
              name="factor_power_tip"
              placeholder="Ex: 9865"
            />
            <p>Fator potência fora ponta</p>
            <Input
              type="number"
              name="factor_power_outside_tip"
              placeholder="Ex: 65656"
            />

            <Select
              name="reasonUnity"
              label="Unidade"
              value={reasonUnityItem}
              onChange={e => {
                handleReason(e.target.value);
              }}
              options={[
                {
                  value: '10/9000577-8',
                  label: '10/9000577-8',
                },
                { value: '10/9001812-8', label: '10/9001812-8' },
                {
                  value: '10/9002093-4',
                  label: '10/9002093-4',
                },
                {
                  value: '10/9001613-0',
                  label: '10/9001613-0',
                },
                {
                  value: '10/9001500-9',
                  label: '10/9001500-9',
                },
                {
                  value: '10/1847807-3',
                  label: '10/1847807-3',
                },
                {
                  value: '10/3231574-9',
                  label: '10/3231574-9',
                },
              ]}
            />
            <Select
              name="reasonCost_center"
              label="Centro de custo"
              value={reasonCost_center}
              onChange={e => {
                handleReasonCost_center(e.target.value);
              }}
              options={[
                {
                  value: '92% Fábrica Suína e 8% Operacionais Cereais',
                  label: '92% Fábrica Suína e 8% Operacionais Cereais',
                },
                { value: 'Cereais', label: 'Cereais' },
                {
                  value: 'UPL I',
                  label: 'UPL I',
                },
                {
                  value: 'Granja Ponto Alto',
                  label: 'Granja Ponto Alto',
                },
                {
                  value: 'Adiministrativo e Veterinaria	',
                  label: 'Adiministrativo e Veterinaria	',
                },
                {
                  value: 'Granja Rio Verde',
                  label: 'Granja Rio Verde',
                },
                {
                  value: 'UDG',
                  label: 'UDG',
                },
              ]}
            />

            <p>Custo total</p>
            <Input name="cost_in_reals" placeholder="Ex: 2541285,22" />

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Fechar
              </Button>
              <Button variant="ghost" type="submit">
                {loading ? (
                  <div {...containerProps} ref={componentRef}>
                    {indicatorEl}
                  </div>
                ) : (
                  'Salvar'
                )}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalComponent>
    </>
  );
}
