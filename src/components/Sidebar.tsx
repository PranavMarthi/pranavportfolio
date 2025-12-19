// src/components/Sidebar.tsx
import { cn } from '../lib/cn'

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 md:pl-12 lg:pl-20 xl:pl-44 z-20">
        <div className="flex flex-col gap-8">
          <a
            href="#about"
            className={cn(
              "text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "transition-colors"
            )}
          >
            about
          </a>
          <a
            href="#projects"
            className={cn(
              "text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "transition-colors"
            )}
          >
            projects
          </a>
          <a
            href="#random"
            className={cn(
              "text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "transition-colors"
            )}
          >
            random
          </a>
        </div>
      </nav>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around items-center py-3">
          <a
            href="#about"
            className={cn(
              "text-sm text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "transition-colors px-4 py-2"
            )}
          >
            about
          </a>
          <a
            href="#projects"
            className={cn(
              "text-sm text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "transition-colors px-4 py-2"
            )}
          >
            projects
          </a>
          <a
            href="#random"
            className={cn(
              "text-sm text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "transition-colors px-4 py-2"
            )}
          >
            random
          </a>
        </div>
      </nav>
    </>
  )
}

