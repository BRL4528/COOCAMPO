import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  groud?: boolean;
  disabled?: boolean;
  isUsed?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  groud,
  disabled,
  isUsed,
  ...rest
}) => {
  const { user } = useAuth();
  const [statusUser, setStatusUser] = useState(false);

  useEffect(() => {
    if (user === undefined) {
      setStatusUser(true);
    } else if (user.tag && user.tag === 'admin') {
      setStatusUser(true);
    } else if (isUsed !== undefined) {
      setStatusUser(true);
    }
  }, [isUsed, user]);

  return (
    <Container
      visible={isUsed || statusUser}
      disabled={disabled}
      type="button"
      groud={groud}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Button;
