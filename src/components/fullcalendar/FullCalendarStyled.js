import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';

export const FullCalendarStyled = styled.div`
  .fc .fc-toolbar.fc-header-toolbar {
    // make all button look like disappear and does not take up space
    button {
      background: transparent;
      border: none;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    .fc-toolbar-chunk {
      svg {
        fill: #a0aec0;
      }
      &:nth-child(1) {
        //style only for button 3rd children
        button {
          // remove all outline when click button

          &:focus {
            outline: none;
          }
          outline: none;

          // make button like div
          background: transparent;
          border: none;

          // make button look like disappear and does not take up space
          &:nth-child(4) {
            color: var(--Dark-grey, #a0aec0);
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%; /* 14px */
          }
        }
      }

      .fc-button-group {
        border-radius: 6px;
        background: var(--Secondary-Grey, #f3f5f9);
        display: inline-flex;
        padding: 2px;
        align-items: center;
        gap: 10px;
        // check button has aria-pressed
        button[aria-pressed='true'] {
          border-radius: 6px;
          background: #fff;
        }
      }
    }
  }

  // table border
  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }

  // daybox
  .fc-day {
    padding: 10px;
  }
  .fc-daygrid-day-top {
    //padding: 10px;
    display: flex;
    justify-content: center;
    a {
      color: #344767;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 100%; /* 14px */
    }
  }

  // today
  .fc-day-today {
    border: 1px solid var(--Grey, #ebeff5);
    background: var(--white, #fff);
    a {
      border-radius: 6px;
      background: #2275ff;
      min-width: 24px;
      min-height: 24px;
      color: #ffffff;
    }
  }
  // background color current day
  .fc .fc-daygrid-day.fc-day-today {
    background-color: unset;
  }

  tr th {
    border: none !important;
  }

  .fc-toolbar-title {
    color: #344767;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 14px */
    // prevent breeak line by using nowrap
    display: inline;
  }

  .fc .fc-scrollgrid table {
    border-left-style: initial;
    border-right-style: hidden;
    border-top-style: hidden;
  }
  thead {
    border-bottom: 1px solid var(--Grey, #ebeff5);
  }
`;
