function ListItem(props) {
  const { student } = props;
  const { name, score } = student;

  const displayScore = score ?? 'Оцінка відсутня';
  const hasScore = score != null;

  return (
    <li>
      {name} - {displayScore}{' '}
      {hasScore && (
        <span style={{ color: score >= 60 ? 'green' : 'red' }}>
          {score >= 60 ? 'Зараховано' : 'Незараховано'}
        </span>
      )}
    </li>
  );
}

export default ListItem;
