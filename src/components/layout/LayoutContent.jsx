import React, { Children } from 'react';
import { Content } from 'antd/lib/layout/layout';

export function LayoutContent({ children }) {
  return (
    <Content
      style={{
        marginRight: 0,
        padding: 16,
      }}>
      {children}
    </Content>
  );
}
