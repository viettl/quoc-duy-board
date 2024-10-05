import React, { useState } from 'react';
import styled from 'styled-components';
import { RefreshIcon } from '@/components/Icon.jsx';

const TabContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 0.75rem;
  padding: 1.2rem 1.2rem 0 1.2rem;
  gap: 3.12rem;
  align-items: center;
  justify-content: space-between;
`;

const Tab = styled.button`
  padding: 19px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(props) => (props.active ? '#2275ff' : '#99A3B3')};
  border-bottom: ${(props) => (props.active ? '3px solid #2275FF' : '3px solid transparent')};
  transition: all 0.3s ease;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 100%;

  &:hover {
    background-color: #f1f3f4;
    outline: none
  ;
    //border-bottom: ${(props) => (!props.active ? '3px solid #2275FF' : '3px solid transparent')};
  }
`;

const TabIcon = styled.div`
  //margin: -1.2rem ;
`;

const TabContent = styled.div`
  padding-top: 16px;
  margin: 0;
`;

const Tabs = ({ tabs, content, activeTab, setActiveTab }) => {
  return (
    <>
      <TabContainer>
        <div>
          {tabs.map((tab, index) => (
            <Tab key={index} active={activeTab === index} onClick={() => setActiveTab(index)}>
              {tab.label}
            </Tab>
          ))}
        </div>
        <TabIcon>
          <RefreshIcon />
        </TabIcon>
      </TabContainer>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </>
  );
};

export { Tabs };
