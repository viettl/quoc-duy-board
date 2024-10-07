import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Badge, Flex, Layout, theme } from 'antd';
import { NavbarText } from '../components/Typo.jsx';
import { BellIcon } from '@/components/Icon.jsx';
import CustomMenus from '@/layout/Menus.jsx';
import { HeaderLayoutStyled, LogoStyled } from '@/layout/LayoutStyled.js';

const { Header, Sider, Content } = Layout;

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ padding: 16, minHeight: '100vh' }}>
      <Sider
        style={{
          borderRadius: 16,
          background: '#FFF',
          boxShadow: '0px 3.5px 5.5px 0px rgba(0, 0, 0, 0.02)',
        }}
        width={256}
        collapsedWidth={70}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />

        <LogoStyled>
          <img src={'/assets/logo.svg'} alt="logo" />
          <div className="text">ERP QUOC DUY</div>
        </LogoStyled>
        <CustomMenus />
      </Sider>
      <Layout>
        <HeaderLayoutStyled>
          <Flex align={'center'} gap={20}>
            <div onClick={() => setCollapsed(!collapsed)} className={'trigger'}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <NavbarText>Xin chào, Hệ Thống!</NavbarText>
          </Flex>
          <Flex gap={12}>
            <Badge count={10} showZero>
              <BellIcon />
            </Badge>
            <Avatar src={'./images/ava.png'} style={{ verticalAlign: 'middle' }} size="large"></Avatar>
          </Flex>
        </HeaderLayoutStyled>
        {children}
      </Layout>
    </Layout>
  );
};
export default App;
