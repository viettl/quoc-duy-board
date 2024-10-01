import React, { useState } from 'react';
import { Menu } from 'antd';
import { DashboardIcon, StatisticIcon, UserGroups, UserIcon } from '@/components/Icon.jsx';

const W = 36;
const items = [
  {
    key: '1',
    icon: <img src={'./menus/dashboard.svg'} height={W} width={W} />,
    label: 'Bảng điều khiển',
  },

  {
    key: 'grp',
    label: 'Cá nhân',
    type: 'group',
    children: [
      {
        key: 'tét',
        label: 'Cá nhân',
        icon: <img src={'./menus/users.svg'} height={W} width={W} />,
        children: [],
      },
    ],
  },

  {
    key: 'grp',
    label: 'Công việc',
    type: 'group',
    children: [
      {
        key: 'tét',
        label: 'Kinh doanh',
        // icon: <StatisticIcon />,
        icon: <img src={'./menus/statistic.svg'} height={W} width={W} />,
        children: [],
      },
      {
        key: 'tét',
        label: 'Kho hàng',
        // icon: <UserIcon />,
        icon: <img src={'./menus/home.svg'} height={W} width={W} />,
        children: [],
      },
      {
        key: 'tét',
        label: 'Nhân sự' + '',
        // icon: <UserGroups />,
        icon: <img src={'./menus/users.svg'} height={W} width={W} />,
        children: [],
      },
    ],
  },
];
const CustomMenus = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Menu
      style={{
        borderRadius: 16,
        background: '#FFF',
        // width: 250,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      // theme="dark"
      inlineCollapsed={collapsed}
      items={items}
    />
  );
};
export default CustomMenus;
