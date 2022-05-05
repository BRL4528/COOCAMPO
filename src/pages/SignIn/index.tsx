import React, { useCallback, useRef, useState } from 'react';
import { Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import { LogoCoocampo } from '../../assets/coocampo';

import Input from '../../components/Global/Input';

import { ContainerCard } from './styles';
import { apllyToast } from '../../components/Global/Toast2.0';

interface SignInFormData {
  nickname: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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

  return (
    <ContainerCard>
      {/* <Container theme={toggleTheme}> */}
      <Flex
        align="center"
        flexDirection="column"
        bg="#ffff"
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        // bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
        boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        {LogoCoocampo()}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Realize seu login na plataforma</h2>

          <Input name="nickname" icon={FiUser} placeholder="Usuário" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button
            type="submit"
            isLoading={loadSignInUser}
            colorScheme="blue"
            w="100%"
          >
            Entrar
          </Button>

          <a href="forgot">Recuperar senha</a>
        </Form>
      </Flex>
      {/* </Container> */}
    </ContainerCard>
  );
};

export default SignIn;
