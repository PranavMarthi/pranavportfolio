// src/App.tsx
import { ThemeProvider } from './contexts/ThemeContext'
import { GridBackground } from './components/GridBackground'
import { ThemeToggle } from './components/ThemeToggle'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Random } from './pages/Random'

function App() {
  return (
    <ThemeProvider>
      <div className="relative scroll-snap-container">
        <GridBackground />
        <ThemeToggle />
        <Sidebar />
        <div className="relative z-10">
          <Home />
          <Projects />
          <Random />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

