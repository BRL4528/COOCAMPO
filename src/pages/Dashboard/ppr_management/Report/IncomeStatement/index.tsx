/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-multi-assign */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '../../../../../components/Global/Button';
import GraphicSpeed from '../../../../../components/Global/GraphicModels/GraphicSpeedometer';
import GraphicBar from '../../../../../components/Global/GraphicModels/CardGraphic';
// import GraphicLine from '../../../../components/Global/GraphicModels/ApexGraphicLine';

import { formatPrice } from '../../../../../utils/format';

import logo from '../../../../../assets/logo.png';
import logo2 from '../../../../../assets/logo2.png';

// import Header from '../../../components/Header';
// import Sidebard from '../../../components/Sidebar';

import { apiGeninfo } from '../../../../../services/api';
import months from '../../../../../utils/resultsforIncomeStatement.json';

import {
  CardButton,
  CardeHeader,
  CardHeader,
  // CardGraphicText,
  Container,
  // GraphicTitle,
  Revenues,
  Result,
  Finances,
  CardGraphicSpeed,
  ContainerGraphics,
  Header,
  Footer,
} from './styles';

interface IDataGeinfo {
  response: [
    {
      painel: string;
      indicador: string;
      ano: number;
      mes: number;
      orcado: number;
      percentual: 0;
      realizado: number;
      variacao: number;
    },
  ];
}

interface IDataHeader {
  goalRevenues: number;
  resultRevenues: number;
  percentageRevenues: number;
  percentageLiquid: number;
  goalLiquid: number;
  resultLiquid: number;
  resultMonth: number;
  liquidMonth: number;
  percentageLiquidMonth: number;
}

const title = {
  text1: '0',
  text2: '1 Sal.Base',
  text3: '1,5 Sal.Base',
  text4: '2 Sal.Base',
};

const years = [
  // {
  //   year_number: 2016,
  // },
  // {
  //   year_number: 2017,
  // },
  // {
  //   year_number: 2018,
  // },
  // {
  //   year_number: 2019,
  // },
  // {
  //   year_number: 2020,
  // },
  {
    year_number: 2021,
  },
  {
    year_number: 2022,
  },
];

