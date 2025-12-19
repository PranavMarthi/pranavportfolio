// src/components/ThemeToggle.tsx
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../lib/cn'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  // Light mode button: light background, dark icon
  if (theme === 'light') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "fixed top-4 right-4 z-50",
          "p-2 rounded-full",
          "bg-white text-gray-900",
          "border border-gray-200",
          "hover:bg-gray-50",
          "transition-colors",
          "shadow-lg"
        )}
        aria-label="Toggle theme"
      >
        <Moon className="w-5 h-5" />
      </button>
    )
  }

  // Dark mode button: dark background, light icon
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-4 right-4 z-50",
        "p-2 rounded-full",
        "bg-gray-900 text-gray-100",
        "border border-gray-800",
        "hover:bg-gray-800",
        "transition-colors",
        "shadow-lg"
      )}
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5" />
    </button>
  )
}

