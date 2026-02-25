import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import SearchBar from '../../moleculas/SearchBar';
import Button from '../../atoms/Button';
import Post from '../../moleculas/Post';
import { mockPosts } from '../../../mockPosts';

const Lab3 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section">
      <Heading level={2} title="Лабораторна 3: SearchBar && Filter By Category" />
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
          filteredPosts.map((post) => (
            <div key={post.id} style={{ marginBottom: '16px' }}>
              <Post {...post} />
              <Link to={`/lab3/${post.id}`} style={{ display: 'inline-block', marginTop: '8px', color: '#007bff' }}>
                Читати повністю (useParams demo) →
              </Link>
            </div>
          ))
        ) : (
          <Paragraph text="Нічого не знайдено за вашим запитом." />
        )}
      </div>
    </section>
  );
};

export default Lab3;
