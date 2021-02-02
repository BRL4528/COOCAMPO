import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  padding: 8px 0;
`;
export const HeaderContent = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: ${({ size }) => (size === 'small' ? '0 15px ' : '0 50px 0px')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  > strong {
    margin-left: 5%;
    color: var(--text-primary);
  }

  > div {
    display: flex;
    flex-direction: row;
    /* > img {
      width: 180px;
      height: 80px;
      margin-bottom: -10px;
    } */
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
      color: #999591;
      width: 20px;
      height: 20px;
      transition: color 0.5s;
      :hover {
        color: #ef4221;
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
      color: #f2c811;
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
    color: #f4ede8;
  }
  strong {
    color: #f2c811;
  }
`;
