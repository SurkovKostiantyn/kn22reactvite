import { students } from '../../DATA/data.js';
import ListItem from '../atoms/ListItem.jsx';

function ListFiltered() {
  return (
    <ol>
      {students
        .filter((student) => student.score >= 60)
        .map((student) => (
          <ListItem key={student.id} student={student} />
        ))}
    </ol>
  );
}

export default ListFiltered;
