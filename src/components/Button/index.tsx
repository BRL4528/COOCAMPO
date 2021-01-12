import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  groud?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, groud, ...rest }) => (
  <Container type="button" groud={groud} {...rest}>
    {children}
  </Container>
);

export default Button;
