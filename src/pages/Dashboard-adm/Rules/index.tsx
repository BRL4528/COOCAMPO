/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { FiSearch } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import Input from '../../../components/Global/Input';
import { getPrismicClient } from '../../../services/prismic';

import { Container, NicList } from './styles';

import nic_logo from '../../../assets/nic_logo.png';

interface NicsProps {
  slug: string | undefined;
  title: string;
  excerpt: any;
  updateAt: string;
}

const InternalNorm: React.FC = () => {
  const [nicInternal, setNicInternal] = useState<NicsProps[]>([]);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {}, []);

  async function handlePrismic(search: string, type: string) {
    const prismic = getPrismicClient();

    if (type === 'search') {
      console.log(type);
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
      console.log(type);
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
      console.log(type);
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
  }

  const handleSubmite = useCallback(data => {
    handlePrismic(data.search, 'search');
    console.log('rrri');
  }, []);

  const handleTag = useCallback((tag, type) => {
    handlePrismic(tag, type);
    console.log('oou');
  }, []);

  return (
    <Container>
      <NicList>
        <div>
          <img src={nic_logo} alt="logo search" />

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
            <button type="button" onClick={() => handleTag('standards', 'tag')}>
              Normas
            </button>
            <button
              type="button"
              onClick={() => handleTag('step-by-step', 'tag')}
            >
              Passo a Passo
            </button>
            <button type="button" onClick={() => handleTag('flowchart', 'tag')}>
              Fluxogramas
            </button>

            <button type="button" onClick={() => handleTag('gescooper', 'tag')}>
              Gescooper
            </button>

            <button type="button" onClick={() => handleTag('all', 'all')}>
              Todos
            </button>
          </section>
        </div>
        {nicInternal
          ? nicInternal.map(nic => (
              <Link
                key={nic.slug}
                to={`/rules/sector-resume-rules?${nic.slug}`}
              >
                <time>{nic.updateAt}</time>
                <strong>{nic.title}</strong>
                <p>{nic.excerpt}</p>
              </Link>
            ))
          : ''}
      </NicList>
    </Container>
  );
};

export default InternalNorm;
