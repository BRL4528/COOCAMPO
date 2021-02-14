import styled from 'styled-components';

interface PropsBorder {
  color?: string;
}

export const Container = styled.div`
  /* display: flex; */
  color: #333;
  /* width: 100%; */

  z-index: 0;

  /* grid-template-rows: 46px auto 52px; */
`;
export const ItemGraphic = styled.div<PropsBorder>`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 20px 0 0;
  cursor: pointer;

  /* margin-left: 80px; */

  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  background: #fff;
  border-radius: 6px;

  /* transition: var(--transition-speed); */
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);

  /* padding: 20px; */
  margin: 20px 20px 20px 20px;

  width: 260px;
  height: 153px;
  transition: var(--transition-speed);

  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #1c9cd9;

    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }
  p {
    z-index: 1;
    font-size: 20px;
    font-weight: 400;
    color: #433f59;
  }
  strong {
    z-index: 1;
  }

  span {
    /* left: 90px;
    top: 110px; */
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0;
    /* margin: 0; */
    max-width: 260px;
    max-height: 200px;
  }
`;
