import Input from '../atoms/Input';

function SearchBar(props) {
  const { searchTerm, onSearchChange } = props;
  return (
    <div>
      <Input
        type="text"
        placeholder="Пошук постів..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        id="search"
        name="search"
      />
    </div>
  );
}

export default SearchBar;
