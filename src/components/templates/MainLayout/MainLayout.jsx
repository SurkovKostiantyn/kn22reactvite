import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Header from '../../organisms/Header';
import styles from './MainLayout.module.css';
import Button from '../../atoms/Button';
import useThemeContext from '../../../hooks/useThemeContext';

const MainLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const getActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const [theme, setTheme] = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeIcon = theme === 'light' ? '☀️' : '🌙';

  const themeButtonText = `${themeIcon} ${theme === 'light' ? 'Світла тема' : 'Темна тема'}`;

  const themeButton = <Button onClick={toggleTheme}>{themeButtonText}</Button>;

  return (
    <div className={styles.wrapper} data-theme={theme}>
      <Header />
      <nav className={styles.navbar}>
        <NavLink to="/" className={getActiveClass} end>
          Головна
        </NavLink>
        <NavLink to="/feed" className={getActiveClass}>
          Стрічка
        </NavLink>
        <NavLink to="/lab1" className={getActiveClass}>
          Лабораторна 1
        </NavLink>
        <NavLink to="/lab2" className={getActiveClass}>
          Лабораторна 2
        </NavLink>
        <NavLink to="/lab3" className={getActiveClass}>
          Лабораторна 3
        </NavLink>
        <NavLink to="/lab4" className={getActiveClass}>
          Лабораторна 4
        </NavLink>
        <NavLink to="/lab5" className={getActiveClass}>
          Лабораторна 5
        </NavLink>
        <NavLink to="/lab6" className={getActiveClass}>
          Лабораторна 6
        </NavLink>
        <NavLink to="/practice2" className={getActiveClass}>
          Практична 2
        </NavLink>
        <NavLink to="/practice3" className={getActiveClass}>
          Практична 3
        </NavLink>
        <NavLink to="/practice4" className={getActiveClass}>
          Практична 4
        </NavLink>
        <NavLink to="/practice5" className={getActiveClass}>
          Практична 5
        </NavLink>
        <NavLink to="/practice6" className={getActiveClass}>
          Практична 6
        </NavLink>
        <NavLink to="/practice7" className={getActiveClass}>
          Практична 7
        </NavLink>
        <NavLink to="/practice8" className={getActiveClass}>
          Практична 8
        </NavLink>
        {isAuthenticated ? (
          <NavLink to="/profile" className={getActiveClass}>
            Особистий кабінет
          </NavLink>
        ) : (
          <>
            <NavLink to="/login" className={getActiveClass}>
              Вхід
            </NavLink>
            <NavLink to="/register" className={getActiveClass}>
              Реєстрація
            </NavLink>
          </>
        )}

        {/* Кнопка для перемикання теми */}
        {themeButton}
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Footer text</footer>
    </div>
  );
};

export default MainLayout;
