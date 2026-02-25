# Лабораторна робота №4

**Тема:** Розробка багатосторінкової навігації з використанням Atomic Design.

**Мета:** Навчитися проектувати архітектуру багаторівневої навігації в односторінкових додатках; опанувати механізми декларативної маршрутизації за допомогою бібліотеки react-router-dom; реалізувати систему вкладених макетів (Layouts), динамічних параметрів та інтегрувати ізольовані практичні й лабораторні роботи як незалежні сторінки.

---

## 1. Посилання

- **Репозиторій з кодом:** [surkovkostiantyn/kn22reactvite](https://github.com/surkovkostiantyn/kn22reactvite)
- **Розгорнута версія додатку:** [GitHub Pages](https://surkovkostiantyn.github.io/kn22reactvite)

---

## 2. Структура маршрутів та обгрунтування вибору вкладеності

Додаток використовує `react-router-dom` v6 для управління навігацією. Увесь додаток обгорнутий у провайдер `BrowserRouter` у файлі `main.jsx`.

Структура `Routes` в `App.jsx` виглядає наступним чином:

- `/` - Базовий шлях, що рендерить `MainLayout`. Він містить загальну для всіх сторінок навігаційну панель `<nav>` і футер. Це реалізує патерн "Layout Route", всі інші сторінки (лабораторні й практичні) відображатимуться через `Outlet` у межах цього макета.
  - `index` - `/` за замовчуванням відображає вітальну сторінку `Home` (Зміст робочих сторінок).
  - `lab1`, `lab2`, `lab3` - Ізольовані компоненти попередніх лабораторних робіт.
  - `lab3/:postId` - Динамічний сегмент для унікального поста з Лабораторної 3. Хук `useParams()` стягує інформацію щодо вибраного ID.
  - `practice2`, `practice3`, `practice4` - Ізольовані компоненти практичних робіт. Робота 4 додатково використовує хук `useNavigate()` для перенаправлення на головну після завершення взаємодії.
  - `*` - "catch-all" або wildcard роут, рендерить `NotFound` компоненту як обробку помилки до неіснуючих сторінок.

Для підтримки патерну **Atomic Design**, усі ці сторінки-агрегатори та їхня логіка інкапсульовані всередині директорії `src/components/pages/`.

---

## 3. Фрагменти коду

### Конфігурація Routes та BrowserRouter

`src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Реалізація Layout із компонентом Outlet

`src/components/templates/MainLayout/MainLayout.jsx`:

```jsx
// ... імпорти
const MainLayout = () => {
  const getActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <NavLink to="/lab1" className={getActiveClass}>
          Лабораторна 1
        </NavLink>
        <NavLink to="/practice2" className={getActiveClass}>
          Практична 2
        </NavLink>
        {/* ... */}
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      {/* ... */}
    </div>
  );
};
export default MainLayout;
```

### Логіка обробки параметрів через useParams

`src/components/pages/Lab3/Lab3Post.jsx`:

```jsx
import { useParams, useNavigate } from 'react-router-dom';
import { mockPosts } from '../../../mockPosts';
// ...
const Lab3Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = mockPosts.find((p) => p.id === Number(postId));
  // ...
  return (
    <article>
      <button onClick={() => navigate(-1)}>← Повернутися</button>
      {/* ... */}
    </article>
  );
};
```

### Приклад програмної навігації через useNavigate

`src/components/pages/Practice4/Practice4.jsx`:

```jsx
import { useNavigate } from 'react-router-dom';

const Practice4 = () => {
  const navigate = useNavigate();
  // ...
  const handleFinish = () => {
    alert('Роботу з формою завершено! Повертаємось на головну...');
    navigate('/');
  };
  // ...
};
```

---

## 4. Контрольні запитання

**1. У чому полягає фундаментальна різниця між клієнтською та серверною маршрутизацією?**
Серверна маршрутизація вимагає повного перезавантаження сторінки та запиту нового HTML-документа при кожній зміні URL. Клієнтська маршрутизація (SPA) маніпулює DOM деревом за допомогою JavaScript, змінюючи лише потрібні частини інтерфейсу без запиту всього документа.

**2. Яку роль відіграє атрибут index у компоненті Route?**
Атрибут index вказує, що даний маршрут є типовим (default) для батьківського маршруту. Він відображається у батьківському Outlet, коли поточний URL збігається точно зі шляхом батька, діючи як "вхідний" пункт роута.

**3. Чому для програмної навігації в обробниках подій варто використовувати useNavigate, а не Link?**
Link використовується лише для декларативного створення клікабельних елементів `<a>` у JSX. `useNavigate` повертає функцію, яку можна викликати всередині будь-якої логіки (наприклад, після завершення таймауту, валідації форми або fetch-запиту), що забезпечує гнучкість управління навігацією у фонових скриптах.

**4. Як реалізувати динамічне підсвічування активних посилань у навігаційній панелі?**
Для цього використовується компонент `NavLink` (а не Link) з react-router-dom. Його властивості `className` та `style` підтримують функцію-коллбек, яка отримує об'єкт зі станом `isActive`, за допомогою чого можна повертати необхідні специфічні CSS-класи.

**5. Що таке "catch-all" маршрут і де його слід розміщувати?**
Це маршрут із шляхом `*` "wildcard", який збігається з будь-яким URL. Його необхідно розміщувати найостаннішим у списку Routes, щоб він спрацював лише у ситуації коли жоден інший визначений шлях не підійшов. Це ідеально підходить для реалізації сторінок помилки `404 Not Found`.
