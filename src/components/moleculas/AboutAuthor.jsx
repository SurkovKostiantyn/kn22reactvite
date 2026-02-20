import Heading from '../atoms/Heading.jsx';
import Paragraph from '../atoms/Paragraph.jsx';

function AboutAuthor() {
  return (
    <div>
      <Heading level={3} title="Про автора" />
      <Paragraph
        text={
          'Цей додаток розроблено в рамках курсу "React" для групи КН-22.'
        }
      />
      <Paragraph
        text={
          'Використані технології: React 19, Vite 8, ESLint, Prettier.'
        }
      />
    </div>
  );
}

export default AboutAuthor;
