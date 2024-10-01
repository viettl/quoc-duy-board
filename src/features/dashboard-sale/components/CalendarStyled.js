import styled from 'styled-components';
import { Calendar } from 'antd';

export const CalendarStyled = styled(Calendar)`
  .events {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .events .ant-badge-status {
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .notes-month {
    font-size: 28px;
    text-align: center;
  }
  .notes-month section {
    font-size: 28px;
  }
`;

export const CustomDayStyled = styled.div`
  color: #344767;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 14px 0;
  border: none;
`;


export const EventWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  //justify-content: center;
`

export const CustomDateHeaderStyled = styled.div`
  color: #344767;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 10px;
`;

export const CustomDateInfoStyled = styled.div`
  color: #344767;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  svg {
    cursor: pointer;
  }

  .today {
    color: var(--Dark-grey, #a0aec0);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`;
