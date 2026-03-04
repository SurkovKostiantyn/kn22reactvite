import styles from './ProductCard.module.css';
import ProductDetails from './ProductDetails';
import ProductActions from './ProductActions';

const ProductContainer = ({ product, quantity, setQuantity, onBuy }) => {
  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <ProductDetails
          name={product.name}
          description={product.description}
          price={product.price}
          rating={product.rating}
        />
        <ProductActions
          quantity={quantity}
          setQuantity={setQuantity}
          onBuy={onBuy}
        />
      </div>
    </div>
  );
};

export default ProductContainer;
