// src/pages/Home.tsx
import AboutContent from '../content/about.mdx'
import { SocialLinks } from '../components/SocialLinks'

export function Home() {
  return (
    <div className="w-full flex justify-center px-6 py-16">
      <div className="flex flex-col items-center">
        <div className="flex justify-end mb-8 w-full">
          <div>
            <SocialLinks />
          </div>
        </div>
        <div className="mdx-content space-y-6 text-center">
          <AboutContent />
        </div>
      </div>
    </div>
  )
}

