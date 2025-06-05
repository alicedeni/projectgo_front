import { useEffect, useState } from 'react'
import type { Vacancy } from '../types'
import {
  fetchVacancies,
  addVacancy,
  updateVacancy,
  deleteVacancy,
} from '../api'
import VacancyTable from '../components/VacancyTable'
import VacancyForm from '../components/VacancyForm'
import VacancyDetailsModal from '../components/VacancyDetailsModal'
import { useNavigate } from 'react-router-dom'

const STATUS_RESPONDED = 'Откликнулся'
const experienceLevels = [
  'Не указан',
  'Без опыта',
  'Менее 1 года',
  '1-3 года',
  '3-6 лет',
  'Более 6 лет',
]
const statuses = [
  'Новая',
  'Планирую откликнуться',
  'Откликнулся',
  'Тестовое задание',
  'Собеседование',
  'Оффер',
  'Отказ',
  'В архиве',
]

export default function VacancySearchPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [selected, setSelected] = useState<Vacancy | null>(null)
  const [editing, setEditing] = useState(false)
  const [expFilter, setExpFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchField, setSearchField] = useState<
    | 'title'
    | 'company'
    | 'keywords'
    | 'all'
    | 'description'
    | 'status'
    | 'experienceLevel'
  >('all')

  // Счётчик для сброса формы
  const [formResetCounter, setFormResetCounter] = useState(0)

  useEffect(() => {
    fetchVacancies().then(setVacancies)
  }, [])

  const filtered = vacancies.filter(v => {
    const q = search.trim().toLowerCase()
    let ok = true
    if (searchField === 'all' && q)
      ok =
        v.title.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.keywords.join(',').toLowerCase().includes(q) ||
        (v.description || '').toLowerCase().includes(q)
    if (searchField === 'title' && q) ok = v.title.toLowerCase().includes(q)
    if (searchField === 'company' && q) ok = v.company.toLowerCase().includes(q)
    if (searchField === 'keywords' && q)
      ok = v.keywords.join(',').toLowerCase().includes(q)
    if (searchField === 'description' && q)
      ok = (v.description || '').toLowerCase().includes(q)
    if (searchField === 'status' && statusFilter) ok = v.status === statusFilter
    if (searchField === 'experienceLevel' && expFilter)
      ok = v.experienceLevel === expFilter
    return ok
  })

  const handleRespond = async () => {
    if (!selected) return
    const updated = { ...selected, status: STATUS_RESPONDED }
    await updateVacancy(updated)
    setVacancies(vacancies.map(v => (v.id === updated.id ? updated : v)))
    setSelected(updated)
  }

  const handleSave = async (vacancy: Vacancy) => {
    if (editing && selected) {
      await updateVacancy(vacancy)
      setVacancies(vacancies.map(v => (v.id === vacancy.id ? vacancy : v)))
      setSelected(vacancy)
    } else {
      const newVac = await addVacancy(vacancy)
      setVacancies([...vacancies, newVac])
    }
    setEditing(false)
    setSelected(null)
    setFormResetCounter(c => c + 1) // триггерим сброс формы
  }

  const handleDelete = async () => {
    if (!selected) return
    if (
      window.confirm(
        `Удалить вакансию "${selected.title}" в компании "${selected.company}"?`,
      )
    ) {
      await deleteVacancy(selected.id)
      setVacancies(vacancies.filter(v => v.id !== selected.id))
      setSelected(null)
      setEditing(false)
    }
  }

  return (
    <div className="app-container">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <select
          value={searchField}
          onChange={e => setSearchField(e.target.value as any)}>
          <option value="all">Везде</option>
          <option value="title">По названию</option>
          <option value="company">По компании</option>
          <option value="keywords">По ключевым словам</option>
          <option value="description">По описанию</option>
          <option value="status">По статусу</option>
          <option value="experienceLevel">По опыту</option>
        </select>
        {searchField === 'status' ? (
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}>
            <option value="">Все статусы</option>
            {statuses.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : searchField === 'experienceLevel' ? (
          <select
            value={expFilter}
            onChange={e => setExpFilter(e.target.value)}>
            <option value="">Любой опыт</option>
            {experienceLevels.map(e => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        ) : (
          <input
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
        )}
      </div>
      <div className="table-container">
        <VacancyTable
          vacancies={filtered}
          onSelect={v => {
            setSelected(v)
            setEditing(false)
          }}
        />
      </div>
      {selected && !editing && (
        <VacancyDetailsModal
          vacancy={selected}
          onClose={() => setSelected(null)}
          onRespond={handleRespond}
          onEdit={() => setEditing(true)}
        />
      )}
      {(editing || !selected) && (
        <VacancyForm
          initial={editing ? selected || undefined : undefined}
          onSubmit={handleSave}
          resetTrigger={formResetCounter}
        />
      )}
      {selected && !editing && (
        <button className="danger" onClick={handleDelete}>
          Удалить
        </button>
      )}
      <button className="notfound-btn" onClick={() => navigate('/quiz')}>
        Не нашли подходящую вакансию? Пройдите тест на ваши сильные стороны!
      </button>
    </div>
  )
}
