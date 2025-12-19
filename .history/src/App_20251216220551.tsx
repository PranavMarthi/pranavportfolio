// src/App.tsx
import { ThemeProvider } from './contexts/ThemeContext'
import { GridBackground } from './components/GridBackground'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Random } from './pages/Random'
import { useScrollSnap } from './hooks/useScrollSnap'

function App() {
  useScrollSnap()
  
  return (
    <ThemeProvider>
      <div className="relative">
        <GridBackground />
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

