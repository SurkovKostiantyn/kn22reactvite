Лабораторна робота №4
Тема: Розробка багатосторінкової навігації.
Мета: Навчитися проектувати архітектуру багаторівневої навігації в односторінкових додатках; опанувати механізми декларативної маршрутизації за допомогою бібліотеки react-router-dom; реалізувати систему вкладених макетів (Layouts) та динамічних параметрів; вивчити принципи програмної навігації та захисту доступу до розділів додатку.  
Технологічний стек: React, Vite, React Router v6, CSS Modules, Hooks (useParams, useNavigate, useLocation).

Завдання

1. Інтегрувати бібліотеку react-router-dom у розроблений проект стрічки нових (з Лабораторної роботи №3) та налаштувати базовий провайдер маршрутизації.
2. Створити спільний компонент макета (Layout) з навігаційною панеллю, що буде відображатися на всіх сторінках додатку.
3. Реалізувати наступну структуру сторінок:
   −Головна (Home): Вітальна сторінка додатку.
   −Стрічка (Feed): Покращена версія стрічки новин з функціоналом пошуку та фільтрації.
   −Профіль користувача (Profile): Розділ з вкладеною навігацією для перегляду інформації та редагування налаштувань.
4. Впровадити динамічну маршрутизацію для перегляду окремого поста за його унікальним ідентифікатором у URL.
5. Додати обробку неіснуючих маршрутів (404 Page) за допомогою "wildcard" шляху.
6. Забезпечити програмне перенаправлення користувача на головну сторінку після успішного збереження налаштувань профілю.

Хід виконання роботи
Крок 1. Конфігурація інфраструктури та встановлення маршрутизатора

Команда для встановлення:
npm install react-router-dom.

Після встановлення необхідно ініціалізувати маршрутизатор у точці входу додатка. Використання BrowserRouter є стандартом для веб-додатків, оскільки він використовує HTML5 History API для синхронізації UI з URL. Це забезпечує чисті URL-адреси (без символу #), які краще індексуються пошуковими системами та зручніші для користувачів.

src/main.jsx:
JavaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>
);

Крок 2. Проектування архітектури маршрутів у App.jsx

У React Router v6 компонент Routes прийшов на зміну Switch. Головна архітектурна зміна полягає в алгоритмі ранжування маршрутів. У версії v5 розробник мав ретельно стежити за порядком визначення маршрутів, оскільки система обирала перший збіг, що часто призводило до потреби використовувати проп exact. У v6 впроваджено інтелектуальний алгоритм, який оцінює кожен шлях за його специфічністю, де статичні сегменти мають вищий пріоритет над динамічними параметрами.

src/App.jsx:
JavaScript
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import PostPage from './pages/PostPage/PostPage';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

function App() {
return (
<Routes>
<Route path="/" element={<MainLayout />}>
<Route index element={<Home />} />
<Route path="feed" element={<Feed />} />
<Route path="feed/:postId" element={<PostPage />} />
<Route path="profile/_" element={<Profile />} />
<Route path="_" element={<NotFound />} />
</Route>
</Routes>
);
}

export default App;

Важливою частиною цього кроку є розуміння патерна "Layout Route". Коли Route не має властивості path, він стає макетом, який огортає всі вкладені маршрути, надаючи їм спільну структуру (наприклад, Header та Footer) без додавання нових сегментів до URL.  
Крок 3. Створення компонента макета з використанням Outlet

Компонент Outlet є фундаментальною інновацією v6. Він діє як динамічний заповнювач, у який рендеряться дочірні елементи поточного маршруту. Це дозволяє уникнути повторного рендерингу незмінних частин інтерфейсу, таких як навігаційна панель, що позитивно впливає на продуктивність за рахунок мінімізації операцій у реальному DOM.

