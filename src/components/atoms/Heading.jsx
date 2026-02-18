function Heading(props) {
  const { level, title } = props;

  const Tag = `h${level}`;
  return <Tag>{title}</Tag>;
}

export default Heading;
