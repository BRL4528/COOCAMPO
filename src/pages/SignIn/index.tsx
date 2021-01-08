import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Samasc" />

      <form>
        <h1>Realize seu login</h1>

        <Input name="user" icon={FiUser} placeholder="Usuário" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Recuperar senha</a>
      </form>
    </Content>
  </Container>
);

export default SignIn;
