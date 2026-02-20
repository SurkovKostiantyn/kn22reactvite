import { students } from '../../DATA/data.js';

function StatisticsData() {
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => (s.score ?? 0) >= 60).length;
  const averageScore =
    students.reduce((acc, s) => acc + (s.score ?? 0), 0) / totalStudents;
  const maxScore = Math.max(...students.map((s) => s.score ?? 0));
  const minScore = Math.min(...students.map((s) => s.score ?? 0));

  return (
    <div>
      <h3>Статистика</h3>
      <ul>
        <li>Всього студентів: {totalStudents}</li>
        <li>Успішних (≥60): {activeStudents}</li>
        <li>Середній бал: {averageScore.toFixed(1)}</li>
        <li>Найвищий бал: {maxScore}</li>
        <li>Найнижчий бал: {minScore}</li>
      </ul>
    </div>
  );
}

export default StatisticsData;
