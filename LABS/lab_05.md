# Звіт до Лабораторної роботи №5

## 1. Посилання

- **GitHub-репозиторій**: _[Додайте посилання тут]_
- **Розгорнута версія додатку (Vercel/GitHub Pages)**: _[Додайте посилання тут]_

## 2. Фрагменти коду

### Конфігурація `AuthContext.jsx`

```jsx
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Реалізація компонента `ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
```

### Реалізація сторінки `Lab5.jsx`

```jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';

const Lab5 = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <section className="section">
      <Heading level={2}>
        Лабораторна 5: Context API та Захищені Маршрути
      </Heading>
      <div
        style={{
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          marginTop: '1rem',
        }}
      >
        <Heading level={3}>Статус авторизації</Heading>
        {isAuthenticated ? (
          <>
            <Paragraph>
              Ви увійшли як: <strong>{user?.email}</strong>{' '}
              {user?.name ? `(${user.name})` : ''}
            </Paragraph>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <Link to="/profile">
                <Button variant="primary">Перейти в Профіль</Button>
              </Link>
              <Button onClick={logout} variant="secondary">
                Вийти
              </Button>
            </div>
          </>
        ) : (
          <>
            <Paragraph>
              Ви не авторизовані. Будь ласка, увійдіть або зареєструйтесь.
            </Paragraph>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <Link to="/login">
                <Button variant="primary">Вхід</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Реєстрація</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Lab5;
```

## 3. Контрольні запитання

1. **Яку архітектурну проблему (пов'язану з передачею пропсів) вирішує використання Context API?**
   Context API вирішує проблему _Prop Drilling_ — ситуацію, коли дані (пропси) доводиться передавати через багато проміжних рівнів компонентів просто для того, щоб доставити їх глибоко у дерево компонентів. Context API дозволяє організувати глобальний стан, і звертатись до даних напряму з будь-якого компонента-споживача.

2. **Чому для глобального управління станом у складних додатках іноді обирають Redux/Zustand замість вбудованого Context API?**
   Оскільки Context API змушує ререндерити кожен компонент, який на нього підписаний, при будь-якій (навіть незначній) зміні значення контексту, це може викликати падіння продуктивності у великих додатках при частих оновленнях. Redux та Zustand використовують інші механізми (selectors), які обмежують зайві рендери. Крім того, вони мають просунуті інструменти розробника (Dev Tools) та зручніше працюють з асинхронним кодом.

3. **Яка роль патерна Higher-Order Component (HOC) при реалізації захищених маршрутів (Protected Routes)?**
   У випадку з Protected Routes, HOC є компонентом обгорткою (компонентом вищого порядку), який містить логіку перевірки доступу. Завдяки йому бізнес-логіка авторизації виноситься за межі сторінок. Якщо користувач має доступ, HOC рендерить захищену сторінку, якщо ні – перенаправляє його на сторінку логіну.

4. **Чому при перенаправленні неавторизованого користувача використовується властивість `replace: true` у компоненті `Navigate`? (Поясніть вплив на стек історії браузера).**
   Властивість `replace: true` вказує роутеру замінити поточний запис у стеку історії браузера новим (сторінкою логіну) замість того, щоб додавати його поверх захищеної сторінки, на яку користувач марно намагався зайти. Як наслідок, якщо після перенаправлення користувач натисне кнопку "Назад" у браузері, його не поверне знову на заблоковану сторінку, що врятує користувача від нескінченної петлі редиректів та покращить UX.
