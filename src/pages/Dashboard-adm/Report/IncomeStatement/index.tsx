import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '../../../../components/Global/Button';
import GraphicSpeed from '../../../../components/Global/GraphicModels/GraphicSpeedometer';
import GraphicBar from '../../../../components/Global/GraphicModels/ApexGraphicBar';
import GraphicLine from '../../../../components/Global/GraphicModels/ApexGraphicLine';

import { formatPrice } from '../../../../utils/format';

import logo from '../../../../assets/logo.png';
import logo2 from '../../../../assets/logo2.png';

// import Header from '../../../components/Header';
// import Sidebard from '../../../components/Sidebar';

import { apiGeninfo } from '../../../../services/api';

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

  useEffect(() => {
    apiGeninfo
      .get<IDataGeinfo>('/metas', {
        params: {
          ano: 2021,
          mesInicial: 1,
          mesFinal: 8,
          painel: 'PPR Adm Central',
        },
      })
      .then(res => {
        console.log(res);
        // Calculando o faturamento líquido
        const resultRevenues = res.data.response.filter(
          el => el.indicador === '(PPR) FATURAMENTO LÍQUIDO',
        );

        const goaltRevenuesFormated = resultRevenues.reduce(
          (total, number) => total + number.orcado,
          0,
        );
        const resultRevenuesFormated = resultRevenues.reduce(
          (total, number) => total + number.realizado,
          0,
        );

        // Calculando o faturamento líquido do mês
        const resultRevenuesMonth = res.data.response.filter(
          el => el.indicador === '(PPR) FATURAMENTO LÍQUIDO' && el.mes === 7,
        );

        // Calculando do resultado liquido
        const result = res.data.response.filter(
          el => el.indicador === '(PPR) RESULTADO LÍQUIDO',
        );

        const goaltFormated = result.reduce(
          (total, number) => total + number.orcado,
          0,
        );
        const resultFormated = result.reduce(
          (total, number) => total + number.realizado,
          0,
        );

        // Calculando do resultado liquido
        const resultLiquidMonth = res.data.response.filter(
          el => el.indicador === '(PPR) RESULTADO LÍQUIDO' && el.mes === 7,
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
  }, []);

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
      return 770;
    }
    return 0;
  }, [dataHeader]);

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
            <h2>Relatórios e painéis infograficos</h2>
            <strong>
              Visualize seus relatórios e trabalhe com paines infograficos
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
                documentTitle="Demontrativo-Julho-2021"
              />
            </div>
          </CardButton>
        </CardeHeader>
        <div id="print">
          <Header className="headerPrint">
            <h1>Demonstrativo do Resultado - Julho 2021</h1>
          </Header>
          <CardHeader color="#0B85BD">
            <Revenues>
              <h3>Meta de faturamento líquido</h3>
              <h1>
                {formatPrice(
                  dataHeader?.goalRevenues ? dataHeader?.goalRevenues : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>Meta de resultado líquido</h3>
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
              <h3>Faturamento líquido - Acumulado</h3>
              <h1>
                {formatPrice(
                  dataHeader?.resultRevenues ? dataHeader?.resultRevenues : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>Resultado líquido - Acumulado</h3>
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
              <h3>Faturamento líquido - Julho</h3>
              <h1>
                {formatPrice(
                  dataHeader?.resultMonth ? dataHeader?.resultMonth : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>Resultado líquido - Julho</h3>
              <h1>
                {formatPrice(
                  dataHeader?.liquidMonth ? dataHeader?.liquidMonth : 0,
                )}
              </h1>
            </Result>
            <span />
            <Finances>
              <h3>Resultado financeiro - Julho</h3>
              <h1>
                {dataHeader?.percentageLiquidMonth
                  ? dataHeader?.percentageLiquidMonth.toFixed(2)
                  : 0}
                %
              </h1>
            </Finances>
          </CardHeader>

          <ContainerGraphics>
            <CardGraphicSpeed>
              <h3>Alcance PPRS</h3>
              <GraphicSpeed
                title={title}
                textValue={`${dataHeader.percentageLiquid.toFixed(2)}%`}
                width={420}
                dataValue={dataGraphicspeed}
              />
            </CardGraphicSpeed>
            <CardGraphicSpeed>
              <h3>Resultado Mês a Mês (%)</h3>
              <GraphicBar
                result={3.25}
                width={390}
                height={300}
                title=""
                color="#240dac"
              />
            </CardGraphicSpeed>
            <CardGraphicSpeed>
              <h3>Metas x Resultados (%)</h3>
              <GraphicLine
                resultData={3.25}
                width={390}
                height={300}
                color="#240dac"
              />
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
