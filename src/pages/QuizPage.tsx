import { useState } from 'react'

type QuizQuestion = {
  question: string
  options: { text: string; trait: string }[]
}

const questions: QuizQuestion[] = [
  {
    question: 'Что для вас важнее всего в работе?',
    options: [
      {
        text: 'Возможность креативить и придумывать новое',
        trait: 'Креативность',
      },
      { text: 'Чёткие задачи и понятные процессы', trait: 'Структурность' },
      { text: 'Работа в команде и общение', trait: 'Коммуникабельность' },
      { text: 'Самостоятельность и свобода', trait: 'Самостоятельность' },
    ],
  },
  {
    question: 'Как вы решаете сложные задачи?',
    options: [
      {
        text: 'Долго анализирую и ищу оптимальное решение',
        trait: 'Аналитика',
      },
      { text: 'Экспериментирую и не боюсь ошибок', trait: 'Гибкость' },
      { text: 'Советуюсь с коллегами', trait: 'Командность' },
      { text: 'Беру ответственность и действую', trait: 'Лидерство' },
    ],
  },
  {
    question: 'Что вам больше по душе?',
    options: [
      { text: 'Работать с людьми', trait: 'Коммуникабельность' },
      { text: 'Работать с данными и цифрами', trait: 'Аналитика' },
      { text: 'Создавать что-то новое', trait: 'Креативность' },
      { text: 'Оптимизировать процессы', trait: 'Структурность' },
    ],
  },
  {
    question: 'Как вы предпочитаете работать?',
    options: [
      { text: 'В команде', trait: 'Командность' },
      { text: 'Один, самостоятельно', trait: 'Самостоятельность' },
      { text: 'Руководить процессом', trait: 'Лидерство' },
      { text: 'В разных ролях', trait: 'Гибкость' },
    ],
  },
]

const traitDescriptions: Record<string, string> = {
  Креативность:
    'Вы — генератор идей! Вам подходят профессии, где важны новые подходы, дизайн, творчество, маркетинг.',
  Структурность:
    'Вы любите порядок и чёткие процессы. Вам подойдут аналитика, управление проектами, бухгалтерия.',
  Коммуникабельность:
    'Вы отлично ладите с людьми. Вам подойдут HR, продажи, обучение, командная работа.',
  Самостоятельность:
    'Вы цените свободу и умеете работать автономно. Вам подойдут фриланс, консалтинг, удалёнка.',
  Аналитика:
    'Вы сильны в анализе данных и поиске закономерностей. Вам подойдут Data Science, финансы, аудит.',
  Гибкость:
    'Вы легко адаптируетесь. Вам подойдут стартапы, продуктовые команды, роли с разными задачами.',
  Командность:
    'Ваша сила — работа в коллективе. Вам подойдут проекты, где важна синергия.',
  Лидерство:
    'Вы готовы брать ответственность и вести за собой. Вам подойдут руководящие позиции.',
}

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleOption = (trait: string) => {
    setAnswers([...answers, trait])
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  const restart = () => {
    setStep(0)
    setAnswers([])
    setShowResult(false)
  }

  const getResult = () => {
    if (!answers.length) return ''
    const freq: Record<string, number> = {}
    answers.forEach(trait => {
      freq[trait] = (freq[trait] || 0) + 1
    })
    const max = Math.max(...Object.values(freq))
    const mainTrait =
      Object.keys(freq).find(trait => freq[trait] === max) || answers[0]
    return mainTrait
  }

  const mainTrait = getResult()

  return (
    <div className="app-container">
      <div className="quiz-card">
        {!showResult ? (
          <>
            <div className="quiz-question">{questions[step].question}</div>
            <div className="quiz-options">
              {questions[step].options.map(opt => (
                <button
                  key={opt.text}
                  className="quiz-option-btn"
                  onClick={() => handleOption(opt.trait)}>
                  {opt.text}
                </button>
              ))}
            </div>
            <div style={{ color: '#888', fontSize: '0.98rem' }}>
              Вопрос {step + 1} из {questions.length}
            </div>
          </>
        ) : (
          <>
            <div className="quiz-result">
              <div>
                Ваша сильная сторона: <b>{mainTrait}</b>
              </div>
              <div style={{ marginTop: 18, color: '#666', fontWeight: 400 }}>
                {traitDescriptions[mainTrait]}
              </div>
            </div>
            <button className="quiz-restart-btn" onClick={restart}>
              Пройти ещё раз
            </button>
          </>
        )}
      </div>
    </div>
  )
}
