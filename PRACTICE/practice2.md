# Практична робота №2

**Тема:** Трансформація масивів даних

**Мета:** Навчитися перетворювати "сирі" дані (масиви об'єктів) у React-компоненти, зрозуміти принцип роботи списків та ключів (keys), а також реалізувати базову бізнес-логіку (фільтрацію та агрегацію) на стороні клієнта.

**Необхідні інструменти:** Проєкт, створений на Практичному занятті №1 (Vite + React), VS Code.

---

## 1. Підготовка даних (Mock Data)

Створено файл `src/components/moleculas/data.js` зі статичним масивом студентів:

```js
export const students = [
  { id: 1, name: 'Олена Петрів', score: 95 },
  { id: 2, name: 'Іван Сидоренко', score: 88 },
  { id: 3, name: 'Марія Ковальчук', score: 92 },
  { id: 4, name: 'Андрій Шевченко', score: 75 },
  { id: 5, name: 'Юлія Бондаренко', score: 85 },
  { id: 6, name: 'Тетяна Ткаченко', score: 100 },
  { id: 7, name: 'Олександр Мельник', score: 60 },
  { id: 8, name: 'Дмитро Кравченко', score: 45 },
];
```

Масив містить 8 об'єктів з полями: `id` (унікальний ідентифікатор), `name` (ім'я студента), `score` (бал).

---

## 2. Рендеринг списку (Array.map)

Для відображення повного списку студентів створено компонент `List.jsx`:

```jsx
import { students } from './data.js';
import ListItem from '../atoms/ListItem.jsx';

function List() {
  return (
    <ol>
      {students.map((student) => (
        <ListItem key={student.id} student={student} />
      ))}
    </ol>
  );
}

export default List;
```

Кожен елемент масиву трансформується у JSX-компонент `<ListItem>` за допомогою метода `.map()`. Атрибут `key={student.id}` забезпечує унікальну ідентифікацію кожного елемента списку для оптимізації рендерингу React.

### Компонент ListItem (атом)

```jsx
function ListItem(props) {
  const {
    student: { name, score },
  } = props;

  return (
    <li>
      {name} - {score}
    </li>
  );
}

export default ListItem;
```

Компонент приймає об'єкт `student` через props та виводить ім'я і бал у форматі `"Ім'я - Бал"`.

### Використання в App.jsx

```jsx
import List from './components/moleculas/List';
// ...
<Heading level={2} title="Pz2: List" />
<List />
```

---

## 3. Фільтрація даних (Array.filter)

Для виведення студентів з балом >= 60 створено компонент `ListFiltered.jsx`:

```jsx
import { students } from './data.js';
import ListItem from '../atoms/ListItem.jsx';

function ListFiltered() {
  return (
    <ol>
      {students
        .filter((student) => student.score >= 60)
        .map((student) => (
          <ListItem key={student.id} student={student} />
        ))}
    </ol>
  );
}

export default ListFiltered;
```

Застосовано ланцюжок `.filter().map()`:
1. `.filter()` — відсіює студентів з балом менше 60 (Дмитро Кравченко — 45 балів не потрапляє до списку).
2. `.map()` — перетворює відфільтрований масив у JSX-елементи.

### Використання в App.jsx

```jsx
import ListFiltered from './components/moleculas/ListFiltered';
// ...
<Heading level={2} title="Pz2: ListFiltered" />
<ListFiltered />
```

---

## 4. Агрегація даних (Array.reduce)

Для обчислення середнього балу створено компонент `AverageScore.jsx`:

```jsx
import { students } from './data.js';
import Paragraph from '../atoms/Paragraph.jsx';

function AverageScore() {
  const averageScore =
    students.reduce((acc, student) => acc + student.score, 0) / students.length;

  return <Paragraph text={`Average Score: ${averageScore}`} />;
}

export default AverageScore;
```

Логіка обчислення:
- `.reduce()` підсумовує всі бали, починаючи з акумулятора `0`.
- Результат ділиться на кількість студентів (`students.length`).
- Для масиву `[95, 88, 92, 75, 85, 100, 60, 45]` середній бал = **(95+88+92+75+85+100+60+45) / 8 = 80**.

### Використання в App.jsx

```jsx
import AverageScore from './components/moleculas/AverageScore';
// ...
<Heading level={2} title="Pz2: AverageScore" />
<AverageScore />
```

---

## 5. Фіксація змін (Git)

Зміни зафіксовано в репозиторії. Поточна історія комітів:

```
4d2c3b4 (HEAD -> master) docs: workflow, migrating to Yarn
aeaf901 chore: update dependencies
fd8087e fix Post.jsx add id (key)
32018f8 Add Syllabus.md
```

Приклад робочого процесу з гілками:

```bash
git checkout -b pz2/data-transformations    # створення гілки
# ... створення data.js, List.jsx, ListFiltered.jsx, AverageScore.jsx ...
git add .
git commit -m "feat: add data transformations (map, filter, reduce)"
git checkout master
git merge pz2/data-transformations
git branch -d pz2/data-transformations      # видалення гілки
```

---

## 6. Структура створених файлів

```
src/components/
├── atoms/
│   └── ListItem.jsx         — атомарний компонент для одного рядка списку
└── moleculas/
    ├── data.js              — масив mock-даних (студенти)
    ├── List.jsx             — повний список студентів (.map)
    ├── ListFiltered.jsx     — відфільтрований список (.filter + .map)
    └── AverageScore.jsx     — середній бал (.reduce)
```

---

## 7. Контрольні запитання

**1. Чому при рендерингу масивів у React обов'язково використовувати атрибут key?**

Атрибут `key` допомагає React ідентифікувати, які елементи змінилися, були додані або видалені. Без `key` React не зможе ефективно оновлювати DOM, що призведе до зниження продуктивності та можливих помилок у відображенні стану компонентів. У консолі з'явиться попередження: *"Each child in a list should have a unique 'key' prop."*

**2. У чому різниця між .map() та .forEach()?**

- `.map()` повертає **новий масив** з результатами виконання функції для кожного елемента — саме цей масив React використовує для рендерингу.
- `.forEach()` нічого не повертає (`undefined`), тому його результат не можна вставити в JSX. Він призначений лише для побічних ефектів (side effects).

**3. Чому не рекомендується використовувати індекс масиву як ключ?**

Якщо список може змінюватися (сортування, фільтрація, додавання/видалення елементів), індекси зміщуються. React буде «думати», що змінились інші елементи, ніж насправді, що призведе до некоректного оновлення DOM та можливої втрати стану компонентів. У нашому проєкті використовується `student.id` як стабільний унікальний ключ.
