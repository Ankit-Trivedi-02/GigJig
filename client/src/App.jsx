import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingpage/landingPage'
import FeedPage from './pages/clientPages/FeedPage';
import RegisterClient from './pages/register/registerClient';
import LoginClient from './pages/login/loginClient';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/client/register' element={<RegisterClient />}></Route>
        <Route path='/client/login' element={<LoginClient />}></Route>
        <Route path='/feed' element={<FeedPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
