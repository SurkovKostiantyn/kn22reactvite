import Input from '../atoms/Input';
import Button from '../atoms/Button';
import styles from './Card.module.css';

function Card(props) {
  const { children, buttonLabel, buttonVariant, buttonOnClick } = props;
  return (
    <div className={styles.card}>
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
