import React from 'react';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

const Lab4 = () => {
  return (
    <section className="section">
      <Heading level={2}>Лабораторна 4: Маршрутизація (react-router-dom)</Heading>
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
        <Paragraph>
          У цій лабораторній роботі було реалізовано навігацію за допомогою бібліотеки <strong>react-router-dom</strong>.
        </Paragraph>
        <br />
        <Paragraph><strong>Ключові досягнення:</strong></Paragraph>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>
          <li>
            <Paragraph>Додаток обгорнуто в <code>BrowserRouter</code> (у <code>main.jsx</code>), що дозволяє використовувати HTML5 History API.</Paragraph>
          </li>
          <li>
            <Paragraph>Створено <code>MainLayout</code> з <code>Outlet</code>, який виступає глобальною оболонкою з навігацією, що не перемальовується при зміні сторінок.</Paragraph>
          </li>
          <li>
            <Paragraph>Налаштовано маршрутизацію у файлі <code>App.jsx</code> за допомогою компонентів <code>Routes</code> та <code>Route</code>.</Paragraph>
          </li>
          <li>
            <Paragraph>Використано <code>NavLink</code> для створення меню з автоматичним підсвічуванням активної вкладки (наприклад, через функцію <code>getActiveClass</code>).</Paragraph>
          </li>
          <li>
            <Paragraph>Впроваджено використання "Wildcard" маршруту <code>*</code> для обробки неіснуючих сторінок (сторінка 404 - NotFound).</Paragraph>
          </li>
          <li>
            <Paragraph>Частина завдань щодо захищених маршрутів (вкладена навігація профілю) була розвинута у наступній, 5-й лабораторній роботі через Context API.</Paragraph>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Lab4;
