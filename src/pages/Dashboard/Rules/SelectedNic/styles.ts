import styled from 'styled-components';

interface Props {
  theme: string;
}

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Nic = styled.article<Props>`
  max-width: 720px;
  margin: 5rem auto 0;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    ${({ theme }: Props): string =>
      theme === 'light'
        ? 'color: var(--text-quarterly);'
        : 'color: var(--text-secondary)'};
  }

  time {
    display: block;
    font-size: 1rem;
    color: var(--dark-tertiary);
    margin-top: 1.5rem;
  }
  .nicContent {
    margin-top: 2rem;
    line-height: 2rem;
    font-size: 1.125rem;
    /* color: var(--text-title); */
    ${({ theme }: Props): string =>
      theme === 'light'
        ? 'color: var(--text-title);'
        : 'color: var(--text-primary)'};
  }

    p,
    ul {
      margin: 1.5rem 0;
    }

    ul {
      padding-left: 1.5rem;
      li {
        margin: 0.5rem 0;
      }
    }
    img {
      width: 800px;
    }
  }
`;
