# Практична робота №4

**Тема:** Валідація введених даних

**Мета:** Навчитися працювати з формами в React, опанувати концепцію керованих компонентів (controlled components) та реалізувати кастомну логіку валідації без використання сторонніх бібліотек для глибокого розуміння процесів обробки даних.

**Необхідні інструменти:** Проєкт, розроблений на попередніх заняттях (Vite + React), редактор коду (VS Code).

---

## 1. Підготовка (Git branch)

Створено нову гілку для роботи з формами:

```bash
git checkout -b feature/form-validation
```

Усі подальші зміни щодо форм та валідації виконувались у цій гілці.

---

## 2. Керовані компоненти (Controlled Components)

Було створено новий компонент `AddStudentForm.jsx` для реалізації керованої форми. Стан форми (значення полів "Ім'я" та "Бал") зберігається у `formData` за допомогою хука `useState`:

```jsx
const [formData, setFormData] = useState({ name: '', score: '' });
```

Значення `value` в `Input` прив'язано до стану:

```jsx
<Input
  label="Прізвище та ім'я:"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Введіть ПІБ"
/>
```

---

## 3. Валідація в реальному часі

Для перевірки даних перед збереженням реалізовано:

- Стан для збереження помилок (`const [errors, setErrors] = useState({});`)
- Функцію валідації `validate(values)`, що повертає об'єкт з помилками:

```jsx
const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Ім'я є обов'язковим для заповнення";
  } else if (values.name.trim().length < 2) {
    errors.name = "Ім'я повинно містити принаймні 2 символи";
  }
  if (values.score === '') {
    errors.score = 'Будь ласка, введіть бал';
  } else if (
    isNaN(values.score) ||
    Number(values.score) < 0 ||
    Number(values.score) > 100
  ) {
    errors.score = 'Бал повинен бути числом від 0 до 100';
  }
  return errors;
};
```

Помилки виводяться під відповідними інпутами, якщо вони існують, використовуючи умовний рендеринг:

```jsx
{
  errors.name && <p style={{ color: 'red' }}>{errors.name}</p>;
}
```

---

## 4. Обробка відправки форми

При відправці форми до тегу `<form>` додано обробник `onSubmit`:

```jsx
<form onSubmit={handleSubmit} ...>
```

У функції `handleSubmit` викликано `e.preventDefault()`, щоб запобігти перезавантаженню сторінки. Якщо дані валідні, викликається функція `onAddStudent()`, передана через пропси від батьківського компонента (`StudentList`), після чого форма очищається:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate(formData);

  if (Object.keys(validationErrors).length === 0) {
    onAddStudent({
      id: Date.now(),
      name: formData.name.trim(),
      score: formData.score !== '' ? Number(formData.score) : null,
    });
    setFormData({ name: '', score: '' });
    setErrors({});
  } else {
    setErrors(validationErrors);
  }
};
```

Додано стан `studentsList` у компонент `StudentList` та відповідну логіку для оновлення масиву студентів при додаванні нового.

---

## 5. Завдання для самостійного виконання

### 5.1. Блокування кнопки

Кнопку "Додати студента" зроблено неактивною (`disabled`), якщо форма містить помилки або обов'язкові поля не заповнені:

```jsx
const hasErrors = Object.keys(validate(formData)).length > 0;
const isFormEmpty = !formData.name.trim() || formData.score === '';
const isButtonDisabled = hasErrors || isFormEmpty;

<Button type="submit" disabled={isButtonDisabled}>
  Додати студента
</Button>;
```

### 5.2. Типізація вводу

Для поля "Бал студента" було використано `type="number"` (вже передбачено можливостями компонента `<Input>`). Також додано перевірку на стороні JS, щоб переконатися, що бал не перевищує 100 і не є меншим за 0.

---

## 6. Фіксація змін (Git)

Зміни було зафіксовано, створено коміт та інтегровано в основну гілку:

```bash
git add .
git commit -m "feat: implement student form with validation"
git checkout master
git merge feature/form-validation
```

---

## 7. Контрольні запитання

**1. У чому головна різниця між керованими (controlled) та некерованими (uncontrolled) компонентами?**
Керовані компоненти зберігають свій стан в `state` React і оновлюються через `setState` при кожній зміні (користувач вводить дані -> стан оновлюється -> `input` отримує нове значення $value). У некерованих компонентів джерелом істини є сам DOM, а дані з нього витягуються за допомогою `ref`.

**2. Навіщо використовувати `useRef` при роботі з формами і в яких випадках це виправдано?**
`useRef` дає можливість отримати доступ безпосередньо до DOM-елемента. Використовувати `useRef` виправдано, якщо нам потрібно зробити некерований компонент (наприклад, читати дані лише при подіях `submit`), для фокусування на `input`, виклику специфічних DOM API (наприклад, відео чи аудіо) або для інтеграції зі сторонніми DOM-бібліотеками, які не використовують React.

**3. Чому важливо викликати `event.preventDefault()` при обробці події submit?**
Цей метод запобігає поведінці браузера за замовчуванням при відправці форми, яке полягає в здійсненні POST/GET запиту і перезавантаженні поточної сторінки. У React-застосунках, як правило, використовується модель SPA (Single Page Application), де переривання та перезавантаження ламають користувацький досвід та очищають поточний стан всього застосунку.
