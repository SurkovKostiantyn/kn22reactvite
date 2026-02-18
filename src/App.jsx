import Header from './components/organisms/Header';
import Card from './components/moleculas/Card';
import Post from './components/moleculas/Post';
import Heading from './components/atoms/Heading';
import List from './components/moleculas/List';
import ListFiltered from './components/moleculas/ListFiltered';
import AverageScore from './components/moleculas/AverageScore';

// Крок 1: Створення масиву "мок-даних"
const mockPosts = [
  {
    id: 1,
    title: 'Understanding React Components',
    content:
      'React components let you split the UI into independent, reusable pieces, and think about each piece in isolation.',
    author: 'Dan Abramov',
  },
  {
    id: 2,
    title: 'State and Lifecycle',
    content:
      'State is similar to props, but it is private and fully controlled by the component.',
    author: 'Sophie Alpert',
  },
  {
    id: 3,
    title: 'Handling Events',
    content:
      'Handling events with React elements is very similar to handling events on DOM elements.',
    author: 'Ryan Florence',
  },
];

function App() {
  const handleClick = () => {
    console.log('Button clicked');
  };

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

      <Heading level={2} title="Posts List" />
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
    </>
  );
}

export default App;
