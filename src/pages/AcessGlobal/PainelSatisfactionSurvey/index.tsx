/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-duplicates */
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import * as Yup from 'yup';
import { Swiper, SwiperSlide } from 'swiper/react';

import UseAnimations from 'react-useanimations';
import radioButton from 'react-useanimations/lib/radioButton';
import { FiCheck, FiCalendar, FiSmile } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
// import enUS from 'date-fns/locale/en-US';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useLoading, Oval } from '@agney/react-loading';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../../hooks/toast';
import search from '../../../assets/chart.svg';
import notion from '../../../assets/notion.svg';
import logo from '../../../assets/logo.svg';

import api from '../../../services/api';

import {
  Container,
  CardContainer,
  CardLoading,
  Calendar,
  TogleCalendar,
  ContainerMaster,
  CardIntro,
} from './styles';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// import RadioInput from '../../../components/Global/Radio';
import Button from '../../../components/Global/Button';

import ModalAddOccurrenceModuleLow from '../../../components/Admin/Modal/ModalObservationPainelSatisfaction';
import ModalAddOccurrenceModuleHigh from '../../../components/Admin/Modal/ModalObservationPainelSatisfaction2';
import Input from '../../../components/Global/Input';

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

interface IEmail {
  email: string;
}

// interface ResSubGoals {
//   a0b6d3b09875c489bac84e5646e0e81f0: string;
//   a198c5317a84a4146bc7e9c175b7bdedc: string;
//   aa87cb8daad4c4e4197883e23d967031f: string;
//   ac229ee17d5d449e293ac0ef0a309c187: string;
// }

interface Occurrence {
  observations?: string;
}

