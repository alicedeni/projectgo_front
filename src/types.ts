export interface Vacancy {
  id: string
  title: string
  company: string
  description: string
  keywords: string[]
  sourceURL?: string
  status?: string
  experienceLevel?: string
  notes?: string
  resumePath?: string
  resumeFileName?: string
}
