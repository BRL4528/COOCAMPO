import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--text-quarterly);
`;

export const CardHeader = styled.div`
  margin-top: 60px;
  margin-left: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-quarterly);

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }
`;

export const ImportFileContainer = styled.section`
  background: #fff;
  margin-top: 40px;
  border-radius: 5px;
  padding: 64px;

  p {
    color: var(--text-primary);
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const DivLeft = styled.div`
  text-align: right;
  width: 100%;

  button {
    width: 200px;
    div {
      > svg {
        color: #fff;
        width: 20px;
      }
    }
  }
`;

export const Footer = styled.section`
  margin-top: 36px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    color: var(--text-primary);
    img {
      margin-right: 5px;
    }
  }
`;
