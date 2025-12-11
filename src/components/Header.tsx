import { useTheme } from '../ThemeContext'

export const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">SnapPoll</div>
        <div className="header-icons">
          <button
            className="icon-btn"
            aria-label="Theme toggle"
            type="button"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button className="icon-btn" aria-label="Settings" type="button">
            ⭐
          </button>
        </div>
      </div>
    </header>
  )
}

