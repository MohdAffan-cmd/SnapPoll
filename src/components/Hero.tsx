import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <p className="eyebrow">Anonymous &amp; Time-limited</p>
      <h1>
        Create anonymous polls that <span>disappear</span> after a set time
      </h1>
      <p className="subtitle">
        No login required. Share with a unique link. Results vanish when time&apos;s up.
      </p>
      <button className="primary hero-cta" onClick={() => navigate('/create')}>
        Create a Poll <span className="arrow">→</span>
      </button>
    </section>
  )
}

