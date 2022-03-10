import { useCallback, useRef, useState } from 'react';
import { Flex, Box, ScaleFade, Button, Avatar, Text } from '@chakra-ui/react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../../../../components/Global/Input';
import { HeaderUp } from '../../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../../components/_components_0.2/Sidebar_0.2';
import { apllyToast } from '../../../../../components/Global/Toast2.0';
import getValidationErrors from '../../../../../utils/getValidationErrors';
import { api } from '../../../../../services/api';

export default function ProfileEdit() {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async data => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nickname: Yup.string().required('Campo obrigatório'),

        password: Yup.string()
          .required('Campo obrigatório')
          .min(6, 'Minimo 6 digitos'),

        password_confirmation: Yup.string()
          .when('password', {
            is: (val: string | any[]) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api
        .post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          username: data.nickname,
        })
        .then(() => {
          apllyToast('success', 'Operação realizada com sucesso', 'top-right');
          setLoading(false);
        });
    } catch (err) {
      apllyToast(
        'error',
        'Ocorreu um erro ao realizar operação, cheque as credenciais.',
        'top-right',
      );
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        setLoading(false);
      }
    }
  }, []);

  return (
    <ScaleFade initialScale={0.9} in>
      <Flex direction="column" h="100vh">
        <HeaderUp path="profile" />
        <Flex my="6" mx="auto" pb={4} px="6" textAlign="center">
          <Sidebar path="profile" />
          <Flex align="center" flexDirection="column">
            <Box margin="25">
              <Avatar size="xl" />
            </Box>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                icon={FiUser}
                placeholder="Nome de usuário"
                name="nickname"
              />

              <Flex mt="100" flexDirection="column" width="100%">
                <Box mt="5">
                  <Input
                    icon={FiLock}
                    name="password"
                    type="password"
                    placeholder="Nova senha"
                  />
                  <Input
                    icon={FiLock}
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirmar nova senha"
                  />
                </Box>
              </Flex>

              <Button
                type="submit"
                mt="5"
                isLoading={loading}
                colorScheme="yellow"
                color="white"
                w={60}
              >
                <Text>Confirmar mudanças</Text>
              </Button>
            </Form>
          </Flex>
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
