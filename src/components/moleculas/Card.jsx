import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import styles from './Card.module.css';

function Card({
  title,
  children,
  buttonLabel,
  buttonVariant,
  buttonOnClick,
  level,
}) {
  return (
    <div className={styles.card}>
      <Heading level={level} title={title} />
      {children}
      <Input type="text" placeholder="Enter your name" label="Name" />
      <Button
        children={buttonLabel}
        variant={buttonVariant}
        onClick={buttonOnClick}
      />
    </div>
  );
}

export default Card;
