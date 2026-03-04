import React, { useState } from 'react';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import ProductContainer from '../../organisms/ProductContainer/ProductContainer';

const Practice5 = () => {
  // Стан для кількості товару зберігається в смарт-компоненті сторінки
  const [quantity, setQuantity] = useState(1);

  // Імітація даних, що прийшли з бекенду
  const productInfo = {
    id: 101,
    name: "Бездротові навушники Sony WH-1000XM5",
    description: "Навушники з найкращою системою активного шумозаглушення на ринку, до 30 годин автономної роботи.",
    price: 349.99,
    rating: 5,
    image: "https://via.placeholder.com/300x200?text=Sony+WH-1000XM5"
  };

  const handleBuy = () => {
    alert(`Додано до кошика: ${productInfo.name} у кількості ${quantity} шт. на суму $${(productInfo.price * quantity).toFixed(2)}`);
  };

  return (
    <section className="section">
      <Heading level={2}>Практична 5: Побудова ієрархії компонентів</Heading>
      
      <div style={{ marginBottom: '2rem' }}>
        <Paragraph>
          У цій практичній роботі було виконано декомпозицію макета <strong>Картки товару</strong> інтернет-магазину на 3 рівні ієрархії:
        </Paragraph>
        <ul style={{ listStyleType: 'decimal', paddingLeft: '2rem', margin: '1rem 0' }}>
          <li>
            Контейнерний рівень: <code>ProductContainer</code> (Smart Component), що приймає стан.
          </li>
          <li>
            Презентаційний рівень: <code>ProductDetails</code> та <code>ProductActions</code> (Dumb Components).
          </li>
          <li>
            Атомарний рівень: <code>StarRating</code>, <code>Button</code>, <code>Heading</code>, <code>Paragraph</code>.
          </li>
        </ul>
        <Paragraph>
          <strong>Джерело істини (Single Source of Truth)</strong> для <code>quantity</code> (кількості товару) знаходиться у батьківському компоненті (`Practice5.jsx` або `ProductContainer`), і передається вниз до `ProductActions` через систему пропсів (Prop Drilling).
        </Paragraph>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <ProductContainer
          product={productInfo}
          quantity={quantity}
          setQuantity={setQuantity}
          onBuy={handleBuy}
        />
      </div>
      
    </section>
  );
};

export default Practice5;
