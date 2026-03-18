import React, { useState } from 'react';
import Heading from '../../atoms/Heading';
import ProductContainer from '../../organisms/ProductContainer/ProductContainer';
import useWindowSize from '../../../hooks/useWindowSize';

// Імітація даних, що прийшли з бекенду
const productsInfo = [
  {
    id: 101,
    name: 'Бездротові навушники Sony WH-1000XM5',
    description:
      'Навушники з найкращою системою активного шумозаглушення на ринку, до 30 годин автономної роботи.',
    price: 349.99,
    rating: 5,
    image: 'https://placehold.co/300x200?text=Sony+WH-1000XM5',
  },
  {
    id: 102,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
  {
    id: 103,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
  {
    id: 104,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
  {
    id: 105,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
  {
    id: 106,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
  {
    id: 107,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
  {
    id: 108,
    name: 'Смартфон Apple iPhone 15 Pro',
    description:
      'Флагманський смартфон з титановим корпусом, потужним чипом A17 Pro та покращеною системою камер.',
    price: 999.0,
    rating: 5,
    image: 'https://placehold.co/300x200?text=iPhone+15+Pro',
  },
];

const Practice8 = () => {
  // Стан для кількості товару зберігається в смарт-компоненті сторінки
  const [quantity, setQuantity] = useState(1);

  // Викликаємо наш кастомний хук. Він поверне об'єкт із width та height
  const { width } = useWindowSize();

  // Визначаємо, чи екран мобільний
  const isMobile = width < 768;

  const handleBuy = (product) => {
    alert(
      `Додано до кошика: ${product.name} у кількості ${quantity} шт. на суму $${(product.price * quantity).toFixed(2)}`
    );
  };

  return (
    <section className="section">
      <Heading level={2}>Практична 8: Створення кастомних хуків</Heading>

      <div className="help-text">
        <Heading level={3}>Мета роботи</Heading>
        <Paragraph>
          На цій практичній роботі ми вивчаємо <strong>абстракцію бізнес-логіки</strong>.
          Ми виносимо повторюваний функціонал у власні кастомні хуки, що дозволяє
          зробити код компонентів чистішим та легшим для підтримки.
        </Paragraph>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Heading level={3}>Використані кастомні хуки:</Heading>
        <ul>
          <li>
            <strong>useWindowSize</strong> — відстежує розмір вікна браузера.
            <br />
            <small>Поточна ширина: {width}px. Режим: {isMobile ? 'Мобільний' : 'Десктопний'}</small>
          </li>
          <li>
            <strong>useOnlineStatus</strong> — моніторить стан мережі (онлайн/офлайн) та тип з'єднання.
          </li>
          <li>
            <strong>useThemeContext</strong> — керує темою додатка (світла/темна) та зберігає вибір у LocalStorage.
          </li>
        </ul>
      </div>

      <Heading level={3}>Каталог товарів</Heading>
      <Paragraph>
        Нижче наведено приклад використання стану, що передається у спільний смарт-компонент
        продукту.
      </Paragraph>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'var(--section-bg)',
          borderRadius: '8px',
          border: '1px solid var(--section-border)',
        }}
      >
        {productsInfo.map((product) => (
          <ProductContainer
            key={product.id}
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onBuy={() => handleBuy(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Practice8;
