import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '../../../../components/Global/Button';
import GraphicSpeed from '../../../../components/Global/GraphicModels/GraphicSpeedometer';
import GraphicBar from '../../../../components/Global/GraphicModels/ApexGraphicBar';
import GraphicLine from '../../../../components/Global/GraphicModels/ApexGraphicLine';

import { formatPrice } from '../../../../utils/format';

import logo from '../../../../assets/logo.svg';

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
  });

  useEffect(() => {
    apiGeninfo
      .get<IDataGeinfo>('/metas', {
        params: {
          ano: 2021,
          mesInicial: 1,
          mesFinal: 4,
          painel: 'PPR Adm Central',
        },
      })
      .then(res => {
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

        const resultFinances = {
          goalRevenues: goaltRevenuesFormated,
          resultRevenues: resultRevenuesFormated,
          percentageRevenues: (goaltFormated / goaltRevenuesFormated) * 100,
          percentageLiquid: (resultFormated / resultRevenuesFormated) * 100,
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
      return 875;
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
                  <Button className="iconPrint" type="button">
                    Imprimir
                  </Button>
                )}
                content={() => handlePrint('print')}
                documentTitle="Demontrativo-março/2021"
              />
            </div>
          </CardButton>
        </CardeHeader>
        <div id="print">
          <Header>
            <h1>Demonstrativo do Resultado - Abril 2021</h1>
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
              <h3>Resultado de faturamento líquido</h3>
              <h1>
                {formatPrice(
                  dataHeader?.resultRevenues ? dataHeader?.resultRevenues : 0,
                )}
              </h1>
            </Revenues>
            <span />
            <Result>
              <h3>Resultado líquido</h3>
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
                result={Number(dataHeader?.percentageLiquid.toFixed(2))}
                width={390}
                height={300}
                title=""
                color="#240dac"
              />
            </CardGraphicSpeed>
            <CardGraphicSpeed>
              <h3>Metas x Resultados (%)</h3>
              <GraphicLine
                resultData={Number(dataHeader?.percentageLiquid.toFixed(2))}
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
            </div>
          </Footer>
        </div>
      </Container>
    </>
  );
};

export default SelectorFolders;
