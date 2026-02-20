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
import StudentList from './components/moleculas/StudentList';
import StatisticsData from './components/moleculas/StatisticsData';
import AboutAuthor from './components/moleculas/AboutAuthor';

// Pz2: Крок 1: Створення масиву "мок-даних"
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

  // Pz3: Крок 2 — стан для показу/приховання інструкції (оператор &&)
  const [showHelp, setShowHelp] = useState(false);

  // Pz3: Крок 4 — стан для табів
  const [activeTab, setActiveTab] = useState('list');

  const handleClick = () => {
    console.log('Button clicked');
  };

  // Pz2: Логіка фільтрації
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Pz3: Визначення табів
  const tabs = [
    { id: 'list', label: 'Всі студенти' },
    { id: 'stats', label: 'Статистика' },
    { id: 'about', label: 'Про автора' },
  ];

  return (
    <>
      <Header />

      {/* ===== Pz3: Крок 2 — Умовне відображення (оператор &&) ===== */}
      <section className="section">
        <span className="section-label pz">Практична 3</span>
        <Heading level={2} title="Умовне відображення (&&)" />
        <Button onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? 'Приховати інструкцію' : 'Показати інструкцію'}
        </Button>
        {showHelp && (
          <Paragraph
            className="help-text"
            text="Довідка: Цей додаток дозволяє керувати списками студентів."
          />
        )}
      </section>

      {/* ===== Pz3: Крок 4 — Інтерфейс з табами ===== */}
      <section className="section">
        <span className="section-label pz">Практична 3</span>
        <Heading level={2} title="Таби" />
        <div className="tab-bar">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active-tab' : ''}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="content">
          {activeTab === 'list' && <StudentList />}
          {activeTab === 'stats' && <StatisticsData />}
          {activeTab === 'about' && <AboutAuthor />}
        </div>
      </section>

      {/* ===== Pz2: List ===== */}
      <section className="section">
        <span className="section-label pz">Практична 2</span>
        <Heading level={2} title="List" />
        <List />
      </section>

      {/* ===== Pz2: ListFiltered ===== */}
      <section className="section">
        <span className="section-label pz">Практична 2</span>
        <Heading level={2} title="ListFiltered" />
        <ListFiltered />
      </section>

      {/* ===== Pz2: AverageScore ===== */}
      <section className="section">
        <span className="section-label pz">Практична 2</span>
        <Heading level={2} title="AverageScore" />
        <AverageScore />
      </section>

      {/* ===== Lab1: Card ===== */}
      <section className="section">
        <span className="section-label lab">Лабораторна 1</span>
        <Heading level={2} title="Card" />
        <Card
          title="Card"
          level={2}
          buttonLabel="Submit"
          buttonVariant="secondary"
          buttonOnClick={handleClick}
        />
      </section>

      {/* ===== Lab2: Posts List ===== */}
      <section className="section">
        <span className="section-label lab">Лабораторна 2</span>
        <Heading level={2} title="Posts List" />
        {mockPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
          />
        ))}
      </section>

      {/* ===== Lab3: SearchBar && Filter By Category ===== */}
      <section className="section">
        <span className="section-label lab">Лабораторна 3</span>
        <Heading level={2} title="SearchBar && Filter By Category" />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div style={{ display: 'flex', gap: '8px', margin: '12px 0' }}>
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
      </section>
    </>
  );
}

export default App;
