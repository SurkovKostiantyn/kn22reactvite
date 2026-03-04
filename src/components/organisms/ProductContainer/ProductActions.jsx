import Button from '../../atoms/Button';

const ProductActions = ({ quantity, setQuantity, onBuy }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="quantity" style={{ fontWeight: 500 }}>Кількість:</label>
        <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <button 
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ padding: '4px 12px', background: '#f5f5f5', border: 'none', cursor: 'pointer' }}
          >
            -
          </button>
          <span style={{ padding: '4px 16px', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
            {quantity}
          </span>
          <button 
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            style={{ padding: '4px 12px', background: '#f5f5f5', border: 'none', cursor: 'pointer' }}
          >
            +
          </button>
        </div>
      </div>
      <Button variant="primary" onClick={onBuy} style={{ width: '100%' }}>
        Купити
      </Button>
    </div>
  );
};

export default ProductActions;
