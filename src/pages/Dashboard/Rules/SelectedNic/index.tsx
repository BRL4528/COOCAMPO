/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../../services/prismic';

import { Container, Nic } from './styles';

interface PropsNic {
  slug: string;
  title: string;
  content: string;
  updateAt: string;
}

const SelectedNic: React.FC = () => {
  const parsed = window.location.search;
  const [nic, setNic] = useState<PropsNic>();

  useEffect(() => {
    handlePrismic();
  }, [handlePrismic]);

  async function handlePrismic() {
    const prismic = getPrismicClient();

    await prismic
      .getByUID('publication', parsed.substring(1), {})
      .then(response => {
        const nicSelected = {
          slug: parsed.substring(1),
          title: RichText.asText(response.data.title),
          content: RichText.asHtml(response.data.content),
          updateAt: new Date(
            response.last_publication_date ?? '',
          ).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
        };

        setNic(nicSelected);
      });
  }

  return (
    <Container>
      <Nic>
        <h1>{nic?.title}</h1>
        <time>{nic?.updateAt}</time>
        <div
          className="nicContent"
          dangerouslySetInnerHTML={{ __html: nic?.content ? nic?.content : '' }}
        />
      </Nic>
    </Container>
  );
};

export default SelectedNic;
