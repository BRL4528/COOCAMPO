/* eslint-disable react/jsx-indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { Link } from 'react-router-dom';
import { getPrismicClient } from '../../../services/prismic';

import { Container, NicList } from './styles';

interface NicsProps {
  slug: string | undefined;
  title: string;
  excerpt: any;
  updateAt: string;
}

const InternalNorm: React.FC = () => {
  const [nicInternal, setNicInternal] = useState<NicsProps[]>([]);

  useEffect(() => {
    handlePrismic();
  }, []);

  async function handlePrismic() {
    const prismic = getPrismicClient();

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

  return (
    <Container>
      <NicList>
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
