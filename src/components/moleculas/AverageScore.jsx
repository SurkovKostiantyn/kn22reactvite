import { students } from './data.js';
import Paragraph from '../atoms/Paragraph.jsx';

const AverageScore = () => {
  const averageScore =
    students.reduce((acc, student) => acc + student.score, 0) / students.length;

  return <Paragraph text={`Average Score: ${averageScore}`} />;
};

export default AverageScore;
