import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Heading title="Головна сторінка (Зміст)" level={1} />
      <Paragraph text="Ласкаво просимо! Цей додаток демонструє виконання лабораторних та практичних робіт." />
      
      <Heading title="Навігація по роботах:" level={2} />
      <ul style={{ lineHeight: '1.8' }}>
        <li><Link to="/lab1" style={{ color: '#007bff' }}>Лабораторна робота 1</Link></li>
        <li><Link to="/lab2" style={{ color: '#007bff' }}>Лабораторна робота 2</Link></li>
        <li><Link to="/lab3" style={{ color: '#007bff' }}>Лабораторна робота 3</Link></li>
        <li><Link to="/practice2" style={{ color: '#007bff' }}>Практична робота 2</Link></li>
        <li><Link to="/practice3" style={{ color: '#007bff' }}>Практична робота 3</Link></li>
        <li><Link to="/practice4" style={{ color: '#007bff' }}>Практична робота 4 (Форма)</Link></li>
      </ul>
    </div>
  );
};

export default Home;
