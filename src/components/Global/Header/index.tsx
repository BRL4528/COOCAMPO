/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

import { Container, Profile, HeaderContent } from './styles';

import { SetToggleThemeContext } from '../../../contexts/SetToggleThemeContext';

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
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const history = useHistory();
  const { signOut, user } = useAuth();
  const { handleToggleTheme, toggleTheme } = useContext(SetToggleThemeContext);

  return (
    <Container id="noPrint" theme={toggleTheme}>
      <HeaderContent size={size}>
        <strong>{children}</strong>
        <div>
          {/* <img src={Logo} alt="GoFinances" /> */}

          {isWideVersion ? (
            <Profile>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </Profile>
          ) : (
            ''
          )}

          <section>
            <button type="button" onClick={() => history.push('/profile')}>
              <FiUser />
            </button>

            <button type="button" onClick={() => handleToggleTheme()}>
              {toggleTheme === 'light' ? (
                <RiMoonFill size={20} />
              ) : (
                <RiSunFill size={20} />
              )}
            </button>

            <button type="button" onClick={signOut}>
              <FiLogOut />
            </button>
          </section>
        </div>
      </HeaderContent>
    </Container>
  );
};

export default Header;
