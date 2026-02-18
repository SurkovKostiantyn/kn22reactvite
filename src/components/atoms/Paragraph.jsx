function Paragraph(props) {
  const { text, style } = props;

  return <p style={style}>{text}</p>;
}

export default Paragraph;
