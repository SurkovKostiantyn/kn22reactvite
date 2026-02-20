import { students } from '../../DATA/data.js';
import Paragraph from '../atoms/Paragraph.jsx';

function AverageScore() {
  const averageScore = (
    students.reduce((acc, student) => acc + (student.score ?? 0), 0) /
    students.length
  ).toFixed(2);

  return <Paragraph text={`Average Score: ${averageScore}`} />;
}

export default AverageScore;
