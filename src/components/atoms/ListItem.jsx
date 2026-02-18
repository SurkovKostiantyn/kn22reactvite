const ListItem = ({ student }) => {
    return (
        <li>
            {student.name} - {student.score}
        </li>
    );
};

export default ListItem;