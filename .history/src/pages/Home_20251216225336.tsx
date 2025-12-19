// src/pages/Home.tsx
import AboutContent from '../content/about.mdx'
import { SocialLinks } from '../components/SocialLinks'

export function Home() {
  return (
    <div id="about" className="h-screen flex items-start justify-center pt-[calc(100vw/27*2)]">
      <div className="max-w-3xl mx-auto px-6 py-12 w-full">
        <div className="flex items-start justify-between mb-8 pr-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pranav Marthi</h1>
          <div>
            <SocialLinks />
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6">
            <div className="mdx-content">
              <AboutContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

