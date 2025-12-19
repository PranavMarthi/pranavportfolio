// src/components/Navbar.tsx
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { cn } from '../lib/cn'

export function Navbar() {
  return (
    <NavigationMenu.Root className="relative z-50">
      <NavigationMenu.List className="flex items-center justify-between px-6 py-4 border-b border-gray-800 dark:border-gray-700">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/"
            className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Portfolio
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <div className="flex items-center gap-6">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              about
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              projects
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              href="#random"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              random
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

