import { useState } from 'react';
import { students } from '../../DATA/data.js';
import ListItem from '../atoms/ListItem.jsx';
import Button from '../atoms/Button.jsx';
import Paragraph from '../atoms/Paragraph.jsx';
import AddStudentForm from './AddStudentForm.jsx';

function StudentList() {
  const [filterActive, setFilterActive] = useState(false);
  const [studentsList, setStudentsList] = useState(students);

  const filteredStudents = studentsList.filter(
    (student) => (student.score ?? 0) >= 60
  );
  const displayedStudents = filterActive ? filteredStudents : studentsList;

  const handleAddStudent = (newStudent) => {
    setStudentsList([...studentsList, newStudent]);
  };

  return (
    <div>
      <AddStudentForm onAddStudent={handleAddStudent} />

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
        <Paragraph text="За вашим запитом нікого не знайдено." />
      )}
    </div>
  );
}

export default StudentList;
