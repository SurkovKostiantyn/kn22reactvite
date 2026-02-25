# React Router

## Встановлення

```bash
yarn add react-router-dom
```

## Використання

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Lab1 from './components/pages/Lab1';
import Lab2 from './components/pages/Lab2';
import Lab3 from './components/pages/Lab3';
import Practice2 from './components/pages/Practice2';
import Practice3 from './components/pages/Practice3';
import Practice4 from './components/pages/Practice4';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab1" element={<Lab1 />} />
        <Route path="/lab2" element={<Lab2 />} />
        <Route path="/lab3" element={<Lab3 />} />
        <Route path="/practice2" element={<Practice2 />} />
        <Route path="/practice3" element={<Practice3 />} />
        <Route path="/practice4" element={<Practice4 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Динамічні маршрути

```jsx
import { Routes, Route, useParams } from 'react-router-dom';
import Lab3 from './components/pages/Lab3';
import Lab3Post from './components/pages/Lab3Post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lab3 />} />
      <Route path="/post/:postId" element={<Lab3Post />} />
    </Routes>
  );
}

export default App;
```

## Програмна навігація

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/lab1');
  };

  return <button onClick={handleClick}>Перейти на Lab 1</button>;
}
```

## Вкладені маршрути

```jsx
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout';
import Home from './components/pages/Home';
import Lab1 from './components/pages/Lab1';
import Lab2 from './components/pages/Lab2';
import Lab3 from './components/pages/Lab3';
import Practice2 from './components/pages/Practice2';
import Practice3 from './components/pages/Practice3';
import Practice4 from './components/pages/Practice4';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lab1" element={<Lab1 />} />
        <Route path="lab2" element={<Lab2 />} />
        <Route path="lab3" element={<Lab3 />} />
        <Route path="practice2" element={<Practice2 />} />
        <Route path="practice3" element={<Practice3 />} />
        <Route path="practice4" element={<Practice4 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

## Посилання

- [React Router](https://reactrouter.com/)
- [React Router v6](https://reactrouter.com/en/main)
