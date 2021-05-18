import React, { useCallback, useRef, useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useLoading, Oval } from '@agney/react-loading';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Global/Input';
import Button from '../../components/Global/Button';

import { Container, Content } from './styles';

interface SignInFormData {
  nickname: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [loadSignInUser, setloadSignInUser] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setloadSignInUser(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nickname: Yup.string().required('Nome de usuário obigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          nickname: data.nickname,
          password: data.password,
        });
        setloadSignInUser(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setloadSignInUser(false);
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading: loadSignInUser,
    indicator: <Oval />,
  });

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Samasc" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Realize seu login</h1>

          <Input name="nickname" icon={FiUser} placeholder="Usuário" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit" disabled={loadSignInUser}>
            {loadSignInUser ? (
              <div {...containerProps} ref={componentRef}>
                {indicatorEl}
              </div>
            ) : (
              'Entrar'
            )}
          </Button>

          <a href="forgot">Recuperar senha</a>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
