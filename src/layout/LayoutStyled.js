import styled from 'styled-components';
import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

export const HeaderLayoutStyled = styled(AntHeader)`
  padding: 16px;
  margin-left: 16px;
  border-radius: 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .trigger {
    height: 64px;
    cursor: pointer;
  }
`;

export const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  flex-wrap: wrap;

  img {
    height: 40px;
    width: 40px;
  }

  .text {
    color: #344767;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.8px;
    line-height: 24px;
    vertical-align: center;
    margin-bottom: 0;
  }
`;

export const HeaderNotification = styled.div`
  position: relative;
`;
