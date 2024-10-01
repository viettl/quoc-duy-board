import styled from 'styled-components';

const DBSaleItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const DBSaleIcon = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DBSaleContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  p {
    margin: 0;
    color: #344767;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 16px */
  }
  span {
    color: var(--Gray-Gray-500, #718096);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 14px */
  }
  gap: 0.5rem;
`;

export { DBSaleItem, DBSaleIcon, DBSaleContent };
