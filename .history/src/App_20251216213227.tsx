// src/App.tsx
import { ThemeProvider } from './contexts/ThemeContext'
import { GridBackground } from './components/GridBackground'
import { ThemeToggle } from './components/ThemeToggle'
import { RedLines } from './components/RedLines'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <GridBackground />
        <RedLines />
        <ThemeToggle />
        <Sidebar />
        <div className="relative z-10">
          <Home />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

