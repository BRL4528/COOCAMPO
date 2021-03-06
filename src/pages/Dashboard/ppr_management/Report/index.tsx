import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Global/Button';

// import Header from '../../../components/Header';
// import Sidebard from '../../../components/Sidebar';

import {
  CardButton,
  CardeHeader,
  CardGraphic,
  CardGraphicText,
  Container,
  GraphicTitle,
} from './styles';

interface PropsItem {
  title?: string;
}

const Reports: React.FC<PropsItem> = ({ title }) => {
  return (
    <>
      {/* <ModalCreateUser
      isOpen={modalOpen}
      setIsOpen={toggleModal}
      handleUser={handleUser}
      // dataEditUser={dataEditUser}
    /> */}
      <Container>
        <CardeHeader titleItem={title}>
          <div>
            <h2>Relatórios e painéis infograficos</h2>
            <strong>
              Visualize seus relatórios e trabalhe com paines infograficos
            </strong>
          </div>

          <CardButton>
            <div>
              <Button type="button">Adicionar novo usuário</Button>
            </div>
          </CardButton>
        </CardeHeader>

        <Link to="/management-ppr/report-income-statement">
          <CardGraphic>
            <CardGraphicText>
              <GraphicTitle>
                <h3>Demontrativo de resultados</h3>

                <p>Modelo infografico</p>
              </GraphicTitle>
            </CardGraphicText>
          </CardGraphic>
        </Link>

        <Link to="/management-ppr/report-satisfaction-result">
          <CardGraphic>
            <CardGraphicText>
              <GraphicTitle>
                <h3>Pesquisa sobre horário de almoço</h3>

                <p>Pesquisa sobre mudança no horário de almoço</p>
              </GraphicTitle>
            </CardGraphicText>
          </CardGraphic>
        </Link>
      </Container>
    </>
  );
};

export default Reports;
