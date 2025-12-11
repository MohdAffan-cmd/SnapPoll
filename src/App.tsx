import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { CreatePoll } from './components/CreatePoll'
import { PollView } from './components/PollView'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePoll />} />
      <Route path="/poll" element={<PollView />} />
    </Routes>
  )
}

export default App
