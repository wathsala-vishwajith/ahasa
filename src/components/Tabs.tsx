import React, { useState } from 'react';

interface TabsProps {
  tabs: string[];
  children: React.ReactNode[];
  initialTab?: number;
  onTabChange?: (index: number) => void;
  activeTab?: number; // for controlled usage
}

const Tabs: React.FC<TabsProps> = ({ tabs, children, initialTab = 0, onTabChange, activeTab }) => {
  const [internalTab, setInternalTab] = useState(initialTab);
  const currentTab = activeTab !== undefined ? activeTab : internalTab;

  const handleTabClick = (idx: number) => {
    if (activeTab === undefined) setInternalTab(idx);
    if (onTabChange) onTabChange(idx);
  };

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: 16 }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => handleTabClick(idx)}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderBottom: idx === currentTab ? '3px solid #3b82f6' : '3px solid transparent',
              background: 'none',
              color: idx === currentTab ? '#3b82f6' : '#6b7280',
              fontWeight: idx === currentTab ? 700 : 500,
              fontSize: 16,
              cursor: 'pointer',
              outline: 'none',
              transition: 'color 0.2s, border-bottom 0.2s',
              marginRight: 8,
            }}
            aria-selected={idx === currentTab}
            aria-controls={`tabpanel-${idx}`}
            id={`tab-${idx}`}
            tabIndex={idx === currentTab ? 0 : -1}
          >
            {tab}
          </button>
        ))}
      </div>
      <div id={`tabpanel-${currentTab}`} aria-labelledby={`tab-${currentTab}`}
        style={{ minHeight: 40 }}>
        {children[currentTab]}
      </div>
    </div>
  );
};

export default Tabs; 