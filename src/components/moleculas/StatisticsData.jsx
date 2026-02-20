import { students } from '../../DATA/data.js';
import Heading from '../atoms/Heading.jsx';
import ListItem from '../atoms/ListItem.jsx';

function StatisticsData() {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => (s.score ?? 0) >= 60).length;
  const averageScore =
    students.reduce((acc, s) => acc + (s.score ?? 0), 0) / totalStudents;
  const maxScore = Math.max(...students.map((s) => s.score ?? 0));
  const minScore = Math.min(...students.map((s) => s.score ?? 0));

  const stats = [
    { id: 'total', name: `Всього студентів: ${totalStudents}` },
    { id: 'active', name: `Успішних (≥60): ${activeStudents}` },
    { id: 'avg', name: `Середній бал: ${averageScore.toFixed(1)}` },
    { id: 'max', name: `Найвищий бал: ${maxScore}` },
    { id: 'min', name: `Найнижчий бал: ${minScore}` },
  ];

  return (
    <div>
      <Heading level={3} title="Статистика" />
      <ul>
        {stats.map((stat) => (
          <ListItem key={stat.id} student={stat} />
        ))}
      </ul>
    </div>
  );
}

export default StatisticsData;
