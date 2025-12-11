import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Poll, Comment } from '../types'
import { formatRemaining } from '../utils'

export const PollView = () => {
  const navigate = useNavigate()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const savedPoll = localStorage.getItem('currentPoll')
    if (savedPoll) {
      try {
        const parsedPoll = JSON.parse(savedPoll)
        setPoll(parsedPoll)
        const savedComments = localStorage.getItem(`comments-${parsedPoll.id}`)
        if (savedComments) {
          try {
            setComments(JSON.parse(savedComments))
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const isExpired = poll ? now >= poll.expiresAt : false
  const totalVotes = poll?.options.reduce((sum, opt) => sum + opt.votes, 0) ?? 0
  const showResults = poll ? (!poll.hideResults || isExpired) : false

  const handleVote = () => {
    if (!poll || !selectedOption || isExpired) return

    setPoll((prev) => {
      if (!prev) return prev
      const updated = {
        ...prev,
        options: prev.options.map((opt) =>
          opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
        ),
      }
      localStorage.setItem('currentPoll', JSON.stringify(updated))
      return updated
    })
    setHasVoted(true)
  }

  const handleCopyLink = () => {
    const pollUrl = `${window.location.origin}/poll`
    navigator.clipboard.writeText(pollUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePostComment = () => {
    if (!commentText.trim() || !poll) return

    const newComment: Comment = {
      id: crypto.randomUUID(),
      text: commentText.trim(),
      timestamp: Date.now(),
    }
    const updatedComments = [...comments, newComment]
    setComments(updatedComments)
    localStorage.setItem(`comments-${poll.id}`, JSON.stringify(updatedComments))
    setCommentText('')
  }

  if (!poll) {
    navigate('/')
    return null
  }

  const pollUrl = `${window.location.origin}/poll`

  return (
    <div className="page poll-page">
      <button className="ghost back" onClick={() => navigate('/')} type="button">
        ← Back to home
      </button>

      <div className="poll-content">
        <section className="card poll-view">
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

        <section className="card share-section">
          <h3>Share this poll</h3>
          <div className="share-input-group">
            <input type="text" value={pollUrl} readOnly className="share-input" />
            <button className="icon-btn copy-btn" onClick={handleCopyLink} type="button" title="Copy link">
              {copied ? '✓' : '📄'}
            </button>
          </div>
        </section>

        <section className="card comments-section">
          <div className="comments-header">
            <h3>Comments</h3>
            <span className="comment-count">{comments.length}</span>
          </div>

          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="comment-input-group">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add an anonymous comment..."
              rows={3}
              className="comment-textarea"
            />
            <button
              className="primary comment-btn"
              onClick={handlePostComment}
              disabled={!commentText.trim()}
              type="button"
            >
              💬 Post Comment
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

