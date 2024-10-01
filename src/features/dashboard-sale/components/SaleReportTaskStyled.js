import styled from 'styled-components';

const SaleReportTaskStyled = styled.div`
  .toolbar {
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
      &:hover {
        color: #3182ce;
        cursor: pointer;
      }
    }
  }

  .label {
    color: #a0aec0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 14px */
  }

  .donut-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const SalePieChartNotesStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;



  .selected {
    opacity: 0.2;
  }

  .note {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 8px;

      &:hover {
          cursor: pointer;
      }

    .label {
      display: flex;
      flex-grow: 1;

      &-icon {
        margin-right: 5px;
        height: 14px;
        width: 14px;
        border-radius: 50%;
      }

      &-text {
        color: var(--Dark, #252f40);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
      }
    }
    .quantity {
      color: var(--Black-grey, #64748b);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 100%;
    }
  }
`;

export { SaleReportTaskStyled, SalePieChartNotesStyled };
