// src/pages/Home.tsx
import AboutContent from '../content/about.mdx'
import { SocialLinks } from '../components/SocialLinks'

export function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex justify-end mb-8">
        <div>
          <SocialLinks />
        </div>
      </div>
      <div className="mdx-content space-y-6">
        <AboutContent />
      </div>
    </div>
  )
}

