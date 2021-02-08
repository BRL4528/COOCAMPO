import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #073b4c;
  background: #f6eee7;
  width: 100%;
  height: 100vh;

  > header {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 700px;

    margin: 15px;
    border-radius: 6px;
    min-height: 100px;
    padding: 35px;
    /* border-bottom: 3px solid #f2c811; */
    background: #f2c811;
  }
`;
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 700px;

  h3 {
    border-bottom: solid 1px rgba(150, 156, 186, 0.2);
    margin: 14px 0 15px 5px;
    color: var(--text-primary);
  }

  > div {
    min-width: 700px;
    padding: 25px;
    border-bottom: 3px solid #fff;
    background: #fff;
    margin: 7px;
    border-radius: 6px;
    transition: var(--transition-speed);

    :hover {
      border-bottom: 3px solid #f2c811;
    }

    div {
      display: flex;
      align-items: center;
      margin: 0 0 0 5px;
      input {
        margin: 15px;
      }
      div {
        /* background: red; */
        width: 200px;

        strong {
          /* text-overflow: ellipsis; */
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 400;
        }
      }
    }
  }
`;
