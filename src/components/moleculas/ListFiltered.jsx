import { students } from "./data.js";
import ListItem from "../atoms/ListItem.jsx";

const ListFiltered = () => {
    return (
        <ol>
            {students
                .filter((student) => student.score >= 60)
                .map((student) => (
                    <ListItem key={student.id} student={student} />
                ))}
        </ol>
    );
};

export default ListFiltered;