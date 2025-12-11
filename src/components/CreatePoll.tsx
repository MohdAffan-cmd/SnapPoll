import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormOption, Poll } from '../types'
import { ONE_HOUR } from '../constants'
import { createOption } from '../utils'

const defaultOptions = [createOption('Option 1'), createOption('Option 2')]

export const CreatePoll = () => {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<FormOption[]>(defaultOptions)
  const [duration, setDuration] = useState<'1h' | '12h' | '24h'>('1h')
  const [hideResults, setHideResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const durationMs = useMemo(() => {
    if (duration === '1h') return ONE_HOUR
    if (duration === '12h') return ONE_HOUR * 12
    return ONE_HOUR * 24
  }, [duration])

  const handleAddOption = () => {
    setOptions((prev) => [...prev, createOption(`Option ${prev.length + 1}`)])
  }

  const handleDeleteOption = (id: string) => {
    setOptions((prev) => (prev.length <= 1 ? prev : prev.filter((o) => o.id !== id)))
  }

  const handleCreatePoll = () => {
    const trimmedQuestion = question.trim()
    const filledOptions = options
      .map((o) => ({ ...o, value: o.value.trim() }))
      .filter((o) => o.value.length > 0)

    if (!trimmedQuestion) {
      setError('Please enter a question.')
      return
    }

    if (filledOptions.length < 2) {
      setError('Add at least two options.')
      return
    }

    const newPoll: Poll = {
      id: crypto.randomUUID(),
      question: trimmedQuestion,
      options: filledOptions.map((o) => ({ id: o.id, label: o.value, votes: 0 })),
      expiresAt: Date.now() + durationMs,
      hideResults,
    }

    localStorage.setItem('currentPoll', JSON.stringify(newPoll))
    navigate('/poll')
  }

  return (
    <div className="page create-page">
      <button className="ghost back" onClick={() => navigate('/')} type="button">
        ← Back to home
      </button>
      <section className="card create-card">
        <div className="card-header">
          <div>
            <h2>Create a New Poll</h2>
            <p className="subtitle">
              Your poll will be accessible via a unique link and will expire automatically.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Question</span>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What do you want to ask?"
              rows={3}
            />
          </label>

          <div className="field">
            <span>Options</span>
            <div className="options">
              {options.map((opt, index) => (
                <div className="option-row" key={opt.id}>
                  <input
                    value={opt.value}
                    onChange={(e) =>
                      setOptions((prev) =>
                        prev.map((o) => (o.id === opt.id ? { ...o, value: e.target.value } : o))
                      )
                    }
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    className="ghost"
                    onClick={() => handleDeleteOption(opt.id)}
                    title="Delete option"
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button className="ghost add" type="button" onClick={handleAddOption}>
              + Add Option
            </button>
          </div>

          <div className="field">
            <span>Poll Duration</span>
            <div className="duration">
              {[
                { label: '1 hour', value: '1h' as const },
                { label: '12 hours', value: '12h' as const },
                { label: '24 hours', value: '24h' as const },
              ].map((item) => (
                <label key={item.value} className="radio-option">
                  <input
                    type="radio"
                    name="duration"
                    value={item.value}
                    checked={duration === item.value}
                    onChange={() => setDuration(item.value)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              checked={hideResults}
              onChange={(e) => setHideResults(e.target.checked)}
            />
            <span>Hide results until poll expires</span>
          </label>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button className="primary" onClick={handleCreatePoll}>
            Create Poll
          </button>
        </div>
      </section>
    </div>
  )
}

