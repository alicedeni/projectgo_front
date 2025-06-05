import type { Vacancy } from '../types'

interface Props {
  vacancy: Vacancy
  onClose: () => void
  onRespond: () => void
  onEdit: () => void
}

export default function VacancyDetailsModal({
  vacancy,
  onClose,
  onRespond,
  onEdit,
}: Props) {
  if (!vacancy) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{vacancy.title}</h2>
        <p>
          <b>Компания:</b> {vacancy.company}
        </p>
        <p>
          <b>Статус:</b>{' '}
          <span className={`status ${vacancy.status || ''}`}>
            {vacancy.status}
          </span>
        </p>
        <p>
          <b>Опыт:</b> {vacancy.experienceLevel}
        </p>
        <p>
          <b>Ключевые слова:</b> {vacancy.keywords.join(', ')}
        </p>
        {vacancy.sourceURL && (
          <p>
            <b>Источник:</b>{' '}
            <a
              href={vacancy.sourceURL}
              target="_blank"
              rel="noopener noreferrer">
              {vacancy.sourceURL}
            </a>
          </p>
        )}
        <p>
          <b>Описание:</b> {vacancy.description}
        </p>
        <p>
          <b>Заметки:</b> {vacancy.notes}
        </p>
        <button onClick={onRespond}>Откликнуться</button>
        <button onClick={onEdit}>Редактировать</button>
      </div>
    </div>
  )
}
