import styled from 'styled-components';

interface Iprops {
  titleItem?: string;
}

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  color: #333;
  width: 100%;
  height: 93vh;
  padding: 80px;
  overflow-x: visible;
  scroll-behavior: smooth;

  .section-filter {
    form {
      border: 1px solid var(--text-tertiary);
      /* visibility: hidden;
        display: none; */
      section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;

        font-size: 12px;
        max-width: 900px;

        > div {
          fieldset {
            width: 300px;
          }
        }

        fieldset {
          padding: 30px;
          border: 1px solid var(--text-tertiary);
        }

        .space-top {
          margin-top: 20px;
        }

        > span {
          height: 200px;
          display: flex;
          align-items: flex-end;

          button {
            height: 30px;
          }
        }
      }
    }
  }

  a {
    text-decoration: none;
  }

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  .selected {
    max-height: 400px;

    /* transition: var(--transition-speed); */

    div {
      max-height: 200px;
      visibility: visible;
      opacity: 1;
      /* transition: var(--transition-speed); */
    }
    svg {
      color: #1c9cd9;
    }
    /* transition: max-height 10s; */
  }

  .logo {
    transform: rotate(180deg);
    transition: var(--transition-speed);
  }

  .fullscreen-enabled .fullscreen-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
`;

export const CardeHeader = styled.div<Iprops>`
  ${({ titleItem }: Iprops) =>
    titleItem === 'none' ? 'display: none;' : 'display: flex;'}

  width: 100%;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 40px;
`;

export const CardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;

  div {
    min-width: 200px;
    margin: 0 10px 0 10px;
    /* transition: var(--transition-speed); */

    @media only screen and (max-width: 600px) {
      /* transition: var(--transition-speed); */
      display: none;
    }
  }
`;
