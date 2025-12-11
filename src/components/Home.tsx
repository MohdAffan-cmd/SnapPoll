import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Features } from './Features'
import type { Poll } from '../types'
import { formatRemaining } from '../utils'

export const Home = () => {
  const [poll, setPoll] = useState<Poll | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const isExpired = poll ? now >= poll.expiresAt : false

  const handleVote = () => {
    if (!poll || !selectedOption || isExpired) return

    setPoll((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        options: prev.options.map((opt) =>
          opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
        ),
      }
    })
    setHasVoted(true)
  }

  const totalVotes = poll?.options.reduce((sum, opt) => sum + opt.votes, 0) ?? 0
  const showResults = poll ? (!poll.hideResults || isExpired) : false

  useEffect(() => {
    const savedPoll = localStorage.getItem('currentPoll')
    if (savedPoll) {
      try {
        setPoll(JSON.parse(savedPoll))
      } catch (e) {
        // ignore
      }
    }
  }, [])

  if (poll) {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <section className="card poll-view">
            <button className="ghost back" onClick={() => setPoll(null)} type="button">
              ← Back to home
            </button>
            <p className="eyebrow">Poll</p>
            <h2>{poll.question}</h2>

            <div className="meta">
              <span className={`pill ${isExpired ? 'expired' : ''}`}>
                {isExpired ? 'Expired' : `Expires in ${formatRemaining(poll.expiresAt, now)}`}
              </span>
              {poll.hideResults && !isExpired && <span className="pill muted">Results hidden</span>}
            </div>

            <div className="options-stack">
              {poll.options.map((opt) => (
                <label
                  key={opt.id}
                  className={`vote-row ${
                    selectedOption === opt.id ? 'selected' : ''
                  } ${hasVoted ? 'locked' : ''}`}
                >
                  <input
                    type="radio"
                    name="vote"
                    value={opt.id}
                    disabled={hasVoted || isExpired}
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                  />
                  <div className="vote-label">
                    <span>{opt.label}</span>
                    {showResults && (
                      <span className="percent">
                        {totalVotes === 0 ? '0%' : `${Math.round((opt.votes / totalVotes) * 100)}%`}
                      </span>
                    )}
                  </div>
                  {showResults && (
                    <div className="bar">
                      <div
                        className="fill"
                        style={{
                          width: totalVotes === 0 ? '0%' : `${(opt.votes / totalVotes) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </label>
              ))}
            </div>

            <div className="actions">
              <button
                className="primary"
                onClick={handleVote}
                disabled={!selectedOption || hasVoted || isExpired}
              >
                {isExpired ? 'Poll expired' : hasVoted ? 'Vote submitted' : 'Vote'}
              </button>
              <div className="totals">
                <span>{totalVotes} total votes</span>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

