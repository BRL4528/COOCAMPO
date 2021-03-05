/* eslint-disable import/no-duplicates */
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';
import { FiCheck, FiCalendar, FiSmile, FiFileText } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import enUS from 'date-fns/locale/en-US';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useLoading, Oval } from '@agney/react-loading';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import {
  Container,
  CardContainer,
  CardLoading,
  Calendar,
  TogleCalendar,
} from './styles';

import CheckboxInput from '../../../components/Global/InputCheckBox';
import Button from '../../../components/Global/Button';

import ModalAddOccurrenceModule from '../../../components/Admin/Modal/ModalAddOccurrenceModule';

interface IGoalsAnalytics {
  id: string;
  status_of_conclusion: boolean;
  sector: {
    id: string;
    name: string;
    leader: string;
  };
  goals: {
    id: string;
    name: string;
    status: string;
    weight: string;
    source: string;
    observations: string;
    type: string;
    sub_goals_of_goals: [
      {
        id: string;
        sub_goals: {
          id: string;
          name: string;
          weight: number;
        };
      },
    ];
  };
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface Occurrence {
  observations?: string;
}
interface ResultFormated {
  sector_id: string;
  goal_id: string;
  month: Date;
  observations: string | undefined;
}

const PainelAnalyticModule: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<FormHandles>(null);
  const parsed = window.location.search;

  const [modalOpen, setModalOpen] = useState(false);
  const [dataOccurrence, setOoccurrence] = useState<Occurrence>();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [currentMonth, setCurrentMonth] = useState(new Date());