src/components/templates/MainLayout/MainLayout.jsx:
JavaScript
import { NavLink, Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

const MainLayout = () => {
const getActiveClass = ({ isActive }) =>
isActive? `${styles.link} ${styles.active}` : styles.link;

return (
<div className={styles.wrapper}>
<nav className={styles.navbar}>
<NavLink to="/" className={getActiveClass} end>Головна</NavLink>
<NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
<NavLink to="/profile" className={getActiveClass}>Профіль</NavLink>
</nav>
<main className={styles.mainContent}>
<Outlet />
</main>
<footer className={styles.footer}>
Розроблено в рамках лабораторної роботи №4
</footer>
</div>
);
};

export default MainLayout;
Використання NavLink замість звичайного Link дозволяє декларативно керувати станом активності посилань. Проп end гарантує, що посилання на кореневий шлях / не буде позначене як активне при переході на /feed, оскільки за замовчуванням усі шляхи в React Router є частковими збігами.

Крок 4. Реалізація вкладеної навігації в профілі

Вкладені маршрути дозволяють відображати частину інтерфейсу всередині іншої частини, що ідеально підходить для кабінетів користувача з багатьма вкладками. У v6 можна використовувати відносні шляхи: посилання на settings усередині компонента, що рендериться за адресою /profile, автоматично вестиме на /profile/settings.

src/pages/Profile/Profile.jsx:
JavaScript
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import ProfileOverview from './ProfileOverview';
import ProfileSettings from './ProfileSettings';
import styles from './Profile.module.css';

const Profile = () => {
return (
<div className={styles.profileLayout}>
<aside className={styles.sidebar}>
<h3>Мій акаунт</h3>
<Link to="">Інформація</Link>
<Link to="settings">Налаштування</Link>
</aside>
<div className={styles.content}>
<Routes>
<Route index element={<ProfileOverview />} />
<Route path="settings" element={<ProfileSettings />} />
</Routes>
</div>
</div>
);
};

export default Profile;

Така декомпозиція маршрутів робить код більш стійким до змін (DRY - Don't Repeat Yourself) та полегшує тестування окремих частин додатку.

Крок 5. Робота з динамічними сегментами та параметрами URL

Для створення сторінок, контент яких залежить від конкретного об'єкта, використовуються динамічні сегменти, що позначаються двокрапкою в шляху (наприклад, :postId). Хук useParams повертає об'єкт, ключами якого є назви параметрів, вказані при визначенні маршруту.

src/pages/PostPage/PostPage.jsx:
JavaScript
import { useParams, useNavigate } from 'react-router-dom';
import { postsData } from '../../data';
import styles from './PostPage.module.css';

const PostPage = () => {
const { postId } = useParams();
const navigate = useNavigate();

const post = postsData.find(p => p.id === Number(postId));

if (!post) {
return <div className={styles.error}>Пост із ID {postId} не знайдено.</div>;
}

return (
<article className={styles.article}>
<button onClick={() => navigate(-1)} className={styles.backButton}>
← Повернутися
</button>
<header>
<h1>{post.title}</h1>
<p>Автор: <strong>{post.author}</strong></p>
</header>
<div className={styles.body}>{post.content}</div>
</article>
);
};

Хук useNavigate дозволяє реалізувати імперативну логіку переходів, що є критично важливим після виконання асинхронних дій або при реалізації кнопок повернення в історії браузера.

Контрольні запитання

1. У чому полягає фундаментальна різниця між клієнтською та серверною маршрутизацією? Серверна маршрутизація вимагає повного перезавантаження сторінки та запиту нового HTML-документа при кожній зміні URL. Клієнтська маршрутизація (SPA) маніпулює DOM деревом за допомогою JavaScript, змінюючи лише необхідні частини інтерфейсу без запиту всього документа.
2. Яку роль відіграє атрибут index у компоненті Route? Атрибут index вказує, що даний маршрут є типовим (default) для батьківського маршруту. Він відображається у батьківському Outlet, коли URL збігається точно зі шляхом батька.
3. Чому для програмної навігації в обробниках подій варто використовувати useNavigate, а не Link? Link є декларативним компонентом для створення клікабельних елементів у JSX. useNavigate повертає функцію, яку можна викликати всередині будь-якої логіки (наприклад, після завершення fetch-запиту або валідації форми), що забезпечує гнучкість управління потоком навігації.
4. Як реалізувати динамічне підсвічування активних посилань у навігаційній панелі? Для цього використовується компонент NavLink. Його властивості className та style можуть приймати функцію, яка отримує аргумент зі станом isActive, що дозволяє застосовувати специфічні CSS-класи автоматично.
5. Що таке "catch-all" маршрут і де його слід розміщувати? Це маршрут із шляхом \*, який збігається з будь-яким URL. Його необхідно розміщувати останнім у списку Routes, щоб він спрацював лише тоді, коли жоден інший визначений шлях не підійшов.
   Висновки
   Реалізація багатосторінкової навігації на базі React Router v6 є не просто технічним завданням, а архітектурним проектуванням досвіду користувача. Використання вкладених маршрутів дозволяє будувати масштабовані системи з чітким розподілом обов'язків між компонентами. При розробці професійних систем варто дотримуватися наступних правил:
   Локалізація стану: Намагайтеся тримати стан навігації в URL (через параметри або query-рядки), щоб користувач міг поділитися посиланням на конкретний стан екрана.
   Resilience (Стійкість): Завжди обробляйте стани завантаження та помилок, використовуючи Suspense або кастомні сторінки 404.
   Performance: Використовуйте React.lazy для сторінок, які рідко відвідуються, щоб зменшити початковий розмір додатку.
   Accessibility: Не забувайте про семантику HTML; компоненти Link під капотом рендерять теги <a>, що є критичним для скрінрідерів та SEO.

Вимоги до звіту
Звіт повинен бути оформлений у форматі Markdown (lab4.md) та містити:

1. Актуальне посилання на репозиторій з кодом.
2. Посилання на розгорнуту версію додатку (наприклад, на Vercel або GitHub Pages).
3. Текстовий опис реалізованої структури маршрутів із обґрунтуванням вибору вкладеності.
4. Фрагменти коду, що демонструють:
   −Конфігурацію Routes та BrowserRouter.
   −Реалізацію Layout із компонентом Outlet.
   −Логіку обробки параметрів через useParams.
   −Приклад програмної навігації через useNavigate.
   −Відповіді на контрольні запитання, наведені вище.
