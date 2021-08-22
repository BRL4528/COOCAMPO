/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef } from 'react';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import SelectorFolders from './Sector';
import Reports from './Report';

import { Conatiner, CardItem, ContainerCloud } from './styles';

const Dashboard: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  // const [dataServicesOrders, setServicesOrders] = useState<IdataTable>();

  const cloudTags = [
    {
      url: '#painel',
      tile: 'Meus painés',
    },
    {
      url: '#sector',
      tile: 'Meu setor',
    },
  ];

  return (
    <>
      <Conatiner ref={componentRef}>
        {/* <FiPrinter onClick={handlePrint} /> */}

        <Carousel plugins={['arrows']}>
          <ContainerCloud>
            {cloudTags.map(cloudItem => (
              <CardItem key={cloudItem.url}>
                <a href={cloudItem.url}>
                  <strong>{cloudItem.tile}</strong>
                </a>
              </CardItem>
            ))}
          </ContainerCloud>
        </Carousel>

        <section>
          <section>
            <div className="section-header">
              <h4 id="painel">Seus painés</h4>
            </div>

            <div className="section-body">
              <Reports title="none" />
            </div>
          </section>

          <section>
            <div className="section-header">
              <h4 id="sector">Seu setor</h4>
            </div>
            <div className="section-body">
              <SelectorFolders title="none" />
            </div>
          </section>
        </section>
      </Conatiner>
    </>
  );
};

export default Dashboard;
