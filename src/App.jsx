import { useState } from 'react';
import Header from './components/organisms/Header';
import Card from './components/moleculas/Card';
import Post from './components/moleculas/Post';
import Heading from './components/atoms/Heading';
import List from './components/moleculas/List';
import ListFiltered from './components/moleculas/ListFiltered';
import AverageScore from './components/moleculas/AverageScore';
import SearchBar from './components/moleculas/SearchBar';
import Paragraph from './components/atoms/Paragraph';
import Button from './components/atoms/Button';

// Крок 1: Створення масиву "мок-даних"
const mockPosts = [
  {
    id: 1,
    category: 'React',
    title: 'Understanding React Components',
    content:
      'React components let you split the UI into independent, reusable pieces, and think about each piece in isolation.',
    author: 'Dan Abramov',
  },
  {
    id: 2,
    category: 'React',
    title: 'State and Lifecycle',
    content:
      'State is similar to props, but it is private and fully controlled by the component.',
    author: 'Sophie Alpert',
  },
  {
    id: 3,
    category: 'Not React',
    title: 'Handling Events',
    content:
      'Handling events with React elements is very similar to handling events on DOM elements.',
    author: 'Ryan Florence',
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleClick = () => {
    console.log('Button clicked');
  };

  // Логіка фільтрації
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />

      <Heading level={2} title="Pz2: List" />
      <List />
      <Heading level={2} title="Pz2: ListFiltered" />
      <ListFiltered />
      <Heading level={2} title="Pz2: AverageScore" />
      <AverageScore />

      <Heading level={2} title="Lab1: Card" />
      <Card
        title="Card"
        level={2}
        buttonLabel="Submit"
        buttonVariant="secondary"
        buttonOnClick={handleClick}
      />

      <Heading level={2} title="Lab2: Posts List" />
      {/* Крок 3: Рендеринг списку компонентів за допомогою .map() */}
      {mockPosts.map((post) => (
        <Post
          // Крок 4: Забезпечення унікальності ключів (key)
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
        />
      ))}

      <Heading level={2} title="Lab3: SearchBar && Filter By Category" />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div>
        {['All', 'React', 'Not React'].map((cat) => (
          <Button
            key={cat}
            children={cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <Paragraph text="Нічого не знайдено за вашим запитом." />
        )}
      </div>
    </>
  );
}

export default App;