const SelectorFolders: React.FC = () => {
  const [dataHeader, setDataHeader] = useState<IDataHeader>({
    goalRevenues: 0,
    resultRevenues: 0,
    percentageRevenues: 0,
    percentageLiquid: 0,
    goalLiquid: 0,
    resultLiquid: 0,
    resultMonth: 0,
    liquidMonth: 0,
    percentageLiquidMonth: 0,
  });

  const [monthSelected, setMonthSelected] = useState(
    // Number(String(new Date('31/12/2021').getMonth() + 1).padStart(2, '0')) - 1,
    1,
  );
  const [yearSelected, setYearSelected] = useState(2022);

  useEffect(() => {
    apiGeninfo
      .get<IDataGeinfo>('/metas', {
        params: {
          ano: yearSelected,
          mesInicial: 1,
          mesFinal: monthSelected,
          painel: 'PPR Adm Central',
        },
      })
      .then(res => {
        // const resultFinancesOrcadoFormated = resultFinancesGraphc.map(
        //   result => {
        //     return result.orcado;
        //   },
        // );

        // Calculando o faturamento l??quido
        const resultRevenues = res.data.response.filter(
          el => el.indicador === '(PPR) FATURAMENTO L??QUIDO',
        );

        const goaltRevenuesFormated = resultRevenues.reduce(
          (total, number) => total + number.orcado,
          0,
        );
        const resultRevenuesFormated = resultRevenues.reduce(
          (total, number) => total + number.realizado,
          0,
        );

        // Calculando o faturamento l??quido do m??s
        const resultRevenuesMonth = res.data.response.filter(
          el =>
            el.indicador === '(PPR) FATURAMENTO L??QUIDO' &&
            el.mes === monthSelected,
        );

        // Calculando do resultado liquido
        const result = res.data.response.filter(
          el => el.indicador === '(PPR) RESULTADO L??QUIDO',
        );

        const goaltFormated = result.reduce(
          (total, number) => total + number.orcado,
          0,
        );

        const resultFormated = result.reduce(
          (total, number) => total + number.realizado,
          0,
        );

        // const resultMonth = [];
        // const monthCurrent = [];

        // const resultLiquid = [];
        // const fatuLiquid = [];
        const e: { month: number; result: number; acumuled: number }[] = [];

        function formatedAcumuled() {
          return e.reduce((total, number) => total + number.result, 0);
        }

        for (let index = 0; index < result.length; index++) {
          const formated = {
            month: result[index].mes,
            result: result[index].realizado,
            acumuled: formatedAcumuled(),
          };

          e.push(formated);
        }

        // Calculando do resultado liquido
        const resultLiquidMonth = res.data.response.filter(
          el =>
            el.indicador === '(PPR) RESULTADO L??QUIDO' &&
            el.mes === monthSelected,
        );

        const resultFinances = {
          goalRevenues: goaltRevenuesFormated,
          resultRevenues: resultRevenuesFormated,

          resultMonth: resultRevenuesMonth[0].realizado,

          percentageRevenues: (goaltFormated / goaltRevenuesFormated) * 100,

          percentageLiquid: (resultFormated / resultRevenuesFormated) * 100,

          percentageLiquidMonth:
            (resultLiquidMonth[0].realizado /
              resultRevenuesMonth[0].realizado) *
            100,

          liquidMonth: resultLiquidMonth[0].realizado,

          goalLiquid: goaltFormated,
          resultLiquid: resultFormated,
        };

        setDataHeader(resultFinances);
      });
  }, [monthSelected, yearSelected]);

  const handlePrint = useCallback(id => {
    return document.getElementById(id);
  }, []);

  const dataGraphicspeed = useMemo(() => {
    if (dataHeader.percentageLiquid <= 1.49) {
      return 125;
    }
    if (
      dataHeader.percentageLiquid >= 1.5 &&
      dataHeader.percentageLiquid <= 2.5
    ) {
      return 375;
    }
    if (
      dataHeader.percentageLiquid >= 2.51 &&
      dataHeader.percentageLiquid <= 3.5
    ) {
      return 625;
    }
    if (dataHeader.percentageLiquid >= 3.51) {
      return 875;
    }
    return 0;
  }, [dataHeader]);

  const filterMonths = useMemo(() => {
    const formated = months.filter(
      el => el.month_number <= monthSelected && el.year === yearSelected,
    );
    return formated;
  }, [monthSelected, yearSelected]);

  const handleSelectedMonth = useCallback((month: number) => {
    setMonthSelected(month);
  }, []);

  const handleSelectedYear = useCallback((year: number) => {
    setYearSelected(year);
  }, []);

  const handleMonthFormated = useMemo(() => {
    const result = months.filter(el => {
      return el.month_number === monthSelected;
    });

    return result;
  }, [monthSelected]);

  const handleVerifyMonthDisponibility = useCallback(
    (monthCurrent, status) => {
      console.log('status', status);
      if (status) {
        if (monthSelected === monthCurrent) {
          return 'selected';
        }
        return 'unselected';
      }
      return 'disabled';
    },
    [monthSelected],
  );

  return (
    <>
      {/* <ModalCreateUser
      isOpen={modalOpen}
      setIsOpen={toggleModal}
      handleUser={handleUser}
      // dataEditUser={dataEditUser}
    /> */}

      <Container>
        <CardeHeader>
          <div>
            <h2>Relat??rios e pain??is infograficos</h2>
            <strong>
              Visualize seus relat??rios e trabalhe com paines infograficos
            </strong>
          </div>

          <CardButton>
            <div>
              <ReactToPrint
                trigger={() => (
                  <Button isUsed className="iconPrint" type="button">
                    Imprimir
                  </Button>
                )}
                content={() => handlePrint('print')}
                documentTitle={`Demonstrativo-${handleMonthFormated[0].month_text}"/"${yearSelected}`}
              />
            </div>
          </CardButton>
        </CardeHeader>

        <section>
          <h4>Selecione o ano</h4>
          {years.map(year => (
            <button
              type="button"
              onClick={() => handleSelectedYear(year.year_number)}
              className={
                yearSelected === year.year_number ? 'selected' : 'unselected'
              }
            >
              {year.year_number}
            </button>
          ))}
        </section>

        <section>
          <h4>Selecione o m??s final</h4>
          {months.map(month =>
            month.year === yearSelected ? (
              <button
                type="button"
                onClick={() => handleSelectedMonth(month.month_number)}
                disabled={!month.status}
                className={handleVerifyMonthDisponibility(
                  month.month_number,
                  month.status,
                )}
              >
                {month.month_text}
              </button>
            ) : (
              ''
            ),
          )}
        </section>

        <div id="print">
          <Header className="headerPrint">
            <h1>
              Demonstrativo do Resultado - {handleMonthFormated[0].month_text}/
              {yearSelected}
            </h1>
          </Header>
          <CardHeader color="#0B85BD">
            <Revenues>
              <h3>Meta de faturamento l??quido</h3>
              <h1>
                {formatPrice(
                  dataHeader?.goalRevenues ? dataHeader?.goalRevenues : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>Meta de resultado l??quido</h3>
              <h1>
                {formatPrice(
                  dataHeader?.goalLiquid ? dataHeader?.goalLiquid : 0,
                )}
              </h1>
            </Result>
            <span />
            <Finances>
              <h3>Meta de resultado financeiro</h3>
              <h1>
                {dataHeader?.percentageRevenues
                  ? dataHeader?.percentageRevenues.toFixed(2)
                  : 0}
                %
              </h1>
            </Finances>
          </CardHeader>
          <CardHeader color="#0BBD60">
            <Revenues>
              <h3>Faturamento l??quido - Acumulado</h3>
              <h1>
                {formatPrice(
                  dataHeader?.resultRevenues ? dataHeader?.resultRevenues : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>Resultado l??quido - Acumulado</h3>
              <h1>
                {formatPrice(
                  dataHeader?.resultLiquid ? dataHeader?.resultLiquid : 0,
                )}
              </h1>
            </Result>
            <span />
            <Finances>
              <h3>Resultado financeiro</h3>
              <h1>
                {dataHeader?.percentageLiquid
                  ? dataHeader?.percentageLiquid.toFixed(2)
                  : 0}
                %
              </h1>
            </Finances>
          </CardHeader>

          <CardHeader color="#e2c90a">
            <Revenues>
              <h3>
                Faturamento l??quido - {handleMonthFormated[0].month_text}/
                {yearSelected}
              </h3>
              <h1>
                {formatPrice(
                  dataHeader?.resultMonth ? dataHeader?.resultMonth : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>
                Resultado l??quido - {handleMonthFormated[0].month_text}/
                {yearSelected}
              </h3>
              <h1>
                {formatPrice(
                  dataHeader?.liquidMonth ? dataHeader?.liquidMonth : 0,
                )}
              </h1>
            </Result>
            <span />
            <Finances>
              <h3>
                Resultado financeiro - {handleMonthFormated[0].month_text}/
                {yearSelected}
              </h3>
              <h1>
                {dataHeader?.percentageLiquidMonth
                  ? dataHeader?.percentageLiquidMonth.toFixed(2)
                  : 0}
                %
              </h1>
            </Finances>
          </CardHeader>

          <CardGraphicSpeed>
            <div>
              <h3>Alcance PPRS</h3>
              <GraphicSpeed
                title={title}
                textValue={`${dataHeader.percentageLiquid.toFixed(2)}%`}
                width={400}
                dataValue={dataGraphicspeed}
              />
              {/* </CardGraphicSpeed>
            <CardGraphicSpeed> */}
            </div>
            <div>
              <span>
                <h3>Resultado M??s a M??s (%)</h3>
              </span>
              <GraphicBar
                result={filterMonths}
                width={650}
                height={300}
                title=""
                color="#240dac"
              />
            </div>
          </CardGraphicSpeed>
          <ContainerGraphics>
            <CardGraphicSpeed>
              {/* <h3>Metas x Resultados (%)</h3> */}
              {/* <GraphicLine
                resultData={Number(dataHeader?.percentageLiquid.toFixed(2))}
                width={390}
                height={300}
                color="#240dac"
              /> */}
            </CardGraphicSpeed>
          </ContainerGraphics>

          <Footer>
            <p>MCorp</p>
            <div>
              <img src={logo} alt="Samasc" />
              <img src={logo2} alt="Samasc" />
            </div>
          </Footer>
        </div>
      </Container>
    </>
  );
};

export default SelectorFolders;
