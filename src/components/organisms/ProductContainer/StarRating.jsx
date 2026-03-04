const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div style={{ display: 'flex', gap: '2px', color: '#f1c40f', fontSize: '1.2rem' }}>
      {[...Array(maxStars)].map((_, index) => (
        <span key={index}>
          {index < rating ? '★' : '☆'}
        </span>
      ))}
      <span style={{ fontSize: '0.875rem', color: '#666', marginLeft: '4px', lineHeight: '1.5' }}>
        ({rating})
      </span>
    </div>
  );
};

export default StarRating;
