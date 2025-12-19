// src/pages/Random.tsx

import RandomContent1 from '../content/random.mdx'
import RandomContent2 from '../content/random1.mdx'

export function Random() {
  return (
    <div id="random" className="min-h-screen flex items-center justify-center scroll-mt-0 pt-16 pb-20 md:pb-0">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">Random</h1>
        <div className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">activities i enjoy</h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">

            <RandomContent1 />

            </p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">content i consume</h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              <RandomContent2 />
            </p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">things i read (i dont really read much)</h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            <RandomContent3 />            
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

