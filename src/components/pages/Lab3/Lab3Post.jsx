import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPosts } from '../../../DATA/mockPosts';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

const Lab3Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = mockPosts.find(p => p.id === Number(postId));

  if (!post) {
    return (
      <div style={{ padding: '20px' }}>
        <Heading title={`Пост із ID ${postId} не знайдено.`} level={2} />
        <button onClick={() => navigate(-1)} style={{ marginTop: '10px' }}>
          ← Повернутися
        </button>
      </div>
    );
  }

  return (
    <article style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        ← Повернутися
      </button>
      <header>
        <Heading title={post.title} level={1} />
        <Paragraph text={`Автор: ${post.author}`} />
        <span style={{ display: 'inline-block', background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
          {post.category}
        </span>
      </header>
      <div style={{ marginTop: '20px', lineHeight: '1.6' }}>
        {post.content}
      </div>
    </article>
  );
};

export default Lab3Post;
