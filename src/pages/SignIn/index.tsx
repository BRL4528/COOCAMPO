import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Samasc" />

        <Form onSubmit={handleSubmit}>
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
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
