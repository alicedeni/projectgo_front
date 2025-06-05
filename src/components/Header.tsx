import { Link, useLocation } from 'react-router-dom'

interface Props {
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
}

export default function Header({ theme, setTheme }: Props) {
  const location = useLocation()
  return (
    <header className="header">
      <span>💼 JobFinder</span>
      <nav>
        <Link
          to="/"
          style={{
            fontWeight: location.pathname === '/' ? 'bold' : undefined,
          }}>
          О приложении
        </Link>
        <Link
          to="/vacancies"
          style={{
            fontWeight: location.pathname === '/vacancies' ? 'bold' : undefined,
          }}>
          Вакансии
        </Link>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙 Тёмная' : '🌞 Светлая'}
        </button>
      </nav>
    </header>
  )
}
