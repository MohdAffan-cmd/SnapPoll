import { features } from '../constants'

export const Features = () => (
  <section className="features" id="features">
    {features.map((item) => (
      <div className="feature-card" key={item.title}>
        <div className="feature-icon" aria-hidden>
          {item.icon}
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </section>
)

