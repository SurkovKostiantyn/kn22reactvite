# Практична робота №1

**Тема:** Налаштування оточення та робота з Git

**Мета:** Навчитися створювати сучасні React-додатки за допомогою Vite, налаштовувати інструменти контролю якості коду (ESLint, Prettier) та відпрацювати базовий робочий процес (workflow) з гілками в Git.

**Необхідні інструменти:** VS Code, Node.js, npm/yarn, Git.

---

## 1. Підготовка середовища (Node.js & npm)

### 1.1. Перевірка версій

Для перевірки наявності та версій Node.js і npm було виконано команди в терміналі:

```bash
node -v
# v22.20.0

npm -v
# 11.10.0
```

Версії — актуальні, LTS-версія Node.js встановлена.

### 1.2. Розуміння інструментарію

Для управління пакетами використовується yarn (встановлений глобально через `npm install -g yarn`). Також у проєкті наявний файл `yarn.lock`, що гарантує детерміновану установку залежностей.

У файлі `package.json` залежності поділені на дві категорії:

- **dependencies** (використовуються у продакшені):
  - `react` — ^19.2.0
  - `react-dom` — ^19.2.0

- **devDependencies** (використовуються лише під час розробки):
  - `vite` — ^8.0.0-beta.13
  - `eslint` — ^9.39.1
  - `prettier` — ^3.8.1
  - `@vitejs/plugin-react` — ^5.1.1
  - `babel-plugin-react-compiler` — ^1.0.0
  - `eslint-config-prettier` — ^10.1.8
  - та інші плагіни для ESLint

---

## 2. Створення React-проєкту через Vite

### 2.1. Ініціалізація

Проєкт створено за допомогою Vite з шаблоном React:

```bash
npm create vite@latest kn22reactvite -- --template react
```

Vite обрано замість застарілого Create React App, оскільки він використовує Native ESM, що забезпечує миттєвий запуск dev-сервера без попередньої збірки бандлу.

### 2.2. Конфігурація Vite

Файл `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/kn22reactvite/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
```

- `base: '/kn22reactvite/'` — задає базовий шлях для деплою на GitHub Pages.
- `babel-plugin-react-compiler` — увімкнено експериментальний React Compiler.

### 2.3. Запуск

```bash
yarn install
yarn dev
```

Результат:

```
VITE v8.0.0-beta.14  ready in 532 ms
➜  Local:   http://localhost:5173/kn22reactvite/
```

---

## 3. Налаштування якості коду (ESLint + Prettier)

### 3.1. Prettier

Prettier встановлено як dev-залежність:

```bash
npm install --save-dev prettier
```

Конфігурація у файлі `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

Скрипт для форматування додано до `package.json`:

```json
"scripts": {
  "format": "prettier --write ."
}
```

### 3.2. ESLint

ESLint налаштовано у файлі `eslint.config.js` (flat config формат):

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  eslintConfigPrettier,
];
```

Ключові моменти:

- Використано **flat config** формат (сучасний підхід ESLint v9+).
- `eslint-config-prettier` додано в кінець масиву, щоб вимкнути правила ESLint, які конфліктують з Prettier.
- Плагіни `react-hooks` та `react-refresh` забезпечують правильну роботу з хуками та HMR.

### 3.3. Перевірка

```bash
npm run lint    # запуск ESLint
npm run format  # форматування коду через Prettier
```

---

## 4. Робота з Git та гілками

### 4.1. Ініціалізація репозиторію

Проєкт ініціалізовано як Git-репозиторій та підключено до GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Vite + React setup"
```

### 4.2. Файл .gitignore

Файл `.gitignore` налаштовано для виключення непотрібних файлів:

```
# Логи
logs
*.log
npm-debug.log*
yarn-debug.log*

# Залежності та збірка
package-lock.json
node_modules
dist
dist-ssr
*.local

# Файли редактора
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
```

### 4.3. Історія комітів

Поточна історія комітів проєкту:

```
4d2c3b4 (HEAD -> master) docs: workflow, migrating to Yarn
aeaf901 chore: update dependencies
fd8087e fix Post.jsx add id (key)
32018f8 Add Syllabus.md
5fe7a78 readme.md
c13fb3f Add Git instructions and update README
b121779 readme.md
```

Основна гілка — `master`.

### 4.4. Гілкування (Branching Workflow)

Приклад створення feature-гілки:

```bash
git checkout -b feature/header-update   # створення нової гілки
# ... внесення змін ...
git add .
git commit -m "Update homepage header text"
git checkout master                      # повернення до основної гілки
git merge feature/header-update          # злиття змін
git branch -d feature/header-update      # видалення гілки
```

---

## 5. Завдання для самостійного виконання (виконано)

### 5.1. Очистка проєкту

Зайві файли, згенеровані Vite (дефолтні стилі, логотипи), видалено. Проєкт містить чисту структуру:

```
src/
├── App.jsx
├── main.jsx
└── components/
    ├── atoms/       (7 файлів)
    ├── moleculas/   (9 файлів)
    ├── organisms/   (1 файл)
    └── pages/       (1 файл)
```

### 5.2. Створення компонентів

У папці `src/components` створено компоненти за архітектурним патерном **Atomic Design**:

- **atoms/** — базові елементи: `Heading`, `Button`, `Paragraph` та інші.
- **moleculas/** — складніші блоки: `Card`, `Post`, `List`, `SearchBar`, `AverageScore` та інші.
- **organisms/** — `Header` — шапка сторінки.
- **pages/** — сторінки додатку.

### 5.3. Імпорт та використання

У `App.jsx` всі компоненти коректно імпортовані та використані:

```jsx
import Header from './components/organisms/Header';
import Card from './components/moleculas/Card';
import Post from './components/moleculas/Post';
// ... та інші
```

---

## 6. Контрольні запитання

**1. Чому ми використовуємо Vite замість Create React App?**

Vite використовує Native ESM, що дозволяє браузеру запитувати модулі по мірі необхідності без попередньої збірки повного бандлу. Це забезпечує миттєвий старт dev-сервера та швидке оновлення через HMR (Hot Module Replacement).

**2. Яка різниця між dependencies та devDependencies у package.json?**

- `dependencies` — пакети, необхідні для роботи додатку в продакшені (React, React DOM).
- `devDependencies` — пакети, потрібні лише під час розробки (Vite, ESLint, Prettier).

**3. Для чого потрібен файл .gitignore і що туди обов'язково треба додати?**

`.gitignore` визначає файли та директорії, які Git не повинен відстежувати. Обов'язково додати: `node_modules/`, `dist/`, файли логів (`*.log`), та файли конфігурації редактора (`.vscode/`, `.idea/`).
