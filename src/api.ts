import type { Vacancy } from './types'

const API = '/api/vacancies'

export async function fetchVacancies(query?: string): Promise<Vacancy[]> {
  const url = query ? `${API}?q=${encodeURIComponent(query)}` : API
  const res = await fetch(url)
  return res.json()
}

export async function addVacancy(vacancy: Vacancy): Promise<Vacancy> {
  // Не передавайте id при создании, сервер сам сгенерирует
  const { id, ...vac } = vacancy as any
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vac),
  })
  return res.json()
}

export async function updateVacancy(vacancy: Vacancy): Promise<Vacancy> {
  if (!vacancy.id) throw new Error('No id for vacancy')
  const res = await fetch(`${API}/${encodeURIComponent(vacancy.id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vacancy),
  })
  return res.json()
}

export async function deleteVacancy(id: string): Promise<void> {
  await fetch(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
