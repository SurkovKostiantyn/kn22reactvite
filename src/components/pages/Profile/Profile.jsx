import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Heading level={2}>Особистий кабінет</Heading>
      <div className={styles.card}>
        <Paragraph><strong>Email:</strong> {user?.email || 'Не вказано'}</Paragraph>
        {user?.name && <Paragraph><strong>Ім'я:</strong> {user.name}</Paragraph>}
        <br />
        <Button onClick={logout} variant="secondary">Вийти з акаунту</Button>
      </div>
    </div>
  );
};

export default Profile;
