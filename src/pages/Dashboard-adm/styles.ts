import styled from 'styled-components';

export const Conatiner = styled.div`
  color: #333;
  width: 100%;
  height: 93vh;
  padding: 80px;
  overflow-x: visible;
  scroll-behavior: smooth;

  > section {
    margin-top: 5rem;

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--text-secondary);
      button {
        z-index: 0;
        width: 100px;
        height: 30px;
      }
    }
    .section-body {
      width: 100%;
      /* display: flex; */
      align-items: center;
      justify-content: center;
      padding-top: -45px;
    }
  }
`;
export const CardItem = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px;
  width: 200px;
  height: 40px;
  background: #fff;
  border-radius: 8px;

  a {
    text-decoration: none;
    border: none;
    margin: 0 auto;
    color: #333;
  }

  :hover {
    transition: var(--transition-speed);
    background: var(--color-theme-primary);
    a {
      transition: var(--transition-speed);
      color: #fff;
    }
  }

  @media only screen and (max-width: 600px) {
    display: grid;
  }
`;

export const ContainerCloud = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
