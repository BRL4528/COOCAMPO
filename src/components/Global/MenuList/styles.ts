/* eslint-disable prettier/prettier */
import styled from 'styled-components';

interface Iprops {
  theme: string;
}

export const ContainerCard = styled.div<Iprops>`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 0 auto; */
  height: 100vh;

  .disabled {
    display: none;
  }

  a {
    ${({ theme }: Iprops): string =>
      theme === 'light' ? 'background: #fff' : 'background: #1F2029'};

    transition: var(--transition-speed);
    width: 173px;
    height: 143px;
    padding: 25px;
    display: flex;
    border-radius: 6px;
    /* align-items: stretch; */
    transition: box-shadow 0.5s;
    font-family: 24px;
    /* margin: 20px; */
    cursor: pointer;

    ${({ theme }: Iprops): string =>
      theme === 'light' ? 'border: 2px solid var(--text-tertiary);' : ''};

    animation: slide-mensagem 1s;
    text-decoration: none;
    /* color: #433f59; */

    :hover {
      box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.07);

      ${({ theme }: Iprops): string =>
        theme === 'light'
          ? 'box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.07);'
          : 'box-shadow: 8px 5px 5px rgba(0, 0, 0, 7);'};
    }

    @keyframes slide-mensagem {
      from {
        transform: translate3d(0px, -50px, 0px);
        opacity: 0;
      }

      to {
        transform: translate3d(0px, 0px, 0px);
        opacity: 0.9;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  text-align: center;

  width: 100%;
  /* max-width: 700px; */

  img {
    width: 3rem;
  }
  strong {
    margin-top: 10px;
  }

  form {
    margin: 50px 0;
    width: 340px;
    text-align: center;

    h2 {
      margin-bottom: 24px;
      color: #433f59;
    }

    > a {
      color: #a0a4a8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
    }
  }
`;
