import { useState } from 'react';
import { students } from '../../DATA/data.js';
import ListItem from '../atoms/ListItem.jsx';
import Button from '../atoms/Button.jsx';

function StudentList() {
  const [filterActive, setFilterActive] = useState(false);

  const filteredStudents = students.filter(
    (student) => (student.score ?? 0) >= 60
  );
  const displayedStudents = filterActive ? filteredStudents : students;

  return (
    <div>
      <Button onClick={() => setFilterActive(!filterActive)}>
        {filterActive ? 'Показати всіх' : 'Показати тільки успішних'}
      </Button>

      {displayedStudents.length > 0 ? (
        <ol>
          {displayedStudents.map((student) => (
            <ListItem key={student.id} student={student} />
          ))}
        </ol>
      ) : (
        <p>За вашим запитом нікого не знайдено.</p>
      )}
    </div>
  );
}

export default StudentList;
