import React from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import StudentList from '../../moleculas/StudentList';

const Practice4 = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    // Демонстрація програмної навігації
    alert("Роботу з формою завершено! Повертаємось на головну...");
    navigate('/');
  };

  return (
    <section className="section" style={{ marginTop: '24px' }}>
      <Heading level={2} title="Практична 4: Валідація Форми" />
      <Paragraph text="Нижче наведено компонент StudentList, який містить AddStudentForm із попередньої практичної." />
      
      <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <StudentList />
      </div>

      <button
        onClick={handleFinish}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Завершити і вийти на Головну сторінку (useNavigate)
      </button>
    </section>
  );
};

export default Practice4;
