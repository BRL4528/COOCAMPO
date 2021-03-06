/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import MultiSelect from 'react-multi-select-component';

import { FiX, FiLink2, FiEdit2, FiPlus } from 'react-icons/fi';

import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';

import {
  Form,
  ContainerSub,
  CardSub,
  DivLeft,
  ContainerAnalytic,
  CardAnalytic,
  ContainerGoal,
  CircleAdd,
  Info,
} from './styles';

import Input from '../../../Global/Input';
import Select from '../../../Global/Select';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';

import Modal from '../index';
import { api } from '../../../../services/api';

interface ISector {
  id: string;
  name: string;
  leader: string;
  email: string;
  codccu?: string;
  branch: string;
  observations: string;
}

interface IGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
  observations: string;
  codccu?: string;
}
interface IOptions {
  value: string;
  label: string;
  model?: string;
}

interface IModalProps {
  isOpen: boolean;
  dataEditSector: string;
  setIsOpen: () => void;
  handleSector: (sector: Omit<ISector, ''>) => void;
  // setDataEditSector: () => void;
}

interface IGoalsAnalytics {
  id: string;
  status_of_conclusion: boolean;
  sector: ISector;
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
        };
      },
    ];
  };
}

interface IAnalyticModule {
  id: string;
  name: string;
  responsible: string;
  condition: string;
  observations: string;
  model?: string;
}

