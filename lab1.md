# Лабораторна робота 1

## Звіт про виконання

### 1. Посилання на GitHub-репозиторій
[https://github.com/SurkovKostiantyn/kn22reactvite](https://github.com/SurkovKostiantyn/kn22reactvite)

### 2. Скріншоти
не потрібні

### 3. Код компонентів

**src/components/atoms/Input.jsx**
```javascript
function Input({ type, placeholder, label }) {
    return (
        <label>
            {label}
            <input type={type} placeholder={placeholder} />
        </label>
    )
}

export default Input;
```

**src/components/moleculas/Card.jsx**
```javascript
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styles from './Card.module.css';

function Card({ title, children, buttonLabel, buttonVariant, buttonOnClick, level }) {
    return (
        <div className={styles.card}>
            <Heading level={level} title={title} />
            {children}
            <Input
                type="text"
                placeholder="Enter your name"
                label="Name"
            />
            <Button
                children={buttonLabel}
                variant={buttonVariant}
                onClick={buttonOnClick}
            />
        </div>
    )
}

export default Card;
```

## Контрольні запитання

**1. Що таке Atomic Design і навіщо ми розділяємо компоненти на атоми та молекули?**
Atomic Design — це методологія створення дизайн-систем, яка базується на розбитті інтерфейсу на дрібні базові блоки.
- **Атоми** (Atoms): найпростіші елементи (кнопки, інпути, іконки).
- **Молекули** (Molecules): групи атомів, що працюють разом (поле вводу з лейблом, картка).
Поділ потрібен для створення гнучких, перевикористовуваних компонентів та легшого масштабування проєкту.

**2. Як працюють CSS Modules і як вони вирішують проблему глобальних імен класів?**
CSS Modules — це підхід, при якому класи CSS локалізуються для конкретного компонента. При збірці проєкту інструмент генерує унікальні імена класів, що унеможливлює конфлікти стилів.

**3. Що таке `props.children` і в якому компоненті цієї лабораторної роботи ми його використали?**
`props.children` — це спеціальний проп в React, який дозволяє передавати дочірні елементи всередину компонента-обгортки.
У цій роботі (в початковому варіанті) ми використовуємо `children` у компоненті `Card.jsx`, який рендерить передані йому дочірні елементи.

**4. Чому атрибут HTML `class` у JSX записується як `className`?**
JSX є синтаксичним цукром над JavaScript. Оскільки слово `class` є зарезервованим ключовим словом у JavaScript, React використовує атрибут `className` для визначення CSS-класів.
