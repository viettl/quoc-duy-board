import styled from 'styled-components';

const CardStyled = styled.div`
  padding: 20px;

  border-radius: 16px;
  background: #fff;

  box-shadow: 0px 3.5px 5.5px 0px rgba(0, 0, 0, 0.02);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .toolbar {
    display: flex;
    gap: 15px;

    .full-icon {
      cursor: pointer;
    }
  }
`;

const CardTitle = styled.h3`
  color: #344767;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  margin: 0;
  gap: 12px;
`;

const CardContent = styled.div`
  padding-top: 20px;
`;

export { CardStyled, CardHeader, CardTitle, CardContent };
