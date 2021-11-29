import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Box,
  Text,
  Tag,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { api } from '../../../services/api';

interface ParamsRouter {
  nick_user: string;
}

interface PropsEvaluationsResumeResult {
  fakeData: boolean;
}

interface EvaluationsResults {
  total: number;
  percentage: number;
}

interface InfoUser {
  name: string;
}

export const EvaluationsResumeResult: React.FC<PropsEvaluationsResumeResult> =
  ({ fakeData }) => {
    const { nick_user } = useParams<ParamsRouter>();
    const [dataResultEvaluation, setDataResultEvaluation] =
      useState<EvaluationsResults>();
    const [infoUser, setInfoUser] = useState<InfoUser>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      api
        .get(`/evaluations-results/show?subordinate=${nick_user}`)
        .then(response => {
          setDataResultEvaluation(response.data);
        });
      api.get(`/employees/${nick_user}`).then(response => {
        setInfoUser(response.data);
        setLoading(false);
      });
    }, [nick_user]);

    return (
      <Flex
        w="100%"
        my="2"
        maxWidth={1180}
        mx="auto"
        pb={4}
        px="6"
        className={loading ? 'filter' : ''}
      >
        <Box
          p={['6', '8']}
          bg="gray.800"
          borderRadius={8}
          pb="4"
          display="flex"
          // filter="blur(4px)"
          direction="row"
          className={!fakeData ? '' : 'filter'}
        >
          <Box>
            <Text fontSize="2xl" mb="4" fontWeight="medium">
              Resumo
            </Text>

            {fakeData ? (
              <Text>
                De acordo com os parametros utilizados na avaliação de
                desempenho, Carlos alexandre atingiu cerca de 50 pontos
                alcançando um resultado de 75% de 100%.
              </Text>
            ) : (
              <Text>
                De acordo com os parâmetros utilizados na avaliação de
                desempenho, <Tag colorScheme="green">{infoUser?.name}</Tag>{' '}
                atingiu{' '}
                <Tag colorScheme="green">{dataResultEvaluation?.total}</Tag>{' '}
                pontos, alcançando um resultado de{' '}
                <Tag colorScheme="green">
                  {Number(dataResultEvaluation?.percentage) / 10}%
                </Tag>{' '}
                de 10%.
              </Text>
            )}
          </Box>

          <CircularProgress
            value={dataResultEvaluation?.percentage}
            color="green.400"
            size="120"
          >
            <CircularProgressLabel>
              {Number(dataResultEvaluation?.percentage) / 10}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
    );
  };
