# Звіт до Лабораторної роботи №4

## 1. Посилання

- **GitHub-репозиторій**: _[Додайте посилання тут]_
- **Розгорнута версія додатку (Vercel/GitHub Pages)**: _[Додайте посилання тут]_

## 2. Опис реалізованої структури маршрутів

Було інтегровано бібліотеку `react-router-dom` в існуючий додаток.
Увесь додаток обгорнуто у `BrowserRouter` (у `main.jsx`), щоб підключити маршрутизацію через HTML5 History API.

У файлі `App.jsx` налаштовано компонент `Routes`, що містить базовий макет `MainLayout` з вкладеним `Outlet`. `MainLayout` має навігаційну панель з використанням компонента `NavLink` для автоматичного стилізування активної вкладки (наприклад, через функцію `getActiveClass`).

- Додано `index` маршрут, що вказує на компонент `Home`.
- Додано окремі маршрути до кожної лабораторної та практичної роботи.
- Додано маршрут "Стрічка" (`/feed`) для перегляду списку постів.
- Для сторінки окремого посту використано динамічну маршрутизацію `path="lab3/:postId"`, де `:postId` - динамічний параметр.
- Додано catch-all маршрут `*` до компонента `NotFound` для обробки неіснуючих сторінок.

Завдання щодо захищених маршрутів (`Profile`) та програмної навігації (через `useNavigate`) після входу було успішно розширене і реалізоване в Лабораторній роботі №5 з використанням Context API.

## 3. Фрагменти коду

### Конфігурація `Routes` у `App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
// Іморти інших компонентів...
import Feed from './components/pages/Feed/Feed';
import Lab3Post from './components/pages/Lab3/Lab3Post';
import NotFound from './components/pages/NotFound/NotFound';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import Profile from './components/pages/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="feed" element={<Feed />} />
        {/* Інші маршрути... */}
        <Route path="lab3/:postId" element={<Lab3Post />} />

        {/* Захищений маршрут з Лаб 5 */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile/*" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

### Приклад макету (`MainLayout`) та `Outlet`

```jsx
import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Header from '../../organisms/Header';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const getActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.wrapper}>
      <Header />
      <nav className={styles.navbar}>
        <NavLink to="/" className={getActiveClass} end>
          Головна
        </NavLink>
        <NavLink to="/feed" className={getActiveClass}>
          Стрічка
        </NavLink>
        {/* Інші посилання */}
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Footer text</footer>
    </div>
  );
};

export default MainLayout;
```

### Логіка обробки параметрів через `useParams` (`Lab3Post.jsx`)

```jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import Button from '../../atoms/Button';
import { mockPosts } from '../../../DATA/mockPosts';

const Lab3Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = mockPosts.find((p) => p.id === parseInt(postId));

  // ... (Відображення посту, якщо його знайдено)
};
```

### Приклад програмної навігації (через `useNavigate`) у `Login.jsx`

```jsx
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      login({ email });
      navigate('/profile', { replace: true });
    }
  };

  // ...
};
```

## 4. Відповіді на контрольні запитання

1. **У чому полягає фундаментальна різниця між клієнтською та серверною маршрутизацією?**
   Серверна маршрутизація вимагає повного перезавантаження сторінки та запиту нового HTML-документа при кожній зміні URL. Клієнтська маршрутизація (SPA) маніпулює DOM деревом за допомогою JavaScript, змінюючи лише необхідні частини інтерфейсу без запиту всього документа.
2. **Яку роль відіграє атрибут `index` у компоненті `Route`?**
   Атрибут `index` вказує, що даний маршрут є типовим (default) для батьківського маршруту. Він відображається у батьківському Outlet, коли URL збігається точно зі шляхом батька.
3. **Чому для програмної навігації в обробниках подій варто використовувати `useNavigate`, а не `Link`?**
   `Link` є декларативним компонентом для створення клікабельних елементів у JSX. `useNavigate` повертає функцію, яку можна викликати всередині будь-якої логіки (наприклад, після завершення команди, валідації форми чи авторизації), що забезпечує гнучкість управління навігацією.
4. **Як реалізувати динамічне підсвічування активних посилань у навігаційній панелі?**
   Для цього використовується компонент `NavLink`. Його властивості `className` та `style` можуть приймати функцію, яка отримує об'єкт зі станом `isActive`, що дозволяє застосовувати специфічні CSS-класи автоматично (як продемонстровано в функції `getActiveClass`).
5. **Що таке "catch-all" маршрут і де його слід розміщувати?**
   Це маршрут із шляхом `*`, який збігається з будь-яким URL. Його необхідно розміщувати останнім у списку `Routes`, щоб він спрацював лише тоді, коли жоден інший визначений шлях не підійшов (таким чином відображаючи сторінку 404).
