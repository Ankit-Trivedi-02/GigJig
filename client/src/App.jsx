import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingpage/landingPage'
import FeedPage from './pages/clientPages/FeedPage';
import RegisterClient from './pages/register/registerClient';
import LoginClient from './pages/login/loginClient';
import ProtectedRoutes from './middlewares/authentication';
import Profile from './pages/profile/clientProfile';
import UserProfile from './pages/profile/UserProfile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/jack' element={<UserProfile />}></Route>
        <Route path='/client/register' element={<RegisterClient />}></Route>
        <Route path='/client/login' element={<LoginClient />}></Route>
        <Route path='/feed' element={<ProtectedRoutes><FeedPage /></ProtectedRoutes>}></Route>
        <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
