import React from 'react';
import Heading from '../../atoms/Heading';
import List from '../../moleculas/List';
import ListFiltered from '../../moleculas/ListFiltered';
import AverageScore from '../../moleculas/AverageScore';

const Practice2 = () => {
  return (
    <div>
      <section className="section" style={{ marginTop: '24px' }}>
        <Heading level={2} title="Практична 2: List" />
        <List />
      </section>

      <section className="section" style={{ marginTop: '24px' }}>
        <Heading level={2} title="Практична 2: ListFiltered" />
        <ListFiltered />
      </section>

      <section className="section" style={{ marginTop: '24px' }}>
        <Heading level={2} title="Практична 2: AverageScore" />
        <AverageScore />
      </section>
    </div>
  );
};

export default Practice2;
