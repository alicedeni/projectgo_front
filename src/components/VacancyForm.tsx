import { useState, useEffect } from 'react'
import type { Vacancy } from '../types'

const STATUS_OPTIONS = [
  'Новая',
  'Планирую откликнуться',
  'Откликнулся',
  'Тестовое задание',
  'Собеседование',
  'Оффер',
  'Отказ',
  'Архив',
]

const EXPERIENCE_OPTIONS = [
  'Не указан',
  'Без опыта',
  'Менее 1 года',
  '1-3 года',
  '3-6 лет',
  'Более 6 лет',
]

interface Props {
  onSubmit: (vacancy: Vacancy) => void
  initial?: Vacancy
  resetTrigger?: any
}

export default function VacancyForm({
  onSubmit,
  initial,
  resetTrigger,
}: Props) {
  const [vacancy, setVacancy] = useState<Vacancy>(
    initial || {
      id: '',
      title: '',
      company: '',
      description: '',
      keywords: [],
      status: '',
      experienceLevel: '',
      notes: '',
    },
  )

  useEffect(() => {
    setVacancy(
      initial || {
        id: '',
        title: '',
        company: '',
        description: '',
        keywords: [],
        status: '',
        experienceLevel: '',
        notes: '',
      },
    )
  }, [initial, resetTrigger])

  return (
    <form
      className="vacancy-form"
      onSubmit={e => {
        e.preventDefault()
        onSubmit({ ...vacancy, keywords: vacancy.keywords.filter(Boolean) })
      }}>
      <label>
        Название
        <input
          placeholder="Название"
          value={vacancy.title}
          onChange={e => setVacancy({ ...vacancy, title: e.target.value })}
          required
        />
      </label>
      <label>
        Компания
        <input
          placeholder="Компания"
          value={vacancy.company}
          onChange={e => setVacancy({ ...vacancy, company: e.target.value })}
          required
        />
      </label>
      <label>
        Ключевые слова (через запятую)
        <input
          placeholder="Ключевые слова"
          value={vacancy.keywords.join(', ')}
          onChange={e =>
            setVacancy({
              ...vacancy,
              keywords: e.target.value.split(',').map(s => s.trim()),
            })
          }
        />
      </label>
      <label>
        Статус
        <select
          value={vacancy.status}
          onChange={e => setVacancy({ ...vacancy, status: e.target.value })}>
          <option value="">Выберите статус</option>
          {STATUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        Опыт
        <select
          value={vacancy.experienceLevel}
          onChange={e =>
            setVacancy({ ...vacancy, experienceLevel: e.target.value })
          }>
          <option value="">Выберите опыт</option>
          {EXPERIENCE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        Описание
        <textarea
          placeholder="Описание"
          value={vacancy.description}
          onChange={e =>
            setVacancy({ ...vacancy, description: e.target.value })
          }
        />
      </label>
      <label>
        Заметки
        <textarea
          placeholder="Заметки"
          value={vacancy.notes}
          onChange={e => setVacancy({ ...vacancy, notes: e.target.value })}
        />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  )
}
