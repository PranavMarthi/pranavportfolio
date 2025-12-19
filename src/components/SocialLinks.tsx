// src/components/SocialLinks.tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '../lib/cn'

// X/Twitter logo - proper X logo design
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-6 h-6 flex items-center justify-center",
          "text-gray-400 dark:text-gray-400",
          "hover:text-white dark:hover:text-white",
          "transition-colors duration-200"
        )}
        aria-label="X (Twitter)"
      >
        <XIcon className="w-5 h-5" />
      </a>

      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-6 h-6 flex items-center justify-center",
          "text-gray-400 dark:text-gray-400",
          "hover:text-white dark:hover:text-white",
          "transition-colors duration-200"
        )}
        aria-label="GitHub"
      >
        <Github className="w-5 h-5" />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-6 h-6 flex items-center justify-center",
          "text-gray-400 dark:text-gray-400",
          "hover:text-white dark:hover:text-white",
          "transition-colors duration-200"
        )}
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      <a
        href="mailto:contact@example.com"
        className={cn(
          "w-6 h-6 flex items-center justify-center",
          "text-gray-400 dark:text-gray-400",
          "hover:text-white dark:hover:text-white",
          "transition-colors duration-200"
        )}
        aria-label="Email"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  )
}

