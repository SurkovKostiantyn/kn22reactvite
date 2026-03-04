import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import StarRating from './StarRating';

const ProductDetails = ({ name, description, price, rating }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Heading level={3}>{name}</Heading>
      <StarRating rating={rating} />
      <Paragraph style={{ color: '#666', fontSize: '0.875rem' }}>{description}</Paragraph>
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2ecc71' }}>
        ${price.toFixed(2)}
      </div>
    </div>
  );
};

export default ProductDetails;
