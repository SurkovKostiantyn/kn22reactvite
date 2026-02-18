import { useState } from 'react';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import styles from './Post.module.css';

// Крок 2: Створення компонента-молекули Post
function Post({ id, title, content, author }) {
  // Крок 5: Додавання локального стану для інтерактивності (лічильник лайків)
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className={styles.post} key={id}>
      {/* Використання атома Heading */}
      <Heading level={2} title={title} />

      <p className={styles.content}>{content}</p>
      <p className={styles.author}>Author: {author}</p>

      <div className={styles.actions}>
        {/* Використання атома Button з відображенням стану */}
        <Button onClick={handleLike}>Like ({likes})</Button>
      </div>
    </div>
  );
}

export default Post;
