function Heading(props) {
  const { level, title, children } = props;

  const Tag = `h${level}`;
  return <Tag>{children || title}</Tag>;
}

export default Heading;
