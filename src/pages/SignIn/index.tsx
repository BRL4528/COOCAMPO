import React, { useCallback, useRef, useState } from 'react';
import { Center, useBreakpointValue, Image } from '@chakra-ui/react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useLoading, Oval } from '@agney/react-loading';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logoatual.png';

import Input from '../../components/Global/Input';
import Button from '../../components/Global/Button';

import { Container, Content, ContainerCard } from './styles';
import { apllyToast } from '../../components/Global/Toast2.0';

interface SignInFormData {
  nickname: string;
  password: string;
}

const SignIn: React.FC = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [loadSignInUser, setloadSignInUser] = useState(false);

  const { signIn } = useAuth();

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

        apllyToast(
          'error',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
          'top-right',
        );
        setloadSignInUser(false);
      }
    },
    [signIn],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading: loadSignInUser,
    indicator: <Oval />,
  });

  return (
    <ContainerCard>
      {isWideVersion ? (
        <div className="infohome">
          <header>
            <h1>Portal Cooasgo</h1>
          </header>

          <div>
            <h3>Facilidade</h3>
            <p>
              Em um único lugar e com o mesmo usuário, você tem acesso
              centralizado aos sistemas Web da Cooasgo. Seja bem-vindo e fique a
              vontade.
            </p>
          </div>
        </div>
      ) : (
        ''
      )}

      <Container>
        <Content>
          <Image boxSize="200px" src={logoImg} alt="cooasgo+somoscoop" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Realize seu login</h2>

            <Input name="nickname" icon={FiUser} placeholder="Usuário" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit" disabled={loadSignInUser}>
              <Center>
                {loadSignInUser ? (
                  <div {...containerProps} ref={componentRef}>
                    {indicatorEl}
                  </div>
                ) : (
                  'Entrar'
                )}
              </Center>
            </Button>

            {/* <a href="forgot">Recuperar senha</a> */}
          </Form>
        </Content>
      </Container>
    </ContainerCard>
  );
};

export default SignIn;
