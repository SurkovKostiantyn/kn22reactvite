import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Lab1 from './components/pages/Lab1/Lab1';
import Lab2 from './components/pages/Lab2/Lab2';
import Feed from './components/pages/Feed/Feed';
import Lab3 from './components/pages/Lab3/Lab3';
import Lab3Post from './components/pages/Lab3/Lab3Post';
import Lab4 from './components/pages/Lab4/Lab4';
import Lab5 from './components/pages/Lab5/Lab5';
import Practice2 from './components/pages/Practice2/Practice2';
import Practice3 from './components/pages/Practice3/Practice3';
import Practice4 from './components/pages/Practice4/Practice4';
import NotFound from './components/pages/NotFound/NotFound';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Profile from './components/pages/Profile/Profile';
import ProtectedRoute from './components/hoc/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="feed" element={<Feed />} />
        <Route path="lab1" element={<Lab1 />} />
        <Route path="lab2" element={<Lab2 />} />
        <Route path="lab3" element={<Lab3 />} />
        <Route path="lab3/:postId" element={<Lab3Post />} />
        <Route path="lab4" element={<Lab4 />} />
        <Route path="lab5" element={<Lab5 />} />
        <Route path="practice2" element={<Practice2 />} />
        <Route path="practice3" element={<Practice3 />} />
        <Route path="practice4" element={<Practice4 />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Захищений маршрут */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile/*" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
