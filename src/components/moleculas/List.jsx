import { students } from './data.js';
import ListItem from '../atoms/ListItem.jsx';

function List() {
  return (
    <ol>
      {students.map((student) => (
        <ListItem key={student.id} student={student} />
      ))}
    </ol>
  );
}

export default List;
