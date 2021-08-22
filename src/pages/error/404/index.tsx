import React from 'react';

import UseAnimations from 'react-useanimations';
import alertTriangle from 'react-useanimations/lib/alertTriangle';

// import erro404 from '../../../assets/404.gif';
import { Container } from './styles';

const Error404: React.FC = () => {
  return (
    <Container>
      <span>
        <UseAnimations
          animation={alertTriangle}
          size={70}
          strokeColor="#f2c811"
          style={{ padding: 50 }}
        />
        <div>
          <h2>OOPPSS!</h2>
          <strong>Parece que algo não esta certo!</strong>
          <p>
            Desculpe pelo transtorno, estamos nos dedicando ao máximo para
            finalizar este módulo, mas não se preucupe, já já estará pronto.
          </p>
        </div>
      </span>
    </Container>
  );
};

export default Error404;