const ModalEditSector: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleSector,
  dataEditSector,
  // setDataEditSector,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [selectedGoalsItems, setSelectedGoalsItems] = useState<string[]>([]);
  const [selectedGoalsIdConst, setSelectedGoalsIdConst] = useState<string[]>(
    [],
  );
  const [currentGoals, setCurrentGoals] = useState<string[]>([]);

  const [opengoals, setOpenGoals] = useState<boolean>(false);
  const [dataGoals, setDataGoals] = useState<IOptions[]>([]);

  const [goalsSelected, setGoalsSelected] = useState<IOptions[]>([]);

  const [dataInitialSector, setDataInitialSector] = useState<ISector>();
  // const [dataInitialGoals, setDataInitialGoals] = useState<string[]>([]);
  const [openAnalyticModule, setAnlalyticModule] = useState(false);

  const [analyticModule, setAnalyticModule] = useState<IOptions[]>([]);
  const [analyticSelected, setAnalyticSelected] = useState<[]>([]);

  const [selectedAnalyticItems, setSelectedAnalyticItems] = useState<string[]>(
    [],
  );

  const [selectedIdGoal, setSelectedIdGoal] = useState('');
  const [arrayAnalyticModuleAndGoal, setArrayAnalyticModuleAndGoal] = useState<
    any[]
  >([]);

  useEffect(() => {
    try {
      api.get<IAnalyticModule[]>('/analysis-module').then(response => {
        console.log('analise', response.data);

        const arrayanalyticModuleFormated: React.SetStateAction<IOptions[]> =
          [];
        response.data.forEach(element => {
          const analytic = {
            value: element.id,
            label: element.name,
            model: element.model,
          };

          arrayanalyticModuleFormated.push(analytic);
        });
        console.log('analise', arrayanalyticModuleFormated);

        setAnalyticModule(arrayanalyticModuleFormated);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      setSelectedGoalsItems([]);
      setSelectedGoalsIdConst([]);
      setCurrentGoals([]);
      setAnalyticModule([]);
      setDataInitialSector({
        id: '',
        name: '',
        leader: '',
        branch: '',
        email: '',
        observations: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (dataEditSector !== '') {
        api
          .get<IGoalsAnalytics[]>(
            `/goals-of-sectors?sector_id=${dataEditSector}`,
          )
          .then(response => {
            if (response.data) {
              // const initialSector = {
              //   id: response.data[0].sector.id,
              //   name: response.data[0].sector.name,
              //   leader: response.data[0].sector.leader,
              //   email: response.data[0].sector.email,
              //   branch: response.data[0].sector.branch,
              //   // observations: response.data[0].sector.observations,
              // };
              const initialGoals:
                | React.SetStateAction<IOptions>
                | { value: string; label: string }[] = [];

              response.data.forEach(element => {
                const goal = {
                  value: element.goals.id,
                  label: element.goals.name,
                };
                initialGoals.push(goal);
              });

              setGoalsSelected(initialGoals);
            }
          });
        api
          .get<ISector>(`sectors/show?sector_id=${dataEditSector}`)
          .then(res => {
            api
              .get<IGoals[]>(`goals/show?codccu=${res.data.codccu}`)
              .then(resp => {
                const arrayGoalFormated:
                  | React.SetStateAction<IOptions>
                  | { value: string; label: string }[] = [];

                resp.data.forEach(element => {
                  const goal = {
                    value: element.id,
                    label: element.name,
                  };
                  arrayGoalFormated.push(goal);
                });

                setDataGoals(arrayGoalFormated);
              });

            setDataInitialSector(res.data);
          });
        setOpenGoals(true);
      }
    }
  }, [dataEditSector, isOpen]);

  const handleSubmit = useCallback(
    async (data: ISector) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do setor ?? Obrigat??rio'),
          leader: Yup.string().required('Lider ?? obrigat??rio'),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, leader, branch, email, id, observations, codccu } = data;

        const formData = {
          id,
          name,
          branch,
          email,
          observations,
          leader,
          codccu,
        };
        // Atualiza informa????es do setor
        await api.put(`/sectors?sector_id=${dataEditSector}`, formData);
        handleSector(formData);

        // formata os id, apagando o id selecionado do estado de selectedGoalsItems
        // if (arrayAnalyticModuleAndGoal.length > 0) {
        //   selectedGoalsItems.splice(
        //     selectedGoalsItems.indexOf(arrayAnalyticModuleAndGoal[0].goal_id),
        //     1,
        //   );
        // }

        // verifica se houve altera????es nas metas
        const checked = selectedGoalsItems.filter(element =>
          currentGoals.includes(element),
        );
        console.log('verifica se houve altera????es nas metas', checked);
        // Encontra qual foi o m??dulo de analise selecionado, para add o modelo na url
        const analyticModuleFiltred = analyticModule.find(element => {
          return element.value === selectedAnalyticItems[0];
        });

        console.log('encontra m??dulo de analise', analyticModuleFiltred);

        // const route = analyticModule.find(
        //   analytic => analytic.id === selectedAnalyticItems[0],
        // );
        // Cria novo relacionamento entre a meta selecionando e o setor
        if (currentGoals.length === 0 && selectedGoalsItems.length !== 0) {
          console.log('cria novo relacionamento');

          await api.post('/1goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
            analysis_module: arrayAnalyticModuleAndGoal,
          });

          if (selectedAnalyticItems.length !== 0) {
            await api.put(
              `/1analysis-module?analyze_module_id=${selectedAnalyticItems[0]}`,
              {
                url: `https://www.samasc.cloud/management-ppr/painel-module-${analyticModuleFiltred?.model}?${selectedAnalyticItems[0]}`,
                // url: `http://localhost:3000/painel-${analyticModuleFiltred?.model}?${selectedAnalyticItems[0]}`,
              },
            );
          }
          // Atualiza se houve altera????es
        } else if (!(checked.length === currentGoals.length)) {
          console.log('Atualiza 01');
          // await api.delete(`/goals-of-sectors/${dataEditSector}`);

          const res = {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
            analysis_module: arrayAnalyticModuleAndGoal,
          };
          console.log(res);

          await api.post('/1goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
            analysis_module: arrayAnalyticModuleAndGoal,
          });

          if (selectedAnalyticItems.length !== 0) {
            await api.put(
              `/1analysis-module?analyze_module_id=${selectedAnalyticItems[0]}`,
              {
                url: `https://www.samasc.cloud/management-ppr/painel-module-${analyticModuleFiltred?.model}?${selectedAnalyticItems[0]}`,
                // url: `http://localhost:3000/painel-${analyticModuleFiltred?.model}?${selectedAnalyticItems[0]}`,
              },
            );
          }
          // Atualiza se houve altera????es
        } else if (!(checked.length === selectedGoalsItems.length)) {
          console.log('Atualiza 02');
          await api.delete(`/1goals-of-sectors/${dataEditSector}`);

          await api.post('/1goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
            analysis_module: arrayAnalyticModuleAndGoal,
          });

          if (selectedAnalyticItems.length !== 0) {
            await api.put(
              `/1analysis-module?analyze_module_id=${selectedAnalyticItems[0]}`,
              {
                url: `https://www.samasc.cloud/management-ppr/painel-module-${analyticModuleFiltred?.model}?${selectedAnalyticItems[0]}`,
                // url: `http://localhost:3000/painel-${analyticModuleFiltred?.model}?${selectedAnalyticItems[0]}`,
              },
            );
          }
        }

        setIsOpen();
        // setSelectedGoalsItems([]);
        // setDataInitialSector({
        //   id: '',
        //   name: '',
        //   leader: '',
        //   branch: '',
        //   email: '',
        // });
        // setDataEditSector();

        addToast({
          type: 'success',
          title: 'Setor',
          description: 'Setor atualizado com com sucesso',
        });
      } catch (err) {
        console.log(err);
        setIsOpen();
        addToast({
          type: 'error',
          title: 'Erro na a????o',
          description: 'Recarregue a pagina e tente novamente.',
        });
      }
    },
    [
      dataEditSector,
      handleSector,
      arrayAnalyticModuleAndGoal,
      selectedGoalsItems,
      analyticModule,
      currentGoals,
      setIsOpen,
      addToast,
      selectedAnalyticItems,
    ],
  );
  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedAnalyticItems.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedAnalyticItems.filter(
          (item: string) => item !== id,
        );

        setSelectedAnalyticItems(filteredItems);
      } else {
        setSelectedAnalyticItems([id]);
      }
    },
    [selectedAnalyticItems],
  );

  const options = [
    { value: '1', label: '1-Matriz' },
    { value: '2', label: '2-UPLI' },
    { value: '3', label: '3-UPLII' },
    { value: '4', label: '4-Granja P Alto' },
    { value: '5', label: '5-Agropecuaria' },
    { value: '6', label: '6-Confinamento' },
    { value: '7', label: '7-U.D.G' },
    { value: '8', label: '8-Super Cooasgo' },
    { value: '9', label: '9-Rondonopolis' },
    { value: '10', label: '10-Granja Rio Verde' },
    { value: '11', label: '11-Cerealista' },
  ];

  const Internationalization = {
    allItemsAreSelected: 'Todos os itens selecionados.',
    clearSearch: 'Limpar pesquisa',
    noOptions: 'Sem op????es',
    search: 'Pesquisar',
    selectAll: 'Selecionar todos',
    selectSomeItems: 'Selecione...',
  };

  const handleSelectGoalsItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedGoalsIdConst.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedGoalsIdConst.filter(
          (item: string) => item !== id,
        );

        setSelectedGoalsItems(filteredItems);
        setSelectedGoalsIdConst(filteredItems);
      } else {
        setSelectedGoalsItems([...selectedGoalsIdConst, id]);
        setSelectedGoalsIdConst([...selectedGoalsIdConst, id]);
      }
    },
    [selectedGoalsIdConst],
  );

  const hanleOpenGoals = useCallback(() => {
    setOpenGoals(!opengoals);
    setAnlalyticModule(false);
  }, [opengoals]);

  const handleOpenAnalyticModule = useCallback(
    id => {
      setAnlalyticModule(!openAnalyticModule);

      if (id) {
        setSelectedIdGoal(id);
      }
      // setOpenGoals(false);
    },
    [openAnalyticModule],
  );
  // const handleCloseAnalyticModule = useCallback(() => {
  //   const moduleIds = {
  //     analyze_module_id: selectedAnalyticItems[0],
  //     goal_id: selectedIdGoal,
  //   };

  //   setArrayAnalyticModuleAndGoal([moduleIds]);

  //   setAnlalyticModule(!openAnalyticModule);
  //   // setOpenGoals(false);
  // }, [openAnalyticModule, selectedAnalyticItems, selectedIdGoal]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        opengoals={opengoals}
        onSubmit={handleSubmit}
        openAnalytic={openAnalyticModule}
        initialData={dataInitialSector}
      >
        <span>
          <div>
            <h2>Editar setor</h2>
            <FiEdit2 size={20} />
          </div>

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <p>Nome do setor</p>
        <Input name="name" placeholder="Ex: Contabilidade" />

        <p>C??digo do setor</p>
        <Input name="codccu" placeholder="Ex: 1000258" />

        <p>Nome do lider</p>
        <Input type="text" name="leader" placeholder="Ex: Ant??nio Fagundes" />
        <p>E-mail do lider</p>
        <Input
          type="email"
          name="email"
          placeholder="Ex: antonio.fagundes@.empresa.com.br"
        />
        <p>Filial</p>
        <Select name="branch" options={options} />
        <p>Observa????es</p>
        <TextArea name="observations" placeholder="Descri????o" />

        <p>Meta</p>
        <MultiSelect
          options={dataGoals}
          value={goalsSelected}
          onChange={setGoalsSelected}
          labelledBy="Selecione"
          overrideStrings={Internationalization}
        />
        <p>Modulo de analise</p>
        <MultiSelect
          options={analyticModule}
          value={analyticSelected}
          onChange={setAnalyticSelected}
          labelledBy="Selecione"
          overrideStrings={Internationalization}
        />
        <nav>
          <ContainerSub />

          <DivLeft>
            <Button type="submit" data-testid="add-food-button">
              Salvar
            </Button>
          </DivLeft>
        </nav>
      </Form>
    </Modal>
  );
};

export default ModalEditSector;
