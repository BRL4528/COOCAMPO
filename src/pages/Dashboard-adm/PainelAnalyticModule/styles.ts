import styled from 'styled-components';

import { shade } from 'polished';

import Tooltip from '../../../components/Global/Tooltip';

interface ICheck {
  checked: boolean;
  idCurrent: string;
  idChecked: string;
}

interface ICalendar {
  openCalendar: boolean;
}

export const Container = styled.div`
  .selected {
    background: var(--green-secundary);
    border-bottom: 3px solid var(--green-primary);
    max-height: 80px;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      h2 {
        > span {
          visibility: visible;
          svg {
            color: var(--green-primary);
            border-color: var(--color-theme-primary);

            cursor: pointer;
          }
        }
      }
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  color: #073b4c;
  width: 100%;

  > header {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 700px;

    margin: 15px;
    margin-top: 90px;
    border-radius: 6px;
    min-height: 100px;
    padding: 35px;
    background: var(--color-theme-primary);
  }
  > span {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    min-width: 700px;

    button {
      display: flex;
      align-items: center;
      justify-content: space-around;

      height: 40px;
      width: 300px;
      transition: max-height 1s;
      background: var(--white-secondary);
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.07);
      border-bottom: 3px solid var(--white-secondary);
      border: none;
      border-radius: 4px;

      transition: var(--transition-speed);

      svg {
        transition: var(--transition-speed);
        color: var(--dark-secondary);
      }

      :hover {
        background: ${shade(0.2, '#fff')};

        svg {
          color: var(--dark-quaternary);
        }
      }
    }
  }
`;
export const CardContainer = styled.div<ICheck>`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 700px;

  div {
    h2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      > span {
        visibility: hidden;
        div {
          height: 11px;
        }
      }

      > svg {
        cursor: pointer;

        :hover {
          color: #333;
        }
      }
    }
    > svg {
      cursor: pointer;

      :hover {
        color: #333;
      }
    }
  }

  h3 {
    border-bottom: solid 1px var(--text-tertiary);
    margin: 14px 0 15px 5px;
    color: var(--text-primary);

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  > div {
    min-width: 700px;
    max-width: 700px;
    transition: max-height 1s;
    background: var(--white-secondary);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.07);
    border-bottom: 3px solid var(--white-secondary);
    max-height: 600px;

    overflow: hidden;
    white-space: nowrap;

    padding: 25px;
    margin: 15px 0 15px 0;
    border-radius: 6px;
    transition: var(--transition-speed);

    :hover {
      border-bottom: 3px solid var(--color-theme-primary);
    }

    div {
      display: flex;
      align-items: center;
      margin: 0 0 0 5px;

      > span {
        display: flex;
        align-items: center;
        flex-direction: row;

        width: 300px;
      }
      input {
        margin: 15px;
      }

      div {
        width: 300px;

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

export const CardLoading = styled.div`
  > svg {
    margin-top: 200px;
    color: var(--text-primary);
    width: 80px;
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 4px;
    color: #fff;
    /* height: 50px; */
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 4px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: var(--color-theme-primary) !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const TogleCalendar = styled.div<ICalendar>`
  position: absolute;
  z-index: 1;

  ${({ openCalendar }: ICalendar): string =>
    openCalendar ? '' : 'display: none;'}
`;

export const Info = styled(Tooltip)`
  height: 20px;
  cursor: pointer;
  margin-left: 16px;
  z-index: 100;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
