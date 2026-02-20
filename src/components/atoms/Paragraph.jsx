function Paragraph(props) {
  const { text, style, className } = props;

  return (
    <p style={style} className={className}>
      {text}
    </p>
  );
}

export default Paragraph;
