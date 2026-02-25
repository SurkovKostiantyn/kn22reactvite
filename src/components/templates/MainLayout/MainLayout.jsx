import { NavLink, Outlet } from 'react-router-dom';
import Header from '../../organisms/Header';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const getActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.wrapper}>
      <Header />
      <nav className={styles.navbar}>
        <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
        <NavLink to="/lab1" className={getActiveClass}>Лабораторна 1</NavLink>
        <NavLink to="/lab2" className={getActiveClass}>Лабораторна 2</NavLink>
        <NavLink to="/lab3" className={getActiveClass}>Лабораторна 3</NavLink>
        <NavLink to="/practice2" className={getActiveClass}>Практична 2</NavLink>
        <NavLink to="/practice3" className={getActiveClass}>Практична 3</NavLink>
        <NavLink to="/practice4" className={getActiveClass}>Практична 4</NavLink>
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        Footer text
      </footer>
    </div>
  );
};

export default MainLayout;
