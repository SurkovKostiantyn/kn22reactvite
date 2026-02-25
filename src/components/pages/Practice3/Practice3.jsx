import React, { useState } from 'react';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';
import StudentList from '../../moleculas/StudentList';
import StatisticsData from '../../moleculas/StatisticsData';
import AboutAuthor from '../../moleculas/AboutAuthor';

const Practice3 = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  const tabs = [
    { id: 'list', label: 'Всі студенти' },
    { id: 'stats', label: 'Статистика' },
    { id: 'about', label: 'Про автора' },
  ];

  return (
    <div>
      {/* ===== Pz3: Крок 2 — Умовне відображення (оператор &&) ===== */}
      <section className="section" style={{ marginTop: '24px' }}>
        <Heading level={2} title="Практична 3: Умовне відображення (&&)" />
        <Button onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? 'Приховати інструкцію' : 'Показати інструкцію'}
        </Button>
        {showHelp && (
          <Paragraph
            className="help-text"
            text="Довідка: Цей додаток дозволяє керувати списками студентів."
            style={{ marginTop: '12px', fontStyle: 'italic', color: '#555' }}
          />
        )}
      </section>

      {/* ===== Pz3: Крок 4 — Інтерфейс з табами ===== */}
      <section className="section" style={{ marginTop: '24px' }}>
        <Heading level={2} title="Практична 3: Таби" />
        <div className="tab-bar" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active-tab' : ''}`}
              style={{
                backgroundColor: activeTab === tab.id ? '#007bff' : '#ccc',
                color: activeTab === tab.id ? 'white' : 'black'
              }}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="content" style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
          {activeTab === 'list' && <StudentList />}
          {activeTab === 'stats' && <StatisticsData />}
          {activeTab === 'about' && <AboutAuthor />}
        </div>
      </section>
    </div>
  );
};

export default Practice3;