  const [loadingItens, setLoading] = useState(true);
  const [idRelationSector, seIdRelationSector] = useState('');
  const [checked, setChecked] = useState(true);
  const [grupChecked, setGrupChecked] = useState<string[]>([]);
  const [dataGoalsAnalytic, setDataGoalsAnalytic] = useState<IGoalsAnalytics[]>(
    [],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading: loadingItens,
    indicator: <Oval />,
  });

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    try {
      api.get(`goals-of-sectors?analyze_module_id=${parsed.slice(1)}`).then(response => {
        const status_of_conclusion: React.SetStateAction<string[]> = [];

        response.data.forEach(function (item: IGoalsAnalytics) {
          if (item.status_of_conclusion) {
            status_of_conclusion.push(item.id);
          }
        });
        setLoading(false);
        setGrupChecked(status_of_conclusion);
        setDataGoalsAnalytic(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [parsed]);

  const handleopenCalendar = useCallback(() => {
    setOpenCalendar(!openCalendar);
  }, [openCalendar]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        console.log(day);
        setSelectedDate(day);
        setOpenCalendar(!openCalendar);
      }
    },
    [openCalendar],
  );

  const handleSubmit = useCallback(
    async (data: CheckboxOption) => {
      let dataResult: {
        sector_id: string;
        goal_id: string;
        month: Date;
        observations: string | undefined;
      };
      const results_of_sub_goals: {
        result: boolean;
        weight: number;
        sub_goal_id: string;
      }[] = [];

      const temp: ResultFormated[] = [];

      Object.values(data).forEach(function (item) {
        if (item.length !== 0) {
          const dataItem = item[0].split('#');

          const dataIter = {
            result: Boolean(dataItem[1] === 'true'),
            sub_goal_id: dataItem[3],
            weight: dataItem[4],
          };
          const dataHeader = {
            sector_id: dataItem[0],
            goal_id: dataItem[2],
            month: selectedDate,
            observations: dataOccurrence?.observations,
          };

          results_of_sub_goals.push(dataIter);
          dataResult = dataHeader;
          temp[0] = dataResult;
        }
      });

      const resultFormated = {
        goal_id: temp[0].goal_id,
        sector_id: temp[0].sector_id,
        observations: temp[0].observations,
        date: temp[0].month,

        month: format(temp[0].month, 'MMMM', {
          locale: enUS,
        }).toLowerCase(),
        year: Number(
          format(temp[0].month, 'yyy', {
            locale: enUS,
          }),
        ),
        results_of_sub_goals,
      };

      setChecked(!checked);

      const status = {
        status_of_conclusion: true,
      };
      // VERIFICAR COM DEV API SE PODE USAR ESTA ROTA

      await api.post('/results-of-sub-goals/create-all', resultFormated);

      await api.put(
        `/goals-of-sectors?goal_of_sector_id=${idRelationSector}`,
        status,
      );
      // .then(response => {
      //   console.log(response.data);
      // });
    },
    [checked, dataOccurrence?.observations, idRelationSector, selectedDate],
  );

  const handleChecked = useCallback(
    (id: string) => {
      seIdRelationSector(id);
      const alreadySelected = grupChecked.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = grupChecked.filter((item: string) => item !== id);

        setGrupChecked(filteredItems);
      } else {
        setGrupChecked([...grupChecked, id]);
      }
    },
    [grupChecked],
  );

  const formatedDate = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM 'de' yyy", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const handleOccurrence = useCallback((data: Omit<Occurrence, 'status'>) => {
    try {
      const temp = data;
      console.log(temp);
      setOoccurrence(temp);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <ModalAddOccurrenceModule
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleOccurrence={handleOccurrence}
      />
      <Container>
        <header>
          <h1>Painel módulo de análise</h1>
        </header>
        <span>
          <button type="button" onClick={() => handleopenCalendar()}>
            {formatedDate}

            <FiCalendar size={20} />
          </button>
        </span>
        <TogleCalendar openCalendar={openCalendar}>
          <div>
            <Calendar>
              <DayPicker
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                // fromMonth={new Date()}
                selectedDays={selectedDate}
                disabledDays={[{ daysOfWeek: [0, 6] }]}
                modifiers={{
                  available: { daysOfWeek: [1, 2, 3, 4, 5] },
                }}
                onDayClick={handleDateChange}
                months={[
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ]}
              />
            </Calendar>
          </div>
        </TogleCalendar>
        {loadingItens ? (
          <CardLoading {...containerProps} ref={componentRef}>
            {indicatorEl}
          </CardLoading>
        ) : (
          <>
            {dataGoalsAnalytic.length ? (
              <>
                {dataGoalsAnalytic.map(dataAnalytic => (
                  <CardContainer
                    checked={checked}
                    idCurrent={dataAnalytic.sector.id}
                    idChecked="e"
                    key={dataAnalytic.id}
                  >
                    <div
                      className={
                        grupChecked.includes(dataAnalytic.id) ? 'selected' : ''
                      }
                    >
                      <div>
                        <h2>
                          {dataAnalytic.sector.name}
                          <span>
                            {grupChecked.includes(dataAnalytic.id) ? (
                              <UseAnimations
                                animation={radioButton}
                                size={40}
                                strokeColor="#4CAF50"
                                style={{ padding: 50 }}
                                reverse={
                                  !!grupChecked.includes(dataAnalytic.id)
                                }
                              />
                            ) : (
                              <FiCheck size={34} />
                            )}
                          </span>
                        </h2>

                        <FiFileText size={20} onClick={() => toggleModal()} />
                      </div>
                      <h3>{dataAnalytic.goals.name}</h3>
                      <Form ref={formRef} onSubmit={handleSubmit}>
                        {dataAnalytic.goals.sub_goals_of_goals.map(
                          dataSubGoal => (
                            <div key={dataSubGoal.id}>
                              <div>
                                <strong>{dataSubGoal.sub_goals.name}</strong>
                              </div>

                              <CheckboxInput
                                name={`yes-${dataSubGoal.id}`}
                                options={[
                                  {
                                    id: `yes-${dataAnalytic.sector.id}-${dataSubGoal.id}`,
                                    value: `${dataAnalytic.sector.id}#${true}#${
                                      dataAnalytic.goals.id
                                    }#${dataSubGoal.sub_goals.id}#${
                                      dataSubGoal.sub_goals.weight
                                    }`,
                                    label: 'Conforme',
                                  },
                                ]}
                              />
                              <CheckboxInput
                                name={`no-${dataSubGoal.id}`}
                                options={[
                                  {
                                    id: `no-${dataAnalytic.sector.id}-${dataSubGoal.id}`,
                                    value: `${
                                      dataAnalytic.sector.id
                                    }#${false}#${dataAnalytic.goals.id}#${
                                      dataSubGoal.sub_goals.id
                                    }#0`,
                                    label: 'Não conforme',
                                  },
                                ]}
                              />
                            </div>
                          ),
                        )}
                        <Button
                          onClick={() => handleChecked(dataAnalytic.id)}
                          type="submit"
                        >
                          Salvar
                        </Button>
                      </Form>
                    </div>
                  </CardContainer>
                ))}
              </>
            ) : (
              <>
                <FiSmile size={40} />
                <p>
                  Parece que este módulo de análise esta faltando algumas peças!
                </p>
                <strong>
                  Mas não se preocupe, aguarde até que fique tudo pronto.
                </strong>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default PainelAnalyticModule;
