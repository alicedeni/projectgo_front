import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/job.png'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="app-container">
      <div className="hero">
        <img src={heroImg} alt="Поиск работы" className="hero-img" />
        <div className="hero-text">
          <h1>JobFinder — ваш помощник в поиске работы!</h1>
          <p>
            Храните интересные вакансии, следите за статусами откликов, делайте
            заметки, проходите тесты на сильные стороны и ищите новые
            предложения.
            <br />
            <br />
            Всё в одном приложении!
          </p>
          <button
            className="button-main"
            onClick={() => navigate('/vacancies')}>
            Перейти к поиску вакансий
          </button>
        </div>
      </div>
    </div>
  )
}
