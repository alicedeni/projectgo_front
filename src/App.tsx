import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import VacancySearchPage from './pages/VacancySearchPage'
import QuizPage from './pages/QuizPage'
import './theme.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vacancies" element={<VacancySearchPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  )
}

export default App
