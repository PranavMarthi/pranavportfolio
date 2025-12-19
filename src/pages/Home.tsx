// src/pages/Home.tsx
import AboutContent from '../content/about.mdx'
import { SocialLinks } from '../components/SocialLinks'

export function Home() {
  return (
    <div id="about" className="min-h-screen flex items-start justify-center pt-16 md:pt-[calc(50vh-9.5rem)] pb-20 md:pb-0">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-8 md:pr-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-none mb-4 md:mb-0">Pranav Marthi</h1>
          <div>
            <SocialLinks />
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          <div className="mdx-content">
            <AboutContent />
          </div>
        </div>
      </div>
    </div>
  )
}

