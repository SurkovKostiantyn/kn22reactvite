import React from 'react';
import Heading from '../../atoms/Heading';
import Card from '../../moleculas/Card';

const Lab1 = () => {
  const handleClick = () => {
    console.log('Button clicked in Lab 1');
  };

  return (
    <section className="section">
      <Heading level={2} title="Лабораторна 1: Card Компонент" />
      <Card
        title="Card"
        level={2}
        buttonLabel="Submit"
        buttonVariant="secondary"
        buttonOnClick={handleClick}
      />
    </section>
  );
};

export default Lab1;
