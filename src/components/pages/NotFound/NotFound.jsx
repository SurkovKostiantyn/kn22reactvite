import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Heading title="404" level={1} />
      <Heading title="Сторінку не знайдено" level={2} />
      <Paragraph text="Схоже, такої адреси не існує або роботу ще не додано." />
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Повернутися на головну</Link>
    </div>
  );
};

export default NotFound;
