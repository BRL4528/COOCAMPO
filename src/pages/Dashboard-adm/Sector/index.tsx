/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState, useRef } from 'react';
// import { Pie } from '@reactchartjs/react-chart.js';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Report } from 'powerbi-report-component';

import { useReactToPrint } from 'react-to-print';

import {
  FiEdit,
  FiPrinter,
  FiMaximize,
  // FiTrendingDown,
  // FiTrendingUp,
} from 'react-icons/fi';
// import GraphicBar from '../../../components/GraphicModels/GraphicBar';
// import GraphicLine from '../../../components/GraphicModels/GraphicLine';
import GraphicSpeedometer from '../../../components/GraphicModels/GraphicSpeedometer';
import Table from '../../../components/DataTable';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/ModalAddGoals';

import {
  Container,
  CardeHeader,
  CardButton,
  CardGraphic,
  GraphicTitle,
  // CardGoalsTrends,
  // TrendsTitle,
  // GoalItem,
  // Info,
  GraphicSpeed,
  CardBodyGoals,
  CardGraphicText,
  // CardGraphicItem,
} from './styles';

const SelectorFolders: React.FC = () => {
  const handle = useFullScreenHandle();

  const componentRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const layoutSettings = {
    width: '100%',
    border: '0px',
    // height: '100%',
  };

  return (
    <>
      <ModalAddGoals isOpen={modalOpen} setIsOpen={toggleModal} />
      <Container>
        <CardeHeader>
          <div>
            <h2>Setores</h2>
            <strong>Análise os setores da cooperativa.</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Adicionar novo setor
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        <FullScreen handle={handle}>
          <CardGraphic className="fullscreen-item" ref={componentRef}>
            <CardGraphicText>
              <GraphicTitle>Financeiro</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter onClick={handlePrint} />
                <FiMaximize onClick={handle.enter} />
              </span>
            </CardGraphicText>
            <CardBodyGoals>
              <Report
                tokenType="Embed" // "Aad"
                accessToken="H4sIAAAAAAAEAB2WxQ7sWBJE_-Vt3ZKxDC31wgxlZntnZmaP5t-netaZutI9kRmR__ljJk8_Jfmfv_9EPKUvr8tlfip0BRxWHstCUH5LqudnEfYJI_1-DtZ3AUxQFruocHdDrsPnME_nnubNOxO5DwVZGdvo-EzDjHxJs8YpuhLQZH3ZXIDnGFENzcUQiWfPPLFsrRcDZvdLzdy4wnsrcyskqBm8NOw573NAge_GSYcXDbGSygbsMCt5dVgqGQZtPRjtMqP8OrVMeHkGvqxxItaIX7nKYXFMKIKAnPCCA9a552m_BC5wNZpjkyIMGjT7orptP1-bJtJyAsibQwL2LHfw5cFY7K4Hh0ZyTGE3HyLyZKPNNq1PHo50qr0FBqrD0CSpoStLkq4lABpmXqfOW4JfdL-oo-I_ck2h7M1BMmLIxWxMIHmgGpHAsEW4hpqEaZkGOBqTBrPLn6IRzLvz0jeRuMxFVZxuSTUFrXIriZ7UrOXgfOSdedKi2UCT-41DUws6-p6yd194NQWzWvwc6v3bGAl6hJwWerVyMMhX5KrTd7YDTOBVVRzk0zQb0t2OQETlK_DUc1IX6On7-HuKqY-yTRjsUCQWKu7SX2JEgw8z_UCSWQ3TSNp8GuVbM0iE6j3HxpIXdPn3TVG8J-QEGL31K6Ige2IdSSoUOdM0sQOlcKRK3uEHHXYCjkpqTybgfZwLyQP-yKPPfuds37QNPKxsfQaXAQolr-Y3uMYflJom2rw0WMsVTFHVi7DWrbgZfjE1oHmjWdQ3_9K5tjbxs-Ug4PUWy1LZ8YkMw5P3IwYyy8EM6unmmuzHilVQK8DJScTjUJQUKNH5Bqr77JsBtokj10714L7pb2dg2NV_gAyBneBbdaECVj_ShtNmvjmofQ3ALd_LGYsVEJBtg4JvoGih0zh_FWOjBv5TNjiyYv7rBMldgP7gl2K2kaEdKAfGEMEHO5AfpWdlyGb4WLzXYbNnIGE7ZHR-wS_JDg_ltoJa-ezIa_1ZXwlM18BT2mYJchlt5aHnqdNoFw-1gJIV6FgMa6gjArNIE3mj0yER4vgxvbhTEFN7omVgz3YHmeVT9ut4q2lif_1Op4Td7j7V2Ng_RGGXOzxO3FnZ6l8db0VOE-4KSyJILMZLa-kPb7-nPoaS8MRlFDc-zQ1Xc7wK0HT2b5QYsicFCz8X8MbpMWPf3ZQSwZ1sSDSiEEwMxRGF2LEHMhLMxb2dwiC36YOttnrAapJ0BODOl8OKuc7EkTHTpdjnKxCy7XFp2-XBZk3FkHF5L0VXN-H1naVZcehJ5cWO1pdMmscJr8Y8VGHPhPE0AMtrDgSRqcea2dBpxnS3RIk1OYKU7baRLW6YaIh5mJ888cDWuDFsNuHAT_Er8NULtiNRwPEMREGB_RaP19yKNuoqBPhNup0AWMO29WoT5TuTJJEaTsoxnyR39sS8vu3OugwzzVlu-v08kpw2H6etPnFxtXV15XX6-4mY6dnaz05TE3wMTuKJ7JxWsl-6i2EW6UZgUIcX4G_DS7Fz7Lux750G-K5QdngOTF-ztsU6LOAx08FjL53Pe1cOCS4rEacCwBYeQu5OrOb4IoZ_z53PIbtU3S8cvqZAiwhFmVQzx_miwJJUSRuKxc-RvodKekQWNJuELEbd7Pb407jcPHgBrrlQcg2R3y98v41mTRJwRUUxlEAspG2AMV9Ahu3FqnXX_KC6yVCqwPQgoxOjhqKPavXVT3C6cnAwmjtDZeXz0y11h_l6X0xC1Eg-L2pVZaqx7rLOpBdh4KDvcH4U4cLClJLjw2y07z7jypwGMu3fzJpp12nDE_zVqCdXFv4asSt-ze_yI7wYalRVhEQJMb9-paSufpaRW5_EJbPlnk3hcFLJasRaXDt3n7a3mOP6o5cA13NbIFksJIf2VnDTWxI5ZjTU28myfF6WVcoB-TMSPT5Ad_HjfMvebv2aprhhn7wn7JeKeuYYHx0cGUfVsITZUY2FnvTOUNqHl5WRQALmAMXugPNcQma7QlhnBVF819h8m2eZPtTt0MIUBDijcd0kerq0r3YGtL6u-8KCOFt0R5n2vIAofVxNSZ4NKO5fwTgTRiq6HbbRGMFw07LSO6lk45b0TwfsCJwu3z2HVXzFeM9DLu5bU6MPvHUVFWArsPZjX19q8cTIovZeMrtrgkEKOOeasiCviWRz6C-tNpb7omulVi1Wl_xVtBSu3FCtLpxSGffFqGwX6n2jgjjfYJWL011ngAI7dwlRTF8a7WOM3vSDLKHms_YE86Tv7opB9wXlsql0PKrWE9woedWXiQvJ2FmEuN1k9BIvNpEoLTW1n3wdqknVTA1XAJgvPC2koZHQGjLJ7mS3K3_O-VSSKM1Yn7YWUL2HjxrNQTYiUQrBzHZqx1rlcUijwHP08658TzglOFzH0LIX8B2fhQl9KfFSq82kQGOYMIM_xSMjuGPN5z9__WHXZ96nb_H8zqlcCW13Lbk5YipN3KlP0w86SlDfSZDbOVdsoLxNnIMb2QeMrmxFCX4ymdYvPJrnNrHR9AU2QPErqCCEe4dPDrvO9pIFNkV7BwCjSeJyeMUYkpHaulagEaPpAn7NfR1FiK5Rq11lsnxueJkGavFpJf384tMhbKsW2AKM8FXPYdZPG6n_zTvIGNKaZ27DBXikMTdrt47cD7bEKn2lZe2efagErK3zREUTURJ5aJGO5Klf5gm05klF6Ldhhe2_De1lCJZSdtht41UGHBApLBIJHQrw64GzruJWSson8BeAA00fxLFtKGBwmRUS0pBYhO6upnS6ZmIt7KR8u_l3U1ml8w3lzbj--edfzM9cF6vs_yjPF-_k1OyQ-M8eUR37edGsVP_vcppqTPZjLX5tCsqGswNZNVBzF8qlyAh-LJtlJ5si0BLwvEbgs2VBKPdAthhN6ZEl1fkFDuQ-03F9tnR1LkQOIgotGErLru5GbGRrjvuVkXpcOaDeVO--i7f5epSAmuJB2HpAap5OLesUx7jJmaxuZ7ykV4biP8vlBXKr1yerZ9zdT_ovRp_U_BR6xHbYoJoDd3auLXLcsA8exOY1mak2ZTTF0DHvbXZYHExcXB9s3l--8qYskKiI6YfluvpQWp9GNn53fsqJWuQvbs--vcfOgyWpr1uQnhGaKQY3d_sN3aqi1vZxYzLIV16y1UCfko-KWQ_JtJ2nx54o4zXV9oc71Cz6CMVI7knwJdh_Mf_3f9NOQjRCDAAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19" // accessToken goes here
                embedUrl="https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d" // embedUrl goes here
                embedId="f6bfd646-b718-44dc-a378-b73e6b528204" // report or dashboard Id goes here
                // pageName="Sentiment" // set as current page of the report
                reportMode="View" // open report in a particular mode View/Edit/Create
                // datasetId={datasetId} // required for reportMode = "Create" and optional for dynamic databinding in `report` on `View` mode
                // groupId={groupId} // optional. Used when reportMode = "Create" and to chose the target workspace when the dataset is shared.
                // extraSettings={extraSettings}
                style={layoutSettings}
                permissions="All"
              />
              {/* <CardGraphicItem>
                <CardGraphicText>
                  <GraphicTitle>Desempenho mensal</GraphicTitle>
                </CardGraphicText>
                <GraphicBar />
              </CardGraphicItem>
              <CardGraphicItem>
                <CardGraphicText>
                  <GraphicTitle>Desempenho mensal</GraphicTitle>
                </CardGraphicText>
                <GraphicLine />
              </CardGraphicItem>
            </CardBodyGoals> */}
              {/* <CardBodyGoals> */}
              {/* <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends> */}

              <GraphicSpeed>
                <CardGraphicText>
                  <GraphicTitle>Meta 01</GraphicTitle>
                </CardGraphicText>
                <GraphicSpeedometer dataValue={150} />
              </GraphicSpeed>
              <GraphicSpeed>
                <CardGraphicText>
                  <GraphicTitle>Meta 02</GraphicTitle>
                </CardGraphicText>
                <GraphicSpeedometer dataValue={250} />
              </GraphicSpeed>
              <GraphicSpeed>
                <CardGraphicText>
                  <GraphicTitle>Meta 03</GraphicTitle>
                </CardGraphicText>
                <GraphicSpeedometer dataValue={450} />
              </GraphicSpeed>
            </CardBodyGoals>
            <Table />
          </CardGraphic>
        </FullScreen>
      </Container>
    </>
  );
};

export default SelectorFolders;
