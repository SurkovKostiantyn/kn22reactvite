import React from 'react';
import Heading from '../../atoms/Heading';
import Post from '../../moleculas/Post';
import { mockPosts } from '../../../mockPosts';

const Lab2 = () => {
  return (
    <section className="section">
      <Heading level={2} title="Лабораторна 2: Posts List" />
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
  );
};

export default Lab2;
