import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  .infohome {
    color: #433f59;
    margin: 30px;
    header {
      margin-top: -30px;
      margin-bottom: 25px;
    }
    div {
      max-width: 230px;
      p {
        margin-top: 25px;
      }
    }
  }
`;

export const Container = styled.div`
  background: #ffff;
  width: 400px;
  height: 500px;
  /* padding: 25px; */
  display: flex;
  border-radius: 6px;
  align-items: stretch;
  transition: box-shadow 0.5s;

  :hover {
    box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.07);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  /* max-width: 700px; */

  img {
    width: 250px;
  }

  form {
    /* margin: 15px 0; */
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

      &:hover {
        color: ${shade(0.2, '#a0a4a8')};
      }
    }
  }
`;
