function ListItem(props) {
  const {
    student: { name, score },
  } = props;

  return (
    <li>
      {name} - {score}
    </li>
  );
}

export default ListItem;
