function Paragraph(props) {
  const { text, style, className, children } = props;

  return (
    <p style={style} className={className}>
      {children || text}
    </p>
  );
}

export default Paragraph;
