import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingpage/landingPage'
import FeedPage from './pages/clientPages/FeedPage';
import RegisterClient from './pages/register/registerClient';
import LoginClient from './pages/login/loginClient';
import ProtectedRoutes from './middlewares/authentication';
import UserProfile from './pages/profile/UserProfile';
import JobPostForm from './pages/Job-posting/JobPostForm';
import LoginPartner from './pages/login/partnerLogin/loginPartner';
import RegisterPartner from './pages/register/partnerRegister/registerPartner';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/client/register' element={<RegisterClient />}></Route>
        <Route path='/partner/register' element={<RegisterPartner />}></Route>
        <Route path='/client/login' element={<LoginClient />}></Route>
        <Route path='/partner/login' element={<LoginPartner />}></Route>
        <Route path='/feed' element={<ProtectedRoutes><FeedPage /></ProtectedRoutes>}></Route>
        <Route path='/profile' element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>}></Route>
        <Route path='/post-job' element={<JobPostForm />}></Route>
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
