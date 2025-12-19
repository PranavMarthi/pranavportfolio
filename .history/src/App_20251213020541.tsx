// src/App.tsx
import { ThemeProvider } from './contexts/ThemeContext'
import { GridBackground } from './components/GridBackground'
import { ThemeToggle } from './components/ThemeToggle'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <GridBackground />
        <ThemeToggle />
        <div className="relative z-10">
          <Navbar />
          <Home />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

