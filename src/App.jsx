import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import Profile from './pages/Profile'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import MyList from './pages/MyList'
import About from './pages/About'
import Careers from './pages/Careers'
import Press from './pages/Press'
import HelpCenter from './pages/HelpCenter'
import ContactUs from './pages/ContactUs'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'
import LegalInfo from './pages/LegalInfo'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-secondary-dark' : 'bg-white'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/search" element={<SearchPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/movies" element={<Movies darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/tv-shows" element={<TVShows darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/my-list" element={<MyList darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/careers" element={<Careers darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/help-center" element={<HelpCenter darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/press" element={<Press darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/contact-us" element={<ContactUs darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/cookie-policy" element={<CookiePolicy darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/legal-info" element={<LegalInfo darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        className="!z-50"
        toastClassName="!bg-white dark:!bg-surface-800 !text-gray-900 dark:!text-white !border !border-gray-200 dark:!border-surface-700"
      />
    </div>
  )
}

export default App