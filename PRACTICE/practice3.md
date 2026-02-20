# Практична робота №3

**Тема:** Логіка умовного відображення

**Мета:** Навчитися створювати динамічні інтерфейси, які змінюють свій вигляд залежно від стану додатка; опанувати використання логічних операторів (&&), тернарних операторів та складніших конструкцій для реалізації табів (вкладок) та перемикачів.

**Необхідні інструменти:** Проєкт з Практичних занять №1–2 (Vite + React), VS Code.

---

## 1. Підготовка (Git branch)

Створено нову гілку для розробки:

```bash
git checkout -b feature/conditional-rendering
```

Усі зміни виконувались у цій гілці, після чого злиті в `master`.

---

## 2. Просте умовне відображення (Оператор &&)

Додано стан `showHelp` та кнопку для показу/приховання довідки:

```jsx
const [showHelp, setShowHelp] = useState(false);
```

```jsx
<Button onClick={() => setShowHelp(!showHelp)}>
  {showHelp ? 'Приховати інструкцію' : 'Показати інструкцію'}
</Button>
{showHelp && (
  <p>Довідка: Цей додаток дозволяє керувати списками студентів.</p>
)}
```

**Принцип роботи:** Якщо `showHelp === true`, React відрендерить праву частину виразу (елемент `<p>`). Якщо `showHelp === false`, весь вираз повертає `false`, і React нічого не виводить.

---

## 3. Тернарний оператор (Toggle)

Реалізовано у компоненті `StudentList.jsx` — перемикач режиму перегляду (повний список / тільки успішні студенти):

```jsx
const [filterActive, setFilterActive] = useState(false);

const filteredStudents = students.filter(
  (student) => (student.score ?? 0) >= 60
);
const displayedStudents = filterActive ? filteredStudents : students;
```

```jsx
<Button onClick={() => setFilterActive(!filterActive)}>
  {filterActive ? 'Показати всіх' : 'Показати тільки успішних'}
</Button>
```

Тернарний оператор вирішує, який масив відображати: `filterActive ? filteredStudents : students`.

### Кольорове позначення статусу

В компоненті `ListItem.jsx` додано кольоровий статус:

```jsx
<span style={{ color: score >= 60 ? 'green' : 'red' }}>
  {score >= 60 ? 'Зараховано' : 'Незараховано'}
</span>
```

- **Зелений** — бал ≥ 60 (зараховано).
- **Червоний** — бал < 60 (незараховано).

---

## 4. Реалізація інтерфейсу з табами

Створено систему табів з трьома вкладками:

```jsx
const [activeTab, setActiveTab] = useState('list');

const tabs = [
  { id: 'list', label: 'Всі студенти' },
  { id: 'stats', label: 'Статистика' },
  { id: 'about', label: 'Про автора' },
];
```

### Навігаційна панель з динамічними стилями

```jsx
{tabs.map((tab) => (
  <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={activeTab === tab.id ? 'active-tab' : ''}
    style={{
      backgroundColor: activeTab === tab.id ? '#007bff' : '#6c757d',
      fontWeight: activeTab === tab.id ? 'bold' : 'normal',
    }}
  >
    {tab.label}
  </button>
))}
```

Активна кнопка отримує CSS-клас `active-tab`, синій фон та жирний шрифт.

### Відображення контенту

```jsx
<div className="content">
  {activeTab === 'list' && <StudentList />}
  {activeTab === 'stats' && <StatisticsData />}
  {activeTab === 'about' && <AboutAuthor />}
</div>
```

### Компоненти табів

**StudentList.jsx** — список студентів з фільтром:
- Перемикач "Показати всіх" / "Показати тільки успішних"
- Порожній стан: "За вашим запитом нікого не знайдено"
- Захист від `null` через оператор `??`

**StatisticsData.jsx** — агрегована статистика:
- Всього студентів: 9
- Успішних (≥60): 7
- Середній бал: 71.1
- Найвищий: 100, Найнижчий: 0

**AboutAuthor.jsx** — інформація про проєкт.

---

## 5. Завдання для самостійного виконання (виконано)

### 5.1. Порожній стан (Empty State)

У `StudentList.jsx` реалізовано перевірку:

```jsx
{displayedStudents.length > 0 ? (
  <ol>
    {displayedStudents.map((student) => (
      <ListItem key={student.id} student={student} />
    ))}
  </ol>
) : (
  <p>За вашим запитом нікого не знайдено.</p>
)}
```

### 5.2. Динамічні класи

Активна кнопка таба отримує клас `active-tab` через тернарний оператор:

```jsx
className={activeTab === tab.id ? 'active-tab' : ''}
```

### 5.3. Захист від помилок (оператор ??)

У `ListItem.jsx` реалізовано обробку відсутнього поля `score`:

```jsx
const displayScore = score ?? 'Оцінка відсутня';
const hasScore = score != null;
```

Для демонстрації додано студента без оцінки у `data.js`:

```js
{
    id: 9,
    name: 'Наталія Гончаренко',
    // score відсутній — для демонстрації оператора ??
},
```

---

## 6. Фіксація змін (Git)

### Коміти

```
88e75ac feat: add tab components (StudentList, StatisticsData, AboutAuthor)
e1b31b6 feat: add null score handling (??) and color-coded status in ListItem
4c89b50 feat: add conditional rendering, showHelp toggle, and tab interface in App
```

### Злиття

```bash
git checkout master
git merge feature/conditional-rendering    # Fast-forward
git branch -d feature/conditional-rendering
```

---

## 7. Структура створених/змінених файлів

```
src/
├── App.jsx                                  — [ЗМІНЕНО] додано showHelp, tabs
├── components/
│   ├── atoms/
│   │   └── ListItem.jsx                     — [ЗМІНЕНО] ??, кольоровий статус
│   └── moleculas/
│       ├── data.js                          — [ЗМІНЕНО] додано студента без score
│       ├── StudentList.jsx                  — [НОВИЙ] список з фільтром + empty state
│       ├── StatisticsData.jsx               — [НОВИЙ] статистика (reduce)
│       └── AboutAuthor.jsx                  — [НОВИЙ] інформація про автора
```

---

## 8. Контрольні запитання

**1. Чому використання `if/else` безпосередньо всередині JSX призведе до помилки?**

JSX — це синтаксичний цукор для `React.createElement()`. Усередині JSX можна використовувати лише **вирази** (expressions), які повертають значення. `if/else` — це **інструкція** (statement), яка не повертає значення. Натомість використовують тернарний оператор або оператор `&&`.

**2. Яка небезпека використання числа `0` у лівій частині оператора `&&`?**

`0` є falsy-значенням, тому `0 && <Component />` поверне `0`, і React виведе на екран цифру `0` замість того, щоб нічого не показувати. Рішення: явно перетворити на boolean: `{count > 0 && <Component />}`.

**3. Як реалізувати умовний рендеринг при 5+ варіантах?**

Використати об'єкт-маппінг або `switch` у окремій функції:
```jsx
const tabContent = {
  list: <StudentList />,
  stats: <StatisticsData />,
  about: <AboutAuthor />,
};
return tabContent[activeTab] ?? null;
```

**4. В яких випадках тернарний оператор кращий за `&&`?**

Коли потрібно відобразити один із двох варіантів (взаємовиключні стани). Оператор `&&` підходить лише для випадку "показати або не показати".

**5. Як React розуміє, що потрібно перерендерити частину інтерфейсу при зміні вкладки?**

При виклику `setActiveTab()` React оновлює стан компонента. Це запускає процес reconciliation: React порівнює новий Virtual DOM з попереднім і оновлює лише ті частини реального DOM, які змінились.
