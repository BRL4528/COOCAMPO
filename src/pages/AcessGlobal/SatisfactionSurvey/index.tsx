/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'react-day-picker/lib/style.css';
import { useAuth } from '../../../hooks/auth';

import search from '../../../assets/chart.svg';
import notion from '../../../assets/notion.svg';
import logo from '../../../assets/logo.svg';

import { Container, ContainerMaster, CardIntro } from './styles';
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

const SatisfactionSurvey: React.FC = () => {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

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
                  <h1>Pesquisa sobre horário de almoço</h1>
                  <h2>Prezado,</h2>
                  <p>
                    Visando a melhoria contínua de nossos serviços e
                    atendimento, gostaríamos de sua colaboração no preenchimento
                    desta pesquisa. Em caso de dúvidas quanto aos tópicos desta
                    pesquisa, por favor, faça contato com a área de Recursos
                    Humanos. A pesquisa é confidencial e suas respostas serão
                    mantidas em sigilo. Contamos e agradecemos a sua
                    participação!
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
                      - Preencha os campos conforme solicitado pela questão.
                    </p>
                  </span>
                  <span>
                    <p>
                      - Fique a vontade para adicionar uma sugestão ou elogio
                    </p>
                  </span>

                  <span>
                    <p>
                      - Fique atento quanto ao período vigente da pesquisa, pois
                      a mesma tera inicio dia{' '}
                      <strong>18/10/2021 13:00 horas</strong> e será fechada no
                      dia <strong>21/10/2021 13:00 horas</strong>
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
              <iframe
                width="640px"
                height="480px"
                src="https://forms.office.com/Pages/ResponsePage.aspx?id=Vkun6QjAEUSWFgp_F-EtrZe4RgxS4qRPn-7cWOyHEotUNDkxT0hYVDdLN0pXRTlYSTRUMUFTS0dOUy4u&embed=true"
                frameBorder="0"
                allowFullScreen
              />
              <footer>
                <img src={logo} alt="Samasc" />

                <p>Developed by Midas tech-corp</p>
              </footer>
            </Container>
          </SwiperSlide>
        </Swiper>
      </ContainerMaster>
    </>
  );
};

export default SatisfactionSurvey;
