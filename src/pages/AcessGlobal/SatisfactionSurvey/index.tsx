/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'react-day-picker/lib/style.css';

import search from '../../../assets/chart.svg';
import notion from '../../../assets/notion.svg';
import logo from '../../../assets/logo.svg';

import { Container, ContainerMaster, CardIntro } from './styles';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

const PainelAnalyticModule: React.FC = () => {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  return (
    <>
      <ContainerMaster>
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
                      a mesma tera inicio dia <strong>28/05/2021</strong> e será
                      fechada no dia <strong>07/06/2021</strong>
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
            <Container />
          </SwiperSlide>
        </Swiper>
      </ContainerMaster>
    </>
  );
};

export default PainelAnalyticModule;
