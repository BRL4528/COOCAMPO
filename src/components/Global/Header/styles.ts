/* eslint-disable prettier/prettier */
import styled from 'styled-components';

interface Prps {
  size?: 'small' | 'large';
  theme: string;
}

export const Container = styled.div<Prps>`
  z-index: 1;
  position: fixed;
  overflow: hidden;
  width: 100vw;
  top: 0;

  /* background: var(--white-secondary); */
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#1F2029')};

  transition: var(--transition-speed);
  padding: 5px 0;
  border-bottom: ${({ theme }) =>
    theme === 'light' ? '2px solid var(--text-tertiary)' : ''}; ;
`;
export const HeaderContent = styled.div<Prps>`
  width: 100%;
  margin: 0 auto;
  padding: ${({ size }) => (size === 'small' ? '0 15px ' : '0 50px 0px')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  > strong {
    margin-left: 5%;
    /* color: var(--text-primary); */
  }

  > div {
    display: flex;
    flex-direction: row;
    /* > img {
      width: 180px;
      height: 80px;
      margin-bottom: -10px;
    } */
    section {
      display: flex;
      flex-direction: row;
      width: 60px;
      justify-content: space-between;

      & + button {
        margin: 0 20px 0 0;
      }
    }

    span {
      color: var(--text-primary);
    }
  }
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 0px;
    > button {
      background: none;
      margin: none;
      border: none;
      img {
        margin-left: -65px;
        margin-right: 20px;
        margin-top: 10px;
        width: 35px;
      }
    }
  }

  button {
    margin-left: 0;
    background: transparent;
    border: 0;
    svg {
      color: var(--dark-tertiary);
      width: 20px;
      height: 20px;
      transition: color 0.5s;
      :hover {
        color: var(--red-primary);
      }
    }
  }
  /*
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
  } */

  strong {
    cursor: pointer;
    transition: var(--transition-speed);

    :hover {
      transition: var(--transition-speed);
      color: var(--color-theme-primary);
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  margin-right: 25px;
  padding-right: 25px;
  line-height: 24px;

  border-right: solid 2px rgba(150, 156, 186, 0.2);
  span {
    color: var(--white-tertiary);
  }
  strong {
    color: var(--color-theme-primary);
  }
`;
