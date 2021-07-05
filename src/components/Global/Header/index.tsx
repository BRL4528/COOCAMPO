/* eslint-disable react/require-default-props */
import React from 'react';

import { FiLogOut } from 'react-icons/fi';

import { Container, Profile, HeaderContent } from './styles';

// import Logo from '../../assets/logoGoFinances.svg';

import { useAuth } from '../../../hooks/auth';

interface HeaderProps {
  size?: 'small' | 'large';
  children: React.HTMLAttributes<HTMLElement>;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  children,
}: HeaderProps) => {
  const { signOut, user } = useAuth();

  return (
    <Container id="noPrint">
      <HeaderContent size={size}>
        <strong>{children}</strong>
        <div>
          {/* <img src={Logo} alt="GoFinances" /> */}
          <Profile>
            <span>Bem-vindo,</span>
            <strong>{user.name}</strong>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiLogOut />
          </button>
        </div>
      </HeaderContent>
    </Container>
  );
};

export default Header;
