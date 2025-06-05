import type { Vacancy } from '../types'

interface Props {
  vacancies: Vacancy[]
  onSelect: (vacancy: Vacancy) => void
}

export default function VacancyTable({ vacancies, onSelect }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Компания</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {vacancies.map(v => (
          <tr key={v.id} onClick={() => onSelect(v)}>
            <td>{v.title}</td>
            <td>{v.company}</td>
            <td>
              <span className={`status ${v.status || ''}`}>{v.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
