import React from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import syllabusText from '../../../../Syllabus.md?raw';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Heading title="Головна сторінка (Зміст)" level={1} />
      <Paragraph text="Ласкаво просимо! Цей додаток демонструє виконання лабораторних та практичних робіт." />
      {/*ReactMarkdown - це бібліотека для парсингу та відображення Markdown-тексту */}
      <ReactMarkdown>{syllabusText}</ReactMarkdown>
    </div>
  );
};

export default Home;