const PainelAnalyticModule: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const parsed = window.location.search;

  const [modalOpenLow, setModalOpenLow] = useState(false);
  const [modalOpenHigh, setModalOpenHigh] = useState(false);

  const [dataOccurrence, setOoccurrence] = useState<any[]>([]);
  const [idOcurrence, setIdOcurrence] = useState('');

  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [currentMonth, setCurrentMonth] = useState(new Date());

  const [loadingItens, setLoading] = useState(true);
  // const [idRelationSector, seIdRelationSector] = useState('');
  const [grupChecked, setGrupChecked] = useState(false);
  const [dataGoalsAnalytic, setDataGoalsAnalytic] = useState<IGoalsAnalytics[]>(
    [],
  );

  const [optionSelected, setOptionSelected] = useState<string[]>([]);
  // const [adder, setAdder] = useState({});

  const { containerProps, indicatorEl } = useLoading({
    loading: loadingItens,
    indicator: <Oval />,
  });

  const toggleModalLow = useCallback(() => {
    setModalOpenLow(!modalOpenLow);
  }, [modalOpenLow]);
  const toggleModalHigh = useCallback(() => {
    setModalOpenHigh(!modalOpenHigh);
  }, [modalOpenHigh]);

  useEffect(() => {
    try {
      console.log('ver', parsed.slice(1));
      api
        .get(`goals-of-sectors?analyze_module_id=${parsed.slice(1)}`)
        .then(response => {
          const status_of_conclusion = localStorage.getItem(
            '@Samasc:statusSuvey',
          );
          // const status_of_conclusion: React.SetStateAction<string[]> = [];

          // response.data.forEach(function (item: IGoalsAnalytics) {
          //   if (item.status_of_conclusion) {
          //     status_of_conclusion.push(item.id);
          //   }
          // });
          setLoading(false);
          setGrupChecked(Boolean(status_of_conclusion));
          setDataGoalsAnalytic(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [parsed]);

  const handleopenCalendar = useCallback(() => {
    setOpenCalendar(false);
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
      setOpenCalendar(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: IEmail) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail do representante obrigátorio')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        if (optionSelected.length < 4) {
          addToast({
            type: 'error',
            title: 'Erro na ação',
            description:
              'Talvez esteja faltando algumas questões, marque todas as alternativas.',
          });
        }
        const { email } = data;

        const returnFormated: { id: string; result: string }[] = [];

        optionSelected.forEach(resultUnit => {
          const separ = resultUnit.split('!');

          const arrayFormat = {
            result: separ[0] === '&' ? '10' : separ[0],
            id: separ[1],
          };

          returnFormated.push(arrayFormat);
        });

        const result =
          returnFormated.reduce((acum, current) => {
            return acum + Number(current.result);
          }, 0) / returnFormated.length;

        await api.post('/satisfaction-survey-response', {
          goal_id: dataGoalsAnalytic[0].goals.id,
          sector_id: dataGoalsAnalytic[0].sector.id,
          analyze_module_id: parsed.slice(1),
          date: selectedDate,
          result,
          observations: String(dataOccurrence),
          email,
          model: email,
        });

        const status = {
          status_of_conclusion: true,
        };

        // await api
        //   .put(`/goals-of-sectors?analyze_module_id=${parsed.slice(1)}`, status)
        //   .then(response => {
        //     console.log(response.data);
        //   });

        localStorage.setItem(
          '@Samasc:statusSuvey',
          `${status.status_of_conclusion}`,
        );
        setGrupChecked(true);

        addToast({
          type: 'success',
          title: 'Pesquisa de satisfação finalizada com sucesso',
          description: 'sucesso ao finalizar a pesquisa de satisfação',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na ação',
          description:
            'ocorreu um erro ao finalizar a pesquisa, verifique se foi adicionado o email.',
        });
      }
    },
    [
      optionSelected,
      dataOccurrence,
      dataGoalsAnalytic,
      parsed,
      selectedDate,
      addToast,
    ],
  );

  // const handleChecked = useCallback(
  //   (id: string) => {
  //     seIdRelationSector(id);
  //     const alreadySelected = grupChecked.findIndex(
  //       (item: string) => item === id,
  //     );

  //     if (alreadySelected >= 0) {
  //       const filteredItems = grupChecked.filter((item: string) => item !== id);

  //       setGrupChecked(filteredItems);
  //     } else {
  //       setGrupChecked([...grupChecked, id]);
  //     }
  //   },
  //   [grupChecked],
  // );

  const formatedDate = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM 'de' yyy", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const handleOccurrence = useCallback(
    (data: Omit<Occurrence, 'status'>) => {
      try {
        const temp = data;

        setOoccurrence([
          ...dataOccurrence,
          `${temp.observations}#${idOcurrence}`,
        ]);
      } catch (err) {
        console.log(err);
      }
    },
    [dataOccurrence, idOcurrence],
  );

  const handleSelectItem = useCallback(
    (data: string) => {
      const dataItem = data.split('#');

      const itemObject = {
        result: dataItem[1],
        id: dataItem[0],
      };
      const itemSelected = optionSelected.findIndex((item: string) => {
        return item.substring(1) === itemObject.id.substring(1);
      });

      if (itemSelected >= 0) {
        const filteredItems = optionSelected.filter(
          (item: string) => item !== itemObject.id,
        );
        setOptionSelected(filteredItems);
      } else {
        if (Number(itemObject.result) <= 6) {
          setIdOcurrence(itemObject.id);
          setModalOpenLow(true);
        } else {
          setModalOpenHigh(true);
        }
        setOptionSelected([...optionSelected, itemObject.id]);
      }
    },
    [optionSelected],
  );

  return (
    <>
      <ContainerMaster displayLow={!modalOpenLow} displayHigh={!modalOpenHigh}>
        <Swiper
          // spaceBetween={50}
          // slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: false }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <CardIntro>
              <div>
                <img src={search} alt="Samasc" />
                <div>
                  <h1>
                    Pesquisa de Satistação - Serviços prestados pela Área
                    Tecnologia da Informação
                  </h1>
                  <h2>Prezados,</h2>
                  <p>
                    Visando a melhoria contínua de nossos serviços e
                    atendimento, gostaríamos de sua colaboração no preenchimento
                    desta pesquisa de satisfação. Em caso de dúvidas quanto aos
                    tópicos desta pesquisa, por favor, faça contato com a área
                    de Recursos Humanos. A pesquisa é confidencial e suas
                    respostas serão mantidas em sigilo. Contamos e agradecemos a
                    sua participação!
                  </p>
                </div>
              </div>
              <footer>
                <img src={logo} alt="Samasc" />
              </footer>
            </CardIntro>
          </SwiperSlide>
          <SwiperSlide>
            <CardIntro>
              <div>
                <header>
                  <img src={notion} alt="Samasc" />
                </header>
                <div>
                  <h1>Orientações</h1>
                  <span>
                    <p>
                      - Pontue com notas de 1 a 10 o seu nível de satisfação com
                      relação aos tópicos a seguir, quanto mais próximo de 10 é
                      maior o seu nível de satisfação e quanto mais próximo de 1
                      é menor este nível.
                    </p>
                  </span>
                  <span>
                    <p>
                      - Quando a sua avaliação for inferior a 7 , solicitamos
                      que faça uma breve justificativa, para que possamos
                      entender e direcionar as ações corretivas, caso seja maior
                      ou igual a 7, fique a vontade para adicionar uma sugestão
                      ou elogio
                    </p>
                  </span>
                  <span>
                    <p>
                      - Caso não consiga responder alguma questão por entender
                      que não houve a prestação do serviço, por favor, opte por
                      *NA* (Não aplicável).
                    </p>
                  </span>
                  <span>
                    <p>
                      - Fique atento quanto ao período vigente da pesquisa, pois
                      a mesma tera inicio hoje dia <strong>09/03/2021</strong> e
                      será fechada no dia <strong>16/03/2021</strong>.
                    </p>
                  </span>
                </div>
              </div>
              <footer>
                <img src={logo} alt="Samasc" />
              </footer>
            </CardIntro>
          </SwiperSlide>

          <SwiperSlide>
            <Container>
              <header>
                <h1>Pesquisa de satisfação</h1>
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
                  <ModalAddOccurrenceModuleLow
                    isOpen={modalOpenLow}
                    setIsOpen={toggleModalLow}
                    handleOccurrence={handleOccurrence}
                  />
                  <ModalAddOccurrenceModuleHigh
                    isOpen={modalOpenHigh}
                    setIsOpen={toggleModalHigh}
                    handleOccurrence={handleOccurrence}
                  />
                  {dataGoalsAnalytic.length ? (
                    <>
                      {dataGoalsAnalytic.map(dataAnalytic => (
                        <CardContainer
                          checked
                          idCurrent={dataAnalytic.sector.id}
                          idChecked="e"
                          key={dataAnalytic.id}
                        >
                          <div className={grupChecked ? 'selected' : ''}>
                            <div>
                              <h2>
                                {dataAnalytic.sector.name}
                                <span>
                                  {grupChecked ? (
                                    <UseAnimations
                                      animation={radioButton}
                                      size={40}
                                      strokeColor="#4CAF50"
                                      style={{ padding: 50 }}
                                      reverse={!!grupChecked}
                                    />
                                  ) : (
                                    <FiCheck size={34} />
                                  )}
                                </span>
                              </h2>
                            </div>
                            <h3>{dataAnalytic.goals.name}</h3>
                            <Form ref={formRef} onSubmit={handleSubmit}>
                              {dataAnalytic.goals.sub_goals_of_goals.map(
                                dataSubGoal => (
                                  <div key={dataSubGoal.id}>
                                    <div>
                                      <strong>
                                        {dataSubGoal.sub_goals.name}
                                      </strong>
                                    </div>
                                    <div>
                                      <span>
                                        <button
                                          id={dataSubGoal.sub_goals.id}
                                          onClick={() =>
                                            handleSelectItem(
                                              `0!${
                                                dataSubGoal.sub_goals.id
                                              }#${0}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `0!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          NA
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `1!${
                                                dataSubGoal.sub_goals.id
                                              }#${1}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `1!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          1
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `2!${
                                                dataSubGoal.sub_goals.id
                                              }#${2}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `2!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          2
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `3!${
                                                dataSubGoal.sub_goals.id
                                              }#${3}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `3!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          3
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `4!${
                                                dataSubGoal.sub_goals.id
                                              }#${4}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `4!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          4
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `5!${
                                                dataSubGoal.sub_goals.id
                                              }#${5}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `5!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          5
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `6!${
                                                dataSubGoal.sub_goals.id
                                              }#${6}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `6!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          6
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `7!${
                                                dataSubGoal.sub_goals.id
                                              }#${7}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `7!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          7
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `8!${
                                                dataSubGoal.sub_goals.id
                                              }#${8}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `8!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          8
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `9!${
                                                dataSubGoal.sub_goals.id
                                              }#${9}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `9!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          9
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleSelectItem(
                                              `&!${
                                                dataSubGoal.sub_goals.id
                                              }#${10}`,
                                            )
                                          }
                                          type="button"
                                          className={
                                            optionSelected.includes(
                                              `&!${dataSubGoal.sub_goals.id}`,
                                            )
                                              ? 'selectedValue'
                                              : ''
                                          }
                                        >
                                          10
                                        </button>
                                      </span>
                                      {/* <span> */}
                                      {/* <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `1-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${1}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '1',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `2-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${2}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '2',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `3-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${3}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '3',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `4-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${4}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '4',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `5-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${5}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '5',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `6-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${6}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '6',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `7-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${7}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '7',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `8-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${8}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '8',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `9-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${9}#${dataAnalytic.goals.id}#${
                                                dataSubGoal.sub_goals.id
                                              }#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '9',
                                            },
                                          ]}
                                        />
                                      </span>
                                      <span>
                                        <RadioInput
                                          name={`a${formatNameInputRadio(
                                            dataSubGoal.sub_goals.id,
                                          )}`}
                                          options={[
                                            {
                                              id: `10-${dataAnalytic.sector.id}-${dataSubGoal.sub_goals.id}`,
                                              value: `${
                                                dataAnalytic.sector.id
                                              }#${10}#${
                                                dataAnalytic.goals.id
                                              }#${dataSubGoal.sub_goals.id}#${
                                                dataSubGoal.sub_goals.weight
                                              }`,
                                              label: '10',
                                            },
                                          ]}
                                        />
                                      </span> */}
                                    </div>
                                    {/* <CheckboxInput
                                      name={`yes-${dataSubGoal.id}`}
                                      options={[
                                        {
                                          id: `yes-${dataAnalytic.sector.id}-${dataSubGoal.id}`,
                                          value: `${
                                            dataAnalytic.sector.id
                                          }#${true}#${dataAnalytic.goals.id}#${
                                            dataSubGoal.sub_goals.id
                                          }#${dataSubGoal.sub_goals.weight}`,
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
                                    /> */}
                                  </div>
                                ),
                              )}

                              <section>
                                <span>
                                  <p>
                                    Confirme este formulário, adicionando seu
                                    email
                                  </p>
                                  <Input
                                    name="email"
                                    placeholder="Adicione seu email utilizado na cooperativa"
                                  />
                                  <Button
                                    // onClick={() => handleChecked(dataAnalytic.id)}
                                    type="submit"
                                  >
                                    Finalizar
                                  </Button>
                                </span>
                              </section>
                            </Form>
                          </div>
                        </CardContainer>
                      ))}
                    </>
                  ) : (
                    <>
                      <FiSmile size={40} />
                      <p>
                        Parece que este módulo de análise esta faltando algumas
                        peças!
                      </p>
                      <strong>
                        Mas não se preocupe, aguarde até que fique tudo pronto.
                      </strong>
                    </>
                  )}
                </>
              )}
              <footer>
                <img src={logo} alt="Samasc" />
              </footer>
            </Container>
          </SwiperSlide>
        </Swiper>
      </ContainerMaster>
    </>
  );
};

export default PainelAnalyticModule;
