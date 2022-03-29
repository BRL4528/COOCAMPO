/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState, useContext } from 'react';
import { Image, ScaleFade, Flex, Box, Spinner, Tag } from '@chakra-ui/react';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { FiSearch } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { SetToggleThemeContext } from '../../../contexts/SetToggleThemeContext';
import Input from '../../../components/Global/Input';
import { getPrismicClient } from '../../../services/prismic';

import { Container, NicList } from './styles';

import nic_logo from '../../../assets/nic_logo.svg';
import nic_logo_dark from '../../../assets/nic_logo_dark.svg';
import emoji from '../../../assets/emoji.svg';

interface NicsProps {
  slug: string | undefined;
  title: string;
  excerpt: any;
  updateAt: string;
}

const InternalNorm: React.FC = () => {
  const [nicInternal, setNicInternal] = useState<NicsProps[]>([]);
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [searchLoad, setSearch] = useState(false);
  const { toggleTheme } = useContext(SetToggleThemeContext);

  async function handlePrismic(search: string, type: string) {
    const prismic = getPrismicClient();
    setLoading(true);

    if (type === 'search') {
      await prismic
        .query(
          [
            Prismic.predicates.at('document.type', 'publication'),
            Prismic.predicates.fulltext('document', `${search}`),
          ],
          {
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100,
          },
        )
        .then(response => {
          const nics = response.results.map(nic => {
            return {
              slug: nic.uid,
              title: RichText.asText(nic.data.title),
              excerpt:
                nic.data.content.find(
                  (content: { type: string }) => content.type === 'paragraph',
                )?.text ?? '',
              updateAt: new Date(
                nic.last_publication_date ?? '',
              ).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
            };
          });

          setNicInternal(nics);
        });
    } else if (type === 'tag') {
      await prismic
        .query([Prismic.predicates.at('document.tags', [`${search}`])], {
          fetch: ['publication.title', 'publication.content'],
          pageSize: 100,
        })
        .then(response => {
          const nics = response.results.map(nic => {
            return {
              slug: nic.uid,
              title: RichText.asText(nic.data.title),
              excerpt:
                nic.data.content.find(
                  (content: { type: string }) => content.type === 'paragraph',
                )?.text ?? '',
              updateAt: new Date(
                nic.last_publication_date ?? '',
              ).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
            };
          });

          setNicInternal(nics);
        });
    } else if (type === 'all') {
      await prismic
        .query([Prismic.predicates.at('document.type', 'publication')], {
          fetch: ['publication.title', 'publication.content'],
          pageSize: 100,
        })
        .then(response => {
          const nics = response.results.map(nic => {
            return {
              slug: nic.uid,
              title: RichText.asText(nic.data.title),
              excerpt:
                nic.data.content.find(
                  (content: { type: string }) => content.type === 'paragraph',
                )?.text ?? '',
              updateAt: new Date(
                nic.last_publication_date ?? '',
              ).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
            };
          });

          setNicInternal(nics);
        });
    }
    setLoading(false);
    setSearch(true);
  }

  const handleSubmite = useCallback(data => {
    handlePrismic(data.search, 'search');
  }, []);

  const handleTag = useCallback((tag, type) => {
    handlePrismic(tag, type);
  }, []);

  return (
    <Container>
      <NicList>
        <ScaleFade initialScale={0.9} in>
          <Flex flexDirection="column" alignItems="center">
            <Box>
              {toggleTheme === 'light' ? (
                <Image src={nic_logo} alt="logo search" />
              ) : (
                <Image src={nic_logo_dark} alt="logo search" />
              )}
            </Box>

            <Form ref={formRef} onSubmit={handleSubmite}>
              <Input
                name="search"
                type="text"
                icon={FiSearch}
                placeholder="Pesquisar"
              />
            </Form>

            <section>
              <button type="button" onClick={() => handleTag('manual', 'tag')}>
                Manuais
              </button>

              <button
                type="button"
                onClick={() => handleTag('step-by-step', 'tag')}
              >
                Passo a Passo
              </button>
              {/* <button
                type="button"
                onClick={() => handleTag('flowchart', 'tag')}
              >
                Fluxogramas
              </button> */}

              <button
                type="button"
                onClick={() => handleTag('gescooper', 'tag')}
              >
                Gescooper
              </button>

              <button
                type="button"
                onClick={() => handleTag('schedule_vehicle', 'tag')}
              >
                <Tag
                  ize="lg"
                  colorScheme="green"
                  position="absolute"
                  mt="-22px"
                >
                  new
                </Tag>
                Agenda de veiculos
              </button>

              <button type="button" onClick={() => handleTag('all', 'all')}>
                Todos
              </button>
            </section>
          </Flex>
        </ScaleFade>
        <ScaleFade initialScale={0.9} in>
          {loading ? <Spinner /> : ''}
          {nicInternal.length !== 0 ? (
            nicInternal.map(nic => (
              <Box
                bg="white"
                mb="15px"
                p="15px"
                borderRadius="6px"
                className="result"
              >
                <Link
                  key={nic.slug}
                  to={`/rules/sector-resume-rules?${nic.slug}`}
                >
                  <time>{nic.updateAt}</time>
                  <strong>{nic.title}</strong>
                  <p>{nic.excerpt}</p>
                </Link>
              </Box>
            ))
          ) : (
            <Flex
              alignItems="center"
              flexDirection="column"
              display={searchLoad ? 'flex' : 'none'}
            >
              <Image src={emoji} fontSize="20" />
              <p>Infelizmente nada foi encontrado.</p>
              <p>
                Mas não se preucupe estamos trabalhando para adicionar novas
                informações.
              </p>
            </Flex>
          )}
        </ScaleFade>
      </NicList>
    </Container>
  );
};

export default InternalNorm;
